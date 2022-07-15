import { UpdateWotcStatusAction, UpdateWotcStatusFailedAction, UpdateWotcStatusSuccessAction, WOTC_ACTION_TYPES } from "./wotcActionTypes";

export const actionUpdateWotcStatus = (payload: any, onSuccess?: Function, onError?: Function): UpdateWotcStatusAction => {
  return {
    type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS,
    payload,
    onSuccess,
    onError
  }
}

export const actionUpdateWotcStatusSuccess = (payload: any): UpdateWotcStatusSuccessAction => {
  return {
    type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS_SUCCESS,
    payload
  }
}

export const actionUpdateWotcStatusFailed = (payload: any): UpdateWotcStatusFailedAction => {
  return {
    type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS_FAILED,
    payload
  }
}
