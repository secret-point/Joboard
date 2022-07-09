import { CREATE_APPLICATION_ERROR_CODE, UPDATE_APPLICATION_ERROR_CODE } from "../enums/common";

//TODO NEED TO REFECTOR TO SUPPORT MLS
export const CreateApplicationErrorMessage: {[key: string]: string} = {
  [CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST]: "Sorry, you have already applied for this job!",
  [CREATE_APPLICATION_ERROR_CODE.MISSING_REQUIRED_FIELDS]: "Required fields are missing",
  [CREATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR]: "Something went wrong with the server. Please try again or refresh the browser.",
  [CREATE_APPLICATION_ERROR_CODE.CANDIDATE_IS_INACTIVE]: "Candidate is inactive. Cannot create application for candidate",
  [CREATE_APPLICATION_ERROR_CODE.CANDIDATE_NOT_FOUND]: "Candidate not found",
  [CREATE_APPLICATION_ERROR_CODE.VERSION_MISMATCH]: "Application cannot be updated because there exist more recent update",
  "DEFAULT": "Unable to create application."
}
//TODO NEED TO REFECTOR TO SUPPORT MLS
export const UpdateApplicationErrorMessage: {[key: string]: string} = {
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_ID_DOES_NOT_MATCH]: "Application Id does not match the id in the request path",
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_NOT_FOUND]: "Cannot find the application",
  [UPDATE_APPLICATION_ERROR_CODE.MISSING_REQUIRED_FIELDS]: "Required fields are missing: ApplicationId",
  [UPDATE_APPLICATION_ERROR_CODE.VERSION_MISMATCH]: "Application cannot be updated because there exist more recent update",
  [UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR]: "Something went wrong with the server. Please try again or refresh the browser.",
  [UPDATE_APPLICATION_ERROR_CODE.CANDIDATE_NOT_AUTHORIZED]: "you can not access this application",
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_FCRA_ACKNOWLEDGEMENT]: "Please sign the acknowledgement",
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_FCRA_REQUEST]: "Please sign fcra request",
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_NON_FCRA_ACKNOWLEDGEMENT]: "Please sign the acknowledgement",
  [UPDATE_APPLICATION_ERROR_CODE.SIGN_NON_FCRA_STATE_NOTICE]: "Please sign the state notices",
  [UPDATE_APPLICATION_ERROR_CODE.SELECTED_SCHEDULE_NOT_AVAILABLE]: "The schedule you have selected is no longer available, please select another schedule.",
  [UPDATE_APPLICATION_ERROR_CODE.MISMATCH_SIGNATURES]: "eSignatures do not match. Please use the same text for each eSignature.",
  [UPDATE_APPLICATION_ERROR_CODE.MAX_SSN_EDITS]: "Update to application failed because you have reached the maximum number of changes to your National ID. If you have previously signed up with a different email address, please [Log Out](/logout) and try logging in with that email, using the \"Forgot your personal pin?\" link if needed. If you need help, please contact us via email or chat at [www.amazon.com/applicationhelp](https://www.amazondelivers.jobs/contactus)",
  [UPDATE_APPLICATION_ERROR_CODE.INVALID_SSN]: "Update to application failed because provided National Identity Number is invalid. Please enter correct and complete National Identity Number before proceeding.",
  [UPDATE_APPLICATION_ERROR_CODE.TYPE_OF_REQUEST_MISSING]: "Type of the request is missing",
  [UPDATE_APPLICATION_ERROR_CODE.TYPE_NOT_MATCH_WITH_REQUEST]: "Type is not matched with request",
  [UPDATE_APPLICATION_ERROR_CODE.DOB_MISSING_IN_REQUEST]: "Date of birth is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.PROVIDE_DOB]: "Please provide valid date",
  [UPDATE_APPLICATION_ERROR_CODE.APPLICATION_ID_MISSING]: "applicationId is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.GOVERNMENT_TYPE_MISSING_IN_REQUEST]: "Government id type is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.ID_NUMBER_MISSING_IN_REQUEST]: "Id number is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.HAS_CRIMINAL_IN_SEVEN_YEARS_MISSING]: "hasCriminalRecordWithinSevenYears is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.ADDRESS_LINE1_MISSING]: "address line 1 is missing in address object",
  [UPDATE_APPLICATION_ERROR_CODE.CITY_IS_MISSING_IN_ADDRESS]: "city is missing in address object",
  [UPDATE_APPLICATION_ERROR_CODE.STATE_IS_MISSING_IN_ADDRESS]: "state is missing in address object",
  [UPDATE_APPLICATION_ERROR_CODE.ZIPCODE_MISSING_IN_ADDRESS]: "zip code code is missing in address object",
  [UPDATE_APPLICATION_ERROR_CODE.COUNTRY_CODE_MISSING_IN_ADDRESS]: "country code is missing in address object",
  [UPDATE_APPLICATION_ERROR_CODE.INVALID_PREVIOUS_LEGAL_NAME]: "Please enter previously used legal full name following format: First Last",
  [UPDATE_APPLICATION_ERROR_CODE.BGC_VALIDATION_FAILED]: "Additional background information is not valid, Please update all required fields",
  [UPDATE_APPLICATION_ERROR_CODE.NHE_APT_MISSING_IN_REQUEST]: "nheAppointment object is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.REFERRAL_INFO_MISSING]: "Referral info is missing in request",
  [UPDATE_APPLICATION_ERROR_CODE.ETHNICITY_IS_MISSING]: "Ethnicity is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.GENDER_IS_MISSING]: "Gender is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.MILITARY_SPOUSE_MISSING]: "Military spouse info is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.PROTECTED_VETERAN_MISSING]: "Veteran info is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.DISABILITY_IS_MISSING]: "Disability is missing in payload",
  [UPDATE_APPLICATION_ERROR_CODE.CALI_DISCLOSURE_IS_MISSING]: "hasBGCCaliforniaDisclosureAcknowledged is missing in payload"
}