import { Action } from "redux";

export enum WORKFLOW_REQUEST {
    INIT = 'WORKFLOW_REQUEST_INIT',
    START = 'WORKFLOW_REQUEST_START',
    END = 'WORKFLOW_REQUEST_END',
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

export type WORKFLOW_ACTIONS = 
    | WorkflowRequestInitAction
    | WorkflowRequestStartAction
    | WorkflowRequestEndAction;
