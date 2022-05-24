import React from "react"
import { connect } from "react-redux";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { CommonColors } from "../../../utils/colors";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { CONSENT } from "../../pageRoutes";

interface MapStateToProps {

}

const PreConsent = ( props: MapStateToProps ) => {

    const onGoNextPage = () => {
        routeToAppPageWithPath(CONSENT)
    }

    return (
        <Col gridGap={8} padding={{ top: 'S100', bottom: 'S400' }}>
            {/*{showShiftHoldingMessageBanner && <ContentMessageBanner />}*/}
            <Col gridGap={20} backgroundColor={CommonColors.Neutral90} padding='S600'>
                <Text
                    data-testid="text-pre-consent-page-title"
                    id="pre-consent-page-title"
                    color={CommonColors.White}
                    fontSize='T400'
                >
                    {t("BB-PreConsentPage-banner-journey-starts", "Your journey to becoming an Amazon Associate starts here.")}
                </Text>
                <Button variant={ButtonVariant.Secondary} style={{ width: '35%' }}>
                    Preview Steps
                </Button>
                <img
                    id="preConsentImg"
                    aria-hidden="true"
                    role="presentation"
                    tabIndex={-1}
                    placeholder="header"
                    src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/illustration-box.svg"
                />
            </Col>
            <Col alignItems="center" padding={{ top: 'S400' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    style={{ width: '90%', margin: "auto" }}
                    onClick={onGoNextPage}>
                    Next
                </Button>
            </Col>
        </Col>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(PreConsent);
