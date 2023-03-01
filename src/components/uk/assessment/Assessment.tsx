import React, { useEffect } from "react";
import { Col, } from "@amzn/stencil-react-components/layout";
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

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  application: ApplicationState;
}

export const Assessment = (props: MapStateToProps) => {
  const { job, schedule, application } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId, applicationId } = queryParams;
  const jobDetail = job.results;
  const { scheduleId } = queryParams;
  const { scheduleDetail } = schedule.results;
  const pageName = getPageNameFromPath(pathname);
  const { assessment } = application?.results || {};
  const headerStep = getStepsByTitle(ApplicationStepListUK, STEPS.COMPLETE_AN_ASSESSMENT)[0]; 

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
    if (jobDetail && ((scheduleId && scheduleDetail) || (!scheduleId))) {
      addMetricForPageLoad(pageName);
    }
  }, [jobDetail, scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  return (
    <>
      <Col gridGap="S300" padding="0">
        <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={headerStep} steps={ApplicationStepListUK} />
        {assessment?.assessmentUrl && <IFrame src={ assessment.assessmentUrl} />}
      </Col>
    </>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Assessment);
