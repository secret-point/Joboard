import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Flex, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad, postAdobeMetrics } from "../../../actions/AdobeActions/adobeActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToDashboard } from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import {
  checkAndBoundGetApplication, createUpdateApplicationRequest,
  getLocale,
  routeToAppPageWithPath
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { AlreadyAppliedScheduleDetails } from "./AlreadyAppliedScheduleDetails";
import { Application } from "../../../utils/types/common";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { QUERY_PARAMETER_NAME, UPDATE_APPLICATION_API_TYPE, WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { ApplicationState } from "../../../reducers/application.reducer";
import { PAGE_ROUTES } from "../../pageRoutes";
import { boundHidePageLoader } from "../../../actions/UiActions/boundUi";
import {
  boundUpdateApplicationDS
} from "../../../actions/ApplicationActions/boundApplicationActions";
import { SelectedScheduleForUpdateApplication } from "../../../utils/apiTypes";
import { DuplicateJobId } from "../../../utils/constants/common";
import { log, LoggerType } from "../../../helpers/log-helper";
import { AppConfigState } from "../../../reducers/appConfig.reducer";
import { METRIC_NAME } from "../../../constants/adobe-analytics";

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  application: ApplicationState;
  appConfig: AppConfigState;
}

export const AlreadyAppliedButCanBeReset = (props: MapStateToProps) => {
  const { application, job, schedule, appConfig } = props;
  const { search, pathname } = useLocation();
  const { matches } = useBreakpoints();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { scheduleId, jobId } = queryParams;
  const jobDetail = job.results;
  const { scheduleDetail, oldScheduleDetail } = schedule.results;
  const { errorMetadata } = application;

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    scheduleId && scheduleId !== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    errorMetadata?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: errorMetadata?.scheduleId,
      isOldSchedule: true
    });
    boundHidePageLoader();
  }, [errorMetadata]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(METRIC_NAME.ALREADY_APPLIED_BUT_CAN_BE_RESET);
  }, [jobDetail, pageName]);

  const handleGoToDashboard = () => {
    postAdobeMetrics({ name: METRIC_NAME.ALREADY_APPLIED_GO_BACK_TO_DASHBOARD, values: {
      APPLICATION: {
        applicationId: errorMetadata?.applicationId || "",
      }
    } });
    sessionStorage.setItem(DuplicateJobId, jobId);
    redirectToDashboard(jobDetail?.jobId);
  };

  const handleContinueToApplication = () => {
    postAdobeMetrics({ name: METRIC_NAME.ALREADY_APPLIED_RESETTING_APPLICATION, values: {
      APPLICATION: {
        applicationId: errorMetadata?.applicationId || "",
      }
    } });
    if (errorMetadata?.applicationId && errorMetadata?.candidateId) {
      const application = {
        applicationId: errorMetadata.applicationId,
        candidateId: errorMetadata.candidateId,
        jobScheduleSelected: { jobId: jobId }
      } as Application;
      window.hasCompleteTaskOnWorkflowConnect = () => {
        onCompleteTaskHelper(application, true, WORKFLOW_STEP_NAME.RESET_APPLICATION, undefined);
      };
      if (scheduleId && appConfig.results?.envConfig) {
        window.hasCompleteTaskOnSkipSchedule = () => {
          const selectedSchedule: SelectedScheduleForUpdateApplication = {
            jobId,
            scheduleId,
            scheduleDetails: JSON.stringify(scheduleDetail)
          };
          const request = createUpdateApplicationRequest(application, UPDATE_APPLICATION_API_TYPE.JOB_CONFIRM, selectedSchedule);
          boundUpdateApplicationDS(request, (applicationResponse: Application) => {
            onCompleteTaskHelper(applicationResponse, undefined, undefined, WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES);
          });
        };
      }
      routeToAppPageWithPath(PAGE_ROUTES.ALREADY_APPLIED, [
        { paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: errorMetadata.applicationId }]);

      checkAndBoundGetApplication(errorMetadata.applicationId);
    } else {
      log("errorMetadata,candidateId or applicationId is null/undefined", errorMetadata, LoggerType.INFO);
    }
  };

  return (
    <Col gridGap="S300" padding={matches.l || matches.xl ? { top: "S300", left: "300px" } : {}}>
      <Text fontSize="T400" fontWeight="bold">
        {t("BB-already-applied-but-can-be-reset", "You already have an active application for the role:",)}
        <br />
        {jobDetail?.jobTitle || ""}
      </Text>
      <Text fontSize="T300" color="neutral70">
        {t("BB-job-id", "Job Id: ")} {jobDetail?.jobId || "" }
      </Text>
      <Flex flexDirection={matches.s || matches.m ? "column": "row"} gridGap="S300">
        <Col width={matches.s || matches.m ? "100%": "35%"} gridGap="S300">
          <Text fontSize="T300">{t("BB-existing-application", "Existing application:")}</Text>
          {oldScheduleDetail && <AlreadyAppliedScheduleDetails scheduleDetail={ oldScheduleDetail } />}
        </Col>

        <Col width={matches.s || matches.m ? "100%": "35%"} gridGap="S300">
          <Text fontSize="T300">{t("BB-new-application", "New application:")}</Text>
          {scheduleDetail && <AlreadyAppliedScheduleDetails scheduleDetail={ scheduleDetail } />}
        </Col>
      </Flex>
      <Row width={matches.s || matches.m ? "100%": "75%"}>
        <Text fontSize="T200">
          {t("BB-already-applied-but-can-be-reset-dashboard-description", "If you proceed with this new application, your existing one will be withdrawn. To view or resume your existing application, click 'Go to dashboard'.")}
        </Text>
      </Row>
      <Row>
        <Text fontSize="T200">
          {t(" BB-already-applied-but-can-be-reset-continue-description", "To proceed with new application, click 'Continue with application'.")}
        </Text>
      </Row>
      {(matches.s || matches.m) && (
        <Flex className="alreadyAppliedButton" gridGap={20} flexDirection="column">
          <Button dataTestId="button-continue" variant={ButtonVariant.Primary} onClick={handleContinueToApplication}>
            {t("BB-already-applied-but-continue-button-text", "Continue with new application")}
          </Button>
          <Button dataTestId="button-dashboard" variant={ButtonVariant.Secondary} onClick={handleGoToDashboard}>
            {t("BB-already-applied-button-text-v2", "Go to dashboard")}
          </Button>
        </Flex>
      )}
      {(matches.l || matches.xl) && (
        <Flex className="alreadyAppliedButton" gridGap={20} flexDirection="row">
          <Button dataTestId="button-dashboard" variant={ButtonVariant.Secondary} onClick={handleGoToDashboard}>
            {t("BB-already-applied-button-text-v2", "Go to dashboard")}
          </Button>
          <Button dataTestId="button-continue" variant={ButtonVariant.Primary} onClick={handleContinueToApplication}>
            {t("BB-already-applied-but-continue-button-text", "Continue with new application")}
          </Button>
        </Flex>
      )}
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyAppliedButCanBeReset);
