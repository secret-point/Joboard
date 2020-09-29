import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import {
  MessageBanner,
  MessageBannerType
} from "@amzn/stencil-react-components/message-banner";
import RendererContainer from "../../containers/renderer";

export type IContentProps = {
  hasResponseError: boolean;
  errorMessage?: string;
  isContentContainsSteps: boolean;
  isContentContainsModals: boolean;
};

const Content: React.FC<IContentProps> = ({
  hasResponseError,
  errorMessage
}) => {
  return (
    <Col gridGap="m" padding="1.5rem">
      <Col gridGap={5}>
        {hasResponseError && (
          <Col gridGap={10}>
            <MessageBanner
              type={MessageBannerType.Error}
              aria-live="assertive"
              iconAltText="error"
            >
              {errorMessage}
            </MessageBanner>
          </Col>
        )}
        <RendererContainer type="content" />
      </Col>
    </Col>
  );
};

export default Content;
