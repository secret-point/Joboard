import { Action } from "redux";
import { AlertMessage, CountryStateConfig } from "../../utils/types/common";

export enum GET_STATE_CONFIG_TYPE {
    GET = 'GET_STATE_CONFIG',
    SUCCESS = 'GET_STATE_CONFIG_SUCCESS',
    FAILED = 'GET_STATE_CONFIG_FAILED',
}

export enum GET_PAGE_ORDER_TYPE {
    GET = 'GET_PAGE_ORDER',
    SUCCESS = 'GET_PAGE_ORDER_SUCCESS',
    FAILED = 'GET_PAGE_ORDER_FAILED'
}

export enum BANNER_MESSAGE_TYPE {
    SET_BANNER_MESSAGE = "SET_BANNER_MESSAGE",
    RESET_BANNER_MESSAGE = "RESET_BANNER_MESSAGE",
}

export interface GetCountryStateConfigAction extends Action {
    type: GET_STATE_CONFIG_TYPE.GET;
}

export interface GetCountryStateConfigSuccessAction extends Action {
    type: GET_STATE_CONFIG_TYPE.SUCCESS;
    onSuccess?: Function;
    payload: CountryStateConfig;
}

export interface GetCountryStateConfigFailedAction extends Action {
    type: GET_STATE_CONFIG_TYPE.FAILED;
    payload: any; // Refine errorMessage type later
}

export interface SetBannerMessage extends Action {
    type: BANNER_MESSAGE_TYPE.SET_BANNER_MESSAGE,
    payload: AlertMessage
}
export interface ResetBannerMessage extends Action {
    type: BANNER_MESSAGE_TYPE.RESET_BANNER_MESSAGE
}

export interface GetPageOrderAction extends Action {
    type: GET_PAGE_ORDER_TYPE.GET;
}

export interface GetPageOrderSuccessAction extends Action {
    type: GET_PAGE_ORDER_TYPE.SUCCESS;
    onSuccess?: Function;
    payload: CountryStateConfig;
}

export interface GetPageOrderFailedAction extends Action {
    type: GET_PAGE_ORDER_TYPE.FAILED;
    payload: any; // Refine errorMessage type later
}

export type UI_ACTION =
  GetCountryStateConfigAction |
  GetCountryStateConfigSuccessAction |
  GetCountryStateConfigFailedAction |
  GetPageOrderAction |
  GetPageOrderSuccessAction |
  GetPageOrderFailedAction |
  SetBannerMessage |
  ResetBannerMessage;
