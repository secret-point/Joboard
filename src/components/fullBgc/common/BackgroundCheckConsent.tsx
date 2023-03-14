import React, { useState } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text, Label, H4 } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { ApplicationState } from "../../../reducers/application.reducer";
import { FullBgcState } from "../../../reducers/fullBgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { FULL_BGC_STEPS } from "../../../utils/enums/common";
import { goToNextFullBgcStep } from "../../../utils/helper";
import { FullBgcStepConfig } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import { Input, InputWrapper, Checkbox } from "@amzn/stencil-react-components/form";
import { translate as t } from "../../../utils/translator";
import { validateName } from "../../../utils/helper";
import { ModalContent, WithModal } from "@amzn/stencil-react-components/modal";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
}

type BackgroundCheckConsentMergedProps = MapStateToProps;

export const BackgroundCheckConsent = ( props: BackgroundCheckConsentMergedProps ) => {
  const { fullBgc } = props;
  const [eSignature, setESignature] = useState("");
  const [isSignatureValid, setIsSignatureValid] = useState(true);
  const [declineConsent, setDeclineConsent] = useState(false);

  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;

  const handleClickNext = () => {
    const isFullNameValid = validateName(eSignature);

    if (!isFullNameValid) {
      setIsSignatureValid(false);
      return;
    }

    goToNextFullBgcStep(stepConfig, FULL_BGC_STEPS.CONSENT, FULL_BGC_STEPS.BACKGROUND_INFO);
  };

  return (
    <Col className="bgc-consent-container" gridGap={15}>
      <Text fontSize="T200" className="required-asterisk">
        {t("BB-Full-BGC-consent-bgc-label", "Consent to background check")}
      </Text>
      <InputWrapper
        labelText={`${t("BB-Full-BGC-consent-full-name-esignature", "Type full name as eSignature")}`}
        id="bgc-consent-esignature"
        required
        error={!isSignatureValid}
        footer={!isSignatureValid ? t("BB-Full-BGC-authorization-esignature-input-error-text", "Please enter a valid full name following format: First Last") : undefined}
        renderLabel={() => (
          <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
            <Text fontSize="T200">
              {`${t("BB-Full-BGC-acknowledgement-and-authorization-esignature-input-label-text", "I consent")}`}
            </Text>
          </Row>
        )}
      >
        {inputProps => (
          <Input
            {...inputProps}
            placeholder={`${t("BB-Full-BGC-consent-full-name-esignature", "Type full name as eSignature")}`}
            value={eSignature}
            onChange={( e ) => {
              const value = e.target.value || "";
              setESignature(value);
            }}
          />
        )}
      </InputWrapper>
      <Row alignItems="center" gridGap="S200">
        <WithModal
          renderModal={renderModal}
          shouldCloseOnClickOutside={false}
        >
          {({ open }) => (
            <Row
              alignItems="center"
              gridGap={8}
            >
              <Checkbox
                id="declineAndWithdrawApplicationBox"
                checked={declineConsent}
                onChange={event => {
                  if (event.target.checked) {
                    open();
                    return;
                  }
                  setDeclineConsent(event.target.checked);
                }
                }
              />
              <Label htmlFor="declineAndWithdrawApplicationBox">
                {t("BB-Full-BGC-decline-application-consent-checkbox", "I decline, and withdraw my application")}
              </Label>
            </Row>
          )}
        </WithModal>
      </Row>
      <DebouncedButton variant={ButtonVariant.Secondary} onClick={handleClickNext}>
        {t("BB-Full-BGC-next-btn-label", "Next")}
      </DebouncedButton>
    </Col>
  );
};

const renderModal = ({ close }: { close: () => void }) => (
  <ModalContent
    titleText=""
  >
    <Col gridGap="S400">
      <H4>{t("BB-Full-BGC-withdraw-application-title", "Are you sure you want to withdraw your application?")}</H4>
      <Text>
        {t("BB-Full-BGC-decline-bgc-explanation", "If you decline a background check you are no longer eligible for this position.")}
      </Text>
      <DebouncedButton variant={ButtonVariant.Secondary}>
        {t("BB-Full-BGC-decline-bgc-modal-btn-label", "Decline and withdraw application")}
      
      </DebouncedButton>
      <DebouncedButton variant={ButtonVariant.Primary} onClick={close}>
        {t("BB-Full-BGC-cancel-bgc-modal-btn-label", "Cancel")}
      </DebouncedButton>
    </Col>
  </ModalContent>
);

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(BackgroundCheckConsent);
