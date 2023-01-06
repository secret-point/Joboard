import store from "../../store/store";
import {
  CreateApplicationAndSkipScheduleRequestDS,
  CreateApplicationRequestDS,
  GetApplicationRequest,
  UpdateApplicationRequestDS,
  UpdateWorkflowNameRequest
} from "../../utils/apiTypes";
import {
  actionCreateApplicationAndSkipScheduleDS,
  actionCreateApplicationDS,
  actionGetApplication,
  actionUpdateApplicationDS,
  actionUpdateWorkflowName,
} from "./applicationActions";

export const boundGetApplication = (
  payload: GetApplicationRequest,
  onSuccess?: Function,
) => store.dispatch(actionGetApplication(payload, onSuccess));

export const boundCreateApplicationDS = (
  payload: CreateApplicationRequestDS,
  onSuccess?: Function
) => store.dispatch(actionCreateApplicationDS(payload, onSuccess));

export const boundUpdateApplicationDS = (
  payload: UpdateApplicationRequestDS,
  onSuccess?: Function,
  onError?: Function
) => store.dispatch(actionUpdateApplicationDS(payload, onSuccess, onError));

export const boundUpdateWorkflowName = (
  payload: UpdateWorkflowNameRequest,
  onSuccess?: Function,
  onError?: Function
) => store.dispatch(actionUpdateWorkflowName(payload, onSuccess, onError));

export const boundCreateApplicationAndSkipScheduleDS = (
  payload: CreateApplicationAndSkipScheduleRequestDS,
  onSuccess?: Function
) => store.dispatch(actionCreateApplicationAndSkipScheduleDS(payload, onSuccess));
