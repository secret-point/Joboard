import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React from "react";
import { connect } from "react-redux";
import { redirectToDashboard } from "../../../helpers/utils";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
}

const NoAvailableShift = (props: MapStateToProps) => {
  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text fontSize="T400">
        {t("BB-no-available-shift-all-shifts-filled-text", "Currently all shifts have been filled.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-no-available-shift-return-dashboard-to-apply-text", "Please return to the dashboard to apply for other jobs.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-no-available-shift-return-to-dashboard", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(NoAvailableShift);
