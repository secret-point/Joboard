import { GetApplicationRequest } from "../../utils/apiTypes";
import { Application } from "../../utils/types/common";
import {
    GET_APPLICATION_TYPE,
    GetApplicationAction,
    GetApplicationFailedAction,
    GetApplicationSuccessAction,
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
