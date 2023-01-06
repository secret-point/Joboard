import { GetRequisitionRequest } from "../../utils/apiTypes";
import { Requisition } from "../../utils/types/common";
import {
  GET_REQUISITION_TYPE,
  GetRequisitionAction,
  GetRequisitionFailedAction,
  GetRequisitionSuccessAction,
} from "./requisitionActionTypes";

export const actionGetRequisition = ( payload: GetRequisitionRequest ): GetRequisitionAction => {
  return { type: GET_REQUISITION_TYPE.GET, payload };
};

export const actionGetRequisitionSuccess = ( payload: Requisition ): GetRequisitionSuccessAction => {
  return { type: GET_REQUISITION_TYPE.SUCCESS, payload };
};

export const actionGetRequisitionFailed = ( payload: any ): GetRequisitionFailedAction => {
  return { type: GET_REQUISITION_TYPE.FAILED, payload };
};
