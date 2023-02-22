import React from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Col, Flex } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { CommonColors } from "../../utils/colors";
import { translate as t } from "../../utils/translator";
import { ApplicationStep } from "../../utils/types/common";
import ApplicationSteps from "./ApplicationSteps";
import { ApplicationStepListMap } from "../../utils/constants/common";
import { CountryCode } from "../../utils/enums/common";

interface StepHeaderProps {
  jobTitle: string;
  step: ApplicationStep;
  steps?: ApplicationStep[]; // This is to allow overwriting the default steps per country
}
export const StepHeader = (props: StepHeaderProps) => {

  const { jobTitle, step, steps = ApplicationStepListMap[CountryCode.US] } = props;
  const stepTitles = steps?.map(item => item.title );
  const stepNumber = (stepTitles.indexOf(step.title)) + 1 ;

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-StepHeader-view-progress-flyout-title", "View progress")}
      onCloseButtonClick={close}
      buttons={[
        <Button onClick={close} variant={ButtonVariant.Primary} key="done">
          {t("BB-StepHeader-view-progress-flyout-close-button", "Done")}
        </Button>
      ]}
    >
      <ApplicationSteps steps={steps} />
    </FlyoutContent>
  );

  return (
    <Col id="stepHeaderContainer" gridGap={5} padding="S300" style={{ background: `${CommonColors.Blue05}` }}>
      <Text>{jobTitle}</Text>

      <Flex flexDirection="row" gridGap="S300" justifyContent="space-between">
        <Text fontSize="T100">{`${stepNumber}. ${t(step.titleTranslationKey, step.title)}`}</Text>
        <WithFlyout renderFlyout={renderFlyout}>
          {({ open }) => (
            <Col alignItems="flex-end">
              <Text
                fontSize="T100"
                color={CommonColors.Blue70}
                style={{ cursor: "pointer" }}
                onClick={() => open()}
                fontWeight="medium"
              >
                {t("BB-StepHeader-view-progress-button", "View progress")}
              </Text>
            </Col>
          )}
        </WithFlyout>
      </Flex>
    </Col>
  );
};

export default StepHeader;
