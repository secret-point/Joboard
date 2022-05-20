import { APP_CONFIG_ACTION, GET_INITIAL_APP_CONFIG_TYPE, GET_ENV_CONFIG_TYPE } from "../actions/appConfigActions/appConfigActionTypes";
import { UI_ACTION } from "../actions/uiActions/uiActionTypes";

export interface uiState {
    isLoading: boolean;
}

export const initUiState: uiState = {
    isLoading: false,
}

export default function uiReducer(
    state: uiState = initUiState,
    action: UI_ACTION | APP_CONFIG_ACTION
):uiState {
    switch (action.type) {
        case GET_INITIAL_APP_CONFIG_TYPE.GET:
        case GET_ENV_CONFIG_TYPE.GET:
            return {
                ...state,
                isLoading: true
            };
        case GET_INITIAL_APP_CONFIG_TYPE.SUCCESS:
        case GET_INITIAL_APP_CONFIG_TYPE.FAILED:
        case GET_ENV_CONFIG_TYPE.SUCCESS:
        case GET_ENV_CONFIG_TYPE.FAILED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }

}