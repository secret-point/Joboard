import {
    AdditionalBgcConfig,
    ApplicationStep,
    DetailedRadioButtonItem,
    FcraDisclosureConfig,
    FormInputItem,
    NonFcraESignatureAcknowledgement,
    ScheduleSortBy,
    ScheduleStateFilters,
    StateSpecificNotice,
    DisabilityItem
} from "../types/common";
import {
    APPLICATION_STEPS,
    BACKGROUND_AGENT,
    DESIRED_WORK_HOURS,
    FCRA_DISCLOSURE_TYPE,
    SCHEDULE_FILTER_TYPE
} from "../enums/common";

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
export const CONSENT: string = "consent";
export const PRE_CONSENT: string = 'pre-consent';
export const JOB_OPPORTUNITIES: string = 'job-opportunities';
export const JOB_CONFIRMATION: string = 'job-opportunities/job-confirmation';
export const JOB_DESCRIPTION: string = 'job-opportunities/job-description';
export const CONTINGENT_OFFER: string = 'contingent-offer';

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
        title: 'Yes.',
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
        title: "The background check provider or “CRA”, who will perform the background check is First Advantage, is located at 1 Concourse Parkway NE, Suite 200, Atlanta, GA 30328, and can be reached at (800) 845-6004 or www.fadv.com.",
        translationKey: 'BB-non-fcra-fadv-acknowledgement-item-one',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        title: "The background check provider or “CRA”, who will perform the background check is Accurate Background, is located at 7515 Irvine Center Dr., Irvine, CA 92618, and can be reached at (800) 216-8024 or www.accuratebackground.com.\n\n* I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than Accurate Background.",
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
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (“California Disclosure”). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
        noticeTranslationKey: 'BB-non-fcra-accurate-california-specific-notice',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (“California Disclosure”). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
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

export const AdditionalBGCFormConfig: FormInputItem[] = [
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
        placeholder: 'BB-BGC-Additional-bgc-form-address-line-one-placeholder-text'
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
        placeholder: 'BB-BGC-Additional-bgc-form-address-line-two-placeholder-text'
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
        placeholder: 'BB-BGC-Additional-bgc-form-city-placeholder-text'
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
        selectOptions: ['Al -- Alabama', 'Wa -- Washington'], // TODO to be aligned with actual state list,
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-state-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-state-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-state-placeholder-text'
    },
    {
        hasError: false,
        labelText: 'ZIP/Postal code',
        errorMessage: 'Please enter a valid 5 digits zipcode',
        required: true,
        name: 'ZIP/Postal code',
        dataKey: 'additionalBackgroundInfo.address.zipcode',
        id: 'additionalBGCZipcode',
        regex: "[0-9]{5}(?:-[0-9]{4})?$",
        type: 'text',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-zipcode-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-zipcode-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-zipcode-placeholder-text'
    },
    {
        hasError: false,
        labelText: 'Country',
        errorMessage: 'Please enter a valid country',
        required: true,
        name: 'Country',
        dataKey: 'additionalBackgroundInfo.address.country',
        id: 'additionalBGC_Country',
        type: 'select',
        selectOptions: ['United States'] ,// TODO to be aligned with actual all countries list
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-country-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-country-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-country-placeholder-text'
    },
    {
        hasError: false,
        labelText: 'National ID number',
        errorMessage: 'Please enter a valid National ID Type',
        required: true,
        name: 'National ID Type',
        dataKey: 'additionalBackgroundInfo.governmentIdType',
        id: 'additionalBGC_IdNumber',
        type: 'select',
        selectOptions: ['Social Security Number'], // TODO to be aligned with actual all countries list
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-type-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-type-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-country-national-id-type-text'
    },
    {
        dataKey: 'additionalBackgroundInfo.idNumber',
        labelText: "Id Number",
        required: true,
        type: 'text',
        regex: '^[0-9]{9}$',
        id: "idNumberInput",
        name: 'idNumber',
        errorMessage: 'Please enter a valid 9 digits social security number without dash',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-number-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-national-id-number-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-country-national-id-number-text'
    },
    {
        hasError: false,
        labelText: 'Date of Birth',
        errorMessage: 'Please enter a valid Date of birth',
        required: true,
        name: 'Date of Birth',
        dataKey: 'additionalBackgroundInfo.dateOfBirth',
        id: 'additionalBGCDateOfBirth',
        type: 'datePicker',
        labelTranslationKey: 'BB-BGC-Additional-bgc-form-dob-label-text',
        errorMessageTranslationKey: 'BB-BGC-Additional-bgc-form-dob-error-text',
        placeholder: 'BB-BGC-Additional-bgc-form-country-dob-text'
    }
];

export const initScheduleStateFilters: ScheduleStateFilters = {
    maxHoursPerWeek: DESIRED_WORK_HOURS.FORTY,
    daysHoursFilter: [],
    sortKey: SCHEDULE_FILTER_TYPE.DEFAULT
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
        errorMessageTranslationKey: 'BB-BGC-additional-bgc-date-of-employment-at-Amazon-error-text'
    }
]

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
        value: "Yes",
        titleTranslationKey: "BB-SelfId-equal-opportunity-form-protected-veteran-yes-option-text"
    },
    {
        title: "No",
        value: "No",
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
        value: "I Don’t Wish To Answer",
        titleTranslationKey: "BB-SelfId-disability-form-disability-checkbox-item-do-wish-to-answer-text"
    }
]

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
        translationKeyTitle: "BB-SelfId-disability-form-disability-item-depression-or-anxiety-text"
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

export const ProtectedVeteranDefinitionList: {title: string, titleTranslationKey: string}[] = [
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

export const NameRegexValidator = "^(?=\\S)[a-zA-Z ,.'-]{2,40}(?<=[^\\s])$";

export const UserIdValidator = "^[a-z]{4,60}$";
