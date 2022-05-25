import { CountryStateConfig } from "../../utils/types/common";
import {
    GET_STATE_CONFIG_TYPE,
    GetCountryStateConfigAction,
    GetCountryStateConfigSuccessAction,
    SetJobOpportunityPageAction
} from "./uiActionTypes";
import { JOB_OPPORTUNITY_PAGE } from "../../utils/enums/common";

export const actionGetCountryStateConfig = (): GetCountryStateConfigAction => {
    return { type: GET_STATE_CONFIG_TYPE.GET }
};

export const actionGetCountryStateConfigActionSuccess = (
    payload: CountryStateConfig,
    onSuccess?: Function,
): GetCountryStateConfigSuccessAction => {
    return { type: GET_STATE_CONFIG_TYPE.SUCCESS, payload, onSuccess }
};

export const actionGetCountryStateConfigActionFailed = ( payload: any ) => { // Refine errorMessage type later): GetCountryStateConfigFailedAction
    return { type: GET_STATE_CONFIG_TYPE.FAILED, payload }
};

export const actionSetJobOpportunityPage = (payload: JOB_OPPORTUNITY_PAGE): SetJobOpportunityPageAction => {
    return {
        type: GET_STATE_CONFIG_TYPE.SET_JOB_OPPORTUNITY_PAGE,
        payload
    }
}
