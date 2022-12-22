import { accentedChars, alphabet, alphanumeric, getCountryCode, getCountryConfig, getDesiredWorkHoursByCountryCode, specialChars } from "../../countryExpansionConfig";
import {
    APPLICATION_STEPS,
    BACKGROUND_AGENT,
    CountryCode,
    DAYS_OF_WEEK,
    DESIRED_WORK_HOURS,
    FCRA_DISCLOSURE_TYPE,
    INFO_CARD_STEP_STATUS,
    SCHEDULE_FILTER_TYPE,
    SELF_IDENTIFICATION_STEPS
} from "../enums/common";
import {
    AdditionalBgcConfig,
    ApplicationStep,
    DayHoursFilter,
    DetailedRadioButtonItem,
    DisabilityItem,
    FcraDisclosureConfig,
    FormInputItem,
    Locale,
    localeToLanguageItem,
    NonFcraESignatureAcknowledgement,
    ScheduleSortBy,
    ScheduleStateFilters,
    SelfIdentificationConfig,
    StateSelectOption,
    StateSpecificNotice
} from "../types/common";

export const HVH_LOCALE = 'hvh-locale';

export const ApplicationStepList: ApplicationStep[] = [
    {
        stepNumber: 1,
        title: APPLICATION_STEPS.SELECT_JOB,
        titleTranslationKey: 'BB-ApplicationSteps-select-job-text'
    },
    {
        title: APPLICATION_STEPS.COMPLETE_REQUIRED_DOCUMENTS,
        stepNumber: 2,
        titleTranslationKey: 'BB-ApplicationSteps-complete-required-document-text'
    },
    {
        stepNumber: 3,
        title: APPLICATION_STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT,
        titleTranslationKey: 'BB-ApplicationSteps-schedule-preHire-appt-text'
    }
]

export const ApplicationWithAssessmentStepList: ApplicationStep[] = [
    {
        title: APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT,
        stepNumber: 1,
        titleTranslationKey: 'BB-ApplicationSteps-complete-assessment-text'
    },
    {
        stepNumber: 2,
        title: APPLICATION_STEPS.SELECT_JOB,
        titleTranslationKey: 'BB-ApplicationSteps-select-job-text'
    },
    {
        title: APPLICATION_STEPS.COMPLETE_REQUIRED_DOCUMENTS,
        stepNumber: 3,
        titleTranslationKey: 'BB-ApplicationSteps-complete-required-document-text'
    },
    {
        stepNumber: 4,
        title: APPLICATION_STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT,
        titleTranslationKey: 'BB-ApplicationSteps-schedule-preHire-appt-text'
    }
]

