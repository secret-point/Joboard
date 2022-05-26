import { Action } from "redux";
import { Application } from "../../utils/types/common";
import { 
    CreateApplicationRequestDS, 
    CreateApplicationResponseDS,
    GetApplicationRequest
} from "../../utils/apiTypes";

export enum GET_APPLICATION_TYPE {
    GET = 'GET_APPLICATION',
    SUCCESS = 'GET_APPLICATION_SUCCESS',
    FAILED = 'GET_APPLICATION_FAILED',
    RESET = 'RESET_JOB_DETAIL',
}

export enum CREATE_APPLICATION_TYPE {
    CREATE = 'CREATE_APPLICATION',
    SUCCESS = 'CREATE_APPLICATION_SUCCESS',
    FAILED = 'CREATE_APPLICATION_FAILED',
}

export type GET_APPLICATION_ACTIONS = GetApplicationAction
    | GetApplicationSuccessAction
    | GetApplicationFailedAction
    | ResetApplicationAction

export type CREATE_APPLICATION_ACTIONS = CreateApplicationActionDS
    | CreateApplicationSuccessActionDS
    | CreateApplicationFailedActionDS

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

export interface CreateApplicationActionDS extends Action {
    type: CREATE_APPLICATION_TYPE.CREATE;
    payload: CreateApplicationRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface CreateApplicationSuccessActionDS extends Action {
    type: CREATE_APPLICATION_TYPE.SUCCESS;
    payload: CreateApplicationResponseDS;
}

export interface CreateApplicationFailedActionDS extends Action {
    type: CREATE_APPLICATION_TYPE.FAILED;
    payload: any;
}
