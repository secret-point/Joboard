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
import { useTranslation } from 'react-i18next';

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

  const { t: translate } = useTranslation();

  return (
    <StencilResponsiveConsumer sizes={[VIEWPORT_SIZES.S]}>
      {({ matches }) => (
        <div data-testid="page">
          <Col gridGap="m" padding="l">
            <Text fontSize="m">
              <Row gridGap={4} alignItems="center">
                <IconCrossCircle color="negative" title={translate("servicePages:error-403.title")} />
                <Col>{translate("servicePages:error-403.title")}</Col>
              </Row>
            </Text>
            <Text fontSize="xs">
              {translate('servicePages:error-403.description')}
            </Text>
            <Button data-testid="dashboard-button" primary onClick={onClick}>
              {translate('servicePages:return-to-dashboard')}
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
