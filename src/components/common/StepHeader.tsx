import React from 'react';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { CommonColors } from "../../utils/colors";
import { translate as t } from "../../utils/translator";
import { ApplicationStep } from "../../utils/types/common";
import ApplicationSteps from "./ApplicationSteps";

interface StepHeaderProps {
    jobTitle: string;
    step: ApplicationStep;
}
export const StepHeader = (props: StepHeaderProps) => {

    const { jobTitle, step } = props;

    const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
        <FlyoutContent
            titleText={t('BB-StepHeader-view-progress-flyout-title', 'View progress')}
            onCloseButtonClick={close}
            buttons={[
                <Button onClick={close} variant={ButtonVariant.Primary} key="done">
                    {t('BB-StepHeader-view-progress-flyout-close-button', 'Done')}
                </Button>
            ]}
        >
            <ApplicationSteps/>
        </FlyoutContent>
    )

    return (
        <Col id="stepHeaderContainer" gridGap={5} padding='S300' style={{ background: `${CommonColors.Blue05}` }}>
            <Text>{jobTitle}</Text>
            <WithFlyout renderFlyout={renderFlyout}>
                {( { open } ) => (
                    <Col alignItems='flex-end'>
                        <Text
                            fontSize='T100'
                            color={CommonColors.Blue70}
                            style={{ cursor: 'pointer' }}
                            onClick={() => open()}
                            fontWeight='medium'
                        >
                            {t('BB-StepHeader-view-progress-button', 'View progress')}
                        </Text>
                    </Col>
                )}
            </WithFlyout>
            <Text fontSize='T100'>{`${step.stepNumber}. ${t(step.titleTranslationKey, step.title)}`}</Text>
        </Col>
    )
}

export default StepHeader;
