import { Action } from "redux";
import { GetJobDetailRequest } from "../../utils/apiTypes";
import { Job } from "../../utils/types/common";

export enum GET_JOB_DETAIL_TYPE {
    GET = 'GET_JOB_DETAIL',
    SUCCESS = 'GET_JOB_DETAIL_SUCCESS',
    FAILED = 'GET_JOB_DETAIL_FAILED',
    RESET = 'RESET_JOB_DETAIL',
}

export type JOB_DETAIL_ACTIONS = GetJobDetailAction
    | GetJobDetailSuccessAction
    | GetJobDetailFailedAction
    | ResetJobDetailAction

export interface GetJobDetailAction extends Action {
    type: GET_JOB_DETAIL_TYPE.GET;
    payload: GetJobDetailRequest;
}

export interface GetJobDetailSuccessAction extends Action {
    type: GET_JOB_DETAIL_TYPE.SUCCESS;
    payload: Job;
    loadingStatus: boolean
}

export interface GetJobDetailFailedAction extends Action {
    type: GET_JOB_DETAIL_TYPE.FAILED;
    payload: any;
}

export interface ResetJobDetailAction extends Action {
    type: GET_JOB_DETAIL_TYPE.RESET;
    callback?: Function;
}