export const StatesSelectOptions: StateSelectOption[] = [
    { displayValue: 'AL -- Alabama', value: 'Alabama', translationKey: 'BB-States-Alabama', code: 'AL' },
    { displayValue: 'AK -- Alaska', value: 'Alaska', translationKey: 'BB-States-Alaska', code: 'AK' },
    { displayValue: 'AZ -- Arizona', value: 'Arizona', translationKey: 'BB-States-Arizona', code: 'AZ' },
    { displayValue: 'AR -- Arkansas', value: 'Arkansas', translationKey: 'BB-States-Arkansas', code: 'AR' },
    { displayValue: 'CA -- California', value: 'California', translationKey: 'BB-States-California', code: 'CA' },
    { displayValue: 'CO -- Colorado', value: 'Colorado', translationKey: 'BB-States-Colorado', code: 'CO' },
    { displayValue: 'CT -- Connecticut', value: 'Connecticut', translationKey: 'BB-States-Connecticut', code: 'CT' },
    { displayValue: 'DE -- Delaware', value: 'Delaware', translationKey: 'BB-States-Delaware', code: 'DE' },
    { displayValue: 'DC -- District of Columbia', value: 'District of Columbia', translationKey: 'BB-States-District-of-Columbia', code: 'DC' },
    { displayValue: 'FL -- Florida', value: 'Florida', translationKey: 'BB-States-Florida', code: 'FL' },
    { displayValue: 'GA -- Georgia', value: 'Georgia', translationKey: 'BB-States-Georgia', code: 'GA' },
    { displayValue: 'HI -- Hawaii', value: 'Hawaii', translationKey: 'BB-States-Hawaii', code: 'HI' },
    { displayValue: 'ID -- Idaho', value: 'Idaho', translationKey: 'BB-States-Idaho', code: 'ID' },
    { displayValue: 'IL -- Illinois', value: 'Illinois', translationKey: 'BB-States-Illinois', code: 'IL' },
    { displayValue: 'IN -- Indiana', value: 'Indiana', translationKey: 'BB-States-Indiana', code: 'IN' },
    { displayValue: 'IA -- Iowa', value: 'Iowa', translationKey: 'BB-States-Iowa', code: 'IA' },
    { displayValue: 'KS -- Kansas', value: 'Kansas', translationKey: 'BB-States-Kansas', code: 'KS' },
    { displayValue: 'KY -- Kentucky', value: 'Kentucky', translationKey: 'BB-States-Kentucky', code: 'KY' },
    { displayValue: 'LA -- Louisiana', value: 'Louisiana', translationKey: 'BB-States-Louisiana', code: 'LA' },
    { displayValue: 'ME -- Maine', value: 'Maine', translationKey: 'BB-States-Maine', code: 'ME' },
    { displayValue: 'MD -- Maryland', value: 'Maryland', translationKey: 'BB-States-Maryland', code: 'MD' },
    { displayValue: 'MA -- Massachusetts', value: 'Massachusetts', translationKey: 'BB-States-Massachusetts', code: 'MA' },
    { displayValue: 'MI -- Michigan', value: 'Michigan', translationKey: 'BB-States-Michigan', code: 'MI' },
    { displayValue: 'MN -- Minnesota', value: 'Minnesota', translationKey: 'BB-States-Minnesota', code: 'MN' },
    { displayValue: 'MS -- Mississippi', value: 'Mississippi', translationKey: 'BB-States-Mississippi', code: 'MS' },
    { displayValue: 'MO -- Missouri', value: 'Missouri', translationKey: 'BB-States-Missouri', code: 'MO' },
    { displayValue: 'MT -- Montana', value: 'Montana', translationKey: 'BB-States-Montana', code: 'MT' },
    { displayValue: 'NE -- Nebraska', value: 'Nebraska', translationKey: 'BB-States-Nebraska', code: 'NE' },
    { displayValue: 'NV -- Nevada', value: 'Nevada', translationKey: 'BB-States-Nevada', code: 'NV' },
    { displayValue: 'NH -- New Hampshire', value: 'New Hampshire', translationKey: 'BB-States-New-Hampshire', code: 'NH' },
    { displayValue: 'NJ -- New Jersey', value: 'New Jersey', translationKey: 'BB-States-New-Jersey', code: 'NJ' },
    { displayValue: 'NM -- New Mexico', value: 'New Mexico', translationKey: 'BB-States-New-Mexico', code: 'NM' },
    { displayValue: 'NY -- New York', value: 'New York', translationKey: 'BB-States-New-York', code: 'NY' },
    { displayValue: 'NC -- North Carolina', value: 'North Carolina', translationKey: 'BB-States-North-Carolina', code: 'NC' },
    { displayValue: 'ND -- North Dakota', value: 'North Dakota', translationKey: 'BB-States-North-Dakota', code: 'ND' },
    { displayValue: 'OH -- Ohio', value: 'Ohio', translationKey: 'BB-States-Ohio', code: 'OH' },
    { displayValue: 'OK -- Oklahoma', value: 'Oklahoma', translationKey: 'BB-States-Oklahoma', code: 'OK' },
    { displayValue: 'OR -- Oregon', value: 'Oregon', translationKey: 'BB-States-Oregon', code: 'OR' },
    { displayValue: 'PA -- Pennsylvania', value: 'Pennsylvania', translationKey: 'BB-States-Pennsylvania', code: 'PA' },
    { displayValue: 'RI -- Rhode Island', value: 'Rhode Island', translationKey: 'BB-States-Rhode-Island', code: 'RI' },
    { displayValue: 'SC -- South Carolina', value: 'South Carolina', translationKey: 'BB-States-South-Carolina', code: 'SC' },
    { displayValue: 'SD -- South Dakota', value: 'South Dakota', translationKey: 'BB-States-South-Dakota', code: 'SD' },
    { displayValue: 'TN -- Tennessee', value: 'Tennessee', translationKey: 'BB-States-Tennessee', code: 'TN' },
    { displayValue: 'TX -- Texas', value: 'Texas', translationKey: 'BB-States-Texas', code: 'TX' },
    { displayValue: 'UT -- Utah', value: 'Utah', translationKey: 'BB-States-Utah', code: 'UT' },
    { displayValue: 'VT -- Vermont', value: 'Vermont', translationKey: 'BB-States-Vermont', code: 'VT' },
    { displayValue: 'VA -- Virginia', value: 'Virginia', translationKey: 'BB-States-Virginia', code: 'VA' },
    { displayValue: 'WA -- Washington', value: 'Washington', translationKey: 'BB-States-Washington', code: 'WA' },
    { displayValue: 'WV -- West Virginia', value: 'West Virginia', translationKey: 'BB-States-west-virginia', code: 'WV' },
    { displayValue: 'WI -- Wisconsin', value: 'Wisconsin', translationKey: 'BB-States-wisconsin', code: 'WI' },
    { displayValue: 'WY -- Wyoming', value: 'Wyoming', translationKey: 'BB-States-wyoming', code: 'WY' },
]

