import {
    APP_CONFIG_ACTIONS,
    GET_ENV_CONFIG_TYPE,
    GET_INITIAL_APP_CONFIG_TYPE
} from "../actions/AppConfigActions/appConfigActionTypes";
import { GET_STATE_CONFIG_TYPE, UI_ACTION, WORKFLOW_REQUEST } from "../actions/UiActions/uiActionTypes";
import { GET_JOB_DETAIL_TYPE } from "../actions/JobActions/jobDetailActionTypes";
import { SCHEDULE_ACTION_TYPE } from "../actions/ScheduleActions/scheduleActionTypes";
import { APPLICATION_ACTION_TYPES } from "../actions/ApplicationActions/applicationActionTypes";

export interface uiState {
    isLoading: boolean;
}

export const initUiState: uiState = {
    isLoading: false
}

export default function uiReducer( state: uiState = initUiState, action: UI_ACTION | APP_CONFIG_ACTIONS | any ): uiState {
    switch (action.type) {
        case GET_INITIAL_APP_CONFIG_TYPE.GET:
        case GET_ENV_CONFIG_TYPE.GET:
        case GET_JOB_DETAIL_TYPE.GET:
        case APPLICATION_ACTION_TYPES.GET_APPLICATION:
        case GET_STATE_CONFIG_TYPE.GET:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME:
        case WORKFLOW_REQUEST.START:
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
        case APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS:
        case APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED:
        case GET_STATE_CONFIG_TYPE.SUCCESS:
        case GET_STATE_CONFIG_TYPE.FAILED:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_SUCCESS:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_FAILED:
        // Don't add CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS and let UI loading
        // case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_FAILED:
        case WORKFLOW_REQUEST.END:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_SUCCESS:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_FAILED:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
