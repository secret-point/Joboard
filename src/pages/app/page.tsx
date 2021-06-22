import React, { useEffect } from "react";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@amzn/stencil-react-components/responsive";
import HeaderContainer from "../../containers/header/header-container";
import { Col } from "@amzn/stencil-react-components/layout";
import ContentContainer from "../../containers/content/content-container";
import FooterContainer from "../../containers/footer/footer-container";
import InitialLoaderContainer from "../../containers/initial-loader";
import StickyContentContainer from "../../containers/sticky-content";
import isEmpty from "lodash/isEmpty";
import queryString from "query-string";

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
    if (isEmpty(currentPageId)) {
      const page = window.localStorage.getItem("page");
      onUpdatePageId(page);
    }
  }, [urlPageId, currentPageId, onUpdatePageId, pageOrder]);

  return (
    <StencilResponsiveConsumer sizes={[VIEWPORT_SIZES.S]}>
      {({ matches }) => (
        <div data-testid="page">
          <InitialLoaderContainer />
          <HeaderContainer />
          <ContentContainer />
          {!isEmpty(pageConfig?.stickyContent?.components) && (
            <StickyContentContainer />
          )}
          {!isEmpty(pageConfig?.footer?.components) && (
            <Col backgroundColor="#EEF5F6" gridGap="m" padding="1.5rem">
              <FooterContainer />
            </Col>
          )}
        </div>
      )}
    </StencilResponsiveConsumer>
  );
};

export default Page;