export const MXStatesSelectOptions: StateSelectOption[] = [
    { displayValue: 'AGU -- Aguascalientes', value: 'Aguascalientes', translationKey: 'BB-MX-States-AGU', code: 'AGU' },
    { displayValue: 'BCN -- Baja California', value: 'Baja California Norte', translationKey: 'BB-MX-States-BCN', code: 'BCN' },
    { displayValue: 'BCS -- Baja California Sur', value: 'Baja California Sur', translationKey: 'BB-MX-States-BCS', code: 'BCS' },
    { displayValue: 'CAM -- Campeche', value: 'Campeche', translationKey: 'BB-MX-States-CAM', code: 'CAM' },
    { displayValue: 'CHP -- Chiapas', value: 'Chiapas', translationKey: 'BB-MX-States-CHP', code: 'CHP' },
    { displayValue: 'CHH -- Chihuahua', value: 'Chihuahua', translationKey: 'BB-MX-States-CHH', code: 'CHH' },
    { displayValue: 'COA -- Coahuila', value: 'Coahuila', translationKey: 'BB-MX-States-COA', code: 'COA' },
    { displayValue: 'COL -- Colima', value: 'Colima', translationKey: 'BB-MX-States-COL', code: 'COL' },
    { displayValue: 'CMX -- Ciudad de México', value: 'Federal District', translationKey: 'BB-MX-States-CMX', code: 'CMX' },
    { displayValue: 'DUR -- Durango', value: 'Durango', translationKey: 'BB-MX-States-DUR', code: 'DUR' },
    { displayValue: 'MEX -- Estado de México', value: 'Estado de Mexico', translationKey: 'BB-MX-States-MEX', code: 'MEX' },
    { displayValue: 'GUA -- Guanajuato', value: 'Guanajuato', translationKey: 'BB-MX-States-GUA', code: 'GUA' },
    { displayValue: 'GRO -- Guerrero', value: 'Guerrero', translationKey: 'BB-MX-States-GRO', code: 'GRO' },
    { displayValue: 'HID -- Hidalgo', value: 'Hidalgo', translationKey: 'BB-MX-States-HID', code: 'HID' },
    { displayValue: 'JAL -- Jalisco', value: 'Jalisco', translationKey: 'BB-MX-States-JAL', code: 'JAL' },
    { displayValue: 'MIC -- Michoacán', value: 'Michoacan', translationKey: 'BB-MX-States-MIC', code: 'MIC' },
    { displayValue: 'MOR -- Morelos', value: 'Morelos', translationKey: 'BB-MX-States-MOR', code: 'MOR' },
    { displayValue: 'NAY -- Nayarit', value: 'Nayarit', translationKey: 'BB-MX-States-NAY', code: 'NAY' },
    { displayValue: 'NLE - Nuevo León', value: 'Nuevo León', translationKey: 'BB-MX-States-NLE', code: 'NLE' },
    { displayValue: 'OAX -- Oaxaca', value: 'Oaxaca', translationKey: 'BB-MX-States-OAX', code: 'OAX' },
    { displayValue: 'PUE -- Puebla', value: 'Puebla', translationKey: 'BB-MX-States-PUE', code: 'PUE' },
    { displayValue: 'QUE -- Querétaro', value: 'Queretaro', translationKey: 'BB-MX-States-QUE', code: 'QUE' },
    { displayValue: 'ROO -- Quintana Roo', value: 'Quintana Roo', translationKey: 'BB-MX-States-Roo', code: 'ROO' },
    { displayValue: 'SLP -- San Luis Potosí', value: 'San Luis Potosí', translationKey: 'BB-MX-States-SLP', code: 'SLP' },
    { displayValue: 'SIN -- Sinaloa', value: 'Sinaloa', translationKey: 'BB-MX-States-SIN', code: 'SIN' },
    { displayValue: 'SON -- Sonora', value: 'Sonora', translationKey: 'BB-MX-States-SON', code: 'SON' },
    { displayValue: 'TAB -- Tabasco', value: 'Tabasco', translationKey: 'BB-MX-States-TAB', code: 'TAB' },
    { displayValue: 'TAM -- Tamaulipas', value: 'Tamaulipas', translationKey: 'BB-MX-States-TAM', code: 'TAM' },
    { displayValue: 'TLA -- Tlaxcala', value: 'Tlaxcala', translationKey: 'BB-MX-States-TLA', code: 'TLA' },
    { displayValue: 'VER -- Veracruz', value: 'Veracruz', translationKey: 'BB-MX-States-VER', code: 'VER' },
    { displayValue: 'YUC -- Yucatán', value: 'Yucatan', translationKey: 'BB-MX-States-YUC', code: 'YUC' },
    { displayValue: 'ZAC -- Zacatecas', value: 'Zacatecas', translationKey: 'BB-MX-States-ZAC', code: 'ZAC' },
]

export const ScheduleSortList: ScheduleSortBy[] = [
    {
        title: "Pay rate - Highest to Lowest",
        value: SCHEDULE_FILTER_TYPE.PAY_RATE,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-pay-rate-high-to-least'
    },
    {
        title: "Hours - Most to Least",
        value: SCHEDULE_FILTER_TYPE.HOURS_DESC,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-hours-most-to-least'
    },
    {
        title: "Hours - Least to Most",
        value: SCHEDULE_FILTER_TYPE.HOURS_ASC,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-hours-least-to-most'
    }
]
export const CONSENT = "consent";
export const PRE_CONSENT = 'pre-consent';
export const JOB_OPPORTUNITIES = 'job-opportunities';
export const JOB_CONFIRMATION = 'job-opportunities/job-confirmation';
export const JOB_DESCRIPTION = 'job-opportunities/job-description';
export const CONTINGENT_OFFER = 'contingent-offer';

export const FcraDisclosureConfigList: FcraDisclosureConfig[] = [
    {
        title: 'I AUTHORIZE Amazon to conduct this background check.',
        value: FCRA_DISCLOSURE_TYPE.ACCEPT,
        titleTranslationKey: 'BB-BGC_fcra-disclosure-authorize-amazon-conduct-bgc-radio'
    },
    {
        title: 'I DECLINE to authorize Amazon this background check.',
        value: FCRA_DISCLOSURE_TYPE.DECLINE,
        titleTranslationKey: 'BB-BGC_fcra-disclosure-decline-amazon-conduct-bgc-radio'
    }
]

export const CriminalConvictionConfigList: AdditionalBgcConfig[] = [
    {
        title: 'Yes',
        value: true,
        dataKey: 'additionalBackgroundInfo.hasCriminalRecordWithinSevenYears',
        titleTranslationKey: 'BB-BGC-criminal-record-within-seven-years-answer-yes-text'
    },
    {
        title: 'NO',
        value: false,
        dataKey: 'additionalBackgroundInfo.hasCriminalRecordWithinSevenYears',
        titleTranslationKey: 'BB-BGC-criminal-record-within-seven-years-answer-no-text'
    }
]

export const NonFcraESignatureAcknowledgementList: NonFcraESignatureAcknowledgement[] = [
    {
        title: "The background check provider or \"CRA\", who will perform the background check is First Advantage, is located at 1 Concourse Parkway NE, Suite 200, Atlanta, GA 30328, and can be reached at (800) 845-6004 or www.fadv.com.",
        translationKey: 'BB-non-fcra-fadv-acknowledgement-item-one',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        title: "The background check provider or \"CRA\", who will perform the background check is Accurate Background, is located at 7515 Irvine Center Dr., Irvine, CA 92618, and can be reached at (800) 216-8024 or www.accuratebackground.com.\n\n* I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than Accurate Background.",
        translationKey: 'BB-non-fcra-accurate-acknowledgement-item-one',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: 'I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than Accurate Background.',
        translationKey: 'BB-non-fcra-accurate-acknowledgement-item-two',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: 'I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than First Advantage.',
        translationKey: 'BB-non-fcra-fadv-acknowledgement-item-two',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        title: "For employment purposes, and subject to all laws protecting my informational privacy, I also authorize the following to disclose to the CRAs any information needed for the background check: my past or present employers, schools, and law enforcement and other government agencies, including motor vehicle record  agencies.",
        translationKey: 'BB-non-fcra-accurate-acknowledgement-item-three',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: "For employment purposes, and subject to all laws protecting my informational privacy, I also authorize the following to disclose to the CRAs any information needed for the background check: my past or present employers, schools, and law enforcement and other government agencies, including motor vehicle record  agencies.",
        translationKey: 'BB-non-fcra-fadv-acknowledgement-item-three',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    }
]

