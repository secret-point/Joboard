import queryString from "query-string";
import { goTo, setLoading, onUpdateOutput, onUpdatePageId, setWorkflowLoading } from "./actions";
import { onUpdateError, onRemoveError } from "./error-actions";
import CandidateApplicationService from "./../../services/candidate-application-service";
import IPayload from "./../../@types/IPayload";
import isEmpty from "lodash/isEmpty";
import {
  onGetRequisitionHeaderInfo,
  onSelectedRequisition, SHOW_MESSAGE
} from "./requisition-actions";
import {
  GET_JOB_INFO,
  onGetJobInfo,
  onSelectedSchedule,
  SELECTED_SCHEDULE
} from "./job-actions";
import HTTPStatusCodes from "./../../constants/http-status-codes";
import { completeTask, loadWorkflow, loadWorkflowDS } from "./workflow-actions";
import propertyOf from "lodash/propertyOf";
import {
  postAdobeMetrics,
  sendDataLayerAdobeAnalytics
} from "./adobe-actions";
import { getDataForEventMetrics } from "./../../helpers/adobe-helper";
import findIndex from "lodash/findIndex";
import { isNil } from "lodash";
import { log, logError } from "./../../helpers/log-helper";
import { NO_APPLICATION_ID, DUPLICATE_SSN } from "./../../constants/error-messages";
import {
  HoursPerWeekValue,
  DeprecatedShiftPreferences,
  ShiftTimeInterval
} from "./../../@types/shift-preferences";
import { MetricData } from "./../../@types/adobe-metrics";
import { checkIfIsLegacy, checkIfIsCSS, pathByDomain, get3rdPartyFromQueryParams, parseQueryParamsArrayToSingleItem, checkIfIsCSRequest } from "./../../helpers/utils";
import ICandidateApplication from "./../../@types/ICandidateApplication";
import JobService from "./../../services/job-service";
import { APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE, APPLICATION_STATE_TO_STEP_NAME, STEPS_NOT_CONNECT_WORKFLOW_SERVICE } from "./../../constants";
export const START_APPLICATION = "START_APPLICATION";
export const GET_APPLICATION = "GET_APPLICATION";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const UPDATE_CANCELLATION_RESCHEDULE_REASON = "UPDATE_CANCELLATION_RESCHEDULE_REASON";
export const UPDATE_NON_FCRA_QUESTIONS = "UPDATE_NON_FCRA_QUESTIONS";
export const ON_GET_CANDIDATE = "ON_GET_CANDIDATE";
export const UPDATE_ADDITIONAL_BG_INFO = "UPDATE_ADDITIONAL_BG_INFO";
export const UPDATE_CONTINGENT_OFFER = "UPDATE_CONTINGENT_OFFER";
export const TERMINATE_APPLICATION = "TERMINATE_APPLICATION";
export const SHOW_PREVIOUS_NAMES = "SHOW_PREVIOUS_NAMES";
export const SET_SELECTED_SHIFT = "SET_SELECTED_SHIFT";
export const SET_SELECTED_SCHEDULE = "SET_SELECTED_SCHDULE";
export const REMOVE_CANCELLATION_RESCHEDULE_QUESTION = "REMOVE_CANCELLATION_RESCHEDULE_QUESTION";
export const UPDATE_SCHEDULE_ID = "UPDATE_SCHEDULE_ID";
export const DISABLE_CONFIRMATION_BUTTON = "DISABLE_CONFIRMATION_BUTTON";

export const onStartApplication = (data: IPayload) => () => {
  const { appConfig } = data;
  const { origin } = window.location;
  const queryParamsInSession = window.sessionStorage.getItem("query-params");
  const queryParams = queryParamsInSession
    ? JSON.parse(queryParamsInSession)
    : {};
  delete queryParams.page;
  const queryStr = queryString.stringify(queryParams);
  const redirectUrl = `${origin}${pathByDomain()}/?page=create-application&${queryStr}`;
  const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams, "?");
  
  const url = `${appConfig.CSDomain}/app${queryStringFor3rdParty}#/login?redirectUrl=${encodeURIComponent(
    redirectUrl
  )}`;

  log("Started application", {
    url
  });
  const adobeDataMetric = getDataForEventMetrics("start-application");
  sendDataLayerAdobeAnalytics(adobeDataMetric);
  // always go login page to check auth on before create new application
  window.location.assign(url);
};

