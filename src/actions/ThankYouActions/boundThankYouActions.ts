import store from "../../store/store";
import { VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE } from "../../utils/enums/common";
import { ValidateAmazonLoginIDRequest } from "../../utils/types/common";
import { actionUpdateReferralForm, actionValidateAmazonLoginId } from "./thankYouActions";

export const boundValidateAmazonLoginId = (payload: ValidateAmazonLoginIDRequest, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionValidateAmazonLoginId(payload, onSuccess, onError));

export const boundUpdateReferralForm = (errorCode: VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE) =>
  store.dispatch(actionUpdateReferralForm(errorCode));
