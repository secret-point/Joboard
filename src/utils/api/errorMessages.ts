import {
  CREATE_APPLICATION_ERROR_CODE,
  GET_APPLICATION_ERROR_CODE,
  GET_CANDIDATE_ERROR_CODE,
  GET_JOB_INFO_ERROR_CODE,
  GET_NHE_TIME_SLOT_LIST_ERROR_CODE,
  GET_SCHEDULE_DETAIL_ERROR_CODE,
  GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE,
  UPDATE_APPLICATION_ERROR_CODE
} from "../enums/common";
import { ApiErrorMessage } from "../types/common";

//TODO NEED TO REFECTOR TO SUPPORT MLS
export const CreateApplicationErrorMessage: { [key: string]: ApiErrorMessage } = {
  [CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST]: {
    translationKey: "BB-create-application-error-message-application-exist",
    value: "Sorry, you have already applied for this job!"
  },
  [CREATE_APPLICATION_ERROR_CODE.MISSING_REQUIRED_FIELDS]: {
    translationKey: "BB-create-application-error-message-missing-fields",
    value: "Required fields are missing."
  },
  [CREATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    translationKey: "BB-create-application-error-message-internal-server-error",
    value: "Something went wrong with the server. Please try again or refresh the browser."
  },
  [CREATE_APPLICATION_ERROR_CODE.CANDIDATE_IS_INACTIVE]: {
    translationKey: "BB-create-application-error-message-candidate-inactive",
    value: "Candidate is inactive. Cannot create application for candidate."
  },
  [CREATE_APPLICATION_ERROR_CODE.CANDIDATE_NOT_FOUND]: {
    translationKey: "BB-create-application-error-message-candidate-not-found",
    value: "Candidate not found."
  },
  [CREATE_APPLICATION_ERROR_CODE.VERSION_MISMATCH]: {
    translationKey: "BB-create-application-error-message-version-mismatch",
    value: "Application cannot be updated because there exist more recent update."
  },
  "DEFAULT": {
    translationKey: "BB-create-application-error-message-default",
    value: "Unable to create application."
  }
}

export const GetApplicationErrorMessage: {[key: string]: ApiErrorMessage} = {
  [GET_APPLICATION_ERROR_CODE.MISSING_REQUIRED_FIELDS]: {
    translationKey: "BB-get-application-error-message-missing-fields",
    value: "ApplicationId is required to get application data."
  },
  [GET_APPLICATION_ERROR_CODE.CANDIDATE_NOT_AUTHORIZED]: {
    translationKey: "BB-get-application-error-message-candidate-not-authorized",
    value: "You can not access this application."
  },
  [GET_APPLICATION_ERROR_CODE.APPLICATION_NOT_FOUND]: {
    translationKey: "BB-get-application-error-message-application-not-found",
    value: "Unable to get this application."
  },
  [GET_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    translationKey: "BB-get-application-error-message-internal-server-error",
    value: "Something went wrong with the server. Please try again or refresh the browser."
  }
}