export const onGetApplicationSelfServiceDS = (payload: IPayload) => async (
  dispatch: Function
): Promise<ICandidateApplication | void> => {
  try {
    setLoading(true)(dispatch);
    const applicationId = payload.urlParams?.applicationId;
    log(`started getting application data from CandidateAppService and HiringPortal for ${applicationId}`,
      {
        applicationId
      });

    if (applicationId) {
      await onGetJobInfo(payload)(dispatch);
      await onGetCandidate(payload)(dispatch);
      log(`loading application data from CandidateAppService and HiringPortal for ${applicationId}`);

      const applicationResponseFromBB = await new CandidateApplicationService().getApplication(
        applicationId
      );

      let scheduleIdFromHP = null;
      if (window.localStorage.getItem("page") !== "no-shift-selected-ds") {
        // Hiring portal returns 404 if the application is in schedule RELEASED status
        // So only if current page is not equal to no-shift-selected-ds, execute the followings
        const applicationResponseFromHP = await new CandidateApplicationService().getApplicationSelfServiceDS(
          applicationId
        );
        scheduleIdFromHP = applicationResponseFromHP.scheduleId;
        onSelectedSchedule(scheduleIdFromHP)(dispatch);
      }

      dispatch({
        type: GET_APPLICATION,
        payload: {
          application: applicationResponseFromBB,
          currentState: applicationResponseFromBB.currentState
        }
      });

      dispatch({
        type: UPDATE_SCHEDULE_ID,
        payload: {
          scheduleId: scheduleIdFromHP
        }
      });

      log("Updated state with application data from CandidateAppService and HiringPortal");
      setLoading(false)(dispatch);
    } else if (isNil(applicationId)) {
      log("did not found application id in state or URL");
      throw new Error(NO_APPLICATION_ID);
    }

  } catch (ex) {
    logError("Failed while fetching the application data from CandidateAppService and HiringPortal", ex);
    setLoading(false)(dispatch);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "unable to get application"
      )(dispatch);
    }
  }
};

export const onGetApplication = (payload: IPayload) => async (
  dispatch: Function
): Promise<ICandidateApplication | void> => {
  const isLegacy = checkIfIsLegacy();
  try {
    setLoading(true)(dispatch);
    const applicationId = payload.urlParams?.applicationId;
    const requisitionId = payload.urlParams?.requisitionId;
    const { options = {}, data } = payload;
    let candidateResponse;

    log(`started getting application data for ${applicationId}`, {
      applicationId,
      requisitionId
    });
    if (!options?.loadOnlyApplicationData) {
      isLegacy? onGetRequisitionHeaderInfo(payload)(dispatch) : onGetJobInfo(payload)(dispatch);
      candidateResponse = await onGetCandidate(
        payload,
        options.ignoreCandidateData
      )(dispatch);
    }

    if (
      applicationId &&
      (options?.ignoreApplicationData || isEmpty(payload.data.application))
    ) {
      log(`loading application data for ${applicationId}`);
      const applicationResponse = await new CandidateApplicationService().getApplication(
        applicationId
      );

      if (applicationResponse.jobSelected) {
        // candidates should not know about slotsAvailable for shift selected
        applicationResponse.jobSelected.shift.slotsAvailable = null;
      }

      if (!applicationResponse.shift && !isEmpty(data.selectedShift)) {
        if (!payload.data.requisition.selectedChildRequisition) {
          onSelectedRequisition(data.selectedShift.requisitionId)(dispatch);
        }
        applicationResponse.shift = data.selectedShift;
        log("appending selected shift data", {
          selectShift: JSON.stringify(data.selectedShift)
        });
      }

      if (applicationResponse.jobScheduleSelected && !isEmpty(applicationResponse.jobScheduleSelected.scheduleId)) {
        onSelectedSchedule(applicationResponse.jobScheduleSelected.scheduleId)(dispatch);
      }

      dispatch({
        type: GET_APPLICATION,
        payload: {
          application: applicationResponse,
          currentState: applicationResponse.currentState
        }
      });

      log("Updated state with application data");

      // Dont initiate Workflow when workflowStepName is in STEPS_NOT_CONNECT_WORKFLOW_SERVICE
      // Dont initiate Workflow when currentState is in APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE
      const workflowStepName = applicationResponse.workflowStepName?.replaceAll("\"", "");
      if (
        APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationResponse.currentState) ||
        STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(workflowStepName)
      ) {
        const { urlParams } = payload;
        const stepName = STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(workflowStepName)
          ? workflowStepName
          : APPLICATION_STATE_TO_STEP_NAME[applicationResponse.currentState];
        
        goTo(stepName, urlParams)(dispatch);
      } else {
        if (!options?.doNotInitiateWorkflow) {
          const candidateId =
            candidateResponse?.candidateId || payload.data.candidate.candidateId;
          log("loading workflow if doNotInitiateWorkflow is true in page config");

          const urlParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
          const isLegacy = checkIfIsLegacy();
          if (isLegacy) {
            loadWorkflow(
              requisitionId,
              applicationId,
              candidateId,
              payload.appConfig,
              options?.isCompleteTaskOnLoad
            );
          } else {
            loadWorkflowDS(
              payload.urlParams.jobId || urlParams.jobId as string || "",
              payload.urlParams.scheduleId || urlParams.scheduleId as string || "",
              applicationId,
              candidateResponse.candidateId,
              payload.appConfig
            );
          }
          if (!options?.isCompleteTaskOnLoad) {
            setLoading(false)(dispatch);
          }
        } else {
          if (applicationResponse.shift) {
            setLoading(false)(dispatch);
          }
        }
      }
    } else if (isNil(applicationId)) {
      log("did not found application id in state or URL");
      throw new Error(NO_APPLICATION_ID);
    }
    setLoading(false)(dispatch);
  } catch (ex) {
    logError("Failed while fetching the application data", ex);
    setLoading(false)(dispatch);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "unable to get application"
      )(dispatch);
    }
  }
};

