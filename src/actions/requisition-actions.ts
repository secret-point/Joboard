import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload from "../@types/IPayload";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";

const requisitionService = new RequisitionService();

export const onGetRequisitionHeaderInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId && isEmpty(payload.data.requisition)) {
    const response = await requisitionService.getRequisitionHeaderInfo(
      requisitionId
    );
    dispatch({
      type: GET_REQUISITION_HEADER_INFO,
      payload: response
    });
  }
};
