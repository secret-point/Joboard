import { getBGCInfoStepsStatuses } from "./../helpers/steps-helper";
import RequisitionService from "../services/requisition-service";
import CandidateApplicationService from "../services/candidate-application-service";
import IPayload from "../@types/IPayload";
import { push } from "react-router-redux";
import set from "lodash/set";

export const START_APPLICATION = "START_APPLICATION";
export const GET_APPLICATION = "GET_APPLICATION";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

export const onStartApplication = (data: IPayload) => (dispatch: Function) => {
  const { appConfig, nextPage, urlParams } = data;
  const origin = window.location.origin;
  const redirectUrl = `${origin}?page=${nextPage.id}&requisitionId=${urlParams.requisitionId}`;
  let url = `${appConfig.authenticationURL}/?redirectUrl=${encodeURIComponent(
    redirectUrl
  )}`;
  window.location.assign(url);
};

export const onGetApplication = (data: IPayload) => async (
  dispatch: Function
) => {
  const requisitionService = new RequisitionService();
  const candidateApplicationService = new CandidateApplicationService();
  const requisitionId = data.urlParams?.requisitionId;
  if (requisitionId) {
    const requisitionResponse = await requisitionService.getRequisitionHeaderInfo(
      requisitionId
    );

    const applicationResponse = await candidateApplicationService.getApplication(
      requisitionId
    );

    dispatch({
      type: GET_APPLICATION,
      payload: {
        requisition: requisitionResponse,
        application: applicationResponse,
        currentState: applicationResponse.currentState
      }
    });
  }
};

export const onLaunchFRCA = (payload: IPayload) => (dispatch: Function) => {
  dispatch(push("/app/frca/" + payload.urlParams.requisitionId));
};

export const continueWithFRCADecline = (payload: IPayload) => (
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
