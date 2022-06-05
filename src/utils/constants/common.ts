import {
    AdditionalBgcConfig,
    ApplicationStep,
    FcraDisclosureConfig,
    FormInputItem,
    NonFcraESignatureAcknowledgement,
    ScheduleSortBy,
    ScheduleStateFilters,
    StateSpecificNotice
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
        value: FCRA_DISCLOSURE_TYPE.ACCEPT
    },
    {
        title: 'I DECLINE to authorize Amazon this background check.',
        value: FCRA_DISCLOSURE_TYPE.DECLINE
    }
]

export const CriminalConvictionConfigList: AdditionalBgcConfig[] = [
    {
        title: 'Yes.',
        value: true,
        dataKey: 'additionalBackgroundInfo.hasCriminalRecordWithinSevenYears'
    },
    {
        title: 'NO',
        value: false,
        dataKey: 'additionalBackgroundInfo.hasCriminalRecordWithinSevenYears'
    }
]

export const NonFcraESignatureAcknowledgementList: NonFcraESignatureAcknowledgement[] = [
    {
        title: "The background check provider or “CRA”, who will perform the background check is First Advantage, is located at 1 Concourse Parkway NE, Suite 200, Atlanta, GA 30328, and can be reached at (800) 845-6004 or www.fadv.com.",
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        title: "The background check provider or “CRA”, who will perform the background check is Accurate Background, is located at 7515 Irvine Center Dr., Irvine, CA 92618, and can be reached at (800) 216-8024 or www.accuratebackground.com.\n\n* I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than Accurate Background.\n\n* ",
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: 'I understand and agree that as allowed by law Amazon can order additional background checks about me for employment purposes, without my further authorization, (1) during my employment, if any, and (2) from CRAs other than Accurate Background.',
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: 'For employment purposes, and subject to all laws protecting my informational privacy, I also authorize the following to disclose to the CRAs any information needed for the background check: my past or present employers, schools, and law enforcement and other government agencies, including motor vehicle record agencies.',
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        title: "For employment purposes, and subject to all laws protecting my informational privacy, I also authorize the following to disclose to the CRAs any information needed for the background check: my past or present employers, schools, and law enforcement and other government agencies, including motor vehicle record  agencies.",
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        title: "For employment purposes, and subject to all laws protecting my informational privacy, I also authorize the following to disclose to the CRAs any information needed for the background check: my past or present employers, schools, and law enforcement and other government agencies, including motor vehicle record  agencies.",
        translationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    }
]

export const US_StateSpecificNotices: StateSpecificNotice[] = [
    {
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (“California Disclosure”). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: "<p><b>CALIFORNIA: </b>You will receive a separate California Disclosure Regarding Investigative Consumer Report (“California Disclosure”). This is an important document; please review it carefully. Also, click <a href='https://sfgov.org/olse/sites/default/files/Document/FCO%20Poster%20Set%20All%20Languages%2010%2001%2018.pdf' target='_blank' rel=\"noopener noreferrer\"></a> if you are seeking employment in or are already employed by Company in San Francisco. By signing below, pursuant to California law and the California Disclosure, you hereby authorize Amazon to procure an investigative consumer report, also known as a background check, now and at any time throughout any employment with Amazon.</p>",
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>MINNESOTA: </b>You have the right to submit a written request to the CRA for a complete and accurate disclosure of the nature and scope of any consumer report that was ordered about you. The CRA must provide you with the disclosure within five business days after its receipt of your request or when the report was ordered, whichever date is later.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>MINNESOTA: </b>You have the right to submit a written request to the CRA for a complete and accurate disclosure of the nature and scope of any consumer report that was ordered about you. The CRA must provide you with the disclosure within five business days after its receipt of your request or when the report was ordered, whichever date is later.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>NEW YORK: </b>You have the right to submit a written request to Amazon to know if we ordered a consumer report or investigative consumer report about you. Shown above is the CRA’s address and telephone number. You have the right to contact any CRA to inspect or receive a copy of any such report. Click <a target="_blank" rel="noopener noreferrer" href="http://resources.accuratebackground.com/hubfs/New_York_Correction_Law_Article_23-A-1.pdf">here</a> for information about your rights under Article 23-A of the New York Correction Law.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>NEW YORK: </b>You have the right to submit a written request to Amazon to know if we ordered a consumer report or investigative consumer report about you. Shown above is the CRA’s address and telephone number. You have the right to contact any CRA to inspect or receive a copy of any such report. Click <a target="_blank" rel="noopener noreferrer" href="https://fadv.com/Fadv-prod/media/Assets/FCRA%20page%20PDFs/NY_Correction_Law_Article_23-A.pdf">here</a> for information about your rights under Article 23-A of the New York Correction Law.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>WASHINGTON: </b>You have the right to request from the consumer reporting agency a written summary of your rights under the Washington Fair Credit Reporting Act.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>WASHINGTON: </b>You have the right to request from the consumer reporting agency a written summary of your rights under the Washington Fair Credit Reporting Act.</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    },
    {
        noticeText: '<p><b>ALL STATES: </b>We will provide you with a free copy of any background check if you check this box</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.ACCURATE
    },
    {
        noticeText: '<p><b>ALL STATES: </b>We will provide you with a free copy of any background check if you check this box</p>',
        noticeTranslationKey: '',
        dataKeyDependency: 'bgcVendorName',
        dependencyValue: BACKGROUND_AGENT.FADV
    }
]

