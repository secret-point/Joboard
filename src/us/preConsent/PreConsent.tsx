import React, { useEffect } from "react"
import { connect } from "react-redux";
import queryString from "query-string";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../utils/translator";
import { PageContainer } from "@amzn/stencil-react-components/page";
import { Col } from "@amzn/stencil-react-components/layout";
import { MainWithSkipLink } from "@amzn/stencil-react-components/a11y";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";

interface MapStateToProps {

}

const PreConsent = (props: MapStateToProps) => {

  const onGoNextPage = () =>{

  }

  return (
    <Col gridGap="n" padding="n">

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
              id="pre-consent-page-title"
              style={{
                fontSize:"24px",
                color:"#FFF",
                textAlign:"left",
              }}

            >
              THIS is the testing branch for BB UI refactoring project, Please use gamma instead.
              <br />
              <br />
              {t("BB-PreConsentPage-banner-journey-starts", "Your journey to becoming an Amazon Associate starts here.")}
            </Text>
            <Button variant={ButtonVariant.Secondary} style={{alignSelf:"flex-start"}}>
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
            <Button variant={ButtonVariant.Primary} style={{width:"100%"}} onClick={onGoNextPage}>
              Next
            </Button>
          </Col>
        </MainWithSkipLink>
      </PageContainer>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
    return state;
};

export default connect(mapStateToProps)(PreConsent);
