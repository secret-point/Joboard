import { SCHEDULE_ACTION_TYPE, ScheduleActions } from "../actions/ScheduleActions/scheduleActionTypes";
import { Schedule, ScheduleStateFilters } from "../utils/types/common";
import { dayHoursFilterValues, initScheduleStateFilters } from "../utils/constants/common";

export interface ScheduleState {
  loading: boolean;
  results: {
    scheduleList?: Schedule[];
    scheduleDetail?: Schedule;
  };
  failed?: boolean;
  filters: ScheduleStateFilters;
}

export const initScheduleState: ScheduleState = {
  loading: false,
  failed: false,
  results: {
    scheduleList: [],
    scheduleDetail: undefined,
  },
  filters: {
    ...initScheduleStateFilters,
    daysHoursFilter: dayHoursFilterValues
  }

};

export default function scheduleReducer( state: ScheduleState = initScheduleState, action: ScheduleActions ): ScheduleState {
  switch (action.type) {
    case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB:
    case SCHEDULE_ACTION_TYPE.GET_DETAIL:
      return {
        ...state,
        loading: true,
        failed: false
      };

    case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
      return {
        ...state,
        failed: false,
        loading: false,
        results: { ...state.results, scheduleList: action.payload }
      };

    case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
      return {
        ...state,
        failed: true,
        loading: false,
      };

    case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        results: { ...state.results, scheduleDetail: action.payload }
      };

    case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        results: { ...state.results, scheduleDetail: undefined }
      };

    case SCHEDULE_ACTION_TYPE.UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
      };

    default:
      return state;
  }
}
