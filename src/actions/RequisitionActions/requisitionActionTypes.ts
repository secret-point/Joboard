import { Action } from "redux";
import { GetRequisitionRequest } from "../../utils/apiTypes";
import { Requisition } from "../../utils/commonTypes";

export enum GET_REQUISITION_TYPE {
    GET = 'GET_REQUISITION',
    SUCCESS = 'GET_REQUISITION_SUCCESS',
    FAILED = 'GET_REQUISITION_FAILED',
    RESET = 'RESET_REQUISITION',
}

export type GET_REQUISITION_ACTIONS = GetRequisitionAction
    | GetRequisitionSuccessAction
    | GetRequisitionFailedAction
    | ResetRequisitionAction

export interface GetRequisitionAction extends Action {
    type: GET_REQUISITION_TYPE.GET;
    payload: GetRequisitionRequest;
}

export interface GetRequisitionSuccessAction extends Action {
    type: GET_REQUISITION_TYPE.SUCCESS;
    payload: Requisition;
}

export interface GetRequisitionFailedAction extends Action {
    type: GET_REQUISITION_TYPE.FAILED;
    payload: any;
}

export interface ResetRequisitionAction extends Action {
    type: GET_REQUISITION_TYPE.RESET;
    callback?: Function;
}
