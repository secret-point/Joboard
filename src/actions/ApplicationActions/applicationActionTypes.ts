import { Action } from "redux";
import { GetApplicationRequest } from "../../utils/apiTypes";
import { Application } from "../../utils/types/common";

export enum GET_APPLICATION_TYPE {
    GET = 'GET_APPLICATION',
    SUCCESS = 'GET_APPLICATION_SUCCESS',
    FAILED = 'GET_APPLICATION_FAILED',
    RESET = 'RESET_JOB_DETAIL',
}

export type GET_APPLICATION_ACTIONS = GetApplicationAction
    | GetApplicationSuccessAction
    | GetApplicationFailedAction
    | ResetApplicationAction

export interface GetApplicationAction extends Action {
    type: GET_APPLICATION_TYPE.GET;
    payload: GetApplicationRequest;
}

export interface GetApplicationSuccessAction extends Action {
    type: GET_APPLICATION_TYPE.SUCCESS;
    payload: Application;
}

export interface GetApplicationFailedAction extends Action {
    type: GET_APPLICATION_TYPE.FAILED;
    payload: any;
}

export interface ResetApplicationAction extends Action {
    type: GET_APPLICATION_TYPE.RESET;
    callback?: Function;
}
