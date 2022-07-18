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
    CountrySelectOptions,
    IdNumberBgcFormConfig,
    NationIdTypeSelectOptions,
    SocialSecurityNumberValue,
    BusinessLineType
} from "../../../utils/constants/common";
import {
    FormInputItem,
    i18nSelectOption,
    StateSelectOption,
    AppConfig
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
import { handleSubmitAdditionalBgc, isDOBOverEighteen } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
    appConfig: AppConfig,
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface AdditionalBGCInfoProps {

}

type AdditionalBGCInfoMergedProps = MapStateToProps & AdditionalBGCInfoProps;

const AdditionalBGCInfo = (props: AdditionalBGCInfoMergedProps) => {
    const { candidate, application, bgc, schedule, job, appConfig } = props;
    const { candidatePatchRequest, formError } = candidate;
    const { candidateData } = candidate.results
    const { stepConfig } = bgc;
    const applicationData = application.results;
    const additionalBgc = candidateData?.additionalBackgroundInfo || {};

    let countryDefaultValue = get(candidateData, 'additionalBackgroundInfo.address.country');
    let nationIdTypeDefaultValue = get(candidateData, 'additionalBackgroundInfo.governmentIdType');
    let isWithoutSSNDefaultValue = get(candidateData, 'additionalBackgroundInfo.isWithoutSSN');
    let stateIdTypeDefaultValue = get(candidateData, 'additionalBackgroundInfo.state');

    // TODO: customized based on country
    if (!countryDefaultValue){
        countryDefaultValue = CountrySelectOptions[0].value
        set(additionalBgc, 'address.country', countryDefaultValue)
        set(additionalBgc, 'address.countryCode', CountrySelectOptions[0].countryCode)
    }

    if (!nationIdTypeDefaultValue){
        nationIdTypeDefaultValue = NationIdTypeSelectOptions[0].value
        set(additionalBgc, 'governmentIdType', nationIdTypeDefaultValue)
    }

    if (!isWithoutSSNDefaultValue){
        isWithoutSSNDefaultValue = false
        set(additionalBgc, 'isWithoutSSN', isWithoutSSNDefaultValue)
    }

    const [nationalIdType, setNationalIdType] = useState(nationIdTypeDefaultValue);
    const [isNoSSNChecked, setIsNoSSNChecked] = useState(isWithoutSSNDefaultValue);
    const [isNoSSNModalConsentChecked, setIsNoSSNModalConsentChecked] = useState(false);

    useEffect(() => {
        const patches = [{value: isNoSSNChecked, dataKey: 'additionalBackgroundInfo.isWithoutSSN'}]

        if(isNoSSNChecked) patches.push({value: '', dataKey: 'additionalBackgroundInfo.idNumber'})

        SetNewCandidatePatchRequest(patches)
    }, [isNoSSNChecked])

    useEffect(() => {
        boundSetCandidatePatchRequest({additionalBackgroundInfo: additionalBgc});

        return () => {
            boundSetCandidatePatchRequest({});
            boundUpdateCandidateInfoError({});
        }
    }, [])

    const renderFormItem = ( formItem: FormInputItem ) => {
      const hasError = get(formError, formItem.dataKey) || false;
      formItem.hasError = hasError;

      const value = get(candidatePatchRequest, formItem.dataKey);

      //Validate Date of Birth if is over 18
      if (formItem.dataKey.includes("dateOfBirth") && !hasError && value) {
        const dob = get(candidatePatchRequest, formItem.dataKey);
        const isOver18 = isDOBOverEighteen(dob);
        const legacyErrorMessage = formItem.errorMessage;
        const legacyErrorTranslationKey = formItem.errorMessageTranslationKey;

        if (!isOver18) {
          formItem.hasError = true;
          formItem.errorMessage = "You need to be above 18 years old.";
          formItem.errorMessageTranslationKey = 'BB-BGC-Additional-bgc-form-dob-below18-error-text';
        }
        //Reset config to original value
        else {
          formItem.hasError = hasError;
          formItem.errorMessage = legacyErrorMessage;
          formItem.errorMessageTranslationKey = legacyErrorTranslationKey;
        }
      }

        switch(formItem.type) {
            case 'text':
                return <FormInputText
                    inputItem={formItem}
                    defaultValue={get(candidateData, formItem.dataKey) || ''}
                    handleChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e,  formItem)}
                />;
            case 'datePicker':
                return <DatePicker
                    inputItem={formItem}
                    defaultValue={get(candidateData, formItem.dataKey) || ''}
                    handleChange={(value: string) => handleDatePickerInput(value, formItem)}
                />

            case 'select':
              let defaultValue: string;
              let handleChange: Function;
              let valueAccessor: ValueAccessor<StateSelectOption> | undefined = undefined;
              let renderNativeOptionFunction: RenderNativeOptionFunction | undefined = undefined;
              let renderOption: RenderOptionFunction | undefined = undefined;

              if(formItem.id.includes("additionalBGCState")){
                defaultValue = formItem.selectOptions && formItem.selectOptions.find(state => state.value === stateIdTypeDefaultValue);
                valueAccessor = option => option.value;
                renderNativeOptionFunction = option => t(option.translationKey, option.displayValue);
                renderOption = (option: StateSelectOption) => <Row>{t(option.translationKey, option.displayValue)}</Row>;

                handleChange = (option: any) => {
                  SetNewCandidatePatchRequest([
                    { value: option.value, dataKey: formItem.dataKey },
                  ])
                }
              }
              else {
                defaultValue = get(candidateData, formItem.dataKey) || '';
                handleChange = (value: string) => handleSelectChange(value, formItem)
              }
                return <FormInputSelect
                    inputItem={formItem}
                    defaultValue={defaultValue}
                    handleChange={handleChange}
                    valueAccessor={valueAccessor}
                    renderNativeOption={renderNativeOptionFunction}
                    renderOption={renderOption}
                />

            default:
                return <></>;
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, formItem: FormInputItem) => {
        formItem.edited = true;
        const value = event.target.value;
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, formItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleDatePickerInput = (value: string, datePickerItem: FormInputItem) => {
        datePickerItem.edited = true;
        const newCandidate  = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, datePickerItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleSelectChange = (value: string, selectItem: FormInputItem) => {
        selectItem.edited = true;
        const newCandidate  = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, selectItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    // TODO: handleSelectChange, handleDatePickerInput, handleInputChange to be replaced by this function
    const SetNewCandidatePatchRequest = (patches: { dataKey: string, value: any }[]) => {
        const newCandidate  = cloneDeep(candidatePatchRequest) || {};
        patches.forEach(patch => set(newCandidate, patch.dataKey, patch.value));
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleClickNext = () => {
        if(candidatePatchRequest && candidateData && applicationData) {
            handleSubmitAdditionalBgc(candidateData, applicationData, candidatePatchRequest, formError, stepConfig);
        }
    }

    const renderModal = ({ close }: { close: () => void }) => (
        <ModalContent
            titleText=''
            buttons={[
                <Button onClick={() => { close(); setIsNoSSNChecked(false) }} variant={ButtonVariant.Secondary}>
                    {t('BB-BGC-no-ssn-modal-cancel-button', 'Cancel')}
                </Button>,
                <Button
                    onClick={() => { close(); setIsNoSSNChecked(true); }}
                    variant={ButtonVariant.Primary}
                    disabled={!isNoSSNModalConsentChecked}
                >
                    {t('BB-BGC-no-ssn-modal-continue-button', 'Continue')}
                </Button>
            ]}>
            <Col gridGap="S400">
                <H4>{t('BB-BGC-no-ssn-modal-title', 'Are you sure you would like to proceed without a Social Security Number (SSN)?')}</H4>
                <MessageBanner type={MessageBannerType.Warning} icon={<></>}>
                    {t('BB-BGC-no-ssn-modal-warning-banner', 'If you have a SSN, you are required to provide it. Failing to do so can cause delays in the hiring process which may lead to missing your start date and losing your selected shift.')}
                </MessageBanner>
                <Text>
                    {t('BB-BGC-no-ssn-modal-content-first-paragraph', 'By continuing, I am confirming that I do not have a SSN.  I understand that, as allowed by law, Amazon will conduct a follow-up background check about me if I change or update my SSN during the onboarding process or during my employment.')}
                </Text>
                <Text>
                    {t('BB-BGC-no-ssn-modal-content-second-paragraph', 'I also acknowledge that any intentional misrepresentation of my SSN will be considered by Amazon, and can lead to revocation of my offer of employment or, if I am hired, termination of my employment.')}
                </Text>
                <Row alignItems="center" gridGap="S200">
                    <Checkbox
                        id="noSSNModalConsentBox"
                        checked={isNoSSNModalConsentChecked}
                        onChange={event => setIsNoSSNModalConsentChecked(event.target.checked)}
                    />
                    <Label htmlFor="noSSNModalConsentBox">
                        {t('BB-BGC-no-ssn-modal-consent-checkbox', 'I have read and understood the above terms.')}
                    </Label>
                </Row>
            </Col>
        </ModalContent>
    );

    return (
        <Col>
            <H4>Additional Background Information</H4>
            <CriminalRecordForm/>
            <PreviousLegalNameForm/>
            {
                AdditionalBGCFormConfigPart1.map(config => {
                    return (
                        <Col key={config.labelText} gridGap={15}>
                            {
                                renderFormItem(config)
                            }
                        </Col>
                    )
                })
            }
            <FormInputSelect
                inputItem={{
                    labelText: 'Country',
                    hasError: false,
                    errorMessage: 'Please enter a valid country',
                    required: true,
                    name: 'Country',
                    dataKey: 'additionalBackgroundInfo.address.country',
                    id: 'additionalBGC_Country',
                    type: 'select',
                    selectOptions: CountrySelectOptions,
                    labelTranslationKey: 'BB-BGC-Additional-bgc-form-country-label-text',
                    errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-country-error-text',
                }}
                defaultValue={CountrySelectOptions.find(option => option.value === countryDefaultValue)}
                handleChange={(option: i18nSelectOption) => {
                    SetNewCandidatePatchRequest([
                        { value: option.value, dataKey: 'additionalBackgroundInfo.address.country' },
                        { value: option.countryCode || '', dataKey: 'additionalBackgroundInfo.address.countryCode' }
                    ])
                }}
            />
            <FormInputSelect
                inputItem={{
                    labelText: 'National ID',
                    hasError: false,
                    errorMessage: 'Please enter a valid National ID Type',
                    required: true,
                    name: 'National ID Type',
                    dataKey: 'additionalBackgroundInfo.governmentIdType',
                    id: 'additionalBGC_IdNumber',
                    type: 'select',
                    selectOptions: NationIdTypeSelectOptions,
                    labelTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-type-label-text-revise',
                    errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-type-error-text',
                    placeholderTranslationKey: 'BB-BGC-Additional-bgc-form-country-national-id-type-text'
                }}
                defaultValue={NationIdTypeSelectOptions.find(option => option.value === nationIdTypeDefaultValue)}
                handleChange={(option: i18nSelectOption) => {
                    SetNewCandidatePatchRequest([{value: option.value, dataKey: 'additionalBackgroundInfo.governmentIdType'}]);
                    setNationalIdType(option.value);

                    if (option.value !== SocialSecurityNumberValue) setIsNoSSNChecked(false);
                }}
            />
            {
                nationalIdType === SocialSecurityNumberValue &&
                get(appConfig, 'results.envConfig.featureList.NO_SSN_CHECKBOX.isAvailable') === true &&
                !get(candidateData, 'additionalBackgroundInfo.idNumber') &&
                get(schedule, 'results.scheduleDetail.data.businessLine') !== BusinessLineType.Air_Job &&
                get(job, 'results.data.dspEnabled') === true &&
                <>
                    <MessageBanner dataTestId="SSNExplanationBanner" type={MessageBannerType.Informational}>
                        {t('BB-BGC-Additional-bgc-form-ssn-explanationBanner-banner', 'In the United States, a Social Security number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents, and temporary (working) residents.')}
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
                                        {t('BB-BGC-no-ssn-checkbox-label', 'I do not have a Social Security Number')}
                                    </Label>
                                </Row>
                            )}
                        </WithModal>
                    </Col>
                </>
            }
            <FormInputText
                inputItem={{
                  ...IdNumberBgcFormConfig,
                  hasError: get(formError, IdNumberBgcFormConfig.dataKey) || false,
                    ...(isNoSSNChecked && {
                        placeholder: 'Social Security Number not available',
                        placeholderTranslationKey: 'BB-BGC-no-ssn-national-id-number-disabled-placeholder'
                    }),
                }}
                defaultValue={get(candidateData, 'additionalBackgroundInfo.idNumber') || ''}
                inputValue={get(candidatePatchRequest, 'additionalBackgroundInfo.idNumber') || ''}
                disabled={isNoSSNChecked}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => SetNewCandidatePatchRequest([{ value: e.target.value, dataKey: 'additionalBackgroundInfo.idNumber'}])}
            />
            {
                AdditionalBGCFormConfigPart2.map(config => {
                    return (
                        <Col key={config.labelText} gridGap={15}>
                            {
                                renderFormItem(config)
                            }
                        </Col>
                    )
                })
            }
            <PreviousWorkedAtAmazonForm/>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                >
                    {t('BB-BGC-addition-bgc-form-next-btn','Next')}
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(AdditionalBGCInfo);