export const UpdateApplicationErrorMessage: { [key: string]: ApiErrorMessage } = {
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_ID_DOES_NOT_MATCH]: {
    translationKey: "BB-update-application-error-message-applicationId-not-match",
    value: "Application Id does not match the id in the request path."
  },
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_NOT_FOUND]: {
    translationKey: "BB-update-application-error-message-application-not-found",
    value: "Cannot find the application."
  },
  [UPDATE_APPLICATION_ERROR_CODE.MISSING_REQUIRED_FIELDS]: {
    translationKey: "BB-update-application-error-message-missing-required-fields",
    value: "Required fields are missing: ApplicationId."
  },
  [UPDATE_APPLICATION_ERROR_CODE.VERSION_MISMATCH]: {
    translationKey: "BB-update-application-error-message-version-mismatch",
    value: "Application cannot be updated because there exist more recent update."
  },
  [UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    translationKey: "BB-update-application-error-message-server-error",
    value: "Something went wrong with the server. Please try again or refresh the browser."
  },
  [UPDATE_APPLICATION_ERROR_CODE.CANDIDATE_NOT_AUTHORIZED]: {
    translationKey: "BB-update-application-error-message-candidate-not-authorized",
    value: "you can not access this application."
  },
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_FCRA_ACKNOWLEDGEMENT]: {
    translationKey: "BB-update-application-error-message-sign-fcra-ack",
    value: "Please sign the acknowledgement."
  },
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_FCRA_REQUEST]: {
    translationKey: "BB-update-application-error-message-sign-fcra-request",
    value: "Please sign fcra request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_NON_FCRA_ACKNOWLEDGEMENT]: {
    translationKey: "BB-update-application-error-message-sign-nonfcra-ack",
    value: "Please sign the acknowledgement."
  },
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_NON_FCRA_STATE_NOTICE]: {
    translationKey: "BB-update-application-error-message-sign-notice-statement",
    value: "Please sign the state notices."
  },
  [UPDATE_APPLICATION_ERROR_CODE.SELECTED_SCHEDULE_NOT_AVAILABLE]: {
    translationKey: "BB-update-application-error-message-selected-schedule-not-available",
    value: "The schedule you have selected is no longer available, please select another schedule."
  },
  [UPDATE_APPLICATION_ERROR_CODE.MISMATCH_SIGNATURES]: {
    translationKey: "BB-update-application-error-message-mismatch-signatures",
    value: "eSignatures do not match. Please use the same text for each eSignature."
  },
  [UPDATE_APPLICATION_ERROR_CODE.MAX_SSN_EDITS]: {
    translationKey: "BB-update-application-error-message-max-ssn-edits",
    value: 'Update to application failed because you have reached the maximum number of changes to your National ID. If you have previously signed up with a different email address, please [Log Out](/logout) and try logging in with that email, using the "Forgot your personal pin?" link if needed. If you need help, please contact us via email or chat at <a href="https://hiring.amazon.com/contact-us#/">www.amazon.com/applicationhelp</a>.'
  },
  [UPDATE_APPLICATION_ERROR_CODE.INVALID_SSN]: {
    translationKey: "BB-update-application-error-message-invalid-ssn",
    value: "Update to application failed because provided National Identity Number is invalid. Please enter correct and complete National Identity Number before proceeding."
  },
  [UPDATE_APPLICATION_ERROR_CODE.TYPE_OF_REQUEST_MISSING]: {
    translationKey: "BB-update-application-error-message-type-of-request-missing",
    value: "Type of the request is missing."
  },
  [UPDATE_APPLICATION_ERROR_CODE.TYPE_NOT_MATCH_WITH_REQUEST]: {
    translationKey: "BB-update-application-error-message-type-not-match-with-request",
    value: "Type is not matched with request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.DOB_MISSING_IN_REQUEST]: {
    translationKey: "BB-update-application-error-message-dob-missing-in-request",
    value: "Date of birth is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.PROVIDE_DOB]: {
    translationKey: "BB-update-application-error-message-provide-dob",
    value: "Please provide valid date."
  },
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_ID_MISSING]: {
    translationKey: "BB-update-application-error-message-applicationId-missing",
    value: "applicationId is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.GOVERNMENT_TYPE_MISSING_IN_REQUEST]: {
    translationKey: "BB-update-application-error-message-government-type-missing",
    value: "Government id type is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.ID_NUMBER_MISSING_IN_REQUEST]: {
    translationKey: "BB-update-application-error-message-id-number-missing",
    value: "Id number is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.HAS_CRIMINAL_IN_SEVEN_YEARS_MISSING]: {
    translationKey: "BB-update-application-error-message--has-criminal-in7-years-missing",
    value: "HasCriminalRecordWithinSevenYears is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.ADDRESS_LINE1_MISSING]: {
    translationKey: "BB-update-application-error-message-address-line1-missing",
    value: "Address line 1 is missing in address object."
  },
  [UPDATE_APPLICATION_ERROR_CODE.CITY_IS_MISSING_IN_ADDRESS]: {
    translationKey: "BB-update-application-error-message-city-missing-in-address",
    value: "City is missing in address object."
  },
  [UPDATE_APPLICATION_ERROR_CODE.STATE_IS_MISSING_IN_ADDRESS]: {
    translationKey: "BB-update-application-error-message-state-missing-in-address",
    value: "state is missing in address object."
  },
  [UPDATE_APPLICATION_ERROR_CODE.ZIPCODE_MISSING_IN_ADDRESS]: {
    translationKey: "BB-update-application-error-message-zipcode-missing-in-address",
    value: "Zip/Postal code code is missing in address object."
  },
  [UPDATE_APPLICATION_ERROR_CODE.COUNTRY_CODE_MISSING_IN_ADDRESS]: {
    translationKey: "BB-update-application-error-message-country-missing-in-address",
    value: "Country code is missing in address object."
  },
  [UPDATE_APPLICATION_ERROR_CODE.INVALID_PREVIOUS_LEGAL_NAME]: {
    translationKey: "BB-update-application-error-message-invalid-previous-legal-name",
    value: "Please enter previously used legal full name following format: First Last."
  },
  [UPDATE_APPLICATION_ERROR_CODE.BGC_VALIDATION_FAILED]: {
    translationKey: "BB-update-application-error-message-bgc-validation-failed",
    value: "Additional background information is not valid, Please update all required fields."
  },
  [UPDATE_APPLICATION_ERROR_CODE.NHE_APT_MISSING_IN_REQUEST]: {
    translationKey: "BB-update-application-error-message-nhe-apt-missing",
    value: "nheAppointment object is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.REFERRAL_INFO_MISSING]: {
    translationKey: "BB-update-application-error-message-referral-missing",
    value: "Referral info is missing in request."
  },
  [UPDATE_APPLICATION_ERROR_CODE.ETHNICITY_IS_MISSING]: {
    translationKey: "BB-update-application-error-message-ethnicity-missing",
    value: "Ethnicity is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.GENDER_IS_MISSING]: {
    translationKey: "BB-update-application-error-message-gender-is-missing",
    value: "Gender is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.MILITARY_SPOUSE_MISSING]: {
    translationKey: "BB-update-application-error-message-military-service-missing",
    value: "Military spouse info is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.PROTECTED_VETERAN_MISSING]: {
    translationKey: "BB-update-application-error-message-protected-veteran-missing",
    value: "Veteran info is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.DISABILITY_IS_MISSING]: {
    translationKey: "BB-update-application-error-message-disability-missing",
    value: "Disability is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.CALI_DISCLOSURE_IS_MISSING]: {
    translationKey: "BB-update-application-error-message-cali-disclosure-missing",
    value: "hasBGCCaliforniaDisclosureAcknowledged is missing in payload."
  },
  [UPDATE_APPLICATION_ERROR_CODE.DUPLICATE_SSN]: {
    translationKey: "BB-update-application-error-message-duplication-ssn",
    value: 'The SSN or National Identity Number you entered is already associated with another email address in our system. If you have previously signed up with a different email address, please [Log Out](/application/logout) and try logging in with that email, using the "Forgot yourpersonal pin ?" link if needed. If you need help, please contact us via email or chat at <a href="https://hiring.amazon.com/contact-us#/">www.amazon.com/applicationhelp</a>."'
  },
  [UPDATE_APPLICATION_ERROR_CODE.CAN_NOT_CREATE_APPLICATION]: {
    translationKey: "BB-update-application-error-message-can-not-create-application",
    value: "You can not create application."
  },
  [UPDATE_APPLICATION_ERROR_CODE.UNABLE_CREATE_APPLICATION]: {
    translationKey: "BB-update-application-error-message-unable-create-application",
    value: "Unable to create application."
  }
}

