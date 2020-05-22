import { goTo, setLoading } from "./actions";
import { onUpdateError } from "./error-actions";
import CandidateApplicationService from "../services/candidate-application-service";
import IPayload from "../@types/IPayload";
import { push } from "react-router-redux";
import isEmpty from "lodash/isEmpty";
import {
  onGetRequisitionHeaderInfo,
  onGetRequisition
} from "./requisition-actions";
import updateObject from "immutability-helper";
import RequisitionService from "../services/requisition-service";

export const START_APPLICATION = "START_APPLICATION";
export const GET_APPLICATION = "GET_APPLICATION";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const UPDATE_NON_FCRA_QUESTIONS = "UPDATE_NON_FCRA_QUESTIONS";
export const ON_GET_CANDIDATE = "ON_GET_CANDIDATE";
export const UPDATE_ADDITIONAL_BG_INFO = "UPDATE_ADDITIONAL_BG_INFO";
export const UPDATE_CONTINGENT_OFFER = "UPDATE_CONTINGENT_OFFER";

const candidateApplicationService = new CandidateApplicationService();

export const onStartApplication = (data: IPayload) => (dispatch: Function) => {
  const { appConfig, nextPage, urlParams } = data;
  const origin = window.location.origin;
  const redirectUrl = `${origin}#/${nextPage.id}/${urlParams.requisitionId}`;
  let url = `${appConfig.authenticationURL}/?redirectUrl=${encodeURIComponent(
    redirectUrl
  )}`;
  window.location.assign(url);
};

export const onGetApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  try {
    setLoading(true)(dispatch);
    const applicationId = payload.urlParams?.applicationId;
    const hcrId = payload.urlParams?.misc;
    onGetRequisitionHeaderInfo(payload)(dispatch);
    onGetCandidate(payload)(dispatch);
    if (applicationId && isEmpty(payload.data.application)) {
      const applicationResponse = await candidateApplicationService.getApplication(
        applicationId
      );

      if (!applicationResponse.shift && hcrId) {
        const requisitionService = new RequisitionService();
        const headCountResponse = await requisitionService.getHeadCountRequest(
          hcrId
        );
        if (!payload.data.requisition.selectedChildRequisition) {
          onGetRequisition(payload, headCountResponse.requisitionId)(dispatch);
        }
        applicationResponse.shift = headCountResponse;
      }

      dispatch({
        type: GET_APPLICATION,
        payload: {
          application: applicationResponse,
          currentState: applicationResponse.currentState
        }
      });
    }
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    onUpdateError(
      ex?.response?.data?.errorMessage || "unable to get application"
    )(dispatch);
  }
};

export const onGetCandidate = (
  payload: IPayload,
  ignoreCandidateData?: boolean
) => async (dispatch: Function) => {
  if (isEmpty(payload.data.candidate) || ignoreCandidateData) {
    const response = await candidateApplicationService.getCandidate();
    dispatch({
      type: ON_GET_CANDIDATE,
      payload: response
    });
  }
};

export const onLaunchFCRA = (payload: IPayload) => (dispatch: Function) => {
  const { urlParams } = payload;
  const url = `/app/fcra/${urlParams.requisitionId}/${urlParams.applicationId}`;
  dispatch(push(url));
};

export const continueWithFCRADecline = (payload: IPayload) => (
  dispatch: Function
) => {
  dispatch({
    type: "UPDATE_VALUE_CHANGE",
    payload: {
      keyName: "fcraQuestions.showWithDrawnModal",
      value: true,
      pageId: payload.currentPage.id
    }
  });
};

export const updatePreHireStepsStatus = (payload: IPayload) => (
  dispatch: Function
) => {
  console.log(payload);
};

export const createApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  if (isEmpty(payload.data.application)) {
    try {
      setLoading(true)(dispatch);
      const candidateResponse = await candidateApplicationService.getCandidate();
      const response = await candidateApplicationService.createApplication({
        candidateId: candidateResponse.candidateId,
        parentRequisitionId: payload.urlParams.requisitionId,
        language: "English"
      });

      dispatch({
        type: UPDATE_APPLICATION,
        payload: {
          application: response
        }
      });

      setLoading(false)(dispatch);
      const { nextPage, urlParams } = payload;
      goTo(
        `/${nextPage.id}/${urlParams?.requisitionId}/${response?.applicationId}`
      )(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get application"
      )(dispatch);
    }
  }
};

export const updateApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  const {
    data,
    currentPage,
    options,
    urlParams,
    isContentContainsSteps,
    activeStepIndex,
    stepId
  } = payload;
  let updateData = data.output[currentPage.id];
  let type = currentPage.id;
  if (isContentContainsSteps && activeStepIndex !== undefined) {
    updateData = data.output[currentPage.id][activeStepIndex];
    type = stepId;
  }
  const applicationId = data.application.applicationId;
  if (!isEmpty(updateData) || options?.ignoreAPIPayload) {
    try {
      const response = await candidateApplicationService.updateApplication({
        type: type,
        applicationId,
        payload: updateData
      });
      dispatch({
        type: UPDATE_APPLICATION,
        payload: {
          application: response
        }
      });
      if (options?.updateCandidate) {
        onGetCandidate(payload, true)(dispatch);
      }
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to update application"
      )(dispatch);
    }
  }

  if (options?.goTo) {
    goTo(options?.goTo, urlParams)(dispatch);
  }
};

export const onSelectedShifts = (payload: IPayload) => (dispatch: Function) => {
  const { application } = payload.data;
  const updatedApplication = updateObject(application, {
    shift: {
      $set: payload.selectedShift
    }
  });

  onGetRequisition(payload, payload.selectedShift.requisitionId)(dispatch);
  dispatch({
    type: UPDATE_APPLICATION,
    payload: {
      application: updatedApplication
    }
  });
  if (payload.options?.goTo) {
    payload.urlParams.misc = payload.selectedShift.headCountRequestId;
    goTo(payload.options?.goTo, payload.urlParams)(dispatch);
  }
};

export const onUpdateShiftSelection = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  try {
    const { application } = payload.data;
    const { urlParams } = payload;
    const response = await candidateApplicationService.updateApplication({
      type: "job-confirm",
      applicationId: urlParams.applicationId,
      payload: {
        headCountRequestId: application.shift.headCountRequestId,
        childRequisitionId: application.shift.requisitionId
      }
    });
    response.shift = application.shift;
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });
    if (payload.options?.goTo) {
      delete payload.urlParams?.misc;
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Unable to update application"
    )(dispatch);
  }
};
