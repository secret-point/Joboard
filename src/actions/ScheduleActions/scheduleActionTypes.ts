import { Action } from "redux";
import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import { Schedule, ScheduleStateFilters } from "../../utils/types/common";

export enum SCHEDULE_ACTION_TYPE {
    GET_LIST_BY_JOB = 'GET_SCHEDULE_LIST_BY_JOB_ID',
    GET_LIST_BY_JOB_SUCCESS = 'GET_SCHEDULE_LIST_BY_JOB_ID_SUCCESS',
    GET_LIST_BY_JOB_FAILED = 'GET_SCHEDULE_LIST_BY_JOB_ID_FAILED',
    GET_DETAIL = "GET_SCHEDULE_DETAIL",
    GET_DETAIL_SUCCESS = "GET_SCHEDULE_DETAIL_SUCCESS",
    GET_DETAIL_FAILED = "GET_SCHEDULE_DETAIL_FAILED",
    UPDATE_FILTERS = "UPDATE_SCHEDULE_FILTERS"
}

export interface GetScheduleListByJobIdAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB;
    payload: GetScheduleListByJobIdRequest;
}

export interface GetScheduleListByJobIdSuccessAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS;
    payload: Schedule[];
    loadingStatus: boolean
}

export interface GetScheduleListByJobIdFailedAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED;
    payload: any;
}

export interface GetScheduleDetailAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_DETAIL;
    payload: GetScheduleDetailRequest;
    onSuccess?: Function,
    onError?: Function
}

export interface GetScheduleDetailSuccessAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS;
    payload: Schedule;
    loadingStatus: boolean;
}

export interface GetScheduleDetailFailedAction extends Action {
    type: SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED;
    payload: any;
}

export interface UpdateScheduleFiltersAction extends Action {
    type: SCHEDULE_ACTION_TYPE.UPDATE_FILTERS;
    payload: ScheduleStateFilters
}

export type ScheduleActions =
    GetScheduleListByJobIdAction |
    GetScheduleListByJobIdSuccessAction |
    GetScheduleListByJobIdFailedAction |
    GetScheduleDetailAction |
    GetScheduleDetailSuccessAction |
    GetScheduleDetailFailedAction |
    UpdateScheduleFiltersAction;