export const AdditionalBGCFormConfig: FormInputItem[] = [
    {
        hasError: false,
        labelText: 'Address Line 1',
        errorMessage: 'Invalid Address',
        required: true,
        name: 'additional BGC Address Line 1',
        dataKey: 'additionalBackgroundInfo.address.addressLine1',
        id: 'additionalBGCAddressLineOne',
        type: 'text'
    },
    {
        hasError: false,
        labelText: 'Apartment, suite, .etc',
        errorMessage: 'Invalid Address',
        required: false,
        name: 'Apartment, suite, .etc',
        dataKey: 'additionalBackgroundInfo.address.addressLine2',
        id: 'additionalBGCAddressLineTwo',
        type: 'text'
    },
    {
        hasError: false,
        labelText: 'City',
        errorMessage: 'Invalid City',
        required: true,
        name: 'City',
        dataKey: 'additionalBackgroundInfo.address.city',
        id: 'additionalBGCCity',
        type: 'text'
    },
    {
        hasError: false,
        labelText: 'State/province',
        errorMessage: 'Invalid State/province',
        required: true,
        name: 'State/province',
        dataKey: 'additionalBackgroundInfo.address.state',
        id: 'additionalBGCState',
        type: 'select',
        selectOptions: ['Al -- Alabama', 'Wa -- Washington'] // TODO to be aligned with actual state list
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
        type: 'text'
    },
    {
        hasError: false,
        labelText: 'Country',
        errorMessage: 'Invalid Country',
        required: true,
        name: 'Country',
        dataKey: 'additionalBackgroundInfo.address.country',
        id: 'additionalBGC_Country',
        type: 'select',
        selectOptions: ['United States'] // TODO to be aligned with actual all countries list
    },
    {
        hasError: false,
        labelText: 'National ID number',
        errorMessage: 'Invalid National ID number',
        required: true,
        name: 'National ID Type',
        dataKey: 'additionalBackgroundInfo.governmentIdType',
        id: 'additionalBGC_IdNumber',
        type: 'select',
        selectOptions: ['Social Security Number'] // TODO to be aligned with actual all countries list
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
    },
    {
        hasError: false,
        labelText: 'Date of Birth',
        errorMessage: 'Invalid Date of birth',
        required: true,
        name: 'Date of Birth',
        dataKey: 'additionalBackgroundInfo.dateOfBirth',
        id: 'additionalBGCDateOfBirth',
        type: 'datePicker'
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
        type: 'text'
    },
    {
        hasError: false,
        labelText: 'Dates of employment - From/To (MM/YY - MM/YY)',
        errorMessage: 'Invalid Date of Employment',
        required: true,
        name: 'mostRecentTimePeriodWorkedAtAmazon',
        dataKey: 'additionalBackgroundInfo.mostRecentTimePeriodWorkedAtAmazon',
        id: 'additionalBGCMostRecentTimePeriodWorkedAtAmazon',
        type: 'text'
    }
]

export const NameRegexValidator = "^(?=\\S)[a-zA-Z ,.'-]{2,40}(?<=[^\\s])$";
