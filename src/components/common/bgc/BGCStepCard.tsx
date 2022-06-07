import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Card } from '@amzn/stencil-react-components/card';
import { H5, Text } from "@amzn/stencil-react-components/text";
import { CommonColors } from "../../../utils/colors";
import {
    IconCheckCircleFill,
    IconCloseCircleFill,
    IconPadlock,
    IconPencil
} from '@amzn/stencil-react-components/icons';
import { BGC_STEP_STATUS, BGC_STEPS } from "../../../utils/enums/common";
import { BgcStepConfig, BgcStepStatus } from "../../../utils/types/common";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundUpdateStepConfigAction } from "../../../actions/BGC_Actions/boundBGCActions";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface BGCStepCardProps {
    title: string;
    expandedContent: React.ReactNode;
    collapsedContent?: React.ReactNode;
    stepName: BGC_STEPS;
    stepIndex: number;
    bgcStepStatus: BgcStepStatus
}

type BGCStepCardMergedProps = MapStateToProps & BGCStepCardProps;

const BGCStepCard = ( props: BGCStepCardMergedProps ) => {

    const { title, collapsedContent, expandedContent, stepName, stepIndex, bgcStepStatus, bgc } = props;
    const { stepConfig } = bgc;
    const { status: stepStatus, editMode } = bgcStepStatus;

    const getContentToDisplay = (): React.ReactNode => {

        if(stepStatus === BGC_STEP_STATUS.ACTIVE || (editMode && stepStatus === BGC_STEP_STATUS.COMPLETED)) {
            return expandedContent;
        }
        else {
            return collapsedContent || <></>;
        }
    }

    const handleSetEditMode = (editMode: boolean) => {
        const payload: BgcStepConfig = {
            ...stepConfig,
            [stepName]: {
                ...stepConfig[stepName],
                editMode: editMode
            }
        }
        boundUpdateStepConfigAction(payload);
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
                        {stepStatus === BGC_STEP_STATUS.COMPLETED && editMode &&
                        <Row onClick={() => handleSetEditMode(false)}>
                            <IconCloseCircleFill/>
                        </Row>
                        }
                        {stepStatus === BGC_STEP_STATUS.LOCKED &&
                        <Row color={CommonColors.Neutral70}>
                            <IconPadlock/>
                        </Row>
                        }
                    </Row>
                    <Row justifyContent="space-between" alignItems="center" gridGap={15}>
                        <H5>{title}</H5>
                        {
                            stepStatus === BGC_STEP_STATUS.COMPLETED && !editMode &&
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

export default connect(mapStateToProps)(BGCStepCard);
