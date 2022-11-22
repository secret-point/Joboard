import { PAGE_ROUTES } from "../../components/pageRoutes";

const { NHE } = PAGE_ROUTES;

export enum QUERY_PARAMETER_NAME {
    APPLICATION_ID = 'applicationId',
    JOB_ID = 'jobId',
    SCHEDULE_ID = 'scheduleId',
    REQUISITION_ID = 'requisitionId'
}

export enum APPLICATION_STEPS {
    SELECT_JOB = 'Select Job',
    COMPLETE_REQUIRED_DOCUMENTS = 'Complete required documents',
    SCHEDULE_PRE_HIRE_APPOINTMENT = 'Schedule pre-hire appointment',
    COMPLETE_AN_ASSESSMENT = 'Complete an assessment (~15 min)'
}

export enum SCHEDULE_FILTER_TYPE {
    PAY_RATE = "PAY_RATE",
    HOURS_DESC = "HOURS_DESC",
    HOURS_ASC = "HOURS_ASC",
    DEFAULT = "DEFAULT"
}

// Omit the RANGE0 if it is 0
export interface DESIRED_WORK_HOURS {
    RANGE0?: string;
    RANGE1: string;
    RANGE2: string;
    RANGE3: string;
    RANGE4: string;
}

export enum DAYS_OF_WEEK {
    MONDAY= "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export enum FCRA_DISCLOSURE_TYPE {
    ACCEPT = "Accept",
    DECLINE = "Decline"
}

export enum CRIMINAL_CONVICTION_STATUS {
    ACCEPT = "ACCEPT",
    DECLINE = "DECLINE"
}

export enum NON_FCRA_STATES {
    ALL_STATE = "ALL STATES",
    WASHINGTON = "WASHINGTON",
    NEW_YORK = "NEW YORK",
    MINNESOTA = "MINNESOTA",
    CALIFORNIA = "CALIFORNIA"
}

export enum BGC_STEPS {
    FCRA = "FCRA",
    NON_FCRA = "NON_FCRA",
    ADDITIONAL_BGC = "ADDITIONAL_BGC"
}

export enum SELF_IDENTIFICATION_STEPS {
    EQUAL_OPPORTUNITY = "EQUAL_OPPORTUNITY_FORM",
    VETERAN_FORM = "VETERAN_FORM",
    DISABILITY_FORM = "DISABILITY_FORM"
}

export type INFO_CARD_STEPS = BGC_STEPS | SELF_IDENTIFICATION_STEPS;

