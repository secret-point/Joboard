import { Application } from "../../utils/types/common";
import { 
    CreateApplicationRequestDS, 
    CreateApplicationResponseDS, 
    GetApplicationRequest
} from "../../utils/apiTypes";
import {
    GET_APPLICATION_TYPE,
    GetApplicationAction,
    GetApplicationFailedAction,
    GetApplicationSuccessAction,
    CreateApplicationActionDS,
    CREATE_APPLICATION_TYPE,
    CreateApplicationSuccessActionDS,
    CreateApplicationFailedActionDS,
} from "./applicationActionTypes";

export const actionGetApplication = ( payload: GetApplicationRequest ): GetApplicationAction => {
    return { type: GET_APPLICATION_TYPE.GET, payload }
};

export const actionGetApplicationSuccess = ( payload: Application ): GetApplicationSuccessAction => {
    return { type: GET_APPLICATION_TYPE.SUCCESS, payload }
};

export const actionGetApplicationFailed = ( payload: any ): GetApplicationFailedAction => {
    return { type: GET_APPLICATION_TYPE.FAILED, payload }
};

export const actionCreateApplicationDS = (
    payload: CreateApplicationRequestDS,
    onSuccess?: Function,
    onError?: Function
): CreateApplicationActionDS => {
    return { type: CREATE_APPLICATION_TYPE.CREATE, payload, onSuccess, onError }
};

export const actionCreateApplicationDSSuccess = (
    payload: CreateApplicationResponseDS,
): CreateApplicationSuccessActionDS => {
    return { type: CREATE_APPLICATION_TYPE.SUCCESS, payload }
};

export const actionCreateApplicationDSFailed = (
    payload: any
): CreateApplicationFailedActionDS => {
    return { type: CREATE_APPLICATION_TYPE.FAILED, payload }
};