export const onGetApplicationDS = (payload: IPayload) => async (dispatch: Function): Promise<ICandidateApplication | void> => {
  try {
    setLoading(true)(dispatch);
    const applicationId = payload.urlParams?.applicationId;
    const { options = {} } = payload;
    let candidateResponse;

    log(`started getting application data for ${applicationId}`, {
      applicationId
    });

    if (applicationId) {
      log(`loading application data for ${applicationId}`);
      const applicationResponse = await new CandidateApplicationService().getApplication(
        applicationId
      );

      dispatch({
        type: GET_APPLICATION,
        payload: {
          application: applicationResponse,
          currentState: applicationResponse.currentState
        }
      });
      const urlParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
      // Dont initiate Workflow when workflowStepName is in STEPS_NOT_CONNECT_WORKFLOW_SERVICE
      // Dont initiate Workflow when currentState is in APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE
      const workflowStepName = applicationResponse?.workflowStepName?.replaceAll("\"", "");

      if (
        APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationResponse?.currentState) ||
        STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(workflowStepName)
      ) {
        const { urlParams } = payload;
        const stepName = STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(workflowStepName)
          ? workflowStepName
          : APPLICATION_STATE_TO_STEP_NAME[applicationResponse.currentState];
        
        goTo(stepName, urlParams)(dispatch);

      } else {
        if (!options?.doNotInitiateWorkflow) {
          loadWorkflowDS(
            payload.urlParams.jobId || urlParams.jobId as string || "",
            payload.urlParams.scheduleId || urlParams.scheduleId as string || "",
            applicationId,
            applicationResponse.candidateId,
            payload.appConfig
          );
        }

        if (!options?.loadOnlyApplicationData) {
          onGetJobInfo(payload)(dispatch);

          candidateResponse = await onGetCandidate(payload, options.ignoreCandidateData)(dispatch);
        }

        log("Updated state with application data");

        setLoading(false)(dispatch);

        return applicationResponse;
      }
    } else {
      log("did not found application id in state or URL");
      throw new Error(NO_APPLICATION_ID);
    }
  } catch (ex) {
    logError("Failed while fetching the application data", ex);
    setLoading(false)(dispatch);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "unable to get application"
      )(dispatch);
    }
  }
};

export const onGetCandidate = (
  payload: IPayload,
  ignoreCandidateData?: boolean
) => async (dispatch: Function) => {
  if (isEmpty(payload.data.candidate) || ignoreCandidateData) {
    log("loading candidate data");
    const response = await new CandidateApplicationService().getCandidate();
    dispatch({
      type: ON_GET_CANDIDATE,
      payload: response
    });
    log("loaded candidate data and updated state");
    return response;
  }
};

export const onLaunchFCRA = () => (dispatch: Function) => {
  log("request to load FCRA");
  onUpdatePageId("fcra")(dispatch);
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
  log("request to show withdraw modal screen");
};

