import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import {
    GetScheduleDetailAction, GetScheduleDetailFailedAction, GetScheduleDetailSuccessAction,
    GetScheduleListByJobIdAction,
    GetScheduleListByJobIdFailedAction,
    GetScheduleListByJobIdSuccessAction,
    SCHEDULE_ACTION_TYPE
} from "./scheduleActionTypes";
import { Schedule } from "../../utils/types/common";

export const actionGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest ): GetScheduleListByJobIdAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB, payload }
};

export const actionGetScheduleListByJobIdSuccess = ( payload: Schedule[] ): GetScheduleListByJobIdSuccessAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS, payload }
};

export const actionGetScheduleListByJobIdFailed = ( payload: any ): GetScheduleListByJobIdFailedAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED, payload }
};

export const actionGetScheduleDetail = ( payload: GetScheduleDetailRequest ): GetScheduleDetailAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL, payload }
};

export const actionGetScheduleDetailSuccess = ( payload: Schedule): GetScheduleDetailSuccessAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS, payload }
};

export const actionGetScheduleDetailFailed = ( payload: any ): GetScheduleDetailFailedAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED, payload }
};
