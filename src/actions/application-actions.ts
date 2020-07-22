import { goTo, setLoading, onUpdateOutput, onUpdatePageId } from "./actions";
import { onUpdateError, onRemoveError } from "./error-actions";
import CandidateApplicationService from "../services/candidate-application-service";
import IPayload from "../@types/IPayload";
import isEmpty from "lodash/isEmpty";
import {
  onGetRequisitionHeaderInfo,
  onSelectedRequisition
} from "./requisition-actions";
import HTTPStatusCodes from "../constants/http-status-codes";
import { completeTask, loadWorkflow } from "./workflow-actions";
import isNull from "lodash/isNull";

export const START_APPLICATION = "START_APPLICATION";
export const GET_APPLICATION = "GET_APPLICATION";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const UPDATE_NON_FCRA_QUESTIONS = "UPDATE_NON_FCRA_QUESTIONS";
export const ON_GET_CANDIDATE = "ON_GET_CANDIDATE";
export const UPDATE_ADDITIONAL_BG_INFO = "UPDATE_ADDITIONAL_BG_INFO";
export const UPDATE_CONTINGENT_OFFER = "UPDATE_CONTINGENT_OFFER";
export const TERMINATE_APPLICATION = "TERMINATE_APPLICATION";
export const SHOW_PREVIOUS_NAMES = "SHOW_PREVIOUS_NAMES";
export const SET_SELECTED_SHIFT = "SET_SELECTED_SHIFT";

export const onStartApplication = (data: IPayload) => (dispatch: Function) => {
  const { appConfig, urlParams } = data;
  const origin = window.location.origin;
  const redirectUrl = `${origin}/?page=application&requisitionId=${urlParams.requisitionId}`;
  let url = `${appConfig.authenticationURL}/?redirectUrl=${encodeURIComponent(
    redirectUrl
  )}`;

  const agency = window.sessionStorage.getItem("agency");
  if (!isNull(agency)) {
    url = `${url}&agency=${agency}`;
  }

  window.location.assign(url);
};

export const onGetApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  try {
    setLoading(true)(dispatch);
    const applicationId = payload.urlParams?.applicationId;
    const requisitionId = payload.urlParams?.requisitionId;
    onGetRequisitionHeaderInfo(payload)(dispatch);
    const candidateResponse = await onGetCandidate(payload)(dispatch);
    const { options, data } = payload;
    if (
      applicationId &&
      (options?.ignoreApplicationData || isEmpty(payload.data.application))
    ) {
      const applicationResponse = await new CandidateApplicationService().getApplication(
        applicationId
      );

      if (!applicationResponse.shift && !isEmpty(data.selectedShift)) {
        if (!payload.data.requisition.selectedChildRequisition) {
          onSelectedRequisition(data.selectedShift.requisitionId)(dispatch);
        }
        applicationResponse.shift = data.selectedShift;
      }

      dispatch({
        type: GET_APPLICATION,
        payload: {
          application: applicationResponse,
          currentState: applicationResponse.currentState
        }
      });

      const candidateId =
        candidateResponse?.candidateId || payload.data.candidate.candidateId;
      loadWorkflow(
        requisitionId,
        applicationId,
        candidateId,
        payload.appConfig,
        options?.isCompleteTaskOnLoad
      );
    }

    if (!options?.isCompleteTaskOnLoad) {
      setLoading(false)(dispatch);
    }
  } catch (ex) {
    console.log(ex);
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
    const response = await new CandidateApplicationService().getCandidate();
    dispatch({
      type: ON_GET_CANDIDATE,
      payload: response
    });
    return response;
  }
};

