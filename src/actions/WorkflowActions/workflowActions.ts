import moment from "moment";
import {
  PAGE_ROUTES,
  PagesControlledByWorkFlowService,
  PagesNeedToUseWorkflowRedirection
} from "../../components/pageRoutes";
import { MAX_MINUTES_FOR_HEARTBEAT } from "../../constants";
import { log, logError } from "../../helpers/log-helper";
import { checkIfIsCSRequest } from "../../helpers/utils";
import StepFunctionService from "../../services/step-function-service";
import store from "../../store/store";
import { WORKFLOW_ERROR_CODE, WORKFLOW_STEP_NAME } from "../../utils/enums/common";
import { getCurrentStepNameFromHash, loadingStatusHelper, routeToAppPageWithPath } from "../../utils/helper";
import { Application, CompleteTaskRequest, EnvConfig, Schedule, WorkflowData } from "../../utils/types/common";
import { boundUpdateWorkflowName } from "../ApplicationActions/boundApplicationActions";
import { boundWorkflowRequestEnd, boundWorkflowRequestStart } from "../WorkflowActions/boundWorkflowActions";
import {
  SetWorkflowErrorCodeAction,
  WORKFLOW_REQUEST,
  WorkflowRequestEndAction,
  WorkflowRequestInitAction,
  WorkflowRequestStartAction
} from "./workflowActionTypes";

export const loadWorkflow =
    ( requisitionId: string, applicationId: string, candidateId: string, envConfig: EnvConfig, isCompleteTaskOnLoad?: boolean, applicationData?: Application ) => {
      if (!window?.stepFunctionService?.websocket) {

        if (isCompleteTaskOnLoad) {
          window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
          window.applicationData = applicationData;
        }

        log("Initiated to connect websocket");
        window.stepFunctionService = StepFunctionService.load(requisitionId, applicationId, candidateId, envConfig);
      }
    };

export const loadWorkflowDS =
    ( jobId: string, scheduleId: string, applicationId: string, candidateId: string, envConfig: EnvConfig, isCompleteTaskOnLoad?: boolean, applicationData?: Application ) => {
      if (!window?.stepFunctionService?.websocket) {

        if (isCompleteTaskOnLoad) {
          window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
          window.applicationData = applicationData;
        }

        log("[WS] Initiated to connect websocket", [jobId, scheduleId, applicationId, candidateId, envConfig]);
        window.stepFunctionService = StepFunctionService.loadDS(jobId, scheduleId, applicationId, candidateId, envConfig);
      }
    };

export const startOrResumeWorkflow = () => {
  log("Started workflow");
  const { stepFunctionService } = window;
  const { applicationId, candidateId, requisitionId } = stepFunctionService;
  const payload: string = JSON.stringify({
    action: "startWorkflow",
    applicationId,
    candidateId,
    requisitionId,
    isCsDomain: checkIfIsCSRequest()
  });
  window.stepFunctionService.sendMessage(payload);
};

export const startOrResumeWorkflowDS = () => {
  log("[WS] Started DS workflow");
  boundWorkflowRequestStart();
  const { stepFunctionService } = window;
  const { applicationId, candidateId, jobId, scheduleId } = stepFunctionService;

  const payload: string = JSON.stringify({
    action: "startWorkflow",
    applicationId,
    candidateId,
    jobId,
    scheduleId,
    isCsDomain: checkIfIsCSRequest()
  });

  window.stepFunctionService.sendMessage(payload);

  if (window.hasCompleteTask) {
    window.hasCompleteTask();
    window.hasCompleteTask = undefined;
  }
};

export const sendHeartBeatWorkflow = () => {
  const { websocket } = window.stepFunctionService;
  if (window.hearBeatTime) {
    log("Sending the heart beat event");
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));

    if (duration.asMinutes() < MAX_MINUTES_FOR_HEARTBEAT && websocket?.OPEN === websocket?.readyState) {
      const payload: string = JSON.stringify({ action: "heartbeat" });
      window.stepFunctionService.sendMessage(payload);
    } else {
      log("Websocket timed out, moved to timed out page");
      routeToAppPageWithPath(PAGE_ROUTES.TIMEOUT);
    }
  } else {
    window.hearBeatTime = moment().toISOString();

    if (websocket?.OPEN === websocket?.readyState) {
      log("Sending the heart beat event");
      const payload: string = JSON.stringify({ action: "heartbeat" });
      window.stepFunctionService.sendMessage(payload);
    } else {
      log("Websocket timed out, moved to timed out page");
      routeToAppPageWithPath(PAGE_ROUTES.TIMEOUT);
    }
  }
};

