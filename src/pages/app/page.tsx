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

  /********** Disable back button for HVHBB-Backlog-3812 ***********
   * This manipulates the browser history to disable the back button because
   * it can create unexpected results. It would be better to carefully manage
   * the browser state throughout but that is out of scope for now.
   */
  const query = queryString.parse(window.location.search);
  /* These conditions should capture all pages that are processing an application and
     thus unsafe to go "back" from */
  if (query.applicationId || window.location.hash.startsWith("#/app/")) {
    /* Rewrite the history with state `back: true` so the onpopstate event listener
       below will know whether to push another duplicate to the stack to avoid actually
       going back */
    window.history.pushState({ back: true }, window.document.title, window.location.href);
    window.history.pushState({ back: false }, window.document.title, window.location.href);
  }
  /* This looks for the back state and pushes a page duplicate onto the history stack
     so that hitting back will simply run this again each time */
  window.onpopstate = (event: PopStateEvent) => {
    if (event.state?.back) {
      window.history.pushState({ back: false }, window.document.title, window.location.href);
    }
  }
  /*****************************************************************/

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
