import { VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE } from "../../utils/enums/common";
import { ValidateAmazonLoginIDRequest } from "../../utils/types/common";
import {
  THANK_YOU_ACTION_TYPES,
  ValidateAmamzonLoginIDAction,
  ValidateAmamzonLoginIDSuccessAction,
  ValidateAmamzonLoginIDFailedAction,
  UpdateReferralFormAction
} from "./thankYouActionTypes";

export const actionValidateAmazonLoginId = (payload: ValidateAmazonLoginIDRequest, onSuccess?: Function, onError?: Function): ValidateAmamzonLoginIDAction => {
  return {
    type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID,
    payload,
    onSuccess,
    onError
  };
};

export const actionValidateAmazonLoginIdSuccess = (): ValidateAmamzonLoginIDSuccessAction => {
  return {
    type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_SUCCESS,
  };
};

export const actionValidateAmazonLoginIdFailed = (): ValidateAmamzonLoginIDFailedAction => {
  return {
    type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_FAILED,
  };
};

export const actionUpdateReferralForm = (errorCode: VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE): UpdateReferralFormAction => {
  return {
    type: THANK_YOU_ACTION_TYPES.UPDATE_REFERRAL_FORM,
    errorCode
  };
};