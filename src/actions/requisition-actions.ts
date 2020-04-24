import RequisitionService from "../services/requisition-service";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";

const requisitionService = new RequisitionService();

export const onGetRequisitionHeaderInfo = (data: any) => async (
  dispatch: Function
) => {
  const requisitionId = data.urlParams?.requisitionId;
  if (requisitionId) {
    const response = await requisitionService.getRequisitionHeaderInfo(
      requisitionId
    );
    dispatch({
      type: GET_REQUISITION_HEADER_INFO,
      payload: response
    });
  }
};
