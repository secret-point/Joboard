import {
    APP_CONFIG_ACTIONS,
    GET_ENV_CONFIG_TYPE,
    GET_INITIAL_APP_CONFIG_TYPE
} from "../actions/AppConfigActions/appConfigActionTypes";
import { GET_STATE_CONFIG_TYPE, UI_ACTION, WORKFLOW_REQUEST } from "../actions/UiActions/uiActionTypes";
import { GET_JOB_DETAIL_TYPE } from "../actions/JobActions/jobDetailActionTypes";
import { CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE, CREATE_APPLICATION_TYPE, GET_APPLICATION_TYPE, UPDATE_APPLICATION_TYPE, UPDATE_WORKFLOW_NAME_TYPE, } from "../actions/ApplicationActions/applicationActionTypes";
import { SCHEDULE_ACTION_TYPE } from "../actions/ScheduleActions/scheduleActionTypes";

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
        case GET_APPLICATION_TYPE.GET:
        case GET_STATE_CONFIG_TYPE.GET:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL:
        case CREATE_APPLICATION_TYPE.CREATE:
        case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.CREATE:
        case UPDATE_APPLICATION_TYPE.UPDATE:
        case UPDATE_WORKFLOW_NAME_TYPE.UPDATE:
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
        case GET_APPLICATION_TYPE.FAILED:
        case GET_APPLICATION_TYPE.SUCCESS:
        case GET_STATE_CONFIG_TYPE.SUCCESS:
        case GET_STATE_CONFIG_TYPE.FAILED:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
        case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:
        case CREATE_APPLICATION_TYPE.SUCCESS:
        case CREATE_APPLICATION_TYPE.FAILED:
        // Don't add CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS and let UI loading
        // case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS:
        case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.FAILED:
        case UPDATE_APPLICATION_TYPE.SUCCESS:
        case UPDATE_APPLICATION_TYPE.FAILED:
        case WORKFLOW_REQUEST.END:
        case UPDATE_WORKFLOW_NAME_TYPE.SUCCESS:
        case UPDATE_WORKFLOW_NAME_TYPE.FAILED:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
