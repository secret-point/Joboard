import { Application } from "../utils/types/common";
import { GET_APPLICATION_TYPE, GET_APPLICATION_ACTIONS } from "../actions/ApplicationActions/applicationActionTypes";

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
    action: GET_APPLICATION_ACTIONS
):ApplicationState {
    switch (action.type) {
        case GET_APPLICATION_TYPE.GET:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_APPLICATION_TYPE.SUCCESS:
            return {
                ...state,
                loading: false,
                failed: false,
                results: {
                    ...action.payload,
                }
            };
        case GET_APPLICATION_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        default:
            return state;
    }

}
