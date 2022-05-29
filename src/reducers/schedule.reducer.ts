import { SCHEDULE_ACTION_TYPE, ScheduleActions } from "../actions/ScheduleActions/scheduleActionTypes";
import { DayHoursFilter, Schedule } from "../utils/types/common";
import { DESIRED_WORK_HOURS, SCHEDULE_FILTER_TYPE } from "../utils/enums/common";
import { getDaysHoursDefaultFilters } from "../utils/helper";

export interface ScheduleState {
    scheduleList: Schedule[],
    failed?: boolean;
    scheduleDetail?: Schedule,
    filters: ScheduleStateFilters
}

export interface ScheduleStateFilters {
    sortKey: SCHEDULE_FILTER_TYPE,
    maxHoursPerWeek:DESIRED_WORK_HOURS,
    daysHoursFilter: DayHoursFilter[]
}

export const initScheduleStateFilters: ScheduleStateFilters = {
    maxHoursPerWeek: DESIRED_WORK_HOURS.FORTY,
    daysHoursFilter: getDaysHoursDefaultFilters(),
    sortKey: SCHEDULE_FILTER_TYPE.DEFAULT
}

export const initScheduleState: ScheduleState = {
    failed: false,
    scheduleList: [],
    filters: initScheduleStateFilters
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

        case SCHEDULE_ACTION_TYPE.UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload
            }

        default:
            return state;
    }
}
