import { AppConfig } from "../utils/types/common";
import { APP_CONFIG_ACTIONS, GET_INITIAL_APP_CONFIG_TYPE, GET_ENV_CONFIG_TYPE } from "../actions/AppConfigActions/appConfigActionTypes";

export interface AppConfigState {
    loading: boolean;
    results?: AppConfig;
    failed?: boolean;
}

export const initAppConfigState: AppConfigState = {
    loading: false,
    failed: false
}

export default function appConfigReducer( state: AppConfigState = initAppConfigState, action: APP_CONFIG_ACTIONS ): AppConfigState {
    switch (action.type) {
        case GET_INITIAL_APP_CONFIG_TYPE.GET:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_INITIAL_APP_CONFIG_TYPE.SUCCESS:
            return {
                ...state,
                results: {
                    envConfig: action.payload.envConfig,
                    pageOrder: action.payload.pageOrder,
                    countryStateConfig: action.payload.countryStateConfig,
                }
            };
        case GET_INITIAL_APP_CONFIG_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        case GET_ENV_CONFIG_TYPE.GET:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_ENV_CONFIG_TYPE.SUCCESS:
            const newResult: AppConfig = {...state.results};
            newResult.envConfig = action.payload;
            return {
                ...state,
                loading: false,
                results: newResult,
                failed: false
            };
        case GET_ENV_CONFIG_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            }
        default:
            return state;
    }
}
