import React, { useEffect } from "react";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@amzn/stencil-react-components/responsive";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { onShowNavbar } from "../../actions/actions";
import { IconCrossCircle } from "@amzn/stencil-react-components/icons";
import { Button } from "@amzn/stencil-react-components/button";

interface Error403PageProps {
  onShowNavbar: Function;
  appConfig: any;
}

const Error403Page: React.FC<Error403PageProps> = ({
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
                <IconCrossCircle color="negative" title="Access Denied" />
                <Col>Access Denied</Col>
              </Row>
            </Text>
            <Text fontSize="xs">
              You are not authorized to view the information you requested.
            </Text>
            <Button data-testid="dashboard-button" primary onClick={onClick}>
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

export default connect(mapStateToProps, actions)(Error403Page);
