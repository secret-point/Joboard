import store from "../../store/store";
import { actionGetCountryStateConfig, actionWorkflowRequestEnd, actionWorkflowRequestStart } from "./uiActions";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());

export const boundWorkflowRequestStart = () => store.dispatch(actionWorkflowRequestStart());

export const boundWorkflowRequestEnd = () => store.dispatch(actionWorkflowRequestEnd());
