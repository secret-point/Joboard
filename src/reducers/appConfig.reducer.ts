import { AppConfig } from "../utils/commonTypes";
import { APP_CONFIG_ACTION, GET_INITIAL_APP_CONFIG_TYPE, GET_ENV_CONFIG_TYPE } from "../actions/appConfigActions/appConfigActionTypes";

export interface appConfigState {
    loading: boolean;
    results?: AppConfig;
    failed?: boolean;
}

export const initAppConfigState: appConfigState = {
    loading: false,
    failed: false
}

export default function appConfigReducer(
    state: appConfigState = initAppConfigState,
    action: APP_CONFIG_ACTION
):appConfigState {
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