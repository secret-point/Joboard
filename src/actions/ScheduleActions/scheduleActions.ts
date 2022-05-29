import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import {
    GetScheduleDetailAction,
    GetScheduleDetailFailedAction,
    GetScheduleDetailSuccessAction,
    GetScheduleListByJobIdAction,
    GetScheduleListByJobIdFailedAction,
    GetScheduleListByJobIdSuccessAction,
    SCHEDULE_ACTION_TYPE,
    UpdateScheduleFiltersAction
} from "./scheduleActionTypes";
import { Schedule } from "../../utils/types/common";
import { ScheduleStateFilters } from "../../reducers/schedule.reducer";

export const actionGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest ): GetScheduleListByJobIdAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB, payload }
};

export const actionGetScheduleListByJobIdSuccess = ( payload: Schedule[] ): GetScheduleListByJobIdSuccessAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS, payload }
};

export const actionGetScheduleListByJobIdFailed = ( payload: any ): GetScheduleListByJobIdFailedAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED, payload }
};

export const actionGetScheduleDetail =
    ( payload: GetScheduleDetailRequest, onSuccess?: Function, onError?: Function ): GetScheduleDetailAction => {
        return {
            type: SCHEDULE_ACTION_TYPE.GET_DETAIL,
            payload,
            onSuccess,
            onError
        }
    };

export const actionGetScheduleDetailSuccess = ( payload: Schedule): GetScheduleDetailSuccessAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS, payload }
};

export const actionGetScheduleDetailFailed = ( payload: any ): GetScheduleDetailFailedAction => {
    return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED, payload }
};

export const actionUpdateScheduleFilters = (payload: ScheduleStateFilters): UpdateScheduleFiltersAction => {
    return {
        type: SCHEDULE_ACTION_TYPE.UPDATE_FILTERS,
        payload
    }
}
