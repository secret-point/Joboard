import {
    APP_CONFIG_ACTIONS,
    GET_ENV_CONFIG_TYPE,
    GET_INITIAL_APP_CONFIG_TYPE
} from "../actions/AppConfigActions/appConfigActionTypes";
import { GET_STATE_CONFIG_TYPE, UI_ACTION } from "../actions/UiActions/uiActionTypes";
import { GET_JOB_DETAIL_TYPE } from "../actions/JobActions/jobDetailActionTypes";
import { GET_APPLICATION_TYPE } from "../actions/ApplicationActions/applicationActionTypes";
import { SCHEDULE_ACTION_TYPE } from "../actions/ScheduleActions/scheduleActionTypes";
import { JOB_OPPORTUNITY_PAGE } from "../utils/enums/common";

export interface uiState {
    isLoading: boolean;
    jobOpportunity: {
        currentPage: JOB_OPPORTUNITY_PAGE
    }
}

export const initUiState: uiState = {
    isLoading: false,
    jobOpportunity: {
        currentPage: JOB_OPPORTUNITY_PAGE.INDEX
    }
}

export default function uiReducer( state: uiState = initUiState, action: UI_ACTION | APP_CONFIG_ACTIONS | any ): uiState {
    switch (action.type) {
        case GET_INITIAL_APP_CONFIG_TYPE.GET:
        case GET_ENV_CONFIG_TYPE.GET:
        case GET_JOB_DETAIL_TYPE.GET:
        case GET_APPLICATION_TYPE.GET:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL:

            return {
                ...state,
                isLoading: true
            };

        case GET_INITIAL_APP_CONFIG_TYPE.SUCCESS:
        case GET_INITIAL_APP_CONFIG_TYPE.FAILED:
        case GET_ENV_CONFIG_TYPE.SUCCESS:
        case GET_ENV_CONFIG_TYPE.FAILED:
        case GET_JOB_DETAIL_TYPE.FAILED:
        case GET_JOB_DETAIL_TYPE.SUCCESS:
        case GET_APPLICATION_TYPE.FAILED:
        case GET_APPLICATION_TYPE.SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:

            return {
                ...state,
                isLoading: false
            };

        case GET_STATE_CONFIG_TYPE.SET_JOB_OPPORTUNITY_PAGE:

            return {
                ...state,
                jobOpportunity: {
                    currentPage: action.payload
                }
            }

        default:
            return state;
    }
}
