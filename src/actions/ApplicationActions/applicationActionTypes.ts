import { Action } from "redux";
import { Application } from "../../utils/types/common";
import { 
    CreateApplicationAndSkipScheduleRequestDS,
    CreateApplicationRequestDS, 
    GetApplicationRequest,
    UpdateApplicationRequestDS,
    UpdateWorkflowNameRequest
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

export enum UPDATE_APPLICATION_TYPE {
    UPDATE = 'UPDATE_APPLICATION',
    SUCCESS = 'UPDATE_APPLICATION_SUCCESS',
    FAILED = 'UPDATE_APPLICATION_FAILED',
}

export enum UPDATE_WORKFLOW_NAME_TYPE {
    UPDATE = 'UPDATE_WORKFLOW_NAME',
    SUCCESS = 'UPDATE_WORKFLOW_NAME_SUCCESS',
    FAILED = 'UPDATE_WORKFLOW_NAME_FAILED',
}

export enum CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE {
    CREATE = 'CREATE_APPLICATION_AND_SKIP_SCHEDULE',
    SUCCESS = 'CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS',
    FAILED = 'CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED',
}

export type GET_APPLICATION_ACTIONS = GetApplicationAction
    | GetApplicationSuccessAction
    | GetApplicationFailedAction
    | ResetApplicationAction

export type CREATE_APPLICATION_ACTIONS = CreateApplicationActionDS
    | CreateApplicationSuccessActionDS
    | CreateApplicationFailedActionDS

export type UPDATE_APPLICATION_ACTIONS = UpdateApplicationActionDS
    | UpdateApplicationSuccessActionDS
    | UpdateApplicationFailedActionDS

export type CREATE_APPLICATION_AND_SKIP_SCHEDULE_ACTIONS = CreateApplicationAndSkipScheduleActionDS
    | CreateApplicationAndSkipScheduleSuccessActionDS
    | CreateApplicationAndSkipScheduleFailedActionDS

export type UPDATE_WORKFLOW_NAME_ACTIONS = UpdateWorkflowStepNameAction
    | UpdateWorkflowStepNameSuccessAction
    | UpdateWorkflowStepNameFailedAction

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
    payload: Application;
}

export interface CreateApplicationFailedActionDS extends Action {
    type: CREATE_APPLICATION_TYPE.FAILED;
    payload: any;
}

export interface UpdateApplicationActionDS extends Action {
    type: UPDATE_APPLICATION_TYPE.UPDATE;
    payload: UpdateApplicationRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface UpdateApplicationSuccessActionDS extends Action {
    type: UPDATE_APPLICATION_TYPE.SUCCESS;
    payload: Application;
}

export interface UpdateApplicationFailedActionDS extends Action {
    type: UPDATE_APPLICATION_TYPE.FAILED;
    payload: any;
}

export interface CreateApplicationAndSkipScheduleActionDS extends Action {
    type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.CREATE;
    payload: CreateApplicationAndSkipScheduleRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface CreateApplicationAndSkipScheduleSuccessActionDS extends Action {
    type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS;
    payload: Application;
}

export interface CreateApplicationAndSkipScheduleFailedActionDS extends Action {
    type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.FAILED;
    payload: any;
}

export interface UpdateWorkflowStepNameAction extends Action {
    type: UPDATE_WORKFLOW_NAME_TYPE.UPDATE;
    payload: UpdateWorkflowNameRequest;
    onSuccess?: Function;
    onError?: Function;
}

export interface UpdateWorkflowStepNameSuccessAction extends Action {
    type: UPDATE_WORKFLOW_NAME_TYPE.SUCCESS;
    payload: Application;
}

export interface UpdateWorkflowStepNameFailedAction extends Action {
    type: UPDATE_WORKFLOW_NAME_TYPE.FAILED;
    payload: any;
}