import { Action } from "redux";
import { EnvConfig, AppConfig } from "../../utils/types/common";

export enum GET_INITIAL_APP_CONFIG_TYPE {
  GET = "GET_INITIAL_APP_CONFIG",
  SUCCESS = "GET_INITIAL_APP_CONFIG_SUCCESS",
  FAILED = "GET_INITIAL_APP_CONFIG_FAILED"
}

export interface GetInitialAppConfigAction extends Action {
  type: GET_INITIAL_APP_CONFIG_TYPE.GET;
}

export interface GetInitialAppConfigSuccessAction extends Action {
  type: GET_INITIAL_APP_CONFIG_TYPE.SUCCESS;
  onSuccess?: Function;
  payload: AppConfig;
  loadingStatus: boolean;
}

export interface GetInitialAppConfigFailedAction extends Action {
  type: GET_INITIAL_APP_CONFIG_TYPE.FAILED;
  payload: any; // Refine errorMessage type later
}

export enum GET_ENV_CONFIG_TYPE {
  GET = "GET_APP_CONFIG",
  SUCCESS = "GET_APP_CONFIG_SUCCESS",
  FAILED = "GET_APP_CONFIG_FAILED"
}

export interface GetEnvConfigAction extends Action {
  type: GET_ENV_CONFIG_TYPE.GET;
}

export interface GetEnvConfigSuccessAction extends Action {
  type: GET_ENV_CONFIG_TYPE.SUCCESS;
  onSuccess?: Function;
  payload: EnvConfig;
  loadingStatus: boolean;
}

export interface GetEnvConfigFailedAction extends Action {
  type: GET_ENV_CONFIG_TYPE.FAILED;
  payload: any; // Refine errorMessage type later
}

export type APP_CONFIG_ACTIONS = GetEnvConfigAction
| GetEnvConfigSuccessAction
| GetEnvConfigFailedAction
| GetInitialAppConfigAction
| GetInitialAppConfigSuccessAction
| GetInitialAppConfigFailedAction;
