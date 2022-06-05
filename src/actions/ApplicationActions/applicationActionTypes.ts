import { Action } from "redux";
import { Application } from "../../utils/types/common";
import {
    CreateApplicationAndSkipScheduleRequestDS,
    CreateApplicationRequestDS,
    GetApplicationRequest,
    UpdateApplicationRequestDS,
    UpdateWorkflowNameRequest
} from "../../utils/apiTypes";

export enum APPLICATION_ACTION_TYPES {
    GET_APPLICATION = "GET_APPLICATION",
    GET_APPLICATION_SUCCESS = "GET_APPLICATION_SUCCESS",
    GET_APPLICATION_FAILED = "GET_APPLICATION_FAILED",
    RESET_JOB_DETAIL = 'RESET_JOB_DETAIL',
    CREATE_APPLICATION = 'CREATE_APPLICATION',
    CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS',
    CREATE_APPLICATION_FAILED = 'CREATE_APPLICATION_FAILED',
    UPDATE_APPLICATION = 'UPDATE_APPLICATION',
    UPDATE_APPLICATION_SUCCESS = 'UPDATE_APPLICATION_SUCCESS',
    UPDATE_APPLICATION_FAILED = 'UPDATE_APPLICATION_FAILED',
    UPDATE_WORKFLOW_NAME = 'UPDATE_APPLICATION_SUCCESS_WORKFLOW_NAME',
    UPDATE_WORKFLOW_NAME_SUCCESS = 'UPDATE_APPLICATION_WORKFLOW_NAME_SUCCESS',
    UPDATE_WORKFLOW_NAME_FAILED = 'UPDATE_APPLICATION_WORKFLOW_NAME_FAILED',
    CREATE_APPLICATION_AND_SKIP_SCHEDULE ='CREATE_APPLICATION_AND_SKIP_SCHEDULE',
    CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS = 'CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS',
    CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED = 'CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED'
}

export interface GetApplicationAction extends Action {
    type: APPLICATION_ACTION_TYPES.GET_APPLICATION;
    payload: GetApplicationRequest;
}

export interface GetApplicationSuccessAction extends Action {
    type: APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS;
    payload: Application;
}

export interface GetApplicationFailedAction extends Action {
    type: APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED;
    payload: any;
}

export interface ResetApplicationAction extends Action {
    type: APPLICATION_ACTION_TYPES.RESET_JOB_DETAIL;
    callback?: Function;
}

export interface CreateApplicationActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION;
    payload: CreateApplicationRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface CreateApplicationSuccessActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_SUCCESS;
    payload: Application;
}

export interface CreateApplicationFailedActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_FAILED;
    payload: any;
}

export interface UpdateApplicationActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION;
    payload: UpdateApplicationRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface UpdateApplicationSuccessActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS;
    payload: Application;
}

export interface UpdateApplicationFailedActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_FAILED;
    payload: any;
}

export interface CreateApplicationAndSkipScheduleActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE;
    payload: CreateApplicationAndSkipScheduleRequestDS;
    onSuccess?: Function;
    onError?: Function;
}

export interface CreateApplicationAndSkipScheduleSuccessActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS;
    payload: Application;
}

export interface CreateApplicationAndSkipScheduleFailedActionDS extends Action {
    type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED;
    payload: any;
}

export interface UpdateWorkflowStepNameAction extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME;
    payload: UpdateWorkflowNameRequest;
    onSuccess?: Function;
    onError?: Function;
}

export interface UpdateWorkflowStepNameSuccessAction extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_SUCCESS;
    payload: Application;
}

export interface UpdateWorkflowStepNameFailedAction extends Action {
    type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_FAILED;
    payload: any;
}

export type ApplicationActionTypes =
    UpdateWorkflowStepNameAction |
    UpdateWorkflowStepNameSuccessAction |
    UpdateWorkflowStepNameFailedAction |
    CreateApplicationAndSkipScheduleActionDS |
    CreateApplicationAndSkipScheduleSuccessActionDS |
    CreateApplicationAndSkipScheduleFailedActionDS |
    UpdateApplicationActionDS |
    UpdateApplicationSuccessActionDS |
    UpdateApplicationFailedActionDS |
    CreateApplicationActionDS |
    CreateApplicationSuccessActionDS |
    CreateApplicationFailedActionDS |
    GetApplicationAction |
    GetApplicationSuccessAction |
    GetApplicationFailedAction |
    ResetApplicationAction;
