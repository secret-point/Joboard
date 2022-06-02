import { CountryStateConfig } from "../../utils/types/common";
import {
    GET_STATE_CONFIG_TYPE,
    GetCountryStateConfigAction,
    GetCountryStateConfigSuccessAction,
    WORKFLOW_REQUEST,
    WorkflowRequestStartAction,
    WorkflowRequestEndAction,
    WorkflowRequestInitAction
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

export const actionGetCountryStateConfigActionFailed = ( payload: any ) => { // Refine errorMessage type later): GetCountryStateConfigFailedAction
    return { type: GET_STATE_CONFIG_TYPE.FAILED, payload }
};

export const actionWorkflowRequestInit = (): WorkflowRequestInitAction => {
    return { type: WORKFLOW_REQUEST.INIT }
};

export const actionWorkflowRequestStart = (): WorkflowRequestStartAction => {
    return { type: WORKFLOW_REQUEST.START }
};

export const actionWorkflowRequestEnd = (): WorkflowRequestEndAction => {
    return { type: WORKFLOW_REQUEST.END }
};