export const ifShouldGoToStep = (targetStepName: string, currentStepName: string): boolean => {

  if (targetStepName === currentStepName) {
    // Do not redirect if the current step is the same as the target step

    return false;
  } else if (currentStepName === PAGE_ROUTES.ASSESSMENT_FINISHED &&
    targetStepName === WORKFLOW_STEP_NAME.ASSESSMENT_CONSENT) {

    // Do not redirect to `assessment-consent` if the current step is `assessment-finished`.
    //
    // There is a race condition on `assessment-finished` page, when HOOK redirect back to us, since the whole domain and url change it's a
    // page refresh. BB UI will reconnect websocket which will returns the step `assessment-consent`, since there is a mismatch between the
    // current step and the current page, BB UI will try to redirect the user to the `assessment-consent` page the WS response indicates.
    //
    // We want to make sure that the user stays at `assessment-finished` page when we are trying to completeTask assessment-consent. Otherwise,
    // the user will see the `assessment-consent` page first then after a few seconds be redirected back to the next step.

    return false;
  } else if (currentStepName === PAGE_ROUTES.WOTC_COMPLETE &&
    targetStepName === WORKFLOW_STEP_NAME.WOTC) {

    // Make sure that the user stays at `wotc-complete` page when we are trying to completeTask wotc. Otherwise,
    // the user will see the `wotc` page first then after a few seconds be redirected back to the next step, which is `supplementary-success`.
    // Right now wotc page takes a long time (~2-5s) to load that's why we didn't see any page flickering at this time.

    return false;
  } else if (Object.values(PAGE_ROUTES).includes(currentStepName as PAGE_ROUTES) &&
    !Object.values(PagesControlledByWorkFlowService).includes(currentStepName as PAGE_ROUTES)
    && !Object.values(PagesNeedToUseWorkflowRedirection).includes(currentStepName as PAGE_ROUTES) && !window.hasTargetStep) {
    // this is to address the infinite redirection for any error page that fetch application from proxy. https://sim.amazon.com/issues/Kondo_QA_Issue-121
    // Typically if an error page get application detail and trigger GetApplicationSuccessEpic if there is no websocket connection setup,
    // it will start workflow connection, once workflow connection is started it will return the nextStep which is different to error page
    // as error pages are not managed by workflow service. In this scenario, we redirect to the page returned by workflow service which shouldn't be the right one
    // With this change, we will check if a page is a valid route and is not managed by workflow service, then we don't have to redirect to the targeted page from workflow service
    // instead we stay on this error page to avoid probable infinite loop
    // If a page is invalid route, or is managed by workflow service, we rely on it
    // we should exclude consent page to ensure that redirection to job opportunity or assessment works.
    // check if it has targetStep to ensure that when we are on error page and try to go to workflow service managed page, this case we can rely on workflow service nextStep from response

    return false;
  }
  // reset hasTarget to ensure next page will be redirected correctly by relying on workflow service nextStep if it's on a UI controlled page
  window.hasTargetStep = undefined;
  return true;
  
};

export const goToStep = async ( workflowData: WorkflowData ) => {
  const state = store.getState();
  const applicationData = state.application.results;
  const currentStepName = getCurrentStepNameFromHash();
  const { stepName } = workflowData;

  log("Received data from step function", { workflowData, currentStepName: currentStepName, goToStepName: stepName });

  if (stepName && applicationData && ifShouldGoToStep(stepName, currentStepName)) {
    boundWorkflowRequestStart();

    log(`current step name (${currentStepName}) and go to step name (${stepName}) is not matched`);
    log("updating workflow step name in application", { applicationId: applicationData.applicationId, stepName });

    boundUpdateWorkflowName({ applicationId: applicationData.applicationId, workflowStepName: stepName }, () => {
      boundWorkflowRequestEnd();
      routeToAppPageWithPath(stepName);
      log(`update workflow step in local storage as ${stepName}`, applicationData);
      window.localStorage.setItem("page", stepName);
    }, ( ex: any ) => {
      logError("Unable to update workflow step in application", ex, applicationData);
      boundWorkflowRequestEnd();
    }
    );

    if (workflowData.stepName === WORKFLOW_STEP_NAME.SUPPLEMENTARY_SUCCESS || workflowData.stepName === WORKFLOW_STEP_NAME.THANK_YOU) {
      const metric = window.MetricsPublisher.newChildActionPublisherForMethod("ApplicationCompleteTime");
      const metricName = workflowData.stepName === WORKFLOW_STEP_NAME.SUPPLEMENTARY_SUCCESS ? "Completed" : "PreHireStepsCompleted";
      metric.publishTimerMonitor(metricName, Date.now() - window.applicationStartTime);
    }
  } else {
    log(`Received target step name: ${stepName}, current step name ${currentStepName}. Stay on current step.`);
    boundWorkflowRequestEnd();
  }
};

