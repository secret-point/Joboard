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

export const onStartApplication = (data: IPayload) => (dispatch: Function) => {
  const { appConfig, urlParams } = data;
  const origin = window.location.origin;
  const redirectUrl = `${origin}#/application/${urlParams.requisitionId}`;
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
    const hcrId = payload.urlParams?.misc;
    onGetRequisitionHeaderInfo(payload)(dispatch);
    const candidateResponse = await onGetCandidate(payload)(dispatch);
    const { options } = payload;
    if (
      applicationId &&
      (options?.ignoreApplicationData || isEmpty(payload.data.application))
    ) {
      const applicationResponse = await new CandidateApplicationService().getApplication(
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

export const createApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  if (isEmpty(payload.data.application)) {
    try {
      setLoading(true)(dispatch);
      const candidateApplicationService = new CandidateApplicationService();
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
        goTo(`/already-applied/${urlParams?.requisitionId}/`)(dispatch);
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

      if (options?.executeCompleteStep) {
        completeTask(data.application, type);
      }

      if (options?.goTo) {
        goTo(options?.goTo, urlParams)(dispatch);
      }

      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to update application"
      )(dispatch);
    }
  } else {
    if (options?.goTo) {
      goTo(options?.goTo, urlParams)(dispatch);
    }
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
      delete payload.urlParams?.misc;
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    completeTask(application, "job-selection");
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Unable to update application"
    )(dispatch);
  }
};

export const onTerminateApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
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
    completeTask(payload.data.application, payload.urlParams.page);
    setLoading(true)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Unable to update application"
    )(dispatch);
  }
};

export const onUpdateWotcStatus = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  try {
    const { options, urlParams } = payload;
    const applicationId = urlParams.applicationId;
    const { status, isCompleteTaskOnLoad } = options;
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

    if (!window?.stepFunctionService?.websocket) {
      loadWorkflow(
        urlParams.requisitionId,
        applicationId,
        candidateResponse.candidateId,
        payload.appConfig,
        isCompleteTaskOnLoad
      );
    } else {
      completeTask(payload.data.application, payload.urlParams.page);
    }
    setLoading(true)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Unable to update application"
    )(dispatch);
  }
};
