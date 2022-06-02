import { Action } from "redux";
import { CountryStateConfig } from "../../utils/types/common";

export enum GET_STATE_CONFIG_TYPE {
    GET = 'GET_STATE_CONFIG',
    SUCCESS = 'GET_STATE_CONFIG_SUCCESS',
    FAILED = 'GET_STATE_CONFIG_FAILED'
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

export enum GET_PAGE_ORDER_TYPE {
    GET = 'GET_PAGE_ORDER',
    SUCCESS = 'GET_PAGE_ORDER_SUCCESS',
    FAILED = 'GET_PAGE_ORDER_FAILED'
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

export enum WORKFLOW_REQUEST {
    INIT = 'WORKFLOW_REQUEST_INIT',
    START = 'WORKFLOW_REQUEST_START',
    END = 'WORKFLOW_REQUEST_END',
}

export interface WorkflowRequestInitAction extends Action {
    type: WORKFLOW_REQUEST.INIT;
}

export interface WorkflowRequestStartAction extends Action {
    type: WORKFLOW_REQUEST.START;
}

export interface WorkflowRequestEndAction extends Action {
    type: WORKFLOW_REQUEST.END;
}

export type UI_ACTION = GetCountryStateConfigAction
    | GetCountryStateConfigSuccessAction
    | GetCountryStateConfigFailedAction
    | GetPageOrderAction
    | GetPageOrderSuccessAction
    | GetPageOrderFailedAction
    | WorkflowRequestInitAction
    | WorkflowRequestStartAction
    | WorkflowRequestEndAction;