export const createApplication = (payload: IPayload) => async (
  dispatch: Function
) => {
  const isLegacy = checkIfIsLegacy();
  const urlParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
  const jobId = urlParams.jobId as string;
  if (isEmpty(payload.data.application)) {
    try {
      onRemoveError()(dispatch);
      setLoading(true)(dispatch);
      log("started creating the application");
      const candidateApplicationService = new CandidateApplicationService();
      const candidateResponse = await candidateApplicationService.getCandidate();
      if (
        !isNil(candidateResponse) &&
        candidateResponse.isDuplicateSSN === true
      ) {
        log("candidate has duplicate ssn, not able to create an application");
        throw Error(DUPLICATE_SSN);
      }

      // Invoke either createApplication or createApplicationDS as appropriate
      let response;
      let request;
      if (isLegacy) {
        request = {
          candidateId: candidateResponse.candidateId,
          parentRequisitionId: payload.urlParams.requisitionId,
          language: "English",
          candidateEmail: candidateResponse.emailId,
          candidateMobile: candidateResponse.phoneNumber,
          sfCandidateId: candidateResponse.candidateSFId
        };
        log("Create Requisition application request=", request);
        response = await candidateApplicationService.createApplication(request);
      } else {
        const jobInfoResponse = await new JobService().getJobInfo(jobId);
        const { dspEnabled } = jobInfoResponse;
        request = {
          jobId: jobId || "",
          dspEnabled
        };
        log("Create DS application request=", request);
        response = await candidateApplicationService.createApplicationDS(request);
      }
      log("createApplication response=", response);

      window.sessionStorage.setItem("applicationId", response.applicationId);
      dispatch({
        type: UPDATE_APPLICATION,
        payload: {
          application: response
        }
      });
      log("created application and updated state with application data", {
        applicationId: response.applicationId
      });

      dispatch({
        type: ON_GET_CANDIDATE,
        payload: candidateResponse
      });

      log("Updated candidate response in state");

      log("started loading workflow", response);
      if (isLegacy) {
        loadWorkflow(
          payload.urlParams.requisitionId,
          response.applicationId,
          candidateResponse.candidateId,
          payload.appConfig
        );
      } else {
        loadWorkflowDS(
          payload.urlParams.jobId || urlParams.jobId as string || "",
          payload.urlParams.scheduleId || urlParams.scheduleId as string || "",
          response.applicationId,
          candidateResponse.candidateId,
          payload.appConfig
        );
      }

      // setLoading(false)(dispatch);
    } catch (ex) {
      logError("Error while creating the application", ex);
      const { urlParams } = payload;
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.BAD_REQUEST || ex?.response?.status === HTTPStatusCodes.CONFLICT) {
        window.localStorage.setItem("page", "already-applied");
        goTo("already-applied", urlParams)(dispatch);
      } else if (ex?.message === DUPLICATE_SSN) {
        window.localStorage.setItem("page", "duplicate-national-id");
        goTo("duplicate-national-id", urlParams)(dispatch);
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
  let updateData = options?.takeOutputFromOptions
    ? undefined
    : output[currentPage.id];
  let type = currentPage.id;
  if (isContentContainsSteps && activeStepIndex !== undefined) {
    updateData = output[currentPage.id][activeStepIndex];
    type = stepId;
  }
  const { applicationId } = data.application;
  if (isNil(applicationId)) {
    throw new Error(NO_APPLICATION_ID);
  }
  onUpdateOutput(payload)(dispatch);
  if (options?.valueExitsInData) {
    updateData = data.output[currentPage.id];
  }

  if (isEmpty(updateData) && options?.takeOutputFromOptions) {
    updateData = options?.output[type];
  }

  if (isEmpty(updateData) && options?.checkDataInPayload) {
    updateData = {};
    updateData[options.outputKey] = propertyOf(payload.data)(options?.dataKey);
  }
  if (!isEmpty(updateData) || options?.ignoreAPIPayload) {
    const dspEnabled = data.application?.dspEnabled;
    try {
      log(`Started updating application at ${type}`);
      const response = await new CandidateApplicationService().updateApplication(
        {
          type: type,
          applicationId,
          payload: updateData,
          isCsRequest: checkIfIsCSRequest(),
          dspEnabled
        }
      );
      dispatch({
        type: UPDATE_APPLICATION,
        payload: {
          application: response
        }
      });
      log(
        `Updated application at ${type} and update application data in state`
      );
      if (options?.updateCandidate) {
        onGetCandidate(payload, true)(dispatch);
      }

      if (options?.adobeMetrics) {
        postAdobeMetrics(options.adobeMetrics, updateData, payload.data);
      }

      setLoading(false)(dispatch);
      if (options?.executeCompleteStep) {
        const sidStatus = [
          "equal-opportunity-form",
          "veteran-status-form",
          "disability-form"
        ];
        const bgcStatus = ["non-fcra", "fcra", "additional-bgc-info"];
        const nheStatus = ["nhe", "nhe-preferences"];
        let stepName = bgcStatus.includes(type) ? "bgc" : type;
        stepName = sidStatus.includes(type) ? "self-identification" : stepName;
        stepName = nheStatus.includes(type) ? "nhe" : stepName;
        log(
          `Complete task event initiated on action ${type} and current page is ${stepName}`
        );
        completeTask(data.application, stepName, undefined, undefined, data.job);
      }
      if (options?.goTo) {
        log(`After update, application is redirecting to ${options?.goTo}`);
        goTo(options?.goTo, urlParams)(dispatch);
      }
    } catch (ex) {
      logError(`Error while updating application at ${type}`, ex);
      setLoading(false)(dispatch);
      if (ex?.message === NO_APPLICATION_ID) {
        window.localStorage.setItem("page", "applicationId-null");
        onUpdatePageId("applicationId-null")(dispatch);
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Failed to update application"
        )(dispatch);
      }
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

  const allShifts: any[] = payload.data.requisition.availableShifts.shifts;
  const selectedShiftPositionInOrder: number = findIndex(allShifts, {
    headCountRequestId: payload.selectedShift.headCountRequestId
  });
  const dataLayerShiftSelected = getDataForEventMetrics("shift-selection");
  // position
  dataLayerShiftSelected.shift.position = selectedShiftPositionInOrder + 1;

  const page = window.localStorage.getItem("page");
  if (!checkIfIsCSS(<string>page)) {
    sendDataLayerAdobeAnalytics(dataLayerShiftSelected);
  }

  log("Selected shift", {
    selectedShift: JSON.stringify(payload.selectedShift)
  });
};


export const onSelectedSchedules = (payload: IPayload) => (dispatch: Function) => {
  onSelectedSchedule(payload.selectedSchedule.scheduleId)(dispatch);
  if (payload.options?.goTo) {
    goTo(payload.options?.goTo, payload.urlParams)(dispatch);
  }
  dispatch({
    type: SET_SELECTED_SCHEDULE,
    payload: payload.selectedSchedule
  });

  const allSchedules = payload.data.job.availableSchedules.schedules;
  const selectedSchedulePositionInOrder: number = findIndex(allSchedules, {
    scheduleId: payload.selectedSchedule.scheduleId
  });
  const dataLayerShiftSelected = getDataForEventMetrics("shift-selection");
  // position
  dataLayerShiftSelected.shift.position = selectedSchedulePositionInOrder + 1;

  const page = window.localStorage.getItem("page");
  if (!checkIfIsCSS(<string>page)) {
    sendDataLayerAdobeAnalytics(dataLayerShiftSelected);
  }

  log("Selected schedules", {
    selectedSchedule: JSON.stringify(payload.selectedSchedule)
  });
};

export const onUpdateShiftSelection = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { application, selectedShift } = payload.data;
    const { urlParams } = payload;

    if (isNil(urlParams.applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    log("Updating the shift selection in application", {
      selectedShift: JSON.stringify(selectedShift)
    });
    const response = await new CandidateApplicationService().updateApplication({
      type: "job-confirm",
      applicationId: urlParams.applicationId,
      payload: {
        headCountRequestId: selectedShift.headCountRequestId,
        childRequisitionId: selectedShift.requisitionId,
        shiftType: selectedShift.shiftType,
        shift: selectedShift
      }
    });
    response.shift = selectedShift;
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });
    log(
      "Updated application at job-confirm and update application data in state",
      {
        selectedShift: JSON.stringify(selectedShift)
      }
    );
    if (payload.options?.goTo) {
      log(
        `After updating shift, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log(
      "Complete task event initiated on action job-confirm and current page is job-opportunities"
    );
    completeTask(application, "job-opportunities", undefined, undefined, payload.data?.job);
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while updating job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  }
};

export interface JobSelectedDS {
  jobId: string;
  scheduleDetails: string;
  scheduleId: string;
  jobScheduleSelectedTime?: string;
}

export const onUpdateShiftSelectionDS = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { application } = payload.data;

    const selectedSchedule = payload.data.job.selectedChildSchedule;

    log("Updating the shift selection in application", {
      selectedSchedule: JSON.stringify(selectedSchedule)
    });

    const jobSelected: JobSelectedDS = {
      jobId: payload.data.job.jobDescription.jobId,
      scheduleId: payload.data.job.selectedChildSchedule.scheduleId,
      scheduleDetails: JSON.stringify(payload.data.job.selectedChildSchedule),
    };

    const response = await new CandidateApplicationService().updateApplication({
      type: "job-confirm",
      applicationId: application.applicationId,
      payload: jobSelected
    });
    response.schedule = selectedSchedule;
    response.jobDescription = payload.data.job.jobDescription;
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });
    log(
      "Updated application at job-confirm and update application data in state",
      {
        selectedSchedule: JSON.stringify(selectedSchedule)
      }
    );
    if (payload.options?.goTo) {
      log(
        `After updating shift, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log(
      "Complete task event initiated on action job-confirm and current page is job-opportunities"
    );
    completeTask(application, "job-opportunities", undefined, undefined, payload.data?.job);
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while updating job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  }
};

export const onSubmitApplicationDS = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { application } = payload.data;

    const selectedShift = payload.data.job.selectedChildSchedule;

    log("Updating the shift selection in application", {
      selectedShift: JSON.stringify(selectedShift)
    });

    const jobSelected: JobSelectedDS = {
      jobId: payload.data.job.jobDescription.jobId,
      scheduleId: payload.data.job.selectedChildSchedule.scheduleId,
      scheduleDetails: JSON.stringify(payload.data.job.selectedChildSchedule)
    };

    const response = await new CandidateApplicationService().updateApplication({
      type: "review-submit",
      applicationId: application.applicationId,
      payload: jobSelected
    });

    completeTask(application, "review-submit", undefined, undefined, payload.data?.job);
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while updating job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  }
};

export const onTerminateApplication = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { options, urlParams } = payload;
    const { state } = options;
    const { applicationId } = urlParams;
    if (isNil(applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }
    log("Updating application with termination");
    const response = await new CandidateApplicationService().terminateApplication(
      applicationId,
      state
    );
    dispatch({ type: UPDATE_APPLICATION, payload: { application: response } });
    log("Updated application with termination and state");
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    console.log(ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  }
};

export const onUpdateWotcStatus = (payload: IPayload) => async (dispatch: Function) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const { options, urlParams } = payload;
  const { status } = options;
  try {
    const { applicationId } = urlParams;
    const { jobId } = urlParams;
    const { requisitionId } = urlParams;
    const urlParamsFromSearch = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
    const isLegacy = checkIfIsLegacy();
    if (isNil(applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    const candidateResponse = await onGetCandidate(payload, true)(dispatch);
    log(`Updating application with wtoc status ${status}`);
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
    log(
      `Updated application with wtoc status ${status} and update application data in state`
    );
    if (isLegacy) {
      loadWorkflow(
        requisitionId,
        applicationId,
        candidateResponse.candidateId,
        payload.appConfig
      );
    } else {
      loadWorkflowDS(
        jobId || urlParamsFromSearch.jobId as string || "",
        response.jobScheduleSelected.scheduleId || urlParamsFromSearch.scheduleId as string || "",
        response.applicationId,
        candidateResponse.candidateId,
        payload.appConfig
      );
    }
    setLoading(true)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    log(`Error while updating wtoc status ${status}`);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);
    }
  }
};

