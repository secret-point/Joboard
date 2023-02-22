import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router-dom";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import {
  bgcMXShouldDisplayContinue,
  checkAndBoundGetApplication,
  createUpdateApplicationRequest,
  getLocale,
  handleUInitiateMXBGCStep
} from "../../../utils/helper";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { ApplicationStepListDefault } from "../../../utils/constants/common";
import { connect } from "react-redux";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { BGCState } from "../../../reducers/bgc.reducer";
import { BGC_STEPS, PROXY_APPLICATION_STATE, UPDATE_APPLICATION_API_TYPE } from "../../../utils/enums/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import AuthorizationForBGC from "./AuthorizationsForBGC";
import AdditionalBGCInfo from "../../mx/bgc/AdditionalBGCInfo";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { Application, BgcMXStepConfig } from "../../../utils/types/common";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { translate as t } from "../../../utils/translator";
import InfoStepCard from "../../common/InfoStepCard";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { log } from "../../../helpers/log-helper";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  bgc: BGCState;
  candidate: CandidateState;
}

interface BackgroundCheckProps {

}

type BackgroundCheckMergedProps = MapStateToProps & BackgroundCheckProps;

export const BackgroundCheck = ( props: BackgroundCheckMergedProps ) => {

  const { job, application, schedule, bgc, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const stepConfig = bgc.stepConfig as BgcMXStepConfig;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  useEffect(() => {
    if (applicationData && candidateData) {
      handleUInitiateMXBGCStep(applicationData, candidateData);
    }
  }, [candidateData, applicationData]);

  const handleContinue = () => {
    boundResetBannerMessage();
    if (applicationData) {
      const { BGC } = UPDATE_APPLICATION_API_TYPE;
      const payload = {
        state: PROXY_APPLICATION_STATE.ADDITIONAL_BACKGROUND_INFO_SAVED
      };
      const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, BGC, payload);
      boundUpdateApplicationDS(request, (applicationData: Application) => {
        // For troubleshooting issue: https://issues.amazon.com/issues/HVHBB-1440
        log(`Start to complete bgc workflow step for application ${applicationData.applicationId}, schedule: ${scheduleDetail?.scheduleId}`,
          {
            application: { ...applicationData },
            scheduleDetail: { ...scheduleDetail }
          }
        );
        onCompleteTaskHelper(applicationData);
      });
    }
  };

  return (
    <Col className="bgcContainer" gridGap={15}>
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={ApplicationStepListDefault[1]} />
      <Col gridGap={15}>
        <H4>{t("BB-MX-BGC-page-content-title", "Consent to employment screening")}</H4>
        <Text fontSize="T200">
          {t("BB-BGC-page-provide-authorization-and-information-notice", "Please provide authorization and information needed for a background check.")}
        </Text>
      </Col>

      <InfoStepCard
        title={t("BB-BGC-page-authorizations-for-background-check-step-card-title", "Authorizations for Background Check, Medical Check, and Drug Test")}
        expandedContent={<AuthorizationForBGC />}
        stepName={BGC_STEPS.NON_FCRA}
        infoCardStepStatus={stepConfig[BGC_STEPS.NON_FCRA]}
        stepIndex={1}
        maxStepNumber={2}
      />

      <InfoStepCard
        title={t("BB-BGC-page-additional-bgc-step-card-title", "Additional Background Information")}
        expandedContent={<AdditionalBGCInfo />}
        stepName={BGC_STEPS.ADDITIONAL_BGC}
        infoCardStepStatus={stepConfig[BGC_STEPS.ADDITIONAL_BGC]}
        stepIndex={2}
        maxStepNumber={2}
      />
      <Col padding={{ top: "S300" }}>
        {
          bgcMXShouldDisplayContinue(stepConfig) && (
            <Button
              variant={ButtonVariant.Primary}
              onClick={handleContinue}
            >
              {t("BB-BGC-page-continue-button", "Continue")}
            </Button>
          )}
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(BackgroundCheck);
