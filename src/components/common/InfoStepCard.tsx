import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Card } from "@amzn/stencil-react-components/card";
import { H5, Text } from "@amzn/stencil-react-components/text";
import { CommonColors } from "../../utils/colors";
import {
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconPadlock,
  IconPencil
} from "@amzn/stencil-react-components/icons";
import { INFO_CARD_STEP_STATUS, INFO_CARD_STEPS } from "../../utils/enums/common";
import { InfoCardStepConfig, InfoCardStepStatus } from "../../utils/types/common";
import { connect } from "react-redux";
import { JobState } from "../../reducers/job.reducer";
import { ApplicationState } from "../../reducers/application.reducer";
import { ScheduleState } from "../../reducers/schedule.reducer";
import { BGCState } from "../../reducers/bgc.reducer";
import { CandidateState } from "../../reducers/candidate.reducer";
import { boundUpdateStepConfigAction } from "../../actions/BGC_Actions/boundBGCActions";
import { boundUpdateFullBgcStepConfigAction } from "../../actions/FullBgcActions/boundFullBgcActions";
import { translate as t } from "../../utils/translator";
import { SelfIdentificationState } from "../../reducers/selfIdentification.reducer";
import { getPageName } from "../../utils/helper";
import { PAGE_ROUTES } from "../pageRoutes";
import { boundUpdateSelfIdStepConfig } from "../../actions/SelfIdentitifactionActions/boundSelfIdentificationActions";
import { FullBgcState } from "../../reducers/fullBgc.reducer";

const { BACKGROUND_CHECK, SELF_IDENTIFICATION } = PAGE_ROUTES;

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  bgc: BGCState;
  fullBgc: FullBgcState;
  candidate: CandidateState;
  selfIdentification: SelfIdentificationState;
}

interface BGCStepCardProps {
  title: string;
  expandedContent: React.ReactNode;
  collapsedContent?: React.ReactNode;
  stepName: INFO_CARD_STEPS;
  stepIndex: number;
  infoCardStepStatus?: InfoCardStepStatus;
  maxStepNumber?: number;
}

type BGCStepCardMergedProps = MapStateToProps & BGCStepCardProps;

const InfoStepCard = (props: BGCStepCardMergedProps ) => {

  const { title, collapsedContent, expandedContent, stepName, stepIndex, infoCardStepStatus, bgc, fullBgc, selfIdentification, maxStepNumber } = props;
  const { stepConfig: bgcStepConfig } = bgc;
  const { stepConfig: fullBgcStepConfig } = fullBgc;
  const { stepConfig: selfIdStepConfig } = selfIdentification;
  const { status: stepStatus, editMode } = infoCardStepStatus || {};

  let stepConfig: InfoCardStepConfig;
  switch (getPageName()) {
    case BACKGROUND_CHECK:
      stepConfig = bgcStepConfig as InfoCardStepConfig;
      break;
    case SELF_IDENTIFICATION:
      stepConfig = selfIdStepConfig as InfoCardStepConfig;
      break;
    default:
      stepConfig = fullBgcStepConfig as InfoCardStepConfig;
      break;
  }

  const getContentToDisplay = (): React.ReactNode => {

    if (stepStatus === INFO_CARD_STEP_STATUS.ACTIVE || (editMode && stepStatus === INFO_CARD_STEP_STATUS.COMPLETED)) {
      return expandedContent;
    }

    return collapsedContent || <></>;

  };

  const handleSetEditMode = (editMode: boolean) => {
    const current = stepConfig[stepName];
    const payload: InfoCardStepConfig = {
      ...stepConfig,
      [stepName]: {
        ...current,
        editMode: editMode
      }
    };

    const pageName = getPageName();

    switch (pageName) {
      case BACKGROUND_CHECK:
        boundUpdateStepConfigAction(payload);
        break;
      case SELF_IDENTIFICATION:
        boundUpdateSelfIdStepConfig(payload);
        break;
      default:
        boundUpdateFullBgcStepConfigAction(payload);
        break;
    }
  };

  const totalStepNumber = maxStepNumber || 3;

  return (
    <Col>
      <Card
        width="100%"
        padding="S300"
        minHeight="100px"
        isElevated
      >
        <Col width="100%" padding="S300" gridGap={15}>
          <Row justifyContent="space-between">
            <Text fontSize="T200" color={CommonColors.Neutral70}>
              {t("BB-BGC-bgc-step-card-step-progress", `Step ${stepIndex} of ${totalStepNumber}`, { currentStep: stepIndex, totalSteps: totalStepNumber })}
            </Text>
            {stepStatus === INFO_CARD_STEP_STATUS.COMPLETED && editMode && (
              <Row onClick={() => handleSetEditMode(false)}>
                <IconCloseCircleFill aria-hidden />
              </Row>
            )}
            {stepStatus === INFO_CARD_STEP_STATUS.LOCKED && (
              <Row color={CommonColors.Neutral70}>
                <IconPadlock aria-hidden />
              </Row>
            )}
          </Row>
          <Row justifyContent="space-between" alignItems="center" gridGap={15}>
            <H5>{title}</H5>
            {
              stepStatus === INFO_CARD_STEP_STATUS.COMPLETED && !editMode && (
                <Row gridGap={15}>
                  <IconCheckCircleFill color={CommonColors.GREEN70} aria-hidden />
                  <Col onClick={() => handleSetEditMode(true)}>
                    <IconPencil color={CommonColors.Blue70} aria-hidden />
                  </Col>
                </Row>
              )}
          </Row>
          {
            getContentToDisplay()
          }
        </Col>
      </Card>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(InfoStepCard);
