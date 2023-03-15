import {
  APP_CONFIG_ACTIONS,
  GET_ENV_CONFIG_TYPE,
  GET_INITIAL_APP_CONFIG_TYPE
} from "../actions/AppConfigActions/appConfigActionTypes";
import {
  BANNER_MESSAGE_TYPE,
  GET_STATE_CONFIG_TYPE,
  UI_ACTION,
  UI_STATE_TYPES
} from "../actions/UiActions/uiActionTypes";
import { GET_JOB_DETAIL_TYPE } from "../actions/JobActions/jobDetailActionTypes";
import { SCHEDULE_ACTION_TYPE } from "../actions/ScheduleActions/scheduleActionTypes";
import { APPLICATION_ACTION_TYPES } from "../actions/ApplicationActions/applicationActionTypes";
import { CANDIDATE_ACTION_TYPES } from "../actions/CandidateActions/candidateActionTypes";
import { WORKFLOW_REQUEST } from "../actions/WorkflowActions/workflowActionTypes";
import { NHE_ACTION_TYPES } from "../actions/NheActions/nheActionTypes";
import { AlertMessage } from "../utils/types/common";
import { THANK_YOU_ACTION_TYPES } from "../actions/ThankYouActions/thankYouActionTypes";

export interface uiState {
  isLoading: boolean;
  bannerMessage?: AlertMessage;
  wotcLoading?: boolean;
  referralLoading?: boolean;
  wfsLoading?: boolean;
}

export const initUiState: uiState = {
  isLoading: false
};

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
    case WORKFLOW_REQUEST.INIT:
    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE:
    case CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES:
    case APPLICATION_ACTION_TYPES.CALCULATE_INCLINED_VALUE:
    case NHE_ACTION_TYPES.GET_SLOTS_DS:
    case NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS:
    case NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES:
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST:
    case APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION:
    case UI_STATE_TYPES.SHOW_LOADER:
      return {
        ...state,
        isLoading: true
      };

    case UI_STATE_TYPES.SHOW_WOTC_LOADER:
      return {
        ...state,
        wotcLoading: true
      };
    case THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID:
      return {
        ...state,
        referralLoading: true
      };
    case GET_INITIAL_APP_CONFIG_TYPE.SUCCESS:
    case GET_INITIAL_APP_CONFIG_TYPE.FAILED:
    case GET_ENV_CONFIG_TYPE.SUCCESS:
    case GET_ENV_CONFIG_TYPE.FAILED:
    case GET_JOB_DETAIL_TYPE.FAILED:
    case GET_JOB_DETAIL_TYPE.SUCCESS:
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS:
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED:
    case CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES_ERROR:
    case CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES_SUCCESS:
    case APPLICATION_ACTION_TYPES.CALCULATE_INCLINED_VALUE_RESULT:
    case GET_STATE_CONFIG_TYPE.SUCCESS:
    case GET_STATE_CONFIG_TYPE.FAILED:
    case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS:
    case SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED:
    case SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS:
    case SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED:
    case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_FAILED:
    case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED:
    case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS:
    case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_FAILED:
    // case WORKFLOW_REQUEST.END:
    case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_SUCCESS:
    case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_FAILED:
    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE_SUCCESS:
    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE_FAILED:
    case NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED:
    case NHE_ACTION_TYPES.GET_SLOTS_DS_SUCCESS:
    case NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_SUCCESS:
    case NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_FAILED:
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST_FAILED:
    case APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION_FAILED:
    case UI_STATE_TYPES.HIDE_LOADER:
      return {
        ...state,
        isLoading: action.loadingStatus? action.loadingStatus : false
      };

    case UI_STATE_TYPES.HIDE_WOTC_LOADER:
      return {
        ...state,
        wotcLoading: false
      };

    case WORKFLOW_REQUEST.START:
      return {
        ...state,
        wfsLoading: true
      };

    case WORKFLOW_REQUEST.END:
      return {
        ...state,
        wfsLoading: false
      };

    case THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_SUCCESS:
    case THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID_FAILED:
      return {
        ...state,
        referralLoading: false
      };

    case BANNER_MESSAGE_TYPE.SET_BANNER_MESSAGE:
      return {
        ...state,
        bannerMessage: action.payload
      };
    case BANNER_MESSAGE_TYPE.RESET_BANNER_MESSAGE:
      return {
        ...state,
        bannerMessage: undefined
      };

    default:
      return state;
  }
}
