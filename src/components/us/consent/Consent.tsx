import React from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Text } from "@amzn/stencil-react-components/text";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_OPPORTUNITY } from "../../pageRoutes";

interface MapStateToProps {

}

interface RenderFlyoutFunctionParams {
    close: () => void;
}

const ConsentPage = ( props: MapStateToProps ) => {
    const renderFlyout = ( { close }: RenderFlyoutFunctionParams ) => (
        <FlyoutContent
            titleText="User Data Policy"
            onCloseButtonClick={close}
            buttons={[
                <Button onClick={close} variant={ButtonVariant.Primary}>
                    Done
                </Button>
            ]}
        >
            <h2>User Data Policy</h2>
        </FlyoutContent>
    )

    return (
        <Col gridGap="m" padding="n">
            <h1>By applying, you confirm that:</h1>
            <ul>
                <li>You are at least 18 years old.</li>
                <li>You have at least a high school diploma or equivalent.</li>
                <li>You are willing to submit a pre-employment drug test.</li>
            </ul>
            <dl>
                <Text textAlign="center" color="gray" fontSize="0.8em">By applying, you read and agree to the</Text>
                <WithFlyout renderFlyout={renderFlyout}>
                    {( { open } ) => (
                        <Button
                            variant={ButtonVariant.Tertiary}
                            style={{
                                margin: "0.5em 0",
                                width: "100%"
                            }}
                            onClick={() => open()}>User Data Policy</Button>
                    )}
                </WithFlyout>
                <Button
                    variant={ButtonVariant.Primary}
                    style={{ width: "100%" }}
                    onClick={() => {
                        routeToAppPageWithPath(JOB_OPPORTUNITY)
                    }}
                >
                    Create Application
                </Button>
            </dl>
        </Col>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ConsentPage);