export const completeTask =
    ( application?: Application, currentStep?: string, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME, jobId?: string, schedule?: Schedule ) => {
      log("[WS] in completeTask, websocket is: ", {
        websocket: window.stepFunctionService?.websocket,
        readyState: window.stepFunctionService?.websocket?.readyState,
      });
      if (window.stepFunctionService?.websocket) {
        boundWorkflowRequestStart();
        const jobSelectedOn = application?.jobSelected?.jobSelectedOn || application?.jobScheduleSelected?.jobScheduleSelectedTime || "";
        const state = schedule?.state || "";
        const employmentType = schedule?.employmentType || "";
        const data: CompleteTaskRequest = {
          action: "completeTask",
          applicationId: window.stepFunctionService.applicationId || "",
          candidateId: window.stepFunctionService.candidateId || "",
          requisitionId: window.stepFunctionService.requisitionId || "", // requisitionId can't be null
          jobId: jobId || "",
          state,
          employmentType,
          eventSource: "HVH-CA-UI",
          jobSelectedOn,
          currentWorkflowStep: currentStep || "",
          isCsDomain: checkIfIsCSRequest(),
          workflowStepName: isBackButton ? targetStep || "" : ""
        };

        log(`[WS] complete ${currentStep} stepName request: `, { ...data });

        // wait for ready state to be open
        window.stepFunctionService.sendMessage(JSON.stringify(data));
      }
    };

export const onTimeOut = () => {
  if (window.hearBeatTime) {
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));

    if (duration.asMinutes() > MAX_MINUTES_FOR_HEARTBEAT) {
      log("Websocket timed out, moved to timed out page");

      boundWorkflowRequestEnd();
      routeToAppPageWithPath(PAGE_ROUTES.TIMEOUT);
    }
  } else {
    log("Websocket timed out, moved to timed out page");

    boundWorkflowRequestEnd();
    routeToAppPageWithPath(PAGE_ROUTES.TIMEOUT);
  }
};

export const onCompleteTaskHelper = ( application: Application, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME, currentStep?: WORKFLOW_STEP_NAME ) => {
  const state = store.getState();
  const jobId = application.jobScheduleSelected?.jobId;
  const scheduleId = application.jobScheduleSelected?.scheduleId;
  const { applicationId } = application;
  const { candidateId } = application;
  const currentStepName = currentStep || getCurrentStepNameFromHash();
  const { scheduleDetail } = state.schedule.results;

  if (targetStep) {
    window.hasTargetStep = true;
  }

  if (isBackButton) {
    log(`[WS] Completed task on back button execution, current step is ${currentStepName} for application:`, application);
  } else {
    log(`[WS] Completed task on ${currentStepName} for application:`, application);
  }

  if (!window?.stepFunctionService?.websocket && state.appConfig.results?.envConfig) {
    log("[WS] No websocket connection, add hasCompleteTaskOnWorkflowConnect and load workflow");
    window.hasCompleteTaskOnWorkflowConnect = () => {
      completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
    };
    boundWorkflowRequestStart();
    loadWorkflowDS(jobId || "", scheduleId || "", applicationId, candidateId, state.appConfig.results.envConfig);
  } else {
    completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
  }
};

export const actionWorkflowRequestInit = (): WorkflowRequestInitAction => {
  return { type: WORKFLOW_REQUEST.INIT };
};

export const actionWorkflowRequestStart = (): WorkflowRequestStartAction => {
  return { type: WORKFLOW_REQUEST.START };
};

export const actionWorkflowRequestEnd = (): WorkflowRequestEndAction => {
  return { type: WORKFLOW_REQUEST.END, loadingStatus: loadingStatusHelper() };
};

export const actionSetWorkflowErrorCode = (payload: WORKFLOW_ERROR_CODE): SetWorkflowErrorCodeAction => {
  return {
    type: WORKFLOW_REQUEST.SET_WORKFLOW_ERROR_CODE,
    payload
  };
};