export const US_StateSpecificNotices: StateSpecificNotice[] = [
    {
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (\"California Disclosure\"). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
        noticeTranslationKey: 'BB-non-fcra-accurate-california-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (\"California Disclosure\"). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
        noticeTranslationKey: 'BB-non-fcra-fadv-california-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>MINNESOTA: </b>You have the right to submit a written request to the CRA for a complete and accurate disclosure of the nature and scope of any consumer report that was ordered about you. The CRA must provide you with the disclosure within five business days after its receipt of your request or when the report was ordered, whichever date is later.</p>',
        noticeTranslationKey: 'BB-non-fcra-accurate-minnesota-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>MINNESOTA: </b>You have the right to submit a written request to the CRA for a complete and accurate disclosure of the nature and scope of any consumer report that was ordered about you. The CRA must provide you with the disclosure within five business days after its receipt of your request or when the report was ordered, whichever date is later.</p>',
        noticeTranslationKey: 'BB-non-fcra-fadv-minnesota-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>NEW YORK: </b>You have the right to submit a written request to Amazon to know if we ordered a consumer report or investigative consumer report about you. Shown above is the CRA’s address and telephone number. You have the right to contact any CRA to inspect or receive a copy of any such report. Click <a target="_blank" rel="noopener noreferrer" href="http://resources.accuratebackground.com/hubfs/New_York_Correction_Law_Article_23-A-1.pdf">here</a> for information about your rights under Article 23-A of the New York Correction Law.</p>',
        noticeTranslationKey: 'BB-non-fcra-accurate-newyork-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>NEW YORK: </b>You have the right to submit a written request to Amazon to know if we ordered a consumer report or investigative consumer report about you. Shown above is the CRA’s address and telephone number. You have the right to contact any CRA to inspect or receive a copy of any such report. Click <a target="_blank" rel="noopener noreferrer" href="https://fadv.com/Fadv-prod/media/Assets/FCRA%20page%20PDFs/NY_Correction_Law_Article_23-A.pdf">here</a> for information about your rights under Article 23-A of the New York Correction Law.</p>',
        noticeTranslationKey: 'BB-non-fcra-fadv-newyork-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>WASHINGTON: </b>You have the right to request from the consumer reporting agency a written summary of your rights under the Washington Fair Credit Reporting Act.</p>',
        noticeTranslationKey: 'BB-non-fcra-accurate-washington-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>WASHINGTON: </b>You have the right to request from the consumer reporting agency a written summary of your rights under the Washington Fair Credit Reporting Act.</p>',
        noticeTranslationKey: 'BB-non-fcra-fadv-washington-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>ALL STATES: </b>We will provide you with a free copy of any background check if you check this box</p>',
        noticeTranslationKey: 'BB-non-fcra-accurate-allstate-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>ALL STATES: </b>We will provide you with a free copy of any background check if you check this box</p>',
        noticeTranslationKey: 'BB-non-fcra-fadv-allstate-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    }
]

export const IdNumberBgcFormConfig: FormInputItem = {
    labelText: "National ID Number",
    dataKey: 'additionalBackgroundInfo.idNumber',
    required: true,
    type: 'text',
    regex: '^[0-9]{9}$',
    id: "idNumberInput",
    name: 'idNumber',
    errorMessage: 'Please enter a valid 9 digits social security number without dash',
    labelTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-number-label-text-revise',
    errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-number-error-text',
}

export const MXIdNumberBgcFormConfig: FormInputItem = {
    labelText: "CURP ID",
    dataKey: 'additionalBackgroundInfo.idNumber',
    required: true,
    type: 'text',
    regex: '^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]{18})$', // 18 digits with at least one number and one letter
    id: "idNumberInput",
    name: 'idNumber',
    errorMessage: 'Please enter a valid 18 character alphanumeric CURP ID without hyphens.',
    labelTranslationKey: 'BB-BGC-MX-Additional-bgc-form-national-id-number-label-text',
    errorMessageTranslationKey: 'BB-BGC-MX-Additional-bgc-form-national-id-number-error-text',
}

export const NameRegexValidator = getCountryConfig(getCountryCode()).nameRegexValidator;
export const UserIdValidator = "^[a-z]{4,60}$";

export const AdditionalBGCFormConfigPart1: FormInputItem[] = [
    {
        hasError: false,
        labelText: 'Address Line 1',
        errorMessage: 'Please enter a valid address',
        required: true,
        name: 'additional BGC Address Line 1',
        dataKey: 'additionalBackgroundInfo.address.addressLine1',
        id: 'additionalBGCAddressLineOne',
        type: 'text',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-address-line-one-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-address-line-one-error-text',
        regex: getCountryConfig(getCountryCode()).addressRegexValidator,
    },
    {
        hasError: false,
        labelText: 'Apartment, suite, .etc',
        errorMessage: 'Please enter a valid address',
        required: false,
        name: 'Apartment, suite, .etc',
        dataKey: 'additionalBackgroundInfo.address.addressLine2',
        id: 'additionalBGCAddressLineTwo',
        type: 'text',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-address-line-two-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-address-line-two-error-text',
        regex: getCountryConfig(getCountryCode()).addressRegexValidator,
    },
    {
        hasError: false,
        labelText: 'City',
        errorMessage: 'Please enter a valid city',
        required: true,
        name: 'City',
        dataKey: 'additionalBackgroundInfo.address.city',
        id: 'additionalBGCCity',
        type: 'text',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-city-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-city-error-text',
        regex: `^(?=\\S)[${alphabet}${specialChars} ]{1,}[${alphabet}${accentedChars}]$`,
    },
    {
        hasError: false,
        labelText: 'State/province',
        errorMessage: 'Please enter a valid state/province',
        required: true,
        name: 'State/province',
        dataKey: 'additionalBackgroundInfo.address.state',
        id: 'additionalBGCState',
        type: 'select',
        selectOptions: StatesSelectOptions,
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-state-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-state-error-text',
        placeholderTranslationKey: 'BB-BGC-Additional-bgc-form-state-placeholder-text',
        placeholder: 'Select a state',
        regex: `^(?=\\S)[${alphanumeric} ]{1,}[${alphanumeric}]$`,
    },
    {
        hasError: false,
        labelText: 'ZIP/Postal code',
        errorMessage: 'Please enter a valid 5 digits zipcode',
        required: true,
        name: 'ZIP/Postal code',
        dataKey: 'additionalBackgroundInfo.address.zipcode',
        id: 'additionalBGCZipcode',
        regex: "^(?=\\S)[0-9]{5}(?:-[0-9]{4})?$",
        type: 'text',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-zipcode-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-zipcode-error-text',
    },
]

export const MXAdditionalBGCFormConfigPart1: FormInputItem[] = [
    ...AdditionalBGCFormConfigPart1.slice(0, 3),
    {
        hasError: false,
        labelText: 'State/province',
        errorMessage: 'Please enter a valid state/province',
        required: true,
        name: 'State/province',
        dataKey: 'additionalBackgroundInfo.address.state',
        id: 'additionalBGCState',
        type: 'select',
        selectOptions: MXStatesSelectOptions,
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-state-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-state-error-text',
        placeholderTranslationKey: 'BB-BGC-Additional-bgc-form-state-placeholder-text',
        placeholder: 'Select a state',
    },
    ...AdditionalBGCFormConfigPart1.slice(4)
]

export const AdditionalBGCFormConfigPart2: FormInputItem[] = [
    {
        hasError: false,
        labelText: 'Date of Birth',
        errorMessage: 'Please enter a valid date of birth.',
        required: true,
        name: 'Date of Birth',
        dataKey: 'additionalBackgroundInfo.dateOfBirth',
        id: 'additionalBGCDateOfBirth',
        type: 'datePicker',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-dob-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-dob-error-text',
        regex: "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
    }
]

export const initScheduleStateFilters: ScheduleStateFilters = {
    maxHoursPerWeek: getDesiredWorkHoursByCountryCode().RANGE4,
    daysHoursFilter: [],
    sortKey: SCHEDULE_FILTER_TYPE.DEFAULT
}

//Only used for error handling
export const HasPreviouslyWorkedAtAmazonRadioConfig: FormInputItem = {
    hasError: false,
    labelText: '',
    errorMessage: 'Please check the box to proceed',
    required: true,
    name: '',
    dataKey: 'additionalBackgroundInfo.hasPreviouslyWorkedAtAmazon',
    id: 'hasPreviouslyWorkedAtAmazon',
    type: 'radioButton',
    regex: `^(?=\\S)[${alphabet}]{3,}[${alphabet}]$`,
    errorMessageTranslationKey: "BB-bgc-HasPreviouslyWorkedAtAmazon-error-message"
}

export const ConvictionInfoRadioConfig: FormInputItem = {
    hasError: false,
    labelText: '',
    errorMessage: 'Please check the box to proceed.',
    required: true,
    name: '',
    dataKey: 'additionalBackgroundInfo.hasCriminalRecordWithinSevenYears',
    id: 'hasCriminalRecordWithinSevenYears',
    type: 'radioButton',
    regex: `^(?=\\S)[${alphanumeric} ]{3,}[${alphanumeric}]$`,
    errorMessageTranslationKey: "BB-bgc-ConvictionInfoRadio-error-message"
}

export const ConvictionDetailConfig: FormInputItem = {
    hasError: false,
    labelText: 'Provide city, country, state of conviction, date, nature of the offense, along with sentencing information',
    errorMessage: 'Please provide the conviction details. (Valid special characters are -!/,.()#?)',
    required: true,
    name: 'convictionDetails',
    dataKey: 'additionalBackgroundInfo.convictionDetails',
    id: 'convictionDetails',
    type: 'textArea',
    regex: `^(?=\\S)[${alphanumeric}${specialChars} /,.()#!?]{1,499}[${alphanumeric}${specialChars} /,.()#!?]$`,
    labelTranslationKey: 'BB-BGC-criminal-record-conviction-detail-label-text',
    errorMessageTranslationKey: "BB-bgc-ConvictionDetail-error-message-fix"
}

export const PreviousWorkedAtAmazonBGCFormConfig: FormInputItem[] = [
    {
        hasError: false,
        labelText: 'Please identify the Amazon building you have previously worked at',
        errorMessage: 'Please Enter a Valid Amazon Building',
        required: true,
        name: 'mostRecentBuildingWorkedAtAmazon',
        dataKey: 'additionalBackgroundInfo.mostRecentBuildingWorkedAtAmazon',
        id: 'additionalBGCMostRecentBuildingWorkedAtAmazon',
        type: 'text',
        labelTranslationKey: 'BB-BGC-additional-bgc-most-recent-building-at-Amazon-label-text',
        errorMessageTranslationKey: 'BB-BGC-additional-bgc-most-recent-building-at-Amazon-error-text',
        regex: `^(?=\\S)[${alphanumeric}${accentedChars}- ]{1,}[${alphanumeric}${accentedChars}]$`,
    },
    {
        hasError: false,
        labelText: 'Dates of employment - From/To (MM/YY - MM/YY)',
        errorMessage: 'Please enter a valid date of Employment',
        required: true,
        name: 'mostRecentTimePeriodWorkedAtAmazon',
        dataKey: 'additionalBackgroundInfo.mostRecentTimePeriodWorkedAtAmazon',
        id: 'additionalBGCMostRecentTimePeriodWorkedAtAmazon',
        type: 'text',
        labelTranslationKey: 'BB-BGC-additional-bgc-date-of-employment-at-Amazon-label-text',
        errorMessageTranslationKey: 'BB-BGC-additional-bgc-date-of-employment-at-Amazon-error-text-fix',
        regex: "^(?=\\S)(0[1-9]|1[0-2])\\/([0-9]{2})\\s-\\s(0[1-9]|1[0-2])\\/([0-9]{2})$"
    }
]

export const PreviousLegalNameFormConfig: FormInputItem = {
    hasError: false,
    labelText: '',
    errorMessage: 'Please enter previously used legal full name following format: First Last.',
    required: false,
    name: '',
    dataKey: 'additionalBackgroundInfo.previousLegalNames',
    id: 'additionalBgcPreviousLegalNames',
    type: 'text',
    regex: getCountryConfig(getCountryCode()).previousLegalNameRegexValidator,
    errorMessageTranslationKey: "BB-BGC-additional-bgc-previous-legal-name-error-text"
}

export const SelfIdGenderRadioItems: DetailedRadioButtonItem[] = [
    {
        title: "Male",
        value: "Male",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-male-text"
    },
    {
        title: "Female",
        value: "Female",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-female-text"
    },
    {
        title: "I choose not to self-identify",
        value: "I choose not to self-identify",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-choose-not-to-identify-text"
    }
]

export const MX_SelfIdGenderRadioItems: DetailedRadioButtonItem[] = [
    {
        title: "Male",
        value: "Male",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-mx-male-text"
    },
    {
        title: "Female",
        value: "Female",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-mx-female-text"
    },
    {
        title: "Other",
        value: "Other",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-mx-other-text"
    },
    {
        title: "Prefer not to say",
        value: "Prefer not to say",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-gender-mx-prefer-not-to-say-text"
    }
]

export const SelfIdGenderRadioItemsMap: {[key in CountryCode]: DetailedRadioButtonItem[]} = {
    [CountryCode.MX]: MX_SelfIdGenderRadioItems,
    [CountryCode.US]: SelfIdGenderRadioItems,
    [CountryCode.CA]: SelfIdGenderRadioItems, // TODO: set to correct values once they're available
}

export const SelfIdEthnicBackgroundItems: DetailedRadioButtonItem[] = [
    {
        title: "American Indian/Alaska Native (not Hispanic or Latino)",
        value: "American Indian/Alaska Native",
        details: "Persons having origins in any of the original peoples of North and South America, (including Central America), and who maintain tribal affiliation or community attachment",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-american-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-american-details-text'
    },
    {
        title: "Asian (not Hispanic or Latino)",
        value: "Asian (not Hispanic or Latino)",
        details: "Persons having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent; including for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand and Vietnam",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-Asian-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-Asian-details-text'
    },
    {
        title: "Black/African American (not Hispanic or Latino)",
        value: "Black/African American",
        details: "Persons having origins in any of the Black racial groups of Africa",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-black-or-african-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-black-or-african-details-text'
    },
    {
        title: "Hispanic/Latino",
        value: "Hispanic/Latino",
        details: "Persons of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin, regardless of race",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-hispanic-or-latino-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-hispanic-or-latino-details-text'
    },
    {
        title: "Native Hawaiian/Other Pacific Islander (not Hispanic or Latino)",
        value: "Native Hawaiian/Other Pacific Islander (not Hispanic or Latino)",
        details: "Persons having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-native-hawaiian-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-native-hawaiian-details-text'
    },
    {
        title: "White (not Hispanic or Latino)",
        value: "White (not Hispanic or Latino)",
        details: "Persons having origins in any of the original peoples of Europe, the Middle East or North Africa",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-white-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-white-details-text'
    },
    {
        title: "Two or more Races (not Hispanic or Latino)",
        value: "Two or more Races (not Hispanic or Latino)",
        details: "Non-Hispanic persons who identify with more than one of the following five races: (1) White, (2) Black, (3) Asian, (4) Native Hawaiian/Other Pacific Islander, (5) American Indian/Alaska Native",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-two-or-more-race-title-text',
        detailsTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-two-or-more-race-details-text'
    },
    {
        title: "I choose not to self-identify",
        value: "I choose not to Self-Identify",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethinicity-choose-not-to-identify-title-text'
    }
]

export const SelfIdVeteranStatusRadioItem: DetailedRadioButtonItem[] = [
    {
        title: "Yes",
        value: "Yes",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-veteran-status-option-yes-text"
    },
    {
        title: "No",
        value: "No",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-veteran-status-option-no-text"
    },
    {
        title: "I choose not to self-identify",
        value: "I choose not to self-identify",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-veteran-status-option-choose-not-to-identify-text"
    }
]

export const MX_SelfIdEthnicBackgroundItems: DetailedRadioButtonItem[] = [
    {
        title: "Indigenous",
        value: "Indigenous",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethnicity-mx-indigenous-title-text',
    },
    {
        title: "Other",
        value: "Other",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethnicity-mx-other-title-text',
    },
    {
        title: "Prefer not to say",
        value: "Prefer not to say",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-ethnicity-mx-prefer-not-to-say-title-text',
    }
]

export const SelfIdEthnicBackgroundItemsMap: {[Key in CountryCode]: DetailedRadioButtonItem[]} = {
    [CountryCode.US]: SelfIdEthnicBackgroundItems,
    [CountryCode.MX]: MX_SelfIdEthnicBackgroundItems,
    [CountryCode.CA]: SelfIdEthnicBackgroundItems, // TODO: set to correct values once they're available
}

export const SelfIdEthnicValidValues: string[] = SelfIdEthnicBackgroundItems.map(item => item.value);

export const MX_SelfIdEthnicValidValues: string[] = MX_SelfIdEthnicBackgroundItems.map(item => item.value);

export const SelfIdEthnicValidValuesMap: {[Key in CountryCode]: string[]} = {
    [CountryCode.US]: SelfIdEthnicValidValues,
    [CountryCode.MX]: MX_SelfIdEthnicValidValues,
    [CountryCode.CA]: SelfIdEthnicValidValues, // TODO: set to correct values once they're available
}

export const MX_SelfIdPronounsItems: DetailedRadioButtonItem[] = [
    {
        title: "He",
        value: "He",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-pronoun-mx-he-title-text',
    },
    {
        title: "She",
        value: "She",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-pronoun-mx-she-title-text',
    },
    {
        title: "They",
        value: "They",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-pronoun-mx-they-title-text',
    },
    {
        title: "Other",
        value: "Other",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-pronoun-mx-other-title-text',
    },
    {
        title: "Prefer not to say",
        value: "Prefer not to say",
        titleTranslationKey: 'BB-SelfId-equal-opportunity-form-pronoun-mx-prefer-not-to-say-title-text',
    },
]

export const SelfIdPronounsItemsMap: {[Key in CountryCode]: DetailedRadioButtonItem[]} = {
    [CountryCode.MX]: MX_SelfIdPronounsItems,
    [CountryCode.US]: [],
    [CountryCode.CA]: [] // TODO: set to correct values once they're available
}

export const SelfIdMilitarySpouseRadioItem: DetailedRadioButtonItem[] = [
    {
        title: "Yes",
        value: "Yes",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-military-spouse-option-yes-text"
    },
    {
        title: "No",
        value: "No",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-military-spouse-option-no-text"
    },
    {
        title: "I choose not to self-identify",
        value: "I choose not to self-identify",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-military-spouse-option-choose-not-to-identify-text"
    }
]

export const SelfIdProtectedVeteranRadioItem: DetailedRadioButtonItem[] = [
    {
        title: "Yes",
        value: "Yes, I believe one or more of the above categories apply to me",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-yes-option-text"
    },
    {
        title: "No",
        value: "No, I do not believe one or more of the above categories apply to me",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-no-option-text"
    },
    {
        title: "I choose not to self-identify",
        value: "I choose not to self-identify",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-choose-not-to-identify-option-text"
    }
]

export const SelfIdDisabilityRadioItem: DetailedRadioButtonItem[] = [
    {
        title: "Yes, I Have A Disability, Or Have A History/Record Of Having A Disability",
        value: "YES, I HAVE A DISABILITY (or previously had a disability)",
        titleTranslationKey: "BB-SelfId-disability-form-disability-checkbox-item-yes-text"
    },
    {
        title: "No, I Don’t Have A Disability, Or A History/Record Of Having A Disability",
        value: "NO, I DON’T HAVE A DISABILITY",
        titleTranslationKey: "BB-SelfId-disability-form-disability-checkbox-item-no-text"
    },
    {
        title: "I Don’t Wish To Answer",
        value: "I DON’T WISH TO ANSWER",
        titleTranslationKey: "BB-SelfId-disability-form-disability-checkbox-item-do-wish-to-answer-text"
    }
]

export const SelfIdDisabilityValidValues: string[] = SelfIdDisabilityRadioItem.map(item => item.value);

export const DisabilityList: DisabilityItem[] = [
    {
        title: "Autism",
        translationKeyTitle: 'BB-SelfId-disability-form-disability-item-autism-text'
    }
    ,
    {
        title: "Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, or HIV/AIDS",
        translationKeyTitle: 'BB-SelfId-disability-form-disability-item-autoimmune-disorder-text'
    },
    {
        title: "Blind or low vision",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-blind-or-low-vision-text"
    },
    {
        title: "Cancer",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-cancer-text"
    },
    {
        title: "Cardiovascular or heart disease",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-heart-disease-text"
    },
    {
        title: "Celiac disease",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-celiac-disease-text"
    },
    {
        title: "Cerebral palsy",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-cerebral-palsy-text"
    },
    {
        title: "Deaf or hard of hearing",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-hearing-capacity-text"
    },
    {
        title: "Depression or anxiety",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-depression-or-anxiety-text"
    },
    {
        title: "Diabetes",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-diabetes-text"
    },
    {
        title: "Epilepsy",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-epilepsy-text"
    },
    {
        title: "Gastrointestinal disorders, for example, Crohn's Disease, or irritable bowel syndrome",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-gastrointestinal-disorders-text"
    },
    {
        title: "Intellectual disability",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-intellectual-disability-text"
    },
    {
        title: "Missing limbs or partially missing limbs",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-missing-limb-text"
    },
    {
        title: "Nervous system condition for example, migraine he…, Parkinson’s disease, or Multiple sclerosis (MS)",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-nervous-system-condition-text"
    },
    {
        title: "Psychiatric condition, for example, bipolar disorder, schizophrenia, PTSD, or major depression",
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-psychiatric-condition-text"
    }
];

export const ProtectedVeteranDefinitionList: {title: string; titleTranslationKey: string}[] = [
    {
        title: "<b>Disabled Veteran</b>: a veteran of the U.S. military, ground, naval or air service who is entitled to compensation (or who but for the receipt of military retired pay would be entitled to compensation) under laws administered by the Secretary of Veterans Affairs; or a person who was discharged or released from active duty because of a service-connected disability.",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-definition-disabled-veteran-item-text"
    },
    {
        title: "<b>Recently Separated Veteran</b>: any veteran during the three-year period beginning on the date of such veteran's discharge or release from active duty in the U.S. military, ground, naval, or air service.",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-definition-recently-removed-veteran-item-text"
    },
    {
        title: "<b>Active Duty Wartime or Campaign Badge Veteran</b>: a veteran who served on active duty in the U.S. badge has been authorized under the laws administered by the Department of Defense.",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-definition-active-duty-wartime-item-text"
    },
    {
        title: "<b>Armed Forces Service Medal Veteran</b>: a veteran who, while serving on active duty in the U.S. military, ground, naval or air service, participated in a United States military operation for which an Armed Forces service medal was awarded pursuant to <a href='https://www.federalregister.gov/documents/1996/01/18/96-622/establishing-the-armed-forces-service-medal' target='_blank' rel='noopener noreferrer'>Executive Order</a>.",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-definition-armed-force-medal-veteran-item-text"
    }
]

export const SocialSecurityNumberValue = 'United States - Social Security Number'
export const MXCRUPValue = 'Mexico - Unique Population Registry Key'

export const CountrySelectOptions = [
    { showValue: 'United States', value: 'United States', translationKey: 'BB-Country-United-States', countryCode: 'US' }
]

export const MXCountrySelectOptions = [
    { showValue: 'Mexico', value: 'Mexico', translationKey: 'BB-Country-Mexico', countryCode: 'MX' }
]

export const NationIdTypeSelectOptions = [
    { showValue: 'Social Security Number', value: SocialSecurityNumberValue, translationKey: 'BB-BGC-Additional-bgc-form-national-id-options-ssn' }
]

export enum BusinessLineType {
    Air_Job = 'AIR'
}

export const MINIMUM_AVAILABLE_TIME_SLOTS = 3;

export enum newBBUIPathName {
    US = "/application/us/",
    MX = "/application/mx/"
}

//This is used for additional bgc page form validation
export const AdditionalBGCFormConfig: FormInputItem[] = [
    ...AdditionalBGCFormConfigPart1,
    ...AdditionalBGCFormConfigPart2,
    ...PreviousWorkedAtAmazonBGCFormConfig,
    IdNumberBgcFormConfig,
    HasPreviouslyWorkedAtAmazonRadioConfig,
    ConvictionInfoRadioConfig,
    ConvictionDetailConfig,
    PreviousLegalNameFormConfig
]

//This is used for additional bgc page form validation
export const MXAdditionalBGCFormConfig: FormInputItem[] = [
    ...MXAdditionalBGCFormConfigPart1,
    ...AdditionalBGCFormConfigPart2,
    ...PreviousWorkedAtAmazonBGCFormConfig,
    MXIdNumberBgcFormConfig,
    HasPreviouslyWorkedAtAmazonRadioConfig,
    PreviousLegalNameFormConfig
]

export const dayHoursFilterValues: DayHoursFilter[] = [
    {
        day: DAYS_OF_WEEK.MONDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Monday"
    },
    {
        day: DAYS_OF_WEEK.TUESDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Tuesday"
    },
    {
        day: DAYS_OF_WEEK.WEDNESDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Wednesday"
    },
    {
        day: DAYS_OF_WEEK.THURSDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Thursday"
    },
    {
        day: DAYS_OF_WEEK.FRIDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Friday"
    },
    {
        day: DAYS_OF_WEEK.SATURDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Saturday"
    },
    {
        day: DAYS_OF_WEEK.SUNDAY,
        isActive: true,
        startTime: "00:00",
        endTime: "23:59",
        dayTranslationKey: "BB-DayName-Sunday"
    }
];

// Related SIM: https://issues.amazon.com/MLS_Defect-169
export const ValueToI18nKeyMap: {[key: string]: string} = {
    // National Id type
    "United States - Social Security Number": "BB-ReverseMapping-candidate-nationalId-US-SSN",
};
// TODO: need to remove languageES once we get translation back .
export const localeToLanguageList: localeToLanguageItem[] = [
    {
        translationKey: 'BB-Constants-language-english',
        language: 'English',
        locale: Locale.enUS
    },
    {
        translationKey: 'BB-Constants-language-spanish',
        language: 'Spanish',
        locale: Locale.esUS
    },
    {
        translationKey: 'BB-Constants-language-english',
        language: 'English',
        locale: Locale.enGB
    },
    {
        translationKey: 'BB-Constants-language-spanish',
        language: 'Spanish',
        locale: Locale.esMX
    },
];

export const US_SelfIdentificationConfigSteps: SelfIdentificationConfig = {
    completedSteps: [],
    [SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]: {
        status: INFO_CARD_STEP_STATUS.ACTIVE,
        editMode: false
    },
    [SELF_IDENTIFICATION_STEPS.VETERAN_FORM]: {
        status: INFO_CARD_STEP_STATUS.LOCKED,
        editMode: false
    },
    [SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]: {
        status: INFO_CARD_STEP_STATUS.LOCKED,
        editMode: false
    },
}

export const MX_SelfIdentificationConfigSteps: SelfIdentificationConfig = {
    completedSteps: [],
    [SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]: {
        status: INFO_CARD_STEP_STATUS.ACTIVE,
        editMode: false
    },

    [SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]: {
        status: INFO_CARD_STEP_STATUS.LOCKED,
        editMode: false
    },
}

export const SelfIdentificationConfigStepCountryMap: { [key in CountryCode]: SelfIdentificationConfig } = {
    [CountryCode.MX]: MX_SelfIdentificationConfigSteps,
    [CountryCode.US]: US_SelfIdentificationConfigSteps,
    [CountryCode.CA]: US_SelfIdentificationConfigSteps, // TODO: set to correct values once they're available
}

export const localeToLanguageMap: { [key in Locale]: [string, string] } = {
    "en-GB": ['BB-Constants-language-english', 'English'],
    "en-US": ['BB-Constants-language-english', 'English'],
    "es-US": ['BB-Constants-language-spanish', 'Spanish'],
    "es-MX": ['BB-Constants-language-spanish', 'Spanish'],
}
