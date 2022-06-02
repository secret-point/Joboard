import React, { useState } from "react";
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

interface BGCStepCardProps {
    title: string;
    expandedContent: React.ReactNode;
    collapsedContent?: React.ReactNode;
    stepName: BGC_STEPS;
    editMode?: boolean;
    stepIndex: number;
    stepStatus: BGC_STEP_STATUS
}

const BGCStepCard = ( props: BGCStepCardProps ) => {

    const { title, collapsedContent, expandedContent, stepName, stepIndex, stepStatus } = props;
    const [editMode, setEditMode] = useState<boolean>(false);

    const getContentToDisplay = (): React.ReactNode => {

        if(stepStatus === BGC_STEP_STATUS.ACTIVE || (editMode && stepStatus === BGC_STEP_STATUS.COMPLETED)) {
            return expandedContent;
        }
        else {
            return collapsedContent || <></>;
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
                        <Text fontSize="T200" color={CommonColors.Neutral70}>{`Step ${stepIndex} of 3`}</Text>
                        {stepStatus === BGC_STEP_STATUS.COMPLETED && editMode &&
                        <Row onClick={() => setEditMode(false)}>
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
                                <Col onClick={() => setEditMode(true)}>
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

export default BGCStepCard;
