import { Action } from "redux";

export enum WOTC_ACTION_TYPES {
  UPDATE_WOTC_STATUS = "UPDATE_WOTC_STATUS",
  UPDATE_WOTC_STATUS_SUCCESS = "UPDATE_WOTC_STATUS_SUCCESS",
  UPDATE_WOTC_STATUS_FAILED = "UPDATE_WOTC_STATUS_FAILED"
}

export interface UpdateWotcStatusAction extends Action {
  type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS;
  // TODO: any
  payload: any;
  onSuccess?: Function;
  onError?: Function;
}

export interface UpdateWotcStatusSuccessAction extends Action {
  type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS_SUCCESS;
  // TODO: any
  payload: any;
}

export interface UpdateWotcStatusFailedAction extends Action {
  type: WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS_FAILED;
  payload: any;
}

export type WotcStatusActions =
    UpdateWotcStatusAction |
    UpdateWotcStatusSuccessAction |
    UpdateWotcStatusFailedAction ;
