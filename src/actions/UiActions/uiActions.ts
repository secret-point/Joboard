import { CountryStateConfig } from "../../utils/commonTypes";
import { 
    GetCountryStateConfigAction,
    GetCountryStateConfigSuccessAction,
    GetCountryStateConfigFailedAction,
    GET_STATE_CONFIG_TYPE
} from "./uiActionTypes";

export const actionGetCountryStateConfig = (): GetCountryStateConfigAction => {
    return { type: GET_STATE_CONFIG_TYPE.GET }
};

export const actionGetCountryStateConfigActionSuccess = (
    payload: CountryStateConfig,
    onSuccess?: Function,
): GetCountryStateConfigSuccessAction => {
    return { type: GET_STATE_CONFIG_TYPE.SUCCESS, payload, onSuccess }
};

export const actionGetCountryStateConfigActionFailed = (
    payload: any // Refine errorMessage type later
): GetCountryStateConfigFailedAction => {
    return { type: GET_STATE_CONFIG_TYPE.FAILED, payload }
};