import store from "../../store/store";
import {
  actionSetWorkflowErrorCode,
  actionWorkflowRequestEnd,
  actionWorkflowRequestInit,
  actionWorkflowRequestStart
} from "./workflowActions";
import { WORKFLOW_ERROR_CODE } from "../../utils/enums/common";

export const boundWorkflowRequestInit = () => store.dispatch(actionWorkflowRequestInit());

export const boundWorkflowRequestStart = () => store.dispatch(actionWorkflowRequestStart());

export const boundWorkflowRequestEnd = () => store.dispatch(actionWorkflowRequestEnd());

export const boundSetWorkflowErrorCode= (payload: WORKFLOW_ERROR_CODE) =>
  store.dispatch(actionSetWorkflowErrorCode(payload));
