import React from "react";
import { Col } from "@stencil-react/components/layout";
import {
  MessageBanner,
  MessageBannerType
} from "@stencil-react/components/message-banner";
import RendererContainer from "../../containers/renderer";

export type IContentProps = {
  hasResponseError: boolean;
  errorMessage?: string;
};

const Content: React.FC<IContentProps> = ({
  hasResponseError,
  errorMessage
}) => {
  return (
    <div>
      <Col gridGap={5}>
        {hasResponseError && (
          <Col gridGap={10}>
            <MessageBanner type={MessageBannerType.Error}>
              {errorMessage}
            </MessageBanner>
          </Col>
        )}
        <RendererContainer type="content" />
      </Col>
    </div>
  );
};

export default Content;