export const GetJobInfoErrorMessages: { [key: string]: ApiErrorMessage } = {
  [GET_JOB_INFO_ERROR_CODE.FETCH_JOB_ERROR]: {
    translationKey: "BB-get-job-error-message-unable-fetch-job",
    value: "Unable to fetch job."
  }
}

export const GetScheduleListErrorMessages: { [key: string]: ApiErrorMessage } = {
  [GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE.NO_SCHEDULE_FOUND]: {
    translationKey: "BB-get-schedule-list-error-message-no-schedule-found",
    value:  "All Shifts Filled."
  },
  [GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE.FETCH_SHIFTS_ERROR]: {
    translationKey: "BB-get-schedule-list-error-message-fetch-shifts-failed",
    value: "Something went wrong while fetching jobs! Please refresh the page or try again later."
  },
  [GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE.SHIFTS_BAD_REQUEST]: {
    translationKey: "BB-get-schedule-list-error-message-shifts-bad-request",
    value: "Failed to retrieve jobs at the moment. Please try again after some time."
  },
  [GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE.ALL_SHIFT_FILLED]: {
    translationKey: "BB-get-schedule-list-error-message-all-shift-filled",
    value: "All Shifts Filled."
  },
}

export const GetScheduleDetailErrorMessage: { [key: string]: ApiErrorMessage } = {
  [GET_SCHEDULE_DETAIL_ERROR_CODE.FETCH_HCR_ERROR]: {
    translationKey: "BB-get-schedule-detail-error-message-fetch-hch-error",
    value: "Unable to fetch head count request."
  }
}

export const GetTimeSlotsErrorMessages: { [key: string]: ApiErrorMessage } = {
  [GET_NHE_TIME_SLOT_LIST_ERROR_CODE.ALL_SHIFT_FILLED]: {
    translationKey: "BB-get-time-slots-error-message-all-shift-filled",
    value: "All Shifts Filled."
  },
  [GET_NHE_TIME_SLOT_LIST_ERROR_CODE.FETCH_TIME_SLOT_ERROR]: {
    translationKey: "BB-get-time-slots-error-message-fetch_time-slot-error",
    value: "Something went wrong! Please refresh the page or try again later."
  },
  [GET_NHE_TIME_SLOT_LIST_ERROR_CODE.FETCH_SHIFTS_ERROR]: {
    translationKey: "BB-get-time-slots-error-message-fetch_shifts_error",
    value: "Something went wrong while fetching jobs! Please refresh the page or try again later."
  },
  [GET_NHE_TIME_SLOT_LIST_ERROR_CODE.FETCH_SHIFT_PREF_ERROR]: {
    translationKey: "BB-get-time-slots-error-message-fetch-shift-pref-error.",
    value: "Unable to fetch shift preferences."
  },
  [GET_NHE_TIME_SLOT_LIST_ERROR_CODE.SHIFTS_BAD_REQUEST]: {
    translationKey: "BB-get-time-slots-error-message-shift-bad-request",
    value: "Failed to retrieve jobs at the moment. Please try again after some time."
  }
};

export const GetCandidateErrorMessages: { [key: string]: ApiErrorMessage } = {
  [GET_CANDIDATE_ERROR_CODE.FAILED_GET_CANDIDATE]: {
    translationKey: "BB-get-candidate-error-message-failed-get-candidate",
    value: "Failed to get candidate."
  },
  [GET_CANDIDATE_ERROR_CODE.NO_ACCESS_TO_APPLICATION]: {
    translationKey: "BB-get-candidate-error-message-no-access-to-application",
    value: "You can not access this application."
  }
}