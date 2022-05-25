import { SCHEDULE_ACTION_TYPE, ScheduleActions } from "../actions/ScheduleActions/scheduleActionTypes";
import { Schedule } from "../utils/types/common";

export interface ScheduleState {
    scheduleList: Schedule[],
    failed?: boolean;
    scheduleDetail?: Schedule
}

export const initScheduleState: ScheduleState = {
    failed: false,
    scheduleList: []
}

export default function scheduleReducer( state: ScheduleState = initScheduleState, action: ScheduleActions ): ScheduleState {
    switch(action.type) {
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB:
            return {
                ...state,
                failed: false
            };

        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
            return {
                ...state,
                failed: false,
                scheduleList: action.payload
            };

        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
            return {
                ...state,
                failed: true
            };

        case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
            return {
                ...state,
                scheduleDetail: action.payload
            }

        case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:
            return {
                ...state,
                scheduleDetail: undefined
,            }

        default:
            return state;
    }
}
