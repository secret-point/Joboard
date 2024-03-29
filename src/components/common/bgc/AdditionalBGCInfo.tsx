import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Label, Text } from "@amzn/stencil-react-components/text";
import {
  Checkbox,
  RenderNativeOptionFunction,
  RenderOptionFunction,
  ValueAccessor
} from "@amzn/stencil-react-components/form";
import { MessageBanner, MessageBannerType } from "@amzn/stencil-react-components/message-banner";
import CriminalRecordForm from "./CriminalRecordForm";
import PreviousLegalNameForm from "./PreviousLegalNameForm";
import {
  AdditionalBGCFormConfigPart1,
  AdditionalBGCFormConfigPart2,
  BusinessLineType,
  CountrySelectOptions,
  IdNumberBgcFormConfig,
  NationIdTypeSelectOptions,
  SocialSecurityNumberValue
} from "../../../utils/constants/common";
import {
  AdditionalBackgroundInfoRequest,
  AppConfig,
  BgcStepConfig,
  FormInputItem,
  i18nSelectOption,
  StateSelectOption
} from "../../../utils/types/common";
import FormInputText from "../FormInputText";
import DatePicker from "../formDatePicker/DatePicker";
import FormInputSelect from "../FormInputSelect";
import PreviousWorkedAtAmazonForm from "./PreviousWorkedAtAmazonForm";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import {
  boundSetCandidatePatchRequest,
  boundUpdateCandidateInfoError
} from "../../../actions/CandidateActions/boundCandidateActions";
import { ModalContent, WithModal } from "@amzn/stencil-react-components/modal";
import {
  handleSubmitAdditionalBgc,
  isDOBLessThan100,
  isDOBOverEighteen,
  shouldPrefillAdditionalBgcInfo
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { addMetricForPageLoad, postAdobeMetrics } from "../../../actions/AdobeActions/adobeActions";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import DebouncedButton from "../DebouncedButton";
import omit from "lodash/omit";

interface MapStateToProps {
  appConfig: AppConfig;
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  bgc: BGCState;
  candidate: CandidateState;
}

type AdditionalBGCInfoMergedProps = MapStateToProps;

export const AdditionalBGCInfo = (props: AdditionalBGCInfoMergedProps) => {
  const { candidate, application, bgc, schedule, job, appConfig } = props;
  const { candidatePatchRequest, formError } = candidate;
  const { candidateData } = candidate.results;
  const { scheduleDetail } = schedule.results;
  const stepConfig = bgc.stepConfig as BgcStepConfig;
  const applicationData = application.results;
  const additionalBgc: Partial<AdditionalBackgroundInfoRequest> = candidateData?.additionalBackgroundInfo || {};
  const pageName = METRIC_NAME.ADDITIONAL_BGC_INFO;

  let countryDefaultValue = get(candidateData, "additionalBackgroundInfo.address.country");
  let nationIdTypeDefaultValue = get(candidateData, "additionalBackgroundInfo.governmentIdType");
  let isWithoutSSNDefaultValue = get(candidateData, "additionalBackgroundInfo.isWithoutSSN");
  const stateIdTypeDefaultValue = get(candidateData, "additionalBackgroundInfo.address.state");

  const shouldDisplayNoSSNCheckbox = get(appConfig, "results.envConfig.featureList.NO_SSN_CHECKBOX.isAvailable") === true &&
      !get(candidateData, "additionalBackgroundInfo.idNumber") &&
      get(schedule, "results.scheduleDetail.businessLine") !== BusinessLineType.Air_Job &&
      get(job, "results.dspEnabled") === true;

  // TODO: customized based on country
  if (!countryDefaultValue) {
    countryDefaultValue = CountrySelectOptions[0].value;
    set(additionalBgc, "address.country", countryDefaultValue);
    set(additionalBgc, "address.countryCode", CountrySelectOptions[0].countryCode);
  }

  if (!nationIdTypeDefaultValue) {
    nationIdTypeDefaultValue = NationIdTypeSelectOptions[0].value;
    set(additionalBgc, "governmentIdType", nationIdTypeDefaultValue);
  }

  if (!isWithoutSSNDefaultValue || !shouldDisplayNoSSNCheckbox) {
    isWithoutSSNDefaultValue = false;
    set(additionalBgc, "isWithoutSSN", isWithoutSSNDefaultValue);
  }

  const [nationalIdType, setNationalIdType] = useState(nationIdTypeDefaultValue);
  const [isNoSSNChecked, setIsNoSSNChecked] = useState(isWithoutSSNDefaultValue);
  const [isNoSSNModalConsentChecked, setIsNoSSNModalConsentChecked] = useState(false);

  useEffect(() => {
    const patches = [{ value: isNoSSNChecked, dataKey: "additionalBackgroundInfo.isWithoutSSN" }];

    if (isNoSSNChecked) patches.push({ value: "", dataKey: "additionalBackgroundInfo.idNumber" });

    SetNewCandidatePatchRequest(patches);
  }, [isNoSSNChecked]);

  useEffect(() => {
    setupDefaultBgcInfoByCountry();

    return () => {
      boundSetCandidatePatchRequest({});
      boundUpdateCandidateInfoError({});
    };
  }, []);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && applicationData && candidateData && addMetricForPageLoad(pageName);
  }, [applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const setupDefaultBgcInfoByCountry = () => {
    // adding this logic to support multiple address for Canada.
    // If country is Canada (not United States ) we will no prefill additional bgc ingo
    const countryCode = additionalBgc?.address?.countryCode;
    const shouldPrefillBgcInfo = shouldPrefillAdditionalBgcInfo(countryCode);
    const defaultBgcInfo = shouldPrefillBgcInfo ? omit(additionalBgc, ["primaryNationalId"]) : {};

    // For consistence, we use idNumber + governmentIdType rather than primaryNationalId field.
    // Since we don't maintain primaryNationalId field, we don't send candidate's primaryNationalId to backend.
    boundSetCandidatePatchRequest({
      additionalBackgroundInfo: defaultBgcInfo
    });
  };

  const renderFormItem = ( formItem: FormInputItem ) => {
    const hasError = get(formError, formItem.dataKey) || false;
    formItem.hasError = hasError;

    const value = get(candidatePatchRequest, formItem.dataKey);

    // Validate Date of Birth if is over 18
    if (formItem.dataKey.includes("dateOfBirth") && !hasError && value) {
      const dob = get(candidatePatchRequest, formItem.dataKey);
      const isOver18 = isDOBOverEighteen(dob);
      const isDateOfBirthLessThan100 = isDOBLessThan100(dob);
      const legacyErrorMessage = formItem.errorMessage;
      const legacyErrorTranslationKey = formItem.errorMessageTranslationKey;

      if (!dob) {
        formItem.hasError = true;
        formItem.errorMessage = "Please enter your date of birth.";
        formItem.errorMessageTranslationKey = "BB-BGC-Additional-bgc-form-dob-empty-text";
      } else if (!isDateOfBirthLessThan100) {
        formItem.hasError = true;
        formItem.errorMessage = "Please enter a valid date of birth.";
        formItem.errorMessageTranslationKey = "BB-BGC-Additional-bgc-form-dob-error-text";
      } else if (!isOver18) {
        formItem.hasError = true;
        formItem.errorMessage = "You need to be above 18 years old.";
        formItem.errorMessageTranslationKey = "BB-BGC-Additional-bgc-form-dob-below18-error-text";
      } else {
        // Reset config to original value
        formItem.hasError = hasError;
        formItem.errorMessage = legacyErrorMessage;
        formItem.errorMessageTranslationKey = legacyErrorTranslationKey;
      }
    }

    switch (formItem.type) {
      case "text":
        return (
          <FormInputText
            inputItem={formItem}
            defaultValue={get(candidatePatchRequest, formItem.dataKey) || ""}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, formItem)}
          />
        );
      case "datePicker":
        return (
          <DatePicker
            inputItem={formItem}
            defaultValue={get(candidatePatchRequest, formItem.dataKey) || ""}
            handleChange={(value: string) => handleDatePickerInput(value, formItem)}
          />
        );

      case "select":
        let defaultValue: string;
        let handleChange: Function;
        let valueAccessor: ValueAccessor<StateSelectOption> | undefined = undefined;
        let renderNativeOptionFunction: RenderNativeOptionFunction | undefined = undefined;
        let renderOption: RenderOptionFunction | undefined = undefined;

        if (formItem.id.includes("additionalBGCState")) {
          defaultValue = formItem.selectOptions && formItem.selectOptions.find(state => state.value === stateIdTypeDefaultValue);
          valueAccessor = option => option.value;
          renderNativeOptionFunction = option => t(option.translationKey, option.displayValue);
          // eslint-disable-next-line
          renderOption = (option: StateSelectOption) => <Row>{t(option.translationKey, option.displayValue)}</Row>;

          handleChange = (option: any) => {
            SetNewCandidatePatchRequest([
              { value: option.value, dataKey: formItem.dataKey },
            ]);
          };
        } else {
          defaultValue = get(candidatePatchRequest, formItem.dataKey) || "";
          handleChange = (value: string) => handleSelectChange(value, formItem);
        }
        return (
          <FormInputSelect
            inputItem={formItem}
            defaultValue={defaultValue}
            handleChange={handleChange}
            valueAccessor={valueAccessor}
            renderNativeOption={renderNativeOptionFunction}
            renderOption={renderOption}
          />
        );

      default:
        return <></>;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, formItem: FormInputItem) => {
    formItem.edited = true;
    const value = event.target.value || "";
    const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
    set(newCandidate, formItem.dataKey, value.trim());
    boundSetCandidatePatchRequest(newCandidate);
  };

  const handleDatePickerInput = (value: string, datePickerItem: FormInputItem) => {
    datePickerItem.edited = true;
    const trimmedValue = value ? value.trim() : value;
    const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
    set(newCandidate, datePickerItem.dataKey, trimmedValue);
    boundSetCandidatePatchRequest(newCandidate);
  };

  const handleSelectChange = (value: string, selectItem: FormInputItem) => {
    selectItem.edited = true;
    const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
    set(newCandidate, selectItem.dataKey, value);
    boundSetCandidatePatchRequest(newCandidate);
  };

  // TODO: handleSelectChange, handleDatePickerInput, handleInputChange to be replaced by this function
  const SetNewCandidatePatchRequest = (patches: { dataKey: string; value: any }[]) => {
    const newCandidate = cloneDeep(candidatePatchRequest) || {};
    patches.forEach(patch => set(newCandidate, patch.dataKey, patch.value));
    boundSetCandidatePatchRequest(newCandidate);
  };

  const handleClickNext = () => {
    boundResetBannerMessage();
    if (candidatePatchRequest && candidateData && applicationData && scheduleDetail) {
      handleSubmitAdditionalBgc(candidateData, applicationData, candidatePatchRequest, formError, stepConfig);
    }
  };

  const renderModal = ({ close }: { close: () => void }) => (
    <ModalContent
      titleText=""
      buttons={[
        <Button
          key="cancel"
          onClick={() => {
            close();
            setIsNoSSNChecked(false);
            setIsNoSSNModalConsentChecked(false);
            postAdobeMetrics({ name: METRIC_NAME.NO_SSN_CANCEL });
          }}
          variant={ButtonVariant.Secondary}
        >
          {t("BB-BGC-no-ssn-modal-cancel-button", "Cancel")}
        </Button>,
        <Button
          key="continue"
          onClick={() => {
            close();
            setIsNoSSNChecked(true);
            setIsNoSSNModalConsentChecked(false);
            postAdobeMetrics({ name: METRIC_NAME.NO_SSN_CONTINUE });
          }}
          variant={ButtonVariant.Primary}
          disabled={!isNoSSNModalConsentChecked}
        >
          {t("BB-BGC-no-ssn-modal-continue-button", "Continue")}
        </Button>
      ]}
    >
      <Col gridGap="S400">
        <H4>{t("BB-BGC-no-ssn-modal-title", "Are you sure you would like to proceed without a Social Security Number (SSN)?")}</H4>
        <MessageBanner type={MessageBannerType.Warning} icon={<></>}>
          {t("BB-BGC-no-ssn-modal-warning-banner", "If you have an SSN, you are required to provide it. Failing to do so can cause delays in the hiring process which may lead to missing your start date and losing your selected shift.")}
        </MessageBanner>
        <Text>
          {t("BB-BGC-no-ssn-modal-content-first-paragraph-v2", "By indicating that I don't have an SSN, I acknowledge that I won't be eligible for the Wisely Pay Card as a means of receiving my pay until I obtain an SSN, and will only be able to receive pay via direct deposit or physical checks. Additionally, I understand that, as allowed by law, Amazon will conduct a follow-up background check if I change or update my SSN during the onboarding process or during my employment.")}
        </Text>
        <Text>
          {t("BB-BGC-no-ssn-modal-content-second-paragraph", "I also acknowledge that any intentional misrepresentation of my SSN will be considered by Amazon, and can lead to revocation of my offer of employment or, if I am hired, termination of my employment.")}
        </Text>
        <Row alignItems="center" gridGap="S200">
          <Checkbox
            id="noSSNModalConsentBox"
            checked={isNoSSNModalConsentChecked}
            onChange={event => setIsNoSSNModalConsentChecked(event.target.checked)}
          />
          <Label htmlFor="noSSNModalConsentBox">
            {t("BB-BGC-no-ssn-modal-consent-checkbox", "I have read and understood the above terms.")}
          </Label>
        </Row>
      </Col>
    </ModalContent>
  );

  return (
    <Col>
      <H4>
        {t("BB-bgc-additional-bgc-form-header-text", "Additional Background Information")}
      </H4>
      <CriminalRecordForm />
      <PreviousLegalNameForm />
      {
        AdditionalBGCFormConfigPart1.map(config => {
          return (
            <Col key={config.labelText} gridGap={15}>
              {
                renderFormItem(config)
              }
            </Col>
          );
        })
      }
      <FormInputSelect
        inputItem={{
          labelText: "Country",
          hasError: false,
          errorMessage: "Please enter a valid country",
          required: true,
          name: "Country",
          dataKey: "additionalBackgroundInfo.address.country",
          id: "additionalBGC_Country",
          type: "select",
          selectOptions: CountrySelectOptions,
          labelTranslationKey: "BB-BGC-Additional-bgc-form-country-label-text",
          errorMessageTranslationKey: "BB-BGC-Additional-bgc-form-country-error-text",
        }}
        defaultValue={CountrySelectOptions.find(option => option.value === countryDefaultValue)}
        handleChange={(option: i18nSelectOption) => {
          SetNewCandidatePatchRequest([
            { value: option.value, dataKey: "additionalBackgroundInfo.address.country" }
          ]);
        }}
      />
      <FormInputSelect
        inputItem={{
          labelText: "National ID",
          hasError: false,
          errorMessage: "Please enter a valid National ID Type",
          required: true,
          name: "National ID Type",
          dataKey: "additionalBackgroundInfo.governmentIdType",
          id: "additionalBGC_IdNumber",
          type: "select",
          selectOptions: NationIdTypeSelectOptions,
          labelTranslationKey: "BB-BGC-Additional-bgc-form-national-id-type-label-text-revise",
          errorMessageTranslationKey: "BB-BGC-Additional-bgc-form-national-id-type-error-text",
          placeholderTranslationKey: "BB-BGC-Additional-bgc-form-country-national-id-type-text"
        }}
        defaultValue={NationIdTypeSelectOptions.find(option => option.value === nationIdTypeDefaultValue)}
        handleChange={(option: i18nSelectOption) => {
          SetNewCandidatePatchRequest([{ value: option.value, dataKey: "additionalBackgroundInfo.governmentIdType" }]);
          setNationalIdType(option.value);

          if (option.value !== SocialSecurityNumberValue) setIsNoSSNChecked(false);
        }}
      />
      {
        nationalIdType === SocialSecurityNumberValue &&
            shouldDisplayNoSSNCheckbox && (
          <>
            <MessageBanner dataTestId="SSNExplanationBanner" type={MessageBannerType.Informational}>
              {t("BB-BGC-Additional-bgc-form-ssn-explanationBanner-banner", "In the United States, a Social Security Number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents, and temporary (working) residents.")}
            </MessageBanner>
            <Col className="formInputItem">
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
                      id="noSSNCheckbox"
                      checked={isNoSSNChecked}
                      onChange={(event) => {
                        if (event.target.checked) {
                          open();
                          return;
                        }

                        setIsNoSSNChecked(false);
                      }}
                    />
                    <Label htmlFor="noSSNCheckbox">
                      {t("BB-BGC-no-ssn-checkbox-label", "I do not have a Social Security Number")}
                    </Label>
                  </Row>
                )}
              </WithModal>
            </Col>
          </>
        )}
      <FormInputText
        inputItem={{
          ...IdNumberBgcFormConfig,
          hasError: (!isNoSSNChecked && get(formError, IdNumberBgcFormConfig.dataKey)) || false,
          ...(isNoSSNChecked && {
            placeholder: "Social Security Number not available",
            placeholderTranslationKey: "BB-BGC-no-ssn-national-id-number-disabled-placeholder"
          }),
        }}
        defaultValue={get(candidateData, "additionalBackgroundInfo.idNumber") || ""}
        inputValue={get(candidatePatchRequest, "additionalBackgroundInfo.idNumber") || ""}
        disabled={isNoSSNChecked}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value || "";
          SetNewCandidatePatchRequest([{ value: value.trim(), dataKey: "additionalBackgroundInfo.idNumber" }]);
        }}
      />
      {
        AdditionalBGCFormConfigPart2.map(config => {
          return (
            <Col key={config.labelText} gridGap={15}>
              {
                renderFormItem(config)
              }
            </Col>
          );
        })
      }
      <PreviousWorkedAtAmazonForm />
      <Col padding={{ top: "S300", bottom: "S300" }}>
        <DebouncedButton
          variant={ButtonVariant.Primary}
          onClick={handleClickNext}
        >
          {t("BB-BGC-addition-bgc-form-next-btn", "Next")}
        </DebouncedButton>
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(AdditionalBGCInfo);