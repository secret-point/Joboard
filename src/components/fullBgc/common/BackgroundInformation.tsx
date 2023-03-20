import React, { ChangeEvent, useState } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { ApplicationState } from "../../../reducers/application.reducer";
import { Checkbox } from "@amzn/stencil-react-components/form";
import { FullBgcState } from "../../../reducers/fullBgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { CountryCode, FULL_BGC_STEPS } from "../../../utils/enums/common";
import { goToNextFullBgcStep, getCountryCode } from "../../../utils/helper";
import { FormInputItem, FullBgcStepConfig } from "../../../utils/types/common";
import { CountryPhoneCodes, MXPhoneCodes, UKPhoneCodes, USPhoneCodes } from "../../../constants/countryPhoneCode";
import DebouncedButton from "../../common/DebouncedButton";
import FormInputTextBGC from "./formHelper/FormInputTextBgc";
import FormDatePickerBgc from "./formHelper/FormDatePickerBgc";
import FormPhoneNumberBgc from "./formHelper/FormPhoneNumberBgc";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
}

interface BackgroundInformationProps {}

type BackgroundInformationMergedProps = MapStateToProps & BackgroundInformationProps;

export const BGInformationConfig: FormInputItem[] = [
  {
    hasError: false,
    defaultValue: "",
    labelTranslationKey: "",
    labelText: "Legal first name",
    errorMessage: "Please enter your first name",
    errorMessageTranslationKey: "",
    placeholder: "This is what appears on your ID",
    placeholderTranslationKey: "",
    required: true,
    name: "bgInformationLegalFirstName",
    id: "bgInformationLegalFirstName",
    type: "text",
    dataKey: "bgInformationLegalFirstName",
  },
  {
    hasError: false,
    defaultValue: "",
    labelTranslationKey: "",
    labelText: "Legal middle name",
    errorMessage: "Please enter your middle name",
    errorMessageTranslationKey: "",
    placeholder: "This is what appears on your ID",
    placeholderTranslationKey: "",
    required: true,
    name: "bgInformationLegalMiddleName",
    id: "bgInformationLegalMiddleName",
    type: "text",
    dataKey: "bgInformationLegalMiddleName"
  },
  {
    labelText: "I do not have a middle name",
    defaultValue: "",
    name: "bgInformationNoMiddleName",
    id: "bgInformationNoMiddleName",
    type: "checkbox",
    dataKey: "bgInformationNoMiddleName"
  },
  {
    hasError: false,
    defaultValue: "",
    labelText: "Legal last name",
    labelTranslationKey: "",
    errorMessage: "Please enter your last name",
    errorMessageTranslationKey: "",
    placeholder: "This is what appears on your ID",
    placeholderTranslationKey: "",
    required: true,
    name: "bgInformationLegalLastName",
    id: "bgInformationLegalLastName",
    type: "text",
    dataKey: "bgInformationLegalLastName"
  },
  {
    hasError: false,
    defaultValue: "",
    labelText: "Date of birth",
    labelTranslationKey: "",
    errorMessage: "Please enter your date of birth",
    errorMessageTranslationKey: "",
    required: true,
    name: "bgInformationDob",
    id: "bgInformationDob",
    type: "datePicker",
    dataKey: "bgInformationDob"
  },
  {
    hasError: false,
    defaultValue: "",
    labelText: "Mobile number",
    labelTranslationKey: "",
    errorMessage: "Please enter valid phone number",
    errorMessageTranslationKey: "",
    required: true,
    name: "bgInformationPhoneNumber",
    id: "bgInformationPhoneNumber",
    type: "phoneNumber",
    dataKey: "bgInformationPhoneNumber"
  }
];

interface BgInfoField {
  id: string;
  error?: boolean;
  value: string;
};

const getCountryPhoneCodes = (countryCode: CountryCode): CountryPhoneCodes => {
  switch (countryCode) {
    case CountryCode.UK:
      return UKPhoneCodes;
    case CountryCode.MX:
      return MXPhoneCodes;
    case CountryCode.CA:
    case CountryCode.US:
    default:
      return USPhoneCodes;
  }
};

const getBgInfoInitialValue = (): BgInfoField[] => {
  return BGInformationConfig.map(cfg => ({
    id: cfg.id,
    value: cfg.defaultValue || "",
    error: !!cfg.hasError
  }));
};

