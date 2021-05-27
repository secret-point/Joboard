import React, { Children, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Text } from "@amzn/stencil-react-components/text";

import { PageContainer } from "@amzn/stencil-react-components/page";
import { Col } from "@amzn/stencil-react-components/layout";
import { MainWithSkipLink } from "@amzn/stencil-react-components/a11y";
import { DsPageHeader } from "../components/DsPageHeader";
import { Button } from "@amzn/stencil-react-components/button";
import { BackToTopButton } from "@amzn/stencil-react-components/back-to-top-button";

// the props supported on the <DragonStoneApp/> component
type Props = {};

// the URL query parameters
type QueryParams = {
  jobId: string;
  scheduleId?: string;
};
const LandingPage: React.FunctionComponent<Props> = () => {

  /* TODO: Move this to a page navigation util */
  const location = useLocation<QueryParams>();
  const history = useHistory();
  const linkToConsentPage = useCallback(
    () => history.push("/ds/consent" + location.search),
    [history]
  );

  return (
    <Col gridGap="n" padding="n">
      <DsPageHeader />

      <PageContainer
        data-testid="layout"
        paddingTop={0}
        paddingBottom={0}
        paddingHorizontal={0}
      >
        <MainWithSkipLink>
          {/* TODO: Get banner back in
          {showShiftHoldingMessageBanner && <ContentMessageBanner />} */}
          <Col gridGap="m" backgroundColor="#232f3e" padding="l">
            <Text
              data-testid="text-pre-consent-page-title"
              fontSize="24px"
              color="#FFF"
              textAlign="left"
              id="pre-consent-page-title"
              padding="m"
              fontWeight="regular"
            >
              Your journey to becoming an Amazon Associate starts here.
            </Text>
            <Button secondary alignSelf="flex-start">
              Preview Steps
            </Button>
            <img
              id="foo"
              style={{ alignSelf: "flex-end" }}
              width="128px"
              height="128px"
              aria-hidden="true"
              role="presentation"
              tabIndex={-1}
              placeholder="header"
              src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/illustration-box.svg"
            />
          </Col>
          <Col gridGap="m" alignItems="center" padding="1.5rem">
            <Button primary width="100%" onClick={linkToConsentPage}>
              Next
            </Button>
          </Col>
          <BackToTopButton bottom="75px" right="5vw" />
        </MainWithSkipLink>
      </PageContainer>
    </Col>
  );
};

export default LandingPage;
