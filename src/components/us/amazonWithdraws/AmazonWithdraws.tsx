import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { ApplicationState } from "../../../reducers/application.reducer";
import queryString from "query-string";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { ScheduleState } from "../../../reducers/schedule.reducer";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  application: ApplicationState,
  schedule: ScheduleState
}

export const AmazonWithdraws = (props: MapStateToProps) => {
  const { job, application, candidate, schedule } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const candidateData = candidate.results.candidateData;
  const scheduleDetail = schedule.results.scheduleDetail;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, scheduleDetail, candidateData]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[])

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {t("BB-amazon-withdraws", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-amazon-withdraws-description", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-amazon-withdraws-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AmazonWithdraws);