export const onShowPreviousName = () => (dispatch: Function) => {
  dispatch({ type: SHOW_PREVIOUS_NAMES, payload: "YES" });
};

export const onSaveShiftPreferences = (payload: IPayload) => async (dispatch: Function) => {
  try {
    onRemoveError()(dispatch);
    setLoading(true)(dispatch);
    const { output, requisition } = payload.data;
    const { urlParams, options } = payload;
    const selectedRequisitions = requisition.childRequisitions.reduce(
      (previousValue, currentValue) => {
        if (currentValue.selected) {
          previousValue.push(currentValue.requisitionId);
        }
        return previousValue;
      },
      [] as string[]
    );
    const shiftPreference: DeprecatedShiftPreferences = {};
    if (!isEmpty(selectedRequisitions)) {
      shiftPreference.jobRoles = selectedRequisitions;

      const selectedData = output[payload.pageId];
      if (selectedData) {
        for (const key in selectedData) {
          let data = selectedData[key] as any[];
          data = data.reduce((previousValue, currentValue) => {
            if (currentValue.checked) {
              previousValue.push(currentValue.value);
            }
            return previousValue;
          }, []);
          // @ts-ignore
          shiftPreference[key] = data;
        }
      }

      shiftPreference.candidateTimezone = payload.data.candidate.timezone;

      const response = await new CandidateApplicationService().updateApplication(
        {
          type: "job-preferences",
          applicationId: urlParams.applicationId,
          payload: {
            shiftPreference
          }
        }
      );

      const hoursPerWeek = shiftPreference.hoursPerWeek?.map(
        (value: HoursPerWeekValue) =>
          `${value.minimumValue} - ${value.maximumValue} hrs/wk`
      );
      const shiftTimeIntervals = shiftPreference.shiftTimeIntervals?.map(
        (value: ShiftTimeInterval) => `${value.from} - ${value.to}`
      );

      if (options?.adobeMetrics) {
        const metricData = {
          preference: {
            locations: shiftPreference.locations,
            hoursPerWeek: hoursPerWeek,
            daysOfWeek: shiftPreference.daysOfWeek,
            timeWindow: shiftTimeIntervals
          }
        };
        postAdobeMetrics(
          options.adobeMetrics,
          metricData as MetricData,
          payload.data
        );
      }
      log("save selected shift preferences", {
        shiftPreference,
        saveResponse: response.data
      });
      onUpdatePageId("job-preferences-thank-you")(dispatch);
    } else {
      window.scrollTo({ top: 0 });
      onUpdateError(
        "Please select a job role that you are interested in before submitting your preferences! You may select multiple roles."
      )(dispatch);
    }
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    log("Error while saving shift preferences", ex);
    onUpdateError(
      ex?.response?.data?.errorMessage || "Unable to save shift preferences"
    )(dispatch);
  }
};

