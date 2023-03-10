import { Application } from "../../utils/types/common";
import {
  CreateApplicationAndSkipScheduleRequestDS,
  CreateApplicationRequestDS,
  GetApplicationListRequest,
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
  CreateApplicationSuccessActionDS,
  GetApplicationAction,
  GetApplicationFailedAction,
  GetApplicationListAction,
  GetApplicationListFailedAction,
  GetApplicationListSuccessAction,
  GetApplicationSuccessAction,
  UpdateApplicationActionDS,
  UpdateApplicationFailedActionDS,
  UpdateApplicationSuccessActionDS,
  UpdateWorkflowStepNameAction,
  UpdateWorkflowStepNameFailedAction,
  UpdateWorkflowStepNameSuccessAction,
  WithdrawMultipleApplicationAction,
  WithdrawMultipleApplicationFailedAction,
  WithdrawMultipleApplicationSuccessAction,
  CalculateInclinedValueAction,
  CalculateInclinedValueResultAction,
} from "./applicationActionTypes";
import { loadingStatusHelper } from "../../utils/helper";
import { ApiError } from "../../utils/api/types";

export const actionGetApplication = ( payload: GetApplicationRequest, onSuccess?: Function, onError?: Function ): GetApplicationAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION, payload, onSuccess, onError };
};

export const actionGetApplicationSuccess = ( payload: Application ): GetApplicationSuccessAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetApplicationFailed = ( payload: ApiError ): GetApplicationFailedAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILED, payload };
};

export const actionCreateApplicationDS =
    ( payload: CreateApplicationRequestDS, onSuccess?: Function, onError?: Function ): CreateApplicationActionDS => {
      return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION, payload, onSuccess, onError };
    };

export const actionCreateApplicationDSSuccess = ( payload: Application, ): CreateApplicationSuccessActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionUpdateApplicationDS =
    ( payload: UpdateApplicationRequestDS, onSuccess?: Function, onError?: Function ): UpdateApplicationActionDS => {
      return { type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION, payload, onSuccess, onError };
    };

export const actionUpdateApplicationDSSuccess = ( payload: Application, ): UpdateApplicationSuccessActionDS => {
  return { type: APPLICATION_ACTION_TYPES.UPDATE_APPLICATION_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionUpdateApplicationDSFailed = ( payload: ApiError ): UpdateApplicationFailedActionDS => {
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

export const actionCreateApplicationAndSkipScheduleDSFailed = ( payload: ApiError ): CreateApplicationAndSkipScheduleFailedActionDS => {
  return { type: APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE_FAILED, payload };
};

export const actionGetApplicationList = ( payload: GetApplicationListRequest, onSuccess?: Function, onError?: Function ): GetApplicationListAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST, payload, onSuccess, onError };
};

export const actionGetApplicationListSuccess = ( payload: Application[] ): GetApplicationListSuccessAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetApplicationListFailed = ( payload: ApiError ): GetApplicationListFailedAction => {
  return { type: APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST_FAILED, payload };
};

export const actionWithdrawMultipleApplication = (payload: Application[], onSuccess?: Function, onError?: Function): WithdrawMultipleApplicationAction => {
  return { type: APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION, payload, onSuccess, onError };
};
export const actionWithdrawMultipleApplicationSuccess = (payload: Application[]): WithdrawMultipleApplicationSuccessAction => {
  return { type: APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION_SUCCESS, payload };
};

export const actionWithdrawMultipleApplicationFailed = (payload: ApiError): WithdrawMultipleApplicationFailedAction => {
  return { type: APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION_FAILED, payload };
};

export const actionCalculateInclinedValue = ( applicationId: string, onResult?: Function): CalculateInclinedValueAction => {
  return {
    type: APPLICATION_ACTION_TYPES.CALCULATE_INCLINED_VALUE,
    onResult,
    applicationId,
  };
};

export const actionCalculateInclinedValueResult = ( onResult?: Function): CalculateInclinedValueResultAction => {
  return {
    type: APPLICATION_ACTION_TYPES.CALCULATE_INCLINED_VALUE_RESULT,
    onResult,
    loadingStatus: loadingStatusHelper()
  };
};
