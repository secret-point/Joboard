import { FormInputItem } from "../utils/types/common";
import { ThankYouActions, THANK_YOU_ACTION_TYPES } from "../actions/ThankYouActions/thankYouActionTypes";
import { ValidateAmazonLoginIDErrorMessages } from "../utils/api/errorMessages";
import { VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE } from "../utils/enums/common";

export interface ThankYouState {
  referralFormInputConfig: FormInputItem;
}

export const initThankYouState: ThankYouState = {
  referralFormInputConfig: {
    hasError: false,
    labelText: "Please provide your referrer login ID (lower case letters only)",
    labelTranslationKey: "BB-ThankYou-referral-login-label-text",
    errorMessage: "Please provide your referrer login ID.",
    errorMessageTranslationKey: "BB-ThankYou-referral-login-empty-error-text",
    required: true,
    name: "referralInfo",
    id: "referral-employee-name",
    dataKey: "jobReferral.referralInfo",
    type: "text"
  }
};

export default function thankYouReducer(state: ThankYouState = initThankYouState, action: ThankYouActions | any): ThankYouState {
  switch (action.type) {
    case THANK_YOU_ACTION_TYPES.UPDATE_REFERRAL_FORM:
      // return if error code is null/undefined
      if (!action.errorCode) {
        return state;
      }

      const errorMessageMap = ValidateAmazonLoginIDErrorMessages[action.errorCode]
                || ValidateAmazonLoginIDErrorMessages[VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE.REFERRAL_VALIDATION_ERROR];
      return {
        ...state,
        referralFormInputConfig: {
          ...state.referralFormInputConfig,
          hasError: true,
          errorMessage: errorMessageMap.value,
          errorMessageTranslationKey: errorMessageMap.translationKey,
        }
      };
    default:
      return state;
  }
}
