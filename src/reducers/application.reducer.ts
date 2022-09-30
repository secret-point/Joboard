import { APPLICATION_ACTION_TYPES, ApplicationActionTypes } from "../actions/ApplicationActions/applicationActionTypes";
import { sanitizeApplicationData } from "../utils/helper";
import { Application } from "../utils/types/common";

export interface ApplicationState {
    loading: boolean;
    results?: Application;
    failed?: boolean;
}

export const initApplicationState: ApplicationState = {
    loading: false,
    failed: false
}

export default function applicationReducer( state: ApplicationState = initApplicationState, action: ApplicationActionTypes ): ApplicationState {
    switch(action.type) {
        case APPLICATION_ACTION_TYPES.GET_APPLICATION:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_SUCCESS:
        // DO not include CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS, it will mistakenly change the application loading
        // status while updateApplication is still loading
        // case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_SUCCESS:
            const sanitizedApplicationData = sanitizeApplicationData(action.payload);
            return {
                ...state,
                loading: false,
                failed: false,
                results: {
                    ...sanitizedApplicationData,
                }
            };
        case APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_FAILED:
        case APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED:
        case APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_FAILED:
        case APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        default:
            return state;
    }

}
