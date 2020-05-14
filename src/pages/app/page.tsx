import React, { useEffect } from "react";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@stencil-react/components/responsive";
import HeaderContainer from "../../containers/header/header-container";
import { Col } from "@stencil-react/components/layout";
import ContentContainer from "../../containers/content/content-container";
import FooterContainer from "../../containers/footer/footer-container";
import { ModalProvider } from "@stencil-react/components/modal";
import isEmpty from "lodash/isEmpty";

type IConsentPageProps = {
  currentPageId?: string;
  urlPageId?: string;
  onUpdatePageId: Function;
  pageOrder: any[];
  pageConfig: any;
};

const Page: React.FC<IConsentPageProps> = ({
  currentPageId,
  urlPageId,
  onUpdatePageId,
  pageOrder,
  pageConfig
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
          <ModalProvider>
            <HeaderContainer />
            <Col gridGap="m" padding="1.5rem">
              <ContentContainer />
            </Col>
            {!isEmpty(pageConfig?.footer) && (
              <Col backgroundColor="#EEF5F6" gridGap="m" padding="1.5rem">
                <FooterContainer />
              </Col>
            )}
          </ModalProvider>
        </div>
      )}
    </StencilResponsiveConsumer>
  );
};

export default Page;
