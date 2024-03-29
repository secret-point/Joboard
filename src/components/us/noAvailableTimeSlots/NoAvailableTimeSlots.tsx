import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
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
import { useLocation } from "react-router-dom";
import { JobState } from "../../../reducers/job.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { ApplicationState } from "../../../reducers/application.reducer";
import queryString from "query-string";
import { Link } from "@amzn/stencil-react-components/link";
import { AppConfigState } from "../../../reducers/appConfig.reducer";
import { WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";

interface MapStateToProps {
  candidate: CandidateState;
  job: JobState;
  application: ApplicationState;
  appConfig: AppConfigState;
  schedule: ScheduleState;
}

export const NoAvailableTimeSlots = (props: MapStateToProps) => {
  const { job, application, appConfig, schedule, candidate } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;
  const envConfig = appConfig.results?.envConfig;

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
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  const handleGoToJobOpportunities = () => {
    boundResetBannerMessage();

    const isBackButton = true;
    const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
    applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack, WORKFLOW_STEP_NAME.NHE);
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {t("BB-no-available-time-slots-title", "There are no appointments available for this job right now.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-no-available-time-slots-description", "You may:")}
      </Text>
      <Row gridGap="S100">
        <Text fontSize="T100">
          {t("BB-no-available-time-slots-select-different-job", "1. Select a different job opportunity")} -
        </Text>
        <Link href={envConfig?.CSDomain} fontSize="T100">
          {t("BB-no-available-time-slots-select-different-job-link", "Click here")}
        </Link>
      </Row>
      <Text fontSize="T100">
        {t("BB-no-available-time-slots-select-later-date-text", "2. Select a shift with a later start date (recommended)")}
      </Text>
      <Col padding={{ top: "S300" }} gridGap={20}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToJobOpportunities}>
          {t("BB-no-available-time-slots-view-other-shifts-button-text", "View other shifts")}
        </Button>
        <Button onClick={handleGoToDashboard}>
          {t("BB-no-available-time-slots-back-to-dashboard-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(NoAvailableTimeSlots);
