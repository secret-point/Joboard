import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import InfoStepCard from "../../common/InfoStepCard";
import { SELF_IDENTIFICATION_STEPS } from "../../../utils/enums/common";
import EqualOpportunityForm from "../../common/self-Identification/Equal-opportunity-form";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import VeteranStatusForm from "../../common/self-Identification/veteran-status-form";
import DisabilityForm from "../../common/self-Identification/disability-form";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import {
  getLocale,
  handleInitiateSelfIdentificationStep,
  isSelfIdentificationInfoValid,
  SelfShouldDisplayContinue
} from "../../../utils/helper";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { translate as t } from "../../../utils/translator";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { CommonColors } from "../../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";

interface MapStateToProps {
  application: ApplicationState,
  candidate: CandidateState,
  selfIdentification: SelfIdentificationState
}

interface SelfIdentificationProps {

}

type SelfIdentificationMergeProps = MapStateToProps & SelfIdentificationProps;

const SelfIdentificationComponent = (props: SelfIdentificationMergeProps) => {
  const { selfIdentification, application, candidate } = props;
  const { stepConfig } = selfIdentification;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const applicationData = application.results;
  const candidateData = candidate.results?.candidateData;
  const selfIdentificationInfo = candidateData?.selfIdentificationInfo;
  const [isSelfIdInfoValid, setIsSelfIdInfoValid] = useState(true);

  useEffect(() => {
    applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
  }, [applicationId]);

  useEffect(() => {
    applicationData && addMetricForPageLoad(pageName);
  }, [applicationData]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, [applicationData]);

  useEffect(() => {
    selfIdentificationInfo && handleInitiateSelfIdentificationStep(selfIdentificationInfo);
  }, [candidateData, applicationData])


  const handleContinue = () => {
    const isSelfIdInfoValid = isSelfIdentificationInfoValid(selfIdentificationInfo);
    setIsSelfIdInfoValid(isSelfIdInfoValid);

    if(applicationData && isSelfIdInfoValid) {
      onCompleteTaskHelper(applicationData);
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
      />

      <InfoStepCard
        title={t("BB-SelfId-veteran-status-title-text", "Voluntary Self-Identification of Veteran Status")}
        expandedContent={<VeteranStatusForm />}
        stepName={SELF_IDENTIFICATION_STEPS.VETERAN_FORM}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.VETERAN_FORM]}
        stepIndex={2}
      />

      <InfoStepCard
        title={t("BB-SelfId-disability-form-card-title-text", "Voluntary Self-Identification of Disability")}
        expandedContent={<DisabilityForm />}
        stepName={SELF_IDENTIFICATION_STEPS.DISABILITY_FORM}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]}
        stepIndex={3}
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
          <Button
            variant={ButtonVariant.Primary}
            onClick={handleContinue}
          >
            {t('BB-SelfId-form-continue-button-text', 'Continue')}
          </Button>
        }
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(SelfIdentificationComponent);