export const BackgroundInformation = (
  props: BackgroundInformationMergedProps
) => {
  const { fullBgc } = props;
  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;
  const countryCode = getCountryCode();
  const countryPhoneCodes = getCountryPhoneCodes(countryCode);
  const [bgInfoFields, setBgInfoFields] = useState(() => getBgInfoInitialValue());

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>, fieldId: string) => {
    setBgInfoFields(bgInfoFields.map(bgInfo => {
      if (bgInfo.id === fieldId) {
        return ({ ...bgInfo, value: e.target.value });
      }
      return bgInfo;
    }));
  };

  const handleInputCheckboxChange = (isChecked: boolean, fieldId: string) => {
    setBgInfoFields(bgInfoFields.map(bgInfo => {
      if (bgInfo.id === fieldId) {
        return ({ ...bgInfo, value: isChecked ? "" : "true" });
      }
      return bgInfo;
    }));
  };

  const handleInputDateChange = (date: string, fieldId: string) => {
    setBgInfoFields(bgInfoFields.map(bgInfo => {
      if (bgInfo.id === fieldId) {
        return ({ ...bgInfo, value: date });
      }
      return bgInfo;
    }));
  };

  const handleChangePhoneNumber = (phoneNumber: string) => {
    setBgInfoFields(bgInfoFields.map(bgInfo => {
      if (bgInfo.id === "bgInformationPhoneNumber") {
        return ({ ...bgInfo, value: phoneNumber });
      }
      return bgInfo;
    }));
  };

  const handleClickNext = () => {
    goToNextFullBgcStep(
      stepConfig,
      FULL_BGC_STEPS.BACKGROUND_INFO,
      FULL_BGC_STEPS.ADDRESS_HISTORY
    );
  };

  const renderFormItem = (formItem: FormInputItem) => {
    const bgInfoField = bgInfoFields.filter(bgInfo => bgInfo.id === formItem.id)[0];
    formItem.hasError = bgInfoField.error;

    switch (formItem.type) {
      case "text":
        if (formItem.id === "bgInformationLegalMiddleName") {
          const isNoMiddleName = !!bgInfoFields.filter(bgInfo => bgInfo.id === "bgInformationNoMiddleName")[0].value;
          return (
            <FormInputTextBGC
              inputItem={formItem}
              defaultValue={bgInfoField.value}
              handleChange={((e: ChangeEvent<HTMLInputElement>) => handleInputTextChange(e, formItem.id))}
              disabled={isNoMiddleName}
              noMarginBottom
            />
          );
        }
        return (
          <FormInputTextBGC
            inputItem={formItem}
            defaultValue={bgInfoField.value}
            handleChange={((e: ChangeEvent<HTMLInputElement>) => handleInputTextChange(e, formItem.id))}
          />
        );
      case "checkbox":
        const isChecked = !!bgInfoField.value;
        return (
          <Row alignItems="center" gridGap="S200" margin={{ bottom: 10 }}>
            <Checkbox id={formItem.id} checked={isChecked} onChange={() => handleInputCheckboxChange(isChecked, formItem.id)} />
            <Label htmlFor={formItem.id}>{formItem.labelText}</Label>
          </Row>
        );
      case "datePicker":
        return (
          <FormDatePickerBgc
            inputItem={formItem}
            defaultValue={""}
            handleChange={(value: string) => {
              handleInputDateChange(value, formItem.id);
            }}
          />
        );

      case "phoneNumber":
        return (
          <FormPhoneNumberBgc
            countryCode={countryCode}
            countryPhoneCodes={countryPhoneCodes}
            formItem={formItem}
            changePhoneNumber={handleChangePhoneNumber}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Col className="background-information-container" gridGap={15}>
      <Col gridGap="S200" margin={{ top: 10 }}>
        {BGInformationConfig.map(config => {
          return (
            <Col key={config.labelText} gridGap={15}>
              {renderFormItem(config)}
            </Col>
          );
        })}
      </Col>
      <DebouncedButton
        variant={ButtonVariant.Secondary}
        onClick={handleClickNext}
      >
        Next
      </DebouncedButton>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(BackgroundInformation);
