import { loadingStatusHelper } from "../../utils/helper";
import { AppConfig, EnvConfig } from "../../utils/types/common";
import {
  GET_ENV_CONFIG_TYPE,
  GET_INITIAL_APP_CONFIG_TYPE,
  GetEnvConfigAction,
  GetEnvConfigSuccessAction,
  GetInitialAppConfigAction,
  GetInitialAppConfigSuccessAction,
} from "./appConfigActionTypes";

export const actionGetInitialAppConfig = (): GetInitialAppConfigAction => {
  return { type: GET_INITIAL_APP_CONFIG_TYPE.GET };
};

export const actionGetInitialAppConfigActionSuccess = ( payload: AppConfig, onSuccess?: Function ): GetInitialAppConfigSuccessAction => {
  return { type: GET_INITIAL_APP_CONFIG_TYPE.SUCCESS, payload, onSuccess, loadingStatus: loadingStatusHelper() };
};

export const actionGetInitialAppConfigActionFailed = ( payload: any ) => {// Refine errorMessage type later): GetInitialAppConfigFailedAction
  return { type: GET_INITIAL_APP_CONFIG_TYPE.FAILED, payload };
};

export const actionGetEnvConfig = (): GetEnvConfigAction => {
  return { type: GET_ENV_CONFIG_TYPE.GET };
};

export const actionGetEnvConfigActionSuccess = ( payload: EnvConfig, onSuccess?: Function ): GetEnvConfigSuccessAction => {
  return { type: GET_ENV_CONFIG_TYPE.SUCCESS, payload, onSuccess, loadingStatus: loadingStatusHelper() };
};

export const actionGetEnvConfigActionFailed = ( payload: any ) => {// Refine errorMessage type later GetEnvConfigFailedAction
  return { type: GET_ENV_CONFIG_TYPE.FAILED, payload };
};
