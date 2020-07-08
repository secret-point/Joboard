import React, { useEffect } from "react";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@stencil-react/components/responsive";
import { Col, Row } from "@stencil-react/components/layout";
import { Text } from "@stencil-react/components/text";
import { connect } from "react-redux";
import { onShowNavbar } from "../../actions/actions";
import { IconClock } from "@stencil-react/components/icons";
import { Button } from "@stencil-react/components/button";

interface Error403PageProps {
  onShowNavbar: Function;
  appConfig: any;
}

const TimeoutPage: React.FC<Error403PageProps> = ({
  onShowNavbar,
  appConfig
}) => {
  useEffect(() => {
    onShowNavbar();
  }, [onShowNavbar]);

  const onClick = () => {
    window.location.assign(appConfig.dashboardUrl);
  };

  return (
    <StencilResponsiveConsumer sizes={[VIEWPORT_SIZES.S]}>
      {({ matches }) => (
        <div data-testid="page">
          <Col gridGap="m" padding="l">
            <Text fontSize="m">
              <Row gridGap={4} alignItems="center">
                <IconClock color="warning" title="Session Expired" />
                <Col>Session Expired</Col>
              </Row>
            </Text>
            <Text fontSize="xs">
              Due to inactivity, you are session is expired, Please return to
              dashboard and resume the application.
            </Text>
            <Button primary onClick={onClick}>
              Return to dashboard
            </Button>
          </Col>
        </div>
      )}
    </StencilResponsiveConsumer>
  );
};

const actions = {
  onShowNavbar
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    appConfig: state.app.appConfig
  };
};

export default connect(mapStateToProps, actions)(TimeoutPage);
