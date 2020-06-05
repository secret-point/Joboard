import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload from "../@types/IPayload";
import { setLoading } from "./actions";
import { onUpdateError } from "./error-actions";
import { push } from "react-router-redux";
import find from "lodash/find";
import CandidateApplicationService from "../services/candidate-application-service";
import ICandidateApplication from "../@types/ICandidateApplication";

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

export const onGetChildRequisitions = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId) {
    try {
      const response = await requisitionService.getChildRequisitions(
        requisitionId
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          childRequisitions: response
        }
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

export const onGetRequisition = (
  payload: IPayload,
  childRequisitionId?: string
) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  const id = childRequisitionId || payload.urlParams?.requisitionId;
  if (id) {
    try {
      const response = await requisitionService.getRequisition(id);
      let requisition = response;
      if (childRequisitionId) {
        requisition = {
          selectedChildRequisition: response
        };
      }
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...requisition
        }
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

export const onGetJobDescription = (
  payload: IPayload,
  requisitionId?: string
) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  const childRequisitionId = requisitionId
    ? requisitionId
    : payload.urlParams?.misc;
  if (childRequisitionId) {
    try {
      if (!payload.data.requisition.selectedChildRequisition) {
        onGetRequisition(payload, childRequisitionId)(dispatch);
      }
      const response = await requisitionService.getJobDescription(
        childRequisitionId
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          jobDescription: response
        }
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

export const onGoToDescription = (payload: IPayload) => async (
  dispatch: Function
) => {
  const { requisitionId, applicationId } = payload.urlParams;
  const { goTo } = payload.options;
  const childRequisitionId =
    payload.selectedRequisitionId ||
    payload.data.requisition.selectedChildRequisition.requisitionId;
  const path = `/app/${goTo}/${requisitionId}/${applicationId}/${childRequisitionId}`;

  const { requisition } = payload.data;

  let childRequisition;
  if (requisition.childRequisitions) {
    childRequisition = find(requisition.childRequisitions, {
      requisitionId: payload.selectedRequisitionId
    });
  } else {
    childRequisition = await requisitionService.getRequisition(
      childRequisitionId
    );
  }

  onGetJobDescription(payload, childRequisitionId)(dispatch);
  dispatch({
    type: UPDATE_REQUISITION,
    payload: {
      selectedChildRequisition: childRequisition
    }
  });
  dispatch(push(path));
};

export const onGetNHETimeSlots = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId) {
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

export const onGetAllAvailableShifts = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  if (requisitionId) {
    try {
      const response = await requisitionService.getAllAvailableShifts(
        requisitionId,
        applicationId
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...response
        }
      });
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get available shifts"
      )(dispatch);
    }
  }
};
