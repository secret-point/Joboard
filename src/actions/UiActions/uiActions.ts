import { AlertMessage, CountryStateConfig } from "../../utils/types/common";
import {
  BANNER_MESSAGE_TYPE,
  GET_STATE_CONFIG_TYPE,
  GetCountryStateConfigAction,
  GetCountryStateConfigSuccessAction,
  HideAppLoaderAction,
  HidePageLoaderAction,
  ResetBannerMessage,
  SetBannerMessage,
  ShowAppLoaderAction,
  ShowPageLoaderAction,
  UI_STATE_TYPES
} from "./uiActionTypes";

export const actionGetCountryStateConfig = (): GetCountryStateConfigAction => {
  return { type: GET_STATE_CONFIG_TYPE.GET };
};

export const actionGetCountryStateConfigActionSuccess = (
  payload: CountryStateConfig,
  onSuccess?: Function,
): GetCountryStateConfigSuccessAction => {
  return { type: GET_STATE_CONFIG_TYPE.SUCCESS, payload, onSuccess };
};

export const actionGetCountryStateConfigActionFailed = ( payload: any ) => { // Refine errorMessage type later): GetCountryStateConfigFailedAction
  return { type: GET_STATE_CONFIG_TYPE.FAILED, payload };
};

export const actionSetBannerMessage = (payload: AlertMessage): SetBannerMessage => {
  return {
    type: BANNER_MESSAGE_TYPE.SET_BANNER_MESSAGE,
    payload
  };
};

export const actionResetBannerMessage = (): ResetBannerMessage => {
  return {
    type: BANNER_MESSAGE_TYPE.RESET_BANNER_MESSAGE
  };
};

export const actionShowAppLoader = (): ShowAppLoaderAction => {
  return {
    type: UI_STATE_TYPES.SHOW_WOTC_LOADER
  };
};

export const actionHideAppLoader = (): HideAppLoaderAction => {
  return {
    type: UI_STATE_TYPES.HIDE_WOTC_LOADER
  };
};

export const actionHidePageLoader = (): HidePageLoaderAction => {
  return {
    type: UI_STATE_TYPES.HIDE_LOADER
  };
};

export const actionShowPageLoader = (): ShowPageLoaderAction => {
  return {
    type: UI_STATE_TYPES.SHOW_LOADER
  };
};

