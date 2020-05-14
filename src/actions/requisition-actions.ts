import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload from "../@types/IPayload";
import { setLoading } from "./actions";
import { onUpdateError } from "./error-actions";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";
export const UPDATE_REQUISITION = "UPDATE_REQUISITION";

const requisitionService = new RequisitionService();

export const onGetRequisitionHeaderInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId && isEmpty(payload.data.requisition)) {
    try {
      const response = await requisitionService.getRequisitionHeaderInfo(
        requisitionId
      );
      dispatch({
        type: GET_REQUISITION_HEADER_INFO,
        payload: response
      });
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onGetNHETimeSlots = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId && isEmpty(payload.data.requisition)) {
    try {
      const response = await requisitionService.getTimeSlots(
        "childRequisition1"
      );

      if (response) {
        const nheSlots: any[] = [];
        response.forEach((slot: any) => {
          const nheSlot: any = {};
          nheSlot.value = JSON.stringify(slot);
          nheSlot.title = slot.date;
          nheSlot.details = slot.timeRange;
          nheSlots.push(nheSlot);
        });
        dispatch({
          type: UPDATE_REQUISITION,
          payload: {
            nheTimeSlots: nheSlots
          }
        });
      }
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get NHE time slots"
      )(dispatch);
    }
  }
};