export const onUpdateShiftSelectionSelfService = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { selectedShift } = payload.data;
    const { urlParams } = payload;
    const currentShift = payload?.data?.application?.jobSelected?.headCountRequestId;

    const updateScheduleReason = propertyOf(payload.data.output)("update-shift-confirmation.updateScheduleReason");
    if (!isNil(currentShift)
        && (updateScheduleReason === undefined || updateScheduleReason === "default")) {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message:
              "Please select a reschedule reason."
        }
      });
      setLoading(false)(dispatch);
      return;
    }

    dispatch({
      type: UPDATE_CANCELLATION_RESCHEDULE_REASON,
      payload: {
        reason: updateScheduleReason
      }
    });

    if (isNil(urlParams.applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    log("Updating the shift selection in application", {
      selectedShift: JSON.stringify(selectedShift)
    });

    const response = await new CandidateApplicationService().updateApplication({
      type: "update-shift",
      applicationId: urlParams.applicationId,
      payload: {
        headCountRequestId: selectedShift.headCountRequestId,
        childRequisitionId: selectedShift.requisitionId,
        shiftType: selectedShift.shiftType,
        shift: selectedShift
      }
    });
    sendAdobeAnalytics("successful-update-shift-self-service");

    response.shift = selectedShift;
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });

    log(
      "Updated application at update-shift and update application data in state",
      {
        selectedShift: JSON.stringify(selectedShift)
      }
    );
    if (payload.options?.goTo) {
      log(
        `After updating shift, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log("Complete task event initiated on action update-shift");

    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while updating job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      let errorMessage;
      if (
        ex?.response?.data?.errorMessage &&
        ex.response.data.errorMessage ===
          "The appointment you selected is no longer available. Please select a different time."
      ) {
        errorMessage =
            "The schedule you selected is no longer available. Please select a different option.";
        dispatch({
          type: DISABLE_CONFIRMATION_BUTTON
        });
        sendAdobeAnalytics("fail-update-shift-schedule-full-self-service");
      } else if (
        ex?.response?.data?.errorMessage &&
          ex.response.data.errorMessage === "Candidate already hired."
      ) {
        errorMessage = "You have recently been hired for this application, your shift cannot be changed. " +
            "Please reach out at https://www.amazondelivers.jobs/contactus to change your shift";
        dispatch({
          type: DISABLE_CONFIRMATION_BUTTON
        });
      } else {
        errorMessage =
          ex?.response?.data?.errorMessage || "Failed to update application";
        sendAdobeAnalytics("fail-update-shift-unknown-error-self-service");
      }
      onUpdateError(errorMessage)(dispatch);
    }
  }
};

export const onCancelShiftSelectionSelfService = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { urlParams } = payload;

    const cancelScheduleReason = propertyOf(payload.data.output)("cancel-shift-confirmation.cancelScheduleReason");
    if (cancelScheduleReason === undefined || cancelScheduleReason === "default") {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message:
              "Please select a cancellation reason."
        }
      });
      setLoading(false)(dispatch);
      return;
    }

    dispatch({
      type: UPDATE_CANCELLATION_RESCHEDULE_REASON,
      payload: {
        reason: cancelScheduleReason
      }
    });

    if (isNil(urlParams.applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    const response = await new CandidateApplicationService().updateApplication({
      type: "cancel-shift",
      applicationId: urlParams.applicationId,
      payload: {}
    });

    sendAdobeAnalytics("successful-cancel-shift-self-service");

    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });

    if (payload.options?.goTo) {
      log(
        `After canceling shift, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log("Complete task event initiated on action cancel-shift");
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while canceling job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);

      sendAdobeAnalytics("fail-cancel-shift-self-service");
    }
  }
};

