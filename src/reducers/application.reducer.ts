import { Application } from "../utils/types/common";
import { GET_APPLICATION_TYPE, GET_APPLICATION_ACTIONS, UPDATE_APPLICATION_TYPE, UPDATE_APPLICATION_ACTIONS, UPDATE_WORKFLOW_NAME_TYPE, CREATE_APPLICATION_TYPE, CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE, CREATE_APPLICATION_AND_SKIP_SCHEDULE_ACTIONS, UPDATE_WORKFLOW_NAME_ACTIONS, CREATE_APPLICATION_ACTIONS } from "../actions/ApplicationActions/applicationActionTypes";
import { sanitizeApplicationData } from "../utils/helper";

export interface ApplicationState {
    loading: boolean;
    results?: Application;
    failed?: boolean;
}

export const initApplicationState: ApplicationState = {
    loading: false,
    failed: false
}

export default function applicationReducer(
    state: ApplicationState = initApplicationState,
    action: GET_APPLICATION_ACTIONS | 
        UPDATE_APPLICATION_ACTIONS |
        CREATE_APPLICATION_AND_SKIP_SCHEDULE_ACTIONS |
        UPDATE_WORKFLOW_NAME_ACTIONS |
        CREATE_APPLICATION_ACTIONS
):ApplicationState {
    switch (action.type) {
        case GET_APPLICATION_TYPE.GET:
        case CREATE_APPLICATION_TYPE.CREATE:
        case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.CREATE:
        case UPDATE_APPLICATION_TYPE.UPDATE:
        case UPDATE_WORKFLOW_NAME_TYPE.UPDATE:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_APPLICATION_TYPE.SUCCESS:
        case CREATE_APPLICATION_TYPE.SUCCESS:
        case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS:
        case UPDATE_APPLICATION_TYPE.SUCCESS:
        case UPDATE_WORKFLOW_NAME_TYPE.SUCCESS:
            const sanitizedApplicationData = sanitizeApplicationData(action.payload);
            return {
                ...state,
                loading: false,
                failed: false,
                results: {
                    ...sanitizedApplicationData,
                }
            };
        case GET_APPLICATION_TYPE.FAILED:
        case UPDATE_APPLICATION_TYPE.FAILED:
        case CREATE_APPLICATION_TYPE.FAILED:
        case CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.FAILED:
        case UPDATE_APPLICATION_TYPE.FAILED:
        case UPDATE_WORKFLOW_NAME_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        default:
            return state;
    }

}
