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
import { BgcStepConfig, InfoCardStepConfig, InfoCardStepStatus } from "../../utils/types/common";
import { connect } from "react-redux";
import { JobState } from "../../reducers/job.reducer";
import { ApplicationState } from "../../reducers/application.reducer";
import { ScheduleState } from "../../reducers/schedule.reducer";
import { BGCState } from "../../reducers/bgc.reducer";
import { CandidateState } from "../../reducers/candidate.reducer";
import { boundUpdateStepConfigAction } from "../../actions/BGC_Actions/boundBGCActions";
import { translate as t } from "../../utils/translator";
import { SelfIdentificationState } from "../../reducers/selfIdentification.reducer";
import { getPageName } from "../../utils/helper";
import { BACKGROUND_CHECK, SELF_IDENTIFICATION } from "../pageRoutes";
import { boundUpdateSelfIdStepConfig } from "../../actions/SelfIdentitifactionActions/boundSelfIdentificationActions";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState,
    selfIdentification: SelfIdentificationState
}

interface BGCStepCardProps {
    title: string;
    expandedContent: React.ReactNode;
    collapsedContent?: React.ReactNode;
    stepName: INFO_CARD_STEPS;
    stepIndex: number;
    infoCardStepStatus: InfoCardStepStatus
}

type BGCStepCardMergedProps = MapStateToProps & BGCStepCardProps;

const InfoStepCard = (props: BGCStepCardMergedProps ) => {

    const { title, collapsedContent, expandedContent, stepName, stepIndex, infoCardStepStatus, bgc, selfIdentification } = props;
    const { stepConfig: bgcStepConfig } = bgc;
    const { stepConfig: selfIdStepConfig} = selfIdentification;
    const { status: stepStatus, editMode } = infoCardStepStatus;

    const stepConfig: InfoCardStepConfig = getPageName() === BACKGROUND_CHECK ? bgcStepConfig as  InfoCardStepConfig: selfIdStepConfig as InfoCardStepConfig;

    const getContentToDisplay = (): React.ReactNode => {

        if(stepStatus === INFO_CARD_STEP_STATUS.ACTIVE || (editMode && stepStatus === INFO_CARD_STEP_STATUS.COMPLETED)) {
            return expandedContent;
        }
        else {
            return collapsedContent || <></>;
        }
    }

    const handleSetEditMode = (editMode: boolean) => {
        const current =  stepConfig[stepName]
        const payload: InfoCardStepConfig = {
            ...stepConfig,
            [stepName]: {
                ...current,
                editMode: editMode
            }
        }

        const pageName = getPageName();
        if (pageName === BACKGROUND_CHECK){
            boundUpdateStepConfigAction(payload);
        }

        if (pageName === SELF_IDENTIFICATION) {
            boundUpdateSelfIdStepConfig(payload);
        }
    }

    return (
        <Col>
            <Card
                width="100%"
                padding="S300"
                minHeight="100px"
                isElevated={true}
            >
                <Col width="100%" padding="S300" gridGap={15}>
                    <Row justifyContent="space-between">
                        <Text fontSize="T200" color={CommonColors.Neutral70}>
                            {t("BB-BGC-bgc-step-card-step-progress", "Step {currentStep} of {totalSteps}", {currentStep: stepIndex, totalSteps: 3})}
                        </Text>
                        {stepStatus === INFO_CARD_STEP_STATUS.COMPLETED && editMode &&
                        <Row onClick={() => handleSetEditMode(false)}>
                            <IconCloseCircleFill/>
                        </Row>
                        }
                        {stepStatus === INFO_CARD_STEP_STATUS.LOCKED &&
                        <Row color={CommonColors.Neutral70}>
                            <IconPadlock/>
                        </Row>
                        }
                    </Row>
                    <Row justifyContent="space-between" alignItems="center" gridGap={15}>
                        <H5>{title}</H5>
                        {
                            stepStatus === INFO_CARD_STEP_STATUS.COMPLETED && !editMode &&
                            <Row gridGap={15}>
                                <IconCheckCircleFill color={CommonColors.GREEN70}/>
                                <Col onClick={() => handleSetEditMode(true)}>
                                    <IconPencil color={CommonColors.Blue70}/>
                                </Col>
                            </Row>
                        }
                    </Row>
                    {
                        getContentToDisplay()
                    }
                </Col>
            </Card>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(InfoStepCard);
