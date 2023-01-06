import { Action } from "redux";
import { WORKFLOW_ERROR_CODE } from "../../utils/enums/common";

export enum WORKFLOW_REQUEST {
  INIT = "WORKFLOW_REQUEST_INIT",
  START = "WORKFLOW_REQUEST_START",
  END = "WORKFLOW_REQUEST_END",
  SET_WORKFLOW_ERROR_CODE = "SET_WORKFLOW_ERROR_CODE"
}

export interface WorkflowRequestInitAction extends Action {
  type: WORKFLOW_REQUEST.INIT;
}

export interface WorkflowRequestStartAction extends Action {
  type: WORKFLOW_REQUEST.START;
}

export interface WorkflowRequestEndAction extends Action {
  type: WORKFLOW_REQUEST.END;
  loadingStatus: boolean;
}

export interface SetWorkflowErrorCodeAction extends Action {
  type: WORKFLOW_REQUEST.SET_WORKFLOW_ERROR_CODE;
  payload: WORKFLOW_ERROR_CODE;
}

export type WORKFLOW_ACTIONS =
    | WorkflowRequestInitAction
    | WorkflowRequestStartAction
    | WorkflowRequestEndAction
    | SetWorkflowErrorCodeAction;
