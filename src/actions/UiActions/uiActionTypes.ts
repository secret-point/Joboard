import { Action } from "redux";
import { CountryStateConfig } from "../../utils/types/common";
import { JOB_OPPORTUNITY_PAGE } from "../../utils/enums/common";

export enum GET_STATE_CONFIG_TYPE {
    GET = 'GET_STATE_CONFIG',
    SUCCESS = 'GET_STATE_CONFIG_SUCCESS',
    FAILED = 'GET_STATE_CONFIG_FAILED',
    SET_JOB_OPPORTUNITY_PAGE = 'SET_JOB_OPPORTUNITY_PAGE'
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

export interface SetJobOpportunityPageAction extends Action {
    type: GET_STATE_CONFIG_TYPE.SET_JOB_OPPORTUNITY_PAGE;
    payload: JOB_OPPORTUNITY_PAGE
}

export type UI_ACTION = GetCountryStateConfigAction
    | GetCountryStateConfigSuccessAction
    | GetCountryStateConfigFailedAction
    | GetPageOrderAction
    | GetPageOrderSuccessAction
    | GetPageOrderFailedAction |
    SetJobOpportunityPageAction;