export const sendPageLoadAdobeEvent = (payload: IPayload) => async () => {
  const { options } = payload;
  if (options?.adobeMetrics) {
    postAdobeMetrics(options.adobeMetrics, {});
  }
};

export const sendAdobeAnalytics = (eventName: any) => {
  let dataLayer: any = {};
  dataLayer = getDataForEventMetrics(eventName);
  sendDataLayerAdobeAnalytics(dataLayer);
};

export const onUpdateShiftSelectionSelfServiceDS = (payload: IPayload) => async (
  dispatch: Function
) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { application } = payload.data;
    const { urlParams } = payload;
    const selectedSchedule = payload.data.job.selectedChildSchedule;
    const currentSchedule = payload?.data?.application?.jobScheduleSelected?.scheduleId;

    const updateScheduleReason = propertyOf(payload.data.output)("update-shift-confirmation-ds.updateScheduleReason");
    if (!isNil(currentSchedule)
        && (updateScheduleReason === undefined || updateScheduleReason === "default")) {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message:
              "Please select a reschedule reason."
        }
      });
      setLoading(false)(dispatch);
      return;
    }

    dispatch({
      type: UPDATE_CANCELLATION_RESCHEDULE_REASON,
      payload: {
        reason: updateScheduleReason
      }
    });

    if (isNil(urlParams.applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    log("Updating the shift selection in application", {
      selectedSchedule: JSON.stringify(selectedSchedule)
    });

    const jobSelected: JobSelectedDS = {
      jobId: payload.data.job.jobDescription.jobId,
      scheduleId: payload.data.job.selectedChildSchedule.scheduleId,
      scheduleDetails: JSON.stringify(payload.data.job.selectedChildSchedule),
    };

    const response = await new CandidateApplicationService().updateApplication({
      type: "update-schedule",
      applicationId: application.applicationId,
      payload: jobSelected
    });
    sendAdobeAnalytics("successful-update-shift-self-service");

    response.schedule = selectedSchedule;
    response.jobDescription = payload.data.job.jobDescription;
    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });
    log(
      "Updated application at update-schedule and update application data in state",
      {
        selectedSchedule: JSON.stringify(selectedSchedule)
      }
    );
    if (payload.options?.goTo) {
      log(
        `After updating schedule, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log("Complete task event initiated on action update-shift-ds");

    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while updating job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      let errorMessage;
      if (
        ex?.response?.data?.errorMessage &&
          ex.response.data.errorMessage ===
          "The appointment you selected is no longer available. Please select a different time."
      ) {
        errorMessage =
            "The schedule you selected is no longer available. Please select a different option.";
        dispatch({
          type: DISABLE_CONFIRMATION_BUTTON
        });
        sendAdobeAnalytics("fail-update-shift-schedule-full-self-service");
      } else if (
        ex?.response?.data?.errorMessage &&
          ex.response.data.errorMessage === "Reversion failed."
      ) {
        errorMessage = "Sorry, we are having some technical difficulties. Because of this, you have lost your " +
            "previously confirmed schedule and start date. Please exit, click on \"Schedule your shift today!\", and " +
            "select a schedule and start date.";
        dispatch({
          type: DISABLE_CONFIRMATION_BUTTON
        });
        sendAdobeAnalytics("fail-update-shift-schedule-unsuccessful-reversion-self-service");
      } else if (
        ex?.response?.data?.errorMessage &&
          ex.response.data.errorMessage === "Candidate already hired."
      ) {
        errorMessage = "You have recently been hired for this application, your schedule cannot be changed. " +
            "Please reach out at https://www.amazondelivers.jobs/contactus to change your schedule";
        dispatch({
          type: DISABLE_CONFIRMATION_BUTTON
        });
      } else {
        errorMessage =
            ex?.response?.data?.errorMessage || "Failed to update application";
        sendAdobeAnalytics("fail-update-shift-unknown-error-self-service");
      }
      onUpdateError(errorMessage)(dispatch);
    }
  }
};

export const onCancelShiftSelectionSelfServiceDS = (payload: IPayload) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  onRemoveError()(dispatch);
  try {
    const { } = payload.data;
    const { urlParams } = payload;
    const cancelScheduleReason = propertyOf(payload.data.output)("cancel-shift-confirmation-ds.cancelScheduleReason");
    if (cancelScheduleReason === undefined || cancelScheduleReason === "default") {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message:
              "Please select a cancellation reason."
        }
      });
      setLoading(false)(dispatch);
      return;
    }

    dispatch({
      type: UPDATE_CANCELLATION_RESCHEDULE_REASON,
      payload: {
        reason: cancelScheduleReason
      }
    });

    if (isNil(urlParams.applicationId)) {
      throw new Error(NO_APPLICATION_ID);
    }

    const response = await new CandidateApplicationService().updateApplication({
      type: "cancel-schedule",
      applicationId: urlParams.applicationId,
      payload: {}
    });

    sendAdobeAnalytics("successful-cancel-shift-self-service");

    dispatch({
      type: UPDATE_APPLICATION,
      payload: {
        application: response
      }
    });

    if (payload.options?.goTo) {
      log(
        `After canceling schedule, application is redirecting to ${payload.options?.goTo}`
      );
      goTo(payload.options?.goTo, payload.urlParams)(dispatch);
    }
    log("Complete task event initiated on action cancel-shift");
    setLoading(false)(dispatch);
  } catch (ex) {
    setLoading(false)(dispatch);
    logError("Failed while canceling job selection", ex);
    if (ex?.message === NO_APPLICATION_ID) {
      window.localStorage.setItem("page", "applicationId-null");
      onUpdatePageId("applicationId-null")(dispatch);
    } else {
      onUpdateError(
        ex?.response?.data?.errorMessage || "Failed to update application"
      )(dispatch);

      sendAdobeAnalytics("fail-cancel-shift-self-service");
    }
  }
};

export const onSFLogout = () => {
  window.localStorage.removeItem("accessToken");
  const SFLogoutURL = window.reduxStore?.getState()?.app?.appConfig?.SFLogoutURL
    ? window.reduxStore?.getState()?.app?.appConfig?.SFLogoutURL
    : "https://amazon.force.com/secur/logout.jsp";
  window.location.assign(SFLogoutURL);
};

export const onAssessmentStart = ( payload: IPayload ) => async () => {
  const assessmentUrl = payload.data.application.assessment?.assessmentUrl;
  if (assessmentUrl && payload.options?.adobeMetrics) {
    postAdobeMetrics(payload.options.adobeMetrics, {});
  }
  assessmentUrl && window.location.assign(assessmentUrl);
};

export const onAssessmentFinished = ( payload: IPayload ) => async (
  dispatch: Function
) => {
  setWorkflowLoading(true)(dispatch);
  onRemoveError()(dispatch);
  const { jobId } = payload.urlParams;
  const { applicationId } = payload.urlParams;
  if (jobId && applicationId) {
    try {
      const getApplication = new CandidateApplicationService().getApplication(applicationId);
      const getJob = new JobService().getJobInfo(jobId);
      const getCandidate = new CandidateApplicationService().getCandidate();

      let applicationResponse: ICandidateApplication, candidate, job;
      await Promise.all([getApplication, getJob, getCandidate]).then(async (results) => {
        applicationResponse = results[0];
        job = results[1];
        candidate = results[2];
        window.hasCompleteTask = () => {
          completeTask(applicationResponse, "assessment-consent", undefined, undefined);
          setWorkflowLoading(false)(dispatch);
        };
        dispatch({
          type: GET_APPLICATION,
          payload: {
            application: applicationResponse,
            currentState: applicationResponse.currentState
          }
        });

        dispatch({
          type: GET_JOB_INFO,
          payload: job
        });

        dispatch({
          type: ON_GET_CANDIDATE,
          payload: candidate
        });

        const scheduleId = applicationResponse.jobScheduleSelected.scheduleId
          ? applicationResponse.jobScheduleSelected.scheduleId
          : payload.urlParams.scheduleId;
        
        if (scheduleId) {
          const scheduleResponse = await new JobService().getScheduleDetailByScheduleId(
            scheduleId
          );
        
          dispatch({
            type: SELECTED_SCHEDULE,
            payload: scheduleResponse
          });
        }

        log(
          "Complete task event initiated on action assessment-finished"
        );
        if (payload.options?.adobeMetrics) {
          postAdobeMetrics(payload.options.adobeMetrics, {});
        }

        loadWorkflowDS(
          jobId as string || "",
          scheduleId as string || "",
          applicationId,
          candidate.candidateId,
          payload.appConfig
        );
        setWorkflowLoading(false)(dispatch);
      });

    } catch (ex) {
      setWorkflowLoading(false)(dispatch);
      logError("Failed while finishing assessment", ex);
      if (ex?.message === NO_APPLICATION_ID) {
        window.localStorage.setItem("page", "applicationId-null");
        onUpdatePageId("applicationId-null")(dispatch);
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Failed to finish assessment"
        )(dispatch);
      }
    }
  } else {
    onUpdatePageId("applicationId-null")(dispatch);
  }
};
