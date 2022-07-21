import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React from "react";
import { connect } from "react-redux";
import { redirectToDashboard } from "../../../helpers/utils";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
}

const ApplicationIdNull = (props: MapStateToProps) => {
  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text fontSize="T400">
        {t("BB-application-id-null-title-text", "Application Error")}
      </Text>
      <Text fontSize="T200">
        {t("BB-application-id-null-description-text", "Something is wrong, please go to dashboard")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-application-id-null-return-to-dashboard-text", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ApplicationIdNull);
