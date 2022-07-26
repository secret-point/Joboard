import React from "react";
import { Row } from "@amzn/stencil-react-components/layout";
import { CommonColors } from "../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { translate as t } from "../../utils/translator";

const DetailedRadioError = () => {
  return (
    <Row padding="S300" backgroundColor={CommonColors.RED05}>
      <StatusIndicator
        messageText={t("BB-Detailed-button-error-text-message", "Please check the box to proceed.")}
        status={Status.Negative}
        iconAriaHidden={true}
      />
    </Row>
  )
}

export default DetailedRadioError;