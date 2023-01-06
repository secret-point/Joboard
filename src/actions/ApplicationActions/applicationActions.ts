import { Application } from "../../utils/types/common";
import {
  CreateApplicationAndSkipScheduleRequestDS,
  CreateApplicationRequestDS,
  GetApplicationRequest,
  UpdateApplicationRequestDS,
  UpdateWorkflowNameRequest
} from "../../utils/apiTypes";
import {
  APPLICATION_ACTION_TYPES,
  CreateApplicationActionDS,
  CreateApplicationAndSkipScheduleActionDS,
  CreateApplicationAndSkipScheduleFailedActionDS,
  CreateApplicationAndSkipScheduleSuccessActionDS,
  CreateApplicationFailedActionDS,
  CreateApplicationSuccessActionDS,
  GetApplicationAction,
  GetApplicationFailedAction,
  GetApplicationSuccessAction,
  UpdateApplicationActionDS,
  UpdateApplicationFailedActionDS,
  UpdateApplicationSuccessActionDS,
  UpdateWorkflowStepNameAction,
  UpdateWorkflowStepNameFailedAction,
  UpdateWorkflowStepNameSuccessAction,
} from "./applicationActionTypes";
import { loadingStatusHelper } from "../../utils/helper";
import { ProxyApiError } from "../../utils/api/types";

export const actionGetApplication = ( payload: GetApplicationRequest, onSuccess?: Function, onError?: Function ): GetApplicationAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION, payload, onSuccess, onError };
};

export const actionGetApplicationSuccess = ( payload: Application ): GetApplicationSuccessAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetApplicationFailed = ( payload: any ): GetApplicationFailedAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED, payload };
};

export const actionCreateApplicationDS =
    ( payload: CreateApplicationRequestDS, onSuccess?: Function, onError?: Function ): CreateApplicationActionDS => {
      return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION, payload, onSuccess, onError };
    };

export const actionCreateApplicationDSSuccess = ( payload: Application, ): CreateApplicationSuccessActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionCreateApplicationDSFailed = ( payload: any ): CreateApplicationFailedActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_FAILED, payload };
};

export const actionUpdateApplicationDS =
    ( payload: UpdateApplicationRequestDS, onSuccess?: Function, onError?: Function ): UpdateApplicationActionDS => {
      return { type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION, payload, onSuccess, onError };
    };

export const actionUpdateApplicationDSSuccess = ( payload: Application, ): UpdateApplicationSuccessActionDS => {
  return { type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionUpdateApplicationDSFailed = ( payload: any ): UpdateApplicationFailedActionDS => {
  return { type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_FAILED, payload };
};

export const actionUpdateWorkflowName =
    ( payload: UpdateWorkflowNameRequest, onSuccess?: Function, onError?: Function ): UpdateWorkflowStepNameAction => {
      return { type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME, payload, onSuccess, onError };
    };

export const actionUpdateWorkflowNameSuccess = ( payload: Application, ): UpdateWorkflowStepNameSuccessAction => {
  return { type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionUpdateWorkflowNameFailed = ( payload: any ): UpdateWorkflowStepNameFailedAction => {
  return { type: APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME_FAILED, payload };
};

export const actionCreateApplicationAndSkipScheduleDS =
    ( payload: CreateApplicationAndSkipScheduleRequestDS, onSuccess?: Function, onError?: Function ): CreateApplicationAndSkipScheduleActionDS => {
      return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE, payload, onSuccess, onError };
    };

export const actionCreateApplicationAndSkipScheduleDSSuccess = ( payload: Application, ): CreateApplicationAndSkipScheduleSuccessActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionCreateApplicationAndSkipScheduleDSFailed = ( payload: ProxyApiError ): CreateApplicationAndSkipScheduleFailedActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED, payload };
};
