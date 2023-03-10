import React, { useEffect, useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import StepHeader from "../../common/StepHeader";
import { ApplicationStepListUK } from "../../../utils/constants/common";
import { ApplicationState } from "../../../reducers/application.reducer";
import IFrame from "../../common/IFrame";
import { getStepsByTitle } from "../../../helpers/steps-helper";
import { APPLICATION_STEPS as STEPS } from "../../../utils/enums/common";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { AssessmentState } from "../../../reducers/assessment.reducer";
import { boundGetAssessmentElegibilitySuccess } from "../../../actions/AssessmentActions/boundAssessmentActions";

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  application: ApplicationState;
  candidate: CandidateState;
  assessment: AssessmentState;
}

export const Assessment = (props: MapStateToProps) => {
  const { job, schedule, application, candidate, assessment } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId, applicationId } = queryParams;
  const jobDetail = job.results;
  const { scheduleId } = queryParams;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;
  const applicationData = application.results;
  const pageName = getPageNameFromPath(pathname);
  const headerStep = getStepsByTitle(ApplicationStepListUK, STEPS.COMPLETE_AN_ASSESSMENT)[0];
  const [assessmentUrl, setAssessmentUrl] = useState<string>("");
  const { assessmentElegibility } = assessment.results;

  // Load candidate so that we can log candidateId if application already exists error happens
  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    if (candidateData && jobDetail) {
      const assessmentType = jobDetail?.assessmentType;
      if (assessmentType && candidateData.assessmentsTaken) {
        setAssessmentUrl(candidateData.assessmentsTaken[assessmentType]?.assessmentUrl);
      }
    }
  }, [candidateData, jobDetail]);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);
  
  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    if (applicationData && jobDetail && ((scheduleId && scheduleDetail) || (!scheduleId))) {
      addMetricForPageLoad(pageName);
    }
  }, [jobDetail, scheduleDetail, applicationData]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  useEffect(() => {
    // Setting the assessmentElegibility to true to prevent subsequent request during this session
    assessmentElegibility === null && boundGetAssessmentElegibilitySuccess({
      assessmentElegibility: true });
  }, []);

  return (
    <>
      <Col gridGap="S300" padding="0">
        <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={headerStep} steps={ApplicationStepListUK} />
        {assessmentUrl && <IFrame src={assessmentUrl} />}
      </Col>
    </>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Assessment);
