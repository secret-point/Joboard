import store from "../../store/store";
import { actionWorkflowRequestEnd, actionWorkflowRequestInit, actionWorkflowRequestStart } from "./workflowActions";

export const boundWorkflowRequestInit = () => store.dispatch(actionWorkflowRequestInit());

export const boundWorkflowRequestStart = () => store.dispatch(actionWorkflowRequestStart());

export const boundWorkflowRequestEnd = () => store.dispatch(actionWorkflowRequestEnd());