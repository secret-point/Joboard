import React, { useEffect } from "react";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@stencil-react/components/responsive";
import HeaderContainer from "../../containers/header/header-container";
import { Col } from "@stencil-react/components/layout";
import ContentContainer from "../../containers/content/content-container";
import FooterContainer from "../../containers/footer/footer-container";

type IConsentPageProps = {
  currentPageId?: string;
  urlPageId?: string;
  onUpdatePageId: Function;
  pageOrder: any[];
};

const Page: React.FC<IConsentPageProps> = ({
  currentPageId,
  urlPageId,
  onUpdatePageId,
  pageOrder
}) => {
  useEffect(() => {
    if (urlPageId !== currentPageId) {
      onUpdatePageId({ updatedPageId: urlPageId, pageOrder });
    }
  }, [urlPageId, currentPageId, onUpdatePageId, pageOrder]);

  return (
    <StencilResponsiveConsumer sizes={[VIEWPORT_SIZES.S]}>
      {({ matches }) => (
        <div data-testid="page">
          <HeaderContainer />
          <Col gridGap="m" padding="1.5rem">
            <ContentContainer />
            <FooterContainer />
          </Col>
        </div>
      )}
    </StencilResponsiveConsumer>
  );
};

export default Page;
