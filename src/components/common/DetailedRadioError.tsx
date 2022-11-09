import React from "react";
import { Row } from "@amzn/stencil-react-components/layout";
import { CommonColors } from "../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { translate as t } from "../../utils/translator";

interface DetailedRadioErrorProps {
  errorMessage?: string,
  errorMessageTranslationKey?: string
}

const DetailedRadioError = (props: DetailedRadioErrorProps) => {
  const { errorMessage, errorMessageTranslationKey } = props;

  const renderErrorMessage = () => {
    if(errorMessageTranslationKey && errorMessage) {
      return t(errorMessageTranslationKey, errorMessage);
    }

    return t("BB-Detailed-button-error-text-message", "Please check the box to proceed.");
  }

  return (
    <Row padding="S300" backgroundColor={CommonColors.RED05}>
      <StatusIndicator
        messageText={renderErrorMessage()}
        status={Status.Negative}
        iconAriaHidden={true}
      />
    </Row>
  )
}

export default DetailedRadioError;