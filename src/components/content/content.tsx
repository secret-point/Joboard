import React from "react";
import { Col } from "@stencil-react/components/layout";
import {
  MessageBanner,
  MessageBannerType
} from "@stencil-react/components/message-banner";
import RendererContainer from "../../containers/renderer";
import StepsContentRendererContainer from "../../containers/steps-content-renderer";
import ModalContainer from "../../containers/modal/modal-container";

export type IContentProps = {
  hasResponseError: boolean;
  errorMessage?: string;
  isContentContainsSteps: boolean;
  isContentContainsModals: boolean;
};

const Content: React.FC<IContentProps> = ({
  hasResponseError,
  errorMessage,
  isContentContainsSteps,
  isContentContainsModals
}) => {
  return (
    <Col gridGap="m" padding="1.5rem">
      <Col gridGap={5}>
        {hasResponseError && (
          <Col gridGap={10}>
            <MessageBanner type={MessageBannerType.Error}>
              {errorMessage}
            </MessageBanner>
          </Col>
        )}
        <RendererContainer type="content" />
        {isContentContainsModals && <ModalContainer />}
      </Col>
    </Col>
  );
};

export default Content;