export enum INFO_CARD_STEP_STATUS {
    LOCKED = 'LOCKED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

export enum WORKFLOW_STEP_NAME {
    JOB_OPPORTUNITIES = 'job-opportunities',
    ASSESSMENT_CONSENT = 'assessment-consent',
    CONTINGENT_OFFER = 'contingent-offer',
    THANK_YOU = 'thank-you',
    SUPPLEMENTARY_SUCCESS = 'supplementary-success',
    BGC = 'bgc',
    AMAZON_REJECTS = 'amazon-rejects',
    AMAZON_WITHDRAWS = 'amazon-withdraws',
    CANDIDATE_WITHDRAWS = 'candidate-withdraws',
    REVIEW_SUBMIT = 'review-submit',
    WOTC = 'wotc',
    SELF_IDENTIFICATION = 'self-identification',
    NHE = 'nhe',
    WORKFLOW_FAILED = 'workflow-failed',
    REHIRE_ELIGIBILITY_STATUS = 'rehire-eligibility-status',
    CAN_NOT_OFFER_JOB = 'can-not-offer-job',
    CALI_DISCLOSURE = 'cali-disclosure',
    ASSESSMENT_NOT_ELIGIBLE = 'assessment-not-eligible'
}

export enum UPDATE_APPLICATION_API_TYPE {
    JOB_CONFIRM = 'job-confirm',
    REVIEW_SUBMIT = 'review-submit',
    CONTINGENT_OFFER = 'contingent-offer',
    BGC = 'bgc',
    NON_FCRA_BGC = 'non-fcra',
    CONSENTS_MAP = 'consents-map',
    FCRA_BGC = 'fcra',
    ADDITIONAL_BGC = 'additional-bgc-info',
    CALI_DISCLOSURE = 'cali-disclosure',
    EQUAL_OPPORTUNITY_FORM = 'equal-opportunity-form',
    VETERAN_STATUS_FORM = 'veteran-status-form',
    DISABILITY_FORM = 'disability-form',
    SELF_IDENTIFICATION = 'self-identification',
    NHE = 'nhe',
    UPDATE_SHIFT = 'update-shift',
    UPDATE_SCHEDULE = 'update-schedule',
    CANCEL_SHIFT = 'cancel-shift',
    CANCEL_SCHEDULE = 'cancel-schedule',
    THANK_YOU = 'thank-you',
    JOB_PREFERENCES = 'job-preferences',
    NHE_PREFERENCES = 'nhe=preferences',
    DEFAULT = 'Update type is missing'
}

export enum BACKGROUND_AGENT {
    FADV = 'FADV',
    ACCURATE = 'ACCURATE'
}

export enum APPLICATION_STATE {
    ASSESSMENT_PENDING = "ASSESSMENT_PENDING",
    SHIFT_SELECTION_PENDING = "SHIFT_SELECTION_PENDING",
    CONDITIONAL_INTENT_PENDING = "CONDITIONAL_INTENT_PENDING",
    BGC_CONSENT_AND_INFO_PENDING = "BGC_CONSENT_AND_INFO_PENDING",
    PERSONAL_DETAILS_PENDING = "PERSONAL_DETAILS_PENDING",
    LOCAL_BGC_CONSENT_PENDING = "LOCAL_BGC_CONSENT_PENDING",
    APPT_1_SCHEDULING = "APPT_1_SCHEDULING",
    DIVERSITY_PENDING = "DIVERSITY_PENDING",
    REVIEW_AND_SUBMIT_PENDING = "REVIEW_AND_SUBMIT_PENDING",
    EVALUATION_PENDING = "EVALUATION_PENDING",
    APPT_1_PENDING = "APPT_1_PENDING",
    CONTINGENCIES_PENDING = "CONTINGENCIES_PENDING",
    SCHEDULE_SELECTION_PENDING = "SCHEDULE_SELECTION_PENDING",
    START_DATE_CONFIRMATION_PENDING = "START_DATE_CONFIRMATION_PENDING",
    READY_TO_HIRE = "READY_TO_HIRE",
    HIRE_COMPLETE = "HIRE_COMPLETE",
    WITHDRAWN = "WITHDRAWN",
    REJECTED_BY_AMAZON = "REJECTED_BY_AMAZON"
}

export enum PROXY_APPLICATION_STATE {
    APPLICATION_CREATED = "APPLICATION_CREATED",
    ASSESSMENT_PASSED = "ASSESSMENT_PASSED",
    JOB_SELECTED = "JOB_SELECTED",
    CONTINGENT_OFFER_ACCEPTED = "CONTINGENT_OFFER_ACCEPTED",
    FCRA_CONSENT_SAVED = "FCRA_CONSENT_SAVED",
    NON_FCRA_CONSENT_SAVED = "NON_FCRA_CONSENT_SAVED",
    ADDITIONAL_BACKGROUND_INFO_SAVED = "ADDITIONAL_BACKGROUND_INFO_SAVED",
    CALIFORNIA_DISCLOSURE_SAVED = "CALIFORNIA_DISCLOSURE_SAVED",
    JOB_REFERRAL_SAVED = "JOB_REFERRAL_SAVED",
    PRE_HIRE_APPOINTMENT_SCHEDULED = "PRE_HIRE_APPOINTMENT_SCHEDULED",
    NHE_PREFERENCE_SELECTED = "NHE_PREFERENCE_SELECTED",
    NHE_APPOINTMENT_SELECTED = "NHE_APPOINTMENT_SELECTED",
    APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
    APPLICATION_WITHDRAWN = "APPLICATION_WITHDRAWN",
    WOTC_COMPLETED = "WOTC_COMPLETED",
    WOTC_INITIATED = "WOTC_INITIATED",
    EQUAL_OPPORTUNITY_FORM_SAVED = "EQUAL_OPPORTUNITY_FORM_SAVED",
    VETERAN_STATUS_SAVED = "VETERAN_STATUS_SAVED",
    SELF_IDENTIFICATION_COMPLETED = "SELF_IDENTIFICATION_COMPLETED",
}

export enum PROXY_ERROR_MESSAGE {
    //application
    BGC_VALIDATION_FAILED = "Additional background information is not valid, Please update all required fields",
    MISSING_REFERRAL_INFORMATION = "Missing referral information",
    FAILED_UPDATE_APPLICATION = "Failed to update the application",
    NO_ACCESS_TO_APPLICATION = "you can not access this application",
    FAILED_TERMINATE_APPLICATION = "Failed to terminate application",
    FAILED_UPDATE_WOTC = "Failed to update WOTC status",
    FAILED_UPDATE_STEP = "Failed to updating the step name",
    CAN_NOT_CREATE_APPLICATION = "you can not create application",
    APPLICATION_ID_REQUIRED = "applicationId is required to get application data",
    DUPLICATE_SSN = 'The SSN or National Identity Number you entered is already associated with another email address in our system. If you have previously signed up with a different email address, please [Log Out](/logout) and try logging in with that email, using the "Forgot your personal pin?" link if needed. If you need help, please contact us via email or chat at [www.amazon.com/applicationhelp](https://www.amazondelivers.jobs/contactus)',
    MAX_SSN_EDITS = 'Update to application failed because you have reached the maximum number of changes to your National ID. If you have previously signed up with a different email address, please [Log Out](/logout) and try logging in with that email, using the "Forgot your personal pin?" link if needed. If you need help, please contact us via email or chat at [www.amazon.com/applicationhelp](https://www.amazondelivers.jobs/contactus)',
    INVALID_SSN = "Update to application failed because provided National Identity Number is invalid. Please enter correct and complete National Identity Number before proceeding.",
    MISMATCH_SIGNATURES = "eSignatures do not match. Please use the same text for each eSignature.",
    //requisition
    FETCH_REQUISITION_ERROR = "Unable to fetch requisition.",
    REQUISITION_INFO_ERROR = "Unable to fetch requisition information.",
    FETCH_CHILD_REQUISITION_ERROR = "Unable to fetch child requisition.",
    JOB_DES_ERROR = "Unable to fetch job description.",
    FETCH_TIME_SLOT_ERROR = "Something went wrong! Please refresh the page or try again later",
    ALL_SHIFT_FILLED = "All Shifts Filled",
    FETCH_SHIFTS_ERROR = "Something went wrong while fetching jobs! Please refresh the page or try again later",
    FETCH_JOB_ERROR = "Unable to fetch job.",
    JOB_INFO_ERROR = "Unable to fetch job information.",
    FETCH_HCR_ERROR = "Unable to fetch head count request.",
    FETCH_SHIFT_PREF_ERROR = "Unable to fetch shift preferences.",
    SHIFTS_BAD_REQUEST = "Failed to retrieve jobs at the moment. Please try again after some time.",
    SCHEDULE_NOT_AVAILABLE = "The schedule you have selected is no longer available, please select another schedule.",
    REFERRER_NOT_FOUND = "We couldn't validate your referrer's login ID, please verify with your referrer and try again.",
    REFERRAL_VALIDATION_BLOCKED = "We couldn't validate your referrer's login ID, please chat with us at www.amazon.com/applicationhelp for assistance.",
    REFERRAL_VALIDATION_ERROR = "We couldn't validate your referrer's login ID, please try again or refresh the page.",
}

export enum CREATE_APPLICATION_ERROR_CODE {
    MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
    CANDIDATE_NOT_FOUND = "CANDIDATE_NOT_FOUND",
    CANDIDATE_IS_INACTIVE = "CANDIDATE_IS_INACTIVE",
    APPLICATION_ALREADY_EXIST = "APPLICATION_ALREADY_EXIST",
    VERSION_MISMATCH = "VERSION_MISMATCH",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum UPDATE_APPLICATION_ERROR_CODE {
    MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
    APPLICATION_ID_DOES_NOT_MATCH = "APPLICATION_ID_DOES_NOT_MATCH",
    APPLICATION_NOT_FOUND = "APPLICATION_NOT_FOUND",
    VERSION_MISMATCH = "VERSION_MISMATCH",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    CANDIDATE_NOT_AUTHORIZED = "CANDIDATE_NOT_AUTHORIZED",
    CONTINGENT_OFFER_NOT_ACCEPTED = "CONTINGENT_OFFER_NOT_ACCEPTED",
    CONTINGENT_OFFER_ACCEPTED_TIME_IS_NULL = "CONTINGENT_OFFER_ACCEPTED_TIME_IS_NULL",
    SIGN_FCRA_ACKNOWLEDGEMENT = "SIGN_FCRA_ACKNOWLEDGEMENT",
    SIGN_FCRA_REQUEST = "SIGN_FCRA_REQUEST",
    SIGN_NON_FCRA_ACKNOWLEDGEMENT = "SIGN_NON_FCRA_ACKNOWLEDGEMENT",
    SIGN_NON_FCRA_STATE_NOTICE = "SIGN_NON_FCRA_STATE_NOTICE",
    SELECTED_SCHEDULE_NOT_AVAILABLE = "SELECTED_SCHEDULE_NOT_AVAILABLE",
    MISMATCH_SIGNATURES = "MISMATCH_SIGNATURES",
    MAX_SSN_EDITS = "MAX_SSN_EDITS",
    INVALID_SSN = "INVALID_SSN",
    TYPE_OF_REQUEST_MISSING = "TYPE_OF_REQUEST_MISSING",
    TYPE_NOT_MATCH_WITH_REQUEST = "TYPE_NOT_MATCH_WITH_REQUEST",
    DOB_MISSING_IN_REQUEST = "DOB_MISSING_IN_REQUEST",
    PROVIDE_DOB = "PLEASE_PROVIDE_DOB",
    APPLICATION_ID_MISSING = "APPLICATION_ID_MISSING",
    GOVERNMENT_TYPE_MISSING_IN_REQUEST = "GOVERNMENT_TYPE_MISSING_IN_REQUEST",
    ID_NUMBER_MISSING_IN_REQUEST = "ID_NUMBER_MISSING_IN_REQUEST",
    HAS_CRIMINAL_IN_SEVEN_YEARS_MISSING = "HAS_CRIMINAL_IN_SEVEN_YEARS_MISSING",
    ADDRESS_LINE1_MISSING = "ADDRESS_LINE1_MISSING",
    CITY_IS_MISSING_IN_ADDRESS = "CITY_IS_MISSING_IN_ADDRESS",
    STATE_IS_MISSING_IN_ADDRESS = "STATE_IS_MISSING_IN_ADDRESS",
    ZIPCODE_MISSING_IN_ADDRESS = "ZIPCODE_MISSING_IN_ADDRESS",
    COUNTRY_CODE_MISSING_IN_ADDRESS = "COUNTRY_CODE_MISSING_IN_ADDRESS",
    INVALID_PREVIOUS_LEGAL_NAME = "INVALID_PREVIOUS_LEGAL_NAME",
    BGC_VALIDATION_FAILED = 'VALIDATION_FAILED',
    NHE_APT_MISSING_IN_REQUEST = "NHE_APT_MISSING_IN_REQUEST",
    REFERRAL_INFO_MISSING = "REFERRAL_INFO_MISSING",
    ETHNICITY_IS_MISSING = "ETHNICITY_IS_MISSING",
    GENDER_IS_MISSING = "GENDER_IS_MISSING",
    MILITARY_SPOUSE_MISSING = "MILITARY_SPOUSE_MISSING",
    PROTECTED_VETERAN_MISSING = "PROTECTED_VETERAN_MISSING",
    VETERAN_STATUS_MISSING = "VETERAN_STATUS_MISSING",
    DISABILITY_IS_MISSING = "DISABILITY_IS_MISSING",
    CALI_DISCLOSURE_IS_MISSING = "CALI_DISCLOSURE_IS_MISSING",
    DUPLICATE_SSN = "DUPLICATE_SSN",
    CAN_NOT_CREATE_APPLICATION = "CAN_NOT_CREATE_APPLICATION",
    UNABLE_CREATE_APPLICATION = "UNABLE_CREATE_APPLICATION",
    CANDIDATE_ALREADY_HIRED = "CANDIDATE_ALREADY_HIRED",
    FAILED_UPDATE_APPLICATION = "FAILED_UPDATE_APPLICATION",
    SELECTED_JOB_NOT_AVAILABLE = "SELECTED_JOB_NOT_AVAILABLE",
    PREVIOUS_USED_NAME_FORMAT_INCORRECT = "PREVIOUS_USED_NAME_FORMAT_INCORRECT"
}

export enum GET_APPLICATION_ERROR_CODE {
    MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
    CANDIDATE_NOT_AUTHORIZED = "CANDIDATE_NOT_AUTHORIZED",
    APPLICATION_NOT_FOUND = "APPLICATION_NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum UPDATE_WORKFLOW_NAME_ERROR_CODE {
    MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
    APPLICATION_NOT_FOUND = "APPLICATION_NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum GET_JOB_INFO_ERROR_CODE {
    FETCH_JOB_ERROR = "FETCH_JOB_ERROR"
}

export enum GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE {
    ALL_SHIFT_FILLED = " ALL_SHIFT_FILLED",
    FETCH_SHIFTS_ERROR = "FETCH_SHIFTS_ERROR",
    SHIFTS_BAD_REQUEST = "SHIFTS_BAD_REQUEST",
    NO_SCHEDULE_FOUND = "NO_SCHEDULE_FOUND"
}

export enum GET_SCHEDULE_DETAIL_ERROR_CODE {
    FETCH_HCR_ERROR = "FETCH_HCR_ERROR",
}

export enum GET_NHE_TIME_SLOT_LIST_ERROR_CODE {
    FETCH_TIME_SLOT_ERROR = "FETCH_TIME_SLOT_ERROR",
    ALL_SHIFT_FILLED = "ALL_SHIFT_FILLED",
    SHIFTS_BAD_REQUEST = "SHIFTS_BAD_REQUEST",
    FETCH_SHIFTS_ERROR = "FETCH_SHIFTS_ERROR",
    FETCH_SHIFT_PREF_ERROR = "FETCH_SHIFT_PREF_ERROR"
}

export enum GET_CANDIDATE_ERROR_CODE {
    FAILED_GET_CANDIDATE = "FAILED_GET_CANDIDATE",
    NO_ACCESS_TO_APPLICATION = "NO_ACCESS_TO_APPLICATION"
}

export enum UPDATE_WOTC_STATUS_ERROR_CODE {
    FAILED_UPDATE_WOTC = "FAILED_UPDATE_WOTC",
}

export enum VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE {
    REFERRAL_INPUT_EMPTY = "REFERRAL_INPUT_EMPTY",
    REFERRAL_INPUT_FORMAT_INVALID = "REFERRAL_INPUT_FORMAT_INVALID",
    REFERRER_NOT_FOUND = "REFERRER_NOT_FOUND",
    REFERRAL_VALIDATION_BLOCKED = "REFERRAL_VALIDATION_BLOCKED",
    REFERRAL_VALIDATION_ERROR = "REFERRAL_VALIDATION_ERROR",
}

export enum WORKFLOW_ERROR_CODE {
    NOT_REHIRE_ELIGIBLE = "not-rehire-eligible",
    NOT_REHIRE_ELIGIBLE_365_DAYS = "365-days-not-rehire-eligible",
    ACTIVE = "active",
    SEASONAL_ONLY = "seasonal-only"
}

export enum FEATURE_FLAG {
    PREFERRED_NAME = "PREFERRED_NAME",
    PREVENT_DUPLICATE_SSN = "PREVENT_DUPLICATE_SSN",
    SUPPRESS_QUESTIONS_IF_REHIRE_ELIGIBLE = "SUPPRESS_QUESTIONS_IF_REHIRE_ELIGIBLE",
    STENCIL_COLOR_OVERRIDE = "STENCIL_COLOR_OVERRIDE",
    CS_AUTH = "CS_AUTH",
    UNIFIED_DOMAIN = "UNIFIED_DOMAIN",
    SELF_ID_PLACEMENT = "SELF_ID_PLACEMENT",
    CANDIDATE_DASHBOARD = "CANDIDATE_DASHBOARD",
    HOOK = "HOOK",
    NO_SSN_CHECKBOX = "NO_SSN_CHECKBOX",
    MLS = "MLS",
    REFERRAL_VALIDATION = "REFERRAL_VALIDATION",
    BACKEND_HARD_RESERVE_SCHEDULE = "BACKEND_HARD_RESERVE_SCHEDULE",
}

export enum BB_UI_VERSION {
    BB_UI_OLD = "bb-ui-v1",
    BB_UI_NEW = "bb-ui-v2",
}

export enum BGC_VENDOR_TYPE {
    FADV = "FADV",
    ACCURATE = "ACCURATE"
}

export enum CountryCode {
    MX = "MX",
    US = "US",
    CA = "CA",
}

export const CountryFullNameMap: {[key in CountryCode]: string} = {
    [CountryCode.US]: "United States",
    [CountryCode.CA]: "Canada",
    [CountryCode.MX]: "Mexico"
}