export const onLaunchFCRA = (payload: IPayload) => (dispatch: Function) => {
  // const { urlParams } = payload;
  // const url = `/app/${urlParams.requisitionId}/${urlParams.applicationId}`;
  onUpdatePageId("fcra")(dispatch);
  //dispatch(push(url));
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

export const createApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  if (isEmpty(payload.data.application)) {
    try {
      onRemoveError()(dispatch);
      setLoading(true)(dispatch);
      const candidateApplicationService = new CandidateApplicationService();
      const candidateResponse = await candidateApplicationService.getCandidate();
      const response = await candidateApplicationService.createApplication({
        candidateId: candidateResponse.candidateId,
        parentRequisitionId: payload.urlParams.requisitionId,
        language: "English"
      });

      window.sessionStorage.setItem("applicationId", response.applicationId);
      dispatch({
        type: UPDATE_APPLICATION,
        payload: {
          application: response
        }
      });

      dispatch({
        type: ON_GET_CANDIDATE,
        payload: candidateResponse
      });

      loadWorkflow(
        payload.urlParams.requisitionId,
        response.applicationId,
        candidateResponse.candidateId,
        payload.appConfig
      );

      //setLoading(false)(dispatch);
    } catch (ex) {
      console.log(ex);
      const { urlParams } = payload;
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.BAD_REQUEST) {
        goTo("already-applied", urlParams)(dispatch);
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Unable to get application"
        )(dispatch);
      }
    }
  }
};

export const updateApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  const {
    data,
    currentPage,
    options,
    urlParams,
    isContentContainsSteps,
    activeStepIndex,
    stepId,
    output
  } = payload;
  let updateData = output[currentPage.id];
  let type = currentPage.id;
  if (isContentContainsSteps && activeStepIndex !== undefined) {
    updateData = output[currentPage.id][activeStepIndex];
    type = stepId;
  }
  const applicationId = data.application.applicationId;
  onUpdateOutput(payload)(dispatch);
  if (options?.valueExitsInData) {
    updateData = data.output[currentPage.id];
  }
  if (!isEmpty(updateData) || options?.ignoreAPIPayload) {
    try {
      const response = await new CandidateApplicationService().updateApplication(
        {
          type: type,
          applicationId,
          payload: updateData
        }
      );
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
      if (options?.executeCompleteStep) {
        completeTask(data.application, type);
      }
      if (options?.goTo) {
        goTo(options?.goTo, urlParams)(dispatch);
      }
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  } else {
    if (options?.goTo) {
      goTo(options?.goTo, urlParams)(dispatch);
    }
  }
};

export const onSelectedShifts = (payload: IPayload) => (dispatch: Function) => {
  onSelectedRequisition(payload.selectedShift.requisitionId)(dispatch);
  if (payload.options?.goTo) {
    goTo(payload.options?.goTo, payload.urlParams)(dispatch);
  }
  dispatch({
    type: SET_SELECTED_SHIFT,
    payload: payload.selectedShift
  });
};

export const onUpdateShiftSelection = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { application } = payload.data;
    const { urlParams } = payload;

    const response = await new CandidateApplicationService().updateApplication({
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
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    completeTask(application, "job-selection");
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Failed to update application"
    )(dispatch);
  }
};

export const onTerminateApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { options, urlParams } = payload;
    const state = options.state;
    const applicationId = urlParams.applicationId;
    const response = await new CandidateApplicationService().terminateApplication(
      applicationId,
      state
    );
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Failed to update application"
    )(dispatch);
  }
};

export const onUpdateWotcStatus = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  try {
    const { options, urlParams } = payload;
    const applicationId = urlParams.applicationId;
    const { status } = options;
    const candidateResponse = await onGetCandidate(payload, true)(dispatch);
    const response = await new CandidateApplicationService().updateWOTCStatus(
      applicationId,
      candidateResponse.candidateId,
      status
    );
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });

    setLoading(true)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Failed to update application"
    )(dispatch);
  }
};

export const onShowPreviousName = (payload: IPayload) => (
  dispatch: Function
) => {
  dispatch({
    type: SHOW_PREVIOUS_NAMES,
    payload: "YES"
  });
};
