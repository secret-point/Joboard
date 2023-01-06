import { Action } from "redux";
import { VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE } from "../../utils/enums/common";
import { ValidateAmazonLoginIDRequest } from "../../utils/types/common";

export enum THANK_YOU_ACTION_TYPES {
  VALIDATE_AMAZON_LOGIN_ID = "VALIDATE_AMAZON_LOGIN_ID",
  VALIDATE_AMAZON_LOGIN_ID_SUCCESS = "VALIDATE_AMAZON_LOGIN_ID_SUCCESS",
  VALIDATE_AMAZON_LOGIN_ID_FAILED = "VALIDATE_AMAZON_LOGIN_ID_FAILED",
  UPDATE_REFERRAL_FORM = "UPDATE_REFERRAL_FORM",
}

export interface ValidateAmamzonLoginIDAction extends Action {
  type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID;
  payload: ValidateAmazonLoginIDRequest;
  onSuccess?: Function;
  onError?: Function;
}

export interface ValidateAmamzonLoginIDSuccessAction extends Action {
  type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_SUCCESS;
}

export interface ValidateAmamzonLoginIDFailedAction extends Action {
  type: THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_FAILED;
}

export interface UpdateReferralFormAction extends Action {
  type: THANK_YOU_ACTION_TYPES.UPDATE_REFERRAL_FORM;
  errorCode: VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE;
}

export type ThankYouActions =
    ValidateAmamzonLoginIDAction |
    ValidateAmamzonLoginIDSuccessAction |
    ValidateAmamzonLoginIDFailedAction |
    UpdateReferralFormAction;
