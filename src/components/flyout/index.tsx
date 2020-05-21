import React from "react";
import {
  FlyoutButtonBar,
  FlyoutContainer,
  FlyoutContent,
  FlyoutHeader,
  FlyoutTitle,
  FlyoutCloseButton,
  WithFlyout
} from "@stencil-react/components/flyout";
import { Row } from "@stencil-react/components/layout";
import { Text } from "@stencil-react/components/text";
import { Button } from "@stencil-react/components/button";
import RendererContainer from "../../containers/renderer";
import Icon from "../icon";

interface IFlyOut {
  flyOut: any;
  onButtonClick: Function;
}

const FlyOut: React.FC<IFlyOut> = ({ flyOut, onButtonClick }) => {
  const renderFlyOut = ({ close }: { close: any }) => {
    const submit = () => {
      if (flyOut.submitButtonProps.actionProps) {
        const { actionProps } = flyOut.submitButtonProps;
        onButtonClick(actionProps.action, { options: actionProps.options });
      }
      close();
    };
    const cancel = () => {
      if (flyOut.closeButtonProps.actionProps) {
        const { actionProps } = flyOut.closeButtonProps;
        onButtonClick(actionProps.action, { options: actionProps.options });
      }
      close();
    };
    return (
      <FlyoutContainer>
        <FlyoutHeader alignItems="center" justifyContent="space-between">
          <FlyoutTitle>{flyOut.title}</FlyoutTitle>
          <FlyoutCloseButton onClick={close} />
        </FlyoutHeader>
        <FlyoutContent>
          <RendererContainer
            isConfigContainsFlyouts={true}
            flyOutId={flyOut.id}
            type={flyOut.placeholder || "content"}
            flyOutConfig={flyOut}
          />
        </FlyoutContent>
        <FlyoutButtonBar justifyContent="flex-end">
          {flyOut.closeButtonProps && (
            <Button onClick={cancel} tertiary>
              {flyOut.closeButtonProps.label || "Cancel"}
            </Button>
          )}
          {flyOut.submitButtonProps && (
            <Button onClick={submit} primary>
              {flyOut.submitButtonProps.label || "Submit"}
            </Button>
          )}
        </FlyoutButtonBar>
      </FlyoutContainer>
    );
  };
  return (
    <WithFlyout flyoutPosition={flyOut.position} renderFlyout={renderFlyOut}>
      {({ openFlyout }) => (
        <Button onClick={openFlyout} {...flyOut.buttonProps}>
          <Row gridGap={8} alignItems="center">
            {flyOut.buttonIconProps &&
              flyOut.buttonIconProps?.position === "left" && (
                <Icon icon={flyOut.buttonIconProps.icon} />
              )}
            <Text {...flyOut.buttonProps?.style}>{flyOut.buttonLabel}</Text>
            {flyOut.buttonIconProps &&
              flyOut.buttonIconProps?.position === "right" && (
                <Icon icon={flyOut.buttonIconProps.icon} />
              )}
          </Row>
        </Button>
      )}
    </WithFlyout>
  );
};

export default FlyOut;
