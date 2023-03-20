import store from "../../store/store";
import {
  CreateApplicationAndSkipScheduleRequestDS,
  CreateApplicationRequestDS,
  GetApplicationListRequest,
  GetApplicationRequest,
  UpdateApplicationRequestDS,
  UpdateWorkflowNameRequest
} from "../../utils/apiTypes";
import {
  actionCalculateInclinedValue,
  actionCreateApplicationAndSkipScheduleDS,
  actionCreateApplicationDS,
  actionGetApplication,
  actionGetApplicationList,
  actionSetApplicationErrorCode,
  actionUpdateApplicationDS,
  actionUpdateWorkflowName,
  actionWithdrawMultipleApplication,
} from "./applicationActions";
import { Application, ErrorMetadata } from "../../utils/types/common";

export const boundGetApplication = (payload: GetApplicationRequest, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionGetApplication(payload, onSuccess, onError));

export const boundCreateApplicationDS = (payload: CreateApplicationRequestDS, onSuccess?: Function) =>
  store.dispatch(actionCreateApplicationDS(payload, onSuccess));

export const boundUpdateApplicationDS = (payload: UpdateApplicationRequestDS, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateApplicationDS(payload, onSuccess, onError));

export const boundUpdateWorkflowName = (payload: UpdateWorkflowNameRequest, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateWorkflowName(payload, onSuccess, onError));

export const boundCreateApplicationAndSkipScheduleDS = (payload: CreateApplicationAndSkipScheduleRequestDS, onSuccess?: Function) =>
  store.dispatch(actionCreateApplicationAndSkipScheduleDS(payload, onSuccess));

export const boundGetApplicationList = (payload: GetApplicationListRequest, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionGetApplicationList(payload, onSuccess, onError));

export const boundWithdrawMultipleApplication = (payload: Application[], onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionWithdrawMultipleApplication(payload, onSuccess, onError));

export const boundSetApplicationErrorCode= (errorCode: string, errorMetadata?: ErrorMetadata) =>
  store.dispatch(actionSetApplicationErrorCode(errorCode, errorMetadata));

export const boundCalculateInclinedValue = (applicationId: string, onResult?: Function) =>
  store.dispatch(actionCalculateInclinedValue(applicationId, onResult));
