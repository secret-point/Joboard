import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React from "react";
import { connect } from "react-redux";
import { redirectToDashboard } from "../../../helpers/utils";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
}

const CanNotOfferJob = (props: MapStateToProps) => {
  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text fontSize="T400">
        {t("BB-can-not-offer-job-title-text", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-can-not-offer-job-description-text", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-can-not-offer-job-return-to-dashboard-text", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CanNotOfferJob);
