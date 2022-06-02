import { Application } from "../../utils/types/common";
import { CreateApplicationAndSkipScheduleRequestDS, CreateApplicationRequestDS, GetApplicationRequest, UpdateApplicationRequestDS, UpdateWorkflowNameRequest } from "../../utils/apiTypes";
import {
    CREATE_APPLICATION_TYPE,
    CreateApplicationActionDS,
    CreateApplicationFailedActionDS,
    CreateApplicationSuccessActionDS,
    GET_APPLICATION_TYPE,
    GetApplicationAction,
    GetApplicationFailedAction,
    GetApplicationSuccessAction,
    CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE,
    CreateApplicationAndSkipScheduleActionDS,
    CreateApplicationAndSkipScheduleFailedActionDS,
    CreateApplicationAndSkipScheduleSuccessActionDS,
    UPDATE_APPLICATION_TYPE,
    UpdateApplicationActionDS,
    UpdateApplicationFailedActionDS,
    UpdateApplicationSuccessActionDS,
    UPDATE_WORKFLOW_NAME_TYPE,
    UpdateWorkflowStepNameAction,
    UpdateWorkflowStepNameSuccessAction,
    UpdateWorkflowStepNameFailedAction,
} from "./applicationActionTypes";

export const actionGetApplication = ( payload: GetApplicationRequest, onSuccess?: Function, onError?: Function ): GetApplicationAction => {
    return { type: GET_APPLICATION_TYPE.GET, payload }
};

export const actionGetApplicationSuccess = ( payload: Application ): GetApplicationSuccessAction => {
    return { type: GET_APPLICATION_TYPE.SUCCESS, payload }
};

export const actionGetApplicationFailed = ( payload: any ): GetApplicationFailedAction => {
    return { type: GET_APPLICATION_TYPE.FAILED, payload }
};

export const actionCreateApplicationDS =
    ( payload: CreateApplicationRequestDS, onSuccess?: Function, onError?: Function ): CreateApplicationActionDS => {
        return { type: CREATE_APPLICATION_TYPE.CREATE, payload, onSuccess, onError }
    };

export const actionCreateApplicationDSSuccess = ( payload: Application, ): CreateApplicationSuccessActionDS => {
    return { type: CREATE_APPLICATION_TYPE.SUCCESS, payload }
};

export const actionCreateApplicationDSFailed = ( payload: any ): CreateApplicationFailedActionDS => {
    return { type: CREATE_APPLICATION_TYPE.FAILED, payload }
};

export const actionUpdateApplicationDS =
    ( payload: UpdateApplicationRequestDS, onSuccess?: Function, onError?: Function ): UpdateApplicationActionDS => {
        return { type: UPDATE_APPLICATION_TYPE.UPDATE, payload, onSuccess, onError }
    };

export const actionUpdateApplicationDSSuccess = ( payload: Application, ): UpdateApplicationSuccessActionDS => {
    return { type: UPDATE_APPLICATION_TYPE.SUCCESS, payload }
};

export const actionUpdateApplicationDSFailed = ( payload: any ): UpdateApplicationFailedActionDS => {
    return { type: UPDATE_APPLICATION_TYPE.FAILED, payload }
};

export const actionUpdateWorkflowName =
    ( payload: UpdateWorkflowNameRequest, onSuccess?: Function, onError?: Function ): UpdateWorkflowStepNameAction => {
        return { type: UPDATE_WORKFLOW_NAME_TYPE.UPDATE, payload, onSuccess, onError }
    };

export const actionUpdateWorkflowNameSuccess = ( payload: Application, ): UpdateWorkflowStepNameSuccessAction=> {
    return { type: UPDATE_WORKFLOW_NAME_TYPE.SUCCESS, payload }
};

export const actionUpdateWorkflowNameFailed = ( payload: any ): UpdateWorkflowStepNameFailedAction => {
    return { type: UPDATE_WORKFLOW_NAME_TYPE.FAILED, payload }
};

export const actionCreateApplicationAndSkipScheduleDS =
    ( payload: CreateApplicationAndSkipScheduleRequestDS, onSuccess?: Function, onError?: Function ): CreateApplicationAndSkipScheduleActionDS => {
        return { type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.CREATE, payload, onSuccess, onError }
    };

export const actionCreateApplicationAndSkipScheduleDSSuccess = ( payload: Application, ): CreateApplicationAndSkipScheduleSuccessActionDS => {
    return { type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.SUCCESS, payload }
};

export const actionCreateApplicationAndSkipScheduleDSFailed = ( payload: any ): CreateApplicationAndSkipScheduleFailedActionDS => {
    return { type: CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.FAILED, payload }
};
