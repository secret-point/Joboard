import React, { useEffect, useState } from "react";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { useLocation } from "react-router-dom";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { CommonColors } from "../../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { connect } from "react-redux";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { JobState } from "../../../reducers/job.reducer";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import {
  PROXY_APPLICATION_STATE,
  SELF_IDENTIFICATION_STEPS,
  UPDATE_APPLICATION_API_TYPE
} from "../../../utils/enums/common";
import {
  checkAndBoundGetApplication,
  createUpdateApplicationRequest, getCountryCode,
  getLocale,
  handleInitiateSelfIdentificationStep,
  isSelfIdentificationInfoValid,
  SelfShouldDisplayContinue
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Application } from "../../../utils/types/common";
import InfoStepCard from "../../common/InfoStepCard";
import DisabilityForm from "../../common/self-Identification/disability-form";
import EqualOpportunityForm from "../../common/self-Identification/Equal-opportunity-form";
import VeteranStatusForm from "../../common/self-Identification/veteran-status-form";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  selfIdentification: SelfIdentificationState;
  schedule: ScheduleState;
  job: JobState;
}

interface SelfIdentificationProps {

}

type SelfIdentificationMergeProps = MapStateToProps & SelfIdentificationProps;

export const SelfIdentification = (props: SelfIdentificationMergeProps) => {
  const { selfIdentification, application, candidate, schedule, job } = props;
  const { stepConfig } = selfIdentification;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, scheduleId, jobId } = queryParams;
  const applicationData = application.results;
  const candidateData = candidate.results?.candidateData;
  const selfIdentificationInfo = candidateData?.selfIdentificationInfo;
  const [isSelfIdInfoValid, setIsSelfIdInfoValid] = useState(true);
  const jobDetail = job.results;
  const {scheduleDetail} = schedule.results;

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, [applicationData]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleDetail, scheduleId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[pageName]);

  useEffect(() => {
    selfIdentificationInfo && handleInitiateSelfIdentificationStep(selfIdentificationInfo);
  }, [candidateData, applicationData, selfIdentificationInfo])


  const handleContinue = () => {
    boundResetBannerMessage();
    const isSelfIdInfoValid = isSelfIdentificationInfoValid(selfIdentificationInfo);
    setIsSelfIdInfoValid(isSelfIdInfoValid);

    if(applicationData && isSelfIdInfoValid) {
      const { SELF_IDENTIFICATION } = UPDATE_APPLICATION_API_TYPE;
      const payload = {
        state: PROXY_APPLICATION_STATE.SELF_IDENTIFICATION_COMPLETED
      }
      const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, SELF_IDENTIFICATION, payload);
      boundUpdateApplicationDS(request, (applicationData: Application)=>{
        onCompleteTaskHelper(applicationData);
      });
    }
  }

  const shouldRenderContinueButton = SelfShouldDisplayContinue(stepConfig);

  return (
    <Col gridGap={15}>
      <InfoStepCard
        title={t("BB-SelfId-equal-opportunity-form-title-text", "Voluntary Equal Opportunity Self-Identification Form")}
        expandedContent={<EqualOpportunityForm />}
        stepName={SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]}
        stepIndex={1}
        maxStepNumber={2}
      />

      <InfoStepCard
        title={t("BB-SelfId-disability-form-card-title-text", "Voluntary Self-Identification of Disability")}
        expandedContent={<DisabilityForm />}
        stepName={SELF_IDENTIFICATION_STEPS.DISABILITY_FORM}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]}
        stepIndex={2}
        maxStepNumber={2}
      />
      {
        shouldRenderContinueButton && !isSelfIdInfoValid &&
        <Row padding="S300" backgroundColor={CommonColors.RED05}>
          <StatusIndicator
            messageText={"Please check all required boxes in previous steps to proceed."}
            status={Status.Negative}
            iconAriaHidden={true}
          />
        </Row>
      }
      <Col padding={{top: 'S300'}}>
        {
          shouldRenderContinueButton &&
          <DebouncedButton
            variant={ButtonVariant.Primary}
            onClick={handleContinue}
          >
            {t('BB-SelfId-form-continue-button-text', 'Continue')}
          </DebouncedButton>
        }
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(SelfIdentification);
