import React, { ChangeEvent, useEffect } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import {
    RenderNativeOptionFunction,
    RenderOptionFunction,
    ValueAccessor
} from "@amzn/stencil-react-components/form";
import PreviousLegalNameForm from "../../common/bgc/PreviousLegalNameForm";
import {
    AdditionalBGCFormConfigPart1,
    AdditionalBGCFormConfigPart2,
    MXCountrySelectOptions,
    MXCRUPValue,
    MXIdNumberBgcFormConfig
} from "../../../utils/constants/common";
import { AppConfig, FormInputItem, i18nSelectOption, StateSelectOption } from "../../../utils/types/common";
import FormInputText from "../../common/FormInputText";
import DatePicker from "../../common/formDatePicker/DatePicker";
import FormInputSelect from "../../common/FormInputSelect";
import PreviousWorkedAtAmazonForm from "../../common/bgc/PreviousWorkedAtAmazonForm";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
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
import { handleMXSubmitAdditionalBgc, isDOBOverEighteen } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import {boundResetBannerMessage} from "../../../actions/UiActions/boundUi";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import DebouncedButton from "../../common/DebouncedButton";
import omit from "lodash/omit";

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

export const AdditionalBGCInfo = (props: AdditionalBGCInfoMergedProps) => {
    const { candidate, application, bgc, schedule, job, appConfig } = props;
    const { candidatePatchRequest, formError } = candidate;
    const { candidateData } = candidate.results;
    const { scheduleDetail } = schedule.results;
    const { stepConfig } = bgc;
    const applicationData = application.results;
    const additionalBgc = candidateData?.additionalBackgroundInfo || {};
    const pageName = METRIC_NAME.ADDITIONAL_BGC_INFO;

    let countryDefaultValue = get(candidateData, 'additionalBackgroundInfo.address.country');
    let nationIdTypeDefaultValue = get(candidateData, 'additionalBackgroundInfo.governmentIdType');
    let stateIdTypeDefaultValue = get(candidateData, 'additionalBackgroundInfo.address.state');

    // TODO: customized based on country
    if (!countryDefaultValue){
        countryDefaultValue = MXCountrySelectOptions[0].value
        set(additionalBgc, 'address.country', countryDefaultValue)
        set(additionalBgc, 'address.countryCode', MXCountrySelectOptions[0].countryCode)
    }

    if (!nationIdTypeDefaultValue){
        nationIdTypeDefaultValue = MXCRUPValue;
        set(additionalBgc, 'governmentIdType', nationIdTypeDefaultValue)
    }

    useEffect(() => {
        // For consistence, we use idNumber + governmentIdType rather than primaryNationalId field.
        // Since we don't maintain primaryNationalId field, we don't send candidate's primaryNationalId to backend.
        boundSetCandidatePatchRequest({
            additionalBackgroundInfo: omit(additionalBgc, ['primaryNationalId'])
        });

        return () => {
            boundSetCandidatePatchRequest({});
            boundUpdateCandidateInfoError({});
        }
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
        }
    }, [pageName]);


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
        const value = event.target.value || '';
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, formItem.dataKey, value.trim());
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleDatePickerInput = (value: string, datePickerItem: FormInputItem) => {
        datePickerItem.edited = true;
        const trimmedValue = value ? value.trim() : value;
        const newCandidate  = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, datePickerItem.dataKey, trimmedValue);
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
        boundResetBannerMessage();
        if(candidatePatchRequest && candidateData && applicationData) {
            handleMXSubmitAdditionalBgc(candidateData, applicationData, candidatePatchRequest, formError, stepConfig);
        }
    }

    return (
        <Col>
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
                    selectOptions: MXCountrySelectOptions,
                    labelTranslationKey: 'BB-BGC-Additional-bgc-form-country-label-text',
                    errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-country-error-text',
                }}
                defaultValue={MXCountrySelectOptions.find(option => option.value === countryDefaultValue)}
                handleChange={(option: i18nSelectOption) => {
                    SetNewCandidatePatchRequest([
                        { value: option.value, dataKey: 'additionalBackgroundInfo.address.country' }
                    ])
                }}
            />
            <FormInputText
                inputItem={{
                    ...MXIdNumberBgcFormConfig,
                    hasError: get(formError, MXIdNumberBgcFormConfig.dataKey) || false,
                }}
                defaultValue={get(candidateData, 'additionalBackgroundInfo.idNumber') || ''}
                inputValue={get(candidatePatchRequest, 'additionalBackgroundInfo.idNumber') || ''}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value || '';
                    SetNewCandidatePatchRequest([{ value: value.trim(), dataKey: 'additionalBackgroundInfo.idNumber'}])
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
                    )
                })
            }
            <PreviousWorkedAtAmazonForm/>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <DebouncedButton
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                >
                    {t('BB-BGC-addition-bgc-form-next-btn','Next')}
                </DebouncedButton>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(AdditionalBGCInfo);
