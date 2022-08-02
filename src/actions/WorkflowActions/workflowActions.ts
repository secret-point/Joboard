import { Application, CompleteTaskRequest, EnvConfig, Schedule, WorkflowData } from "../../utils/types/common";
import StepFunctionService from "../../services/step-function-service";
import moment from "moment";
import { MAX_MINUTES_FOR_HEARTBEAT } from "../../constants";
import { getDataForEventMetrics } from "../../helpers/adobe-helper";
import { sendDataLayerAdobeAnalytics } from "../AdobeActions/adobeActions";
import { log, logError } from "../../helpers/log-helper";
import { checkIfIsCSRequest, pathByDomain } from "../../helpers/utils";
import { boundWorkflowRequestEnd, boundWorkflowRequestStart } from "../WorkflowActions/boundWorkflowActions";
import store from "../../store/store";
import { boundUpdateWorkflowName } from "../ApplicationActions/boundApplicationActions";
import { getCurrentStepNameFromHash, loadingStatusHelper, routeToAppPageWithPath } from "../../utils/helper";
import { WORKFLOW_ERROR_CODE, WORKFLOW_STEP_NAME } from "../../utils/enums/common";
import {
  SetWorkflowErrorCodeAction,
  WORKFLOW_REQUEST,
  WorkflowRequestEndAction,
  WorkflowRequestInitAction,
  WorkflowRequestStartAction
} from "./workflowActionTypes";
import { PAGE_ROUTES } from "../../components/pageRoutes";

export const loadWorkflow =
    ( requisitionId: string, applicationId: string, candidateId: string, envConfig: EnvConfig, isCompleteTaskOnLoad?: boolean, applicationData?: Application ) => {
      if(!window?.stepFunctionService?.websocket) {

        if(isCompleteTaskOnLoad) {
          window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
          window.applicationData = applicationData;
        }

        log("Initiated to connect websocket");
        window.stepFunctionService = StepFunctionService.load(requisitionId, applicationId, candidateId, envConfig);
      }
    };

export const loadWorkflowDS =
    ( jobId: string, scheduleId: string, applicationId: string, candidateId: string, envConfig: EnvConfig, isCompleteTaskOnLoad?: boolean, applicationData?: Application ) => {
      if(!window?.stepFunctionService?.websocket) {

        if(isCompleteTaskOnLoad) {
          window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
          window.applicationData = applicationData;
        }

        log("Initiated to connect websocket", [jobId, scheduleId, applicationId, candidateId, envConfig]);
        console.info("[WS] Initiated to connect websocket", [jobId, scheduleId, applicationId, candidateId, envConfig]);
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
  window.stepFunctionService.websocket?.send(payload);
};

export const startOrResumeWorkflowDS = () => {
  log("Started DS workflow");
  console.info("[WS] Started/Resume DS workflow");
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

  window.stepFunctionService.websocket?.send(payload);

  if(window.hasCompleteTask) {
    window.hasCompleteTask();
    window.hasCompleteTask = undefined;
  }
};

export const sendHeartBeatWorkflow = () => {
  const websocket = window.stepFunctionService.websocket;
  if(window.hearBeatTime) {
    log("Sending the heart beat event");
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));

    if(duration.asMinutes() < MAX_MINUTES_FOR_HEARTBEAT && websocket?.OPEN === websocket?.readyState) {
      const payload: string = JSON.stringify({ action: "heartbeat" });
      window.stepFunctionService.websocket?.send(payload);
    }
    else {
      log("Websocket timed out, moved to timed out page");
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  }
  else {
    window.hearBeatTime = moment().toISOString();

    if(websocket?.OPEN === websocket?.readyState) {
      log("Sending the heart beat event");
      const payload: string = JSON.stringify({ action: "heartbeat" });
      window.stepFunctionService.websocket?.send(payload);
    }
    else {
      log("Websocket timed out, moved to timed out page");
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  }
};

export const ifShouldGoToStep = (targetStepName: string, currentStepName:string): boolean => {
  // Do not redirect if the current step is the same as the target step
  if(targetStepName === currentStepName) {
    return false;
  }

  // Do not redirect to `assessment-consent` if the current step is `assessment-finished`.
  //
  // There is a race condition on `assessment-finished` page, when HOOK redirect back to us, since the whole domain and url change it's a
  // page refresh. BB UI will reconnect websocket which will returns the step `assessment-consent`, since there is a mismatch between the
  // current step and the current page, BB UI will try to redirect the user to the `assessment-consent` page the WS response indicates.
  //
  // We want to make sure that the user stays at `assessment-finished` page when we are trying to completeTask assessment-consent. Otherwise,
  // the user will see the `assessment-consent` page first then after a few seconds be redirected back to the next step.
  if (currentStepName === PAGE_ROUTES.ASSESSMENT_FINISHED &&
    targetStepName === WORKFLOW_STEP_NAME.ASSESSMENT_CONSENT) {
    return false;
  }

  return true;
};

export const goToStep = async ( workflowData: WorkflowData ) => {
  const state = store.getState();
  const applicationData = state.application.results;
  const currentStepName = getCurrentStepNameFromHash();
  const { stepName } = workflowData;

  log("Received data from step function", { workflowData, currentStepName: currentStepName, goToStepName: stepName });

  if(stepName && applicationData && ifShouldGoToStep(stepName, currentStepName)) {
    boundWorkflowRequestStart();

    log(`current step name (${currentStepName}) and go to step name (${stepName}) is not matched`);
    log("updating workflow step name in application", { applicationId: applicationData.applicationId, stepName });

    boundUpdateWorkflowName({ applicationId: applicationData.applicationId, workflowStepName: stepName }, () => {
          boundWorkflowRequestEnd();
          routeToAppPageWithPath(stepName);
          log(`update workflow step in local storage as ${stepName}`, applicationData);
        }, ( ex: any ) => {
          logError("Unable to update workflow step in application", ex, applicationData);
          boundWorkflowRequestEnd();
        }
    )

    if(workflowData.stepName === WORKFLOW_STEP_NAME.SUPPLEMENTARY_SUCCESS || workflowData.stepName === WORKFLOW_STEP_NAME.THANK_YOU) {
      const metric = window.MetricsPublisher.newChildActionPublisherForMethod("ApplicationCompleteTime");
      const metricName = workflowData.stepName === WORKFLOW_STEP_NAME.SUPPLEMENTARY_SUCCESS ? "Completed" : "PreHireStepsCompleted";
      metric.publishTimerMonitor(metricName, Date.now() - window.applicationStartTime);
    }
  }
  else {
    log(`Received target step name: ${stepName}, current step name ${currentStepName}. Stay on current step.`);
    boundWorkflowRequestEnd();
  }
};

export const completeTask =
    ( application?: Application, currentStep?: string, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME, jobId?: string, schedule?: Schedule ) => {
      console.info("[WS] in completeTask, websocket is: ", window.stepFunctionService?.websocket);
      console.info("[WS] in completeTask, websocket readyState is: ", window.stepFunctionService?.websocket?.readyState);
      if(window.stepFunctionService?.websocket) {
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

        log(`complete ${currentStep} stepName request: `, { ...data });
        console.info(`[WS] complete ${currentStep} stepName request: `, { ...data });

        window.stepFunctionService.websocket?.send(JSON.stringify(data));
      }
    };

export const onTimeOut = () => {
  if(window.hearBeatTime) {
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));

    if(duration.asMinutes() > MAX_MINUTES_FOR_HEARTBEAT) {
      boundWorkflowRequestEnd();
      const adobeDataLayer = getDataForEventMetrics("session-timeout");
      sendDataLayerAdobeAnalytics(adobeDataLayer);
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  }
  else {
    boundWorkflowRequestEnd();
    const adobeDataLayer = getDataForEventMetrics("session-timeout");
    sendDataLayerAdobeAnalytics(adobeDataLayer);
    window.location.assign(`${pathByDomain()}/#/timeout`);
  }
};

export const onCompleteTaskHelper = ( application: Application, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME, currentStep?: WORKFLOW_STEP_NAME ) => {
  const state = store.getState();
  const jobId = application.jobScheduleSelected?.jobId;
  const scheduleId = application.jobScheduleSelected?.scheduleId;
  const applicationId = application.applicationId;
  const candidateId = application.candidateId;
  const currentStepName = currentStep || getCurrentStepNameFromHash();
  const scheduleDetail = state.schedule.results.scheduleDetail;

  if(isBackButton) {
    log(`Completed task on back button execution, current step is ${currentStepName} for application:`, application);
    console.info(`[WS] Completed task on back button execution, current step is ${currentStepName} for application:`, application);
  }
  else {
    log(`Completed task on ${currentStepName} for application:`, application);
    console.info(`[WS] Completed task on ${currentStepName} for application:`, application);
  }

  if(!window?.stepFunctionService?.websocket && state.appConfig.results?.envConfig) {
    console.info("[WS] No websocket connection, add hasCompleteTaskOnWorkflowConnect and load workflow");
    window.hasCompleteTaskOnWorkflowConnect = () => {
      completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
    }
    boundWorkflowRequestStart();
    loadWorkflowDS(jobId || "", scheduleId || "", applicationId, candidateId, state.appConfig.results.envConfig);
  }
  else {
    completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
  }
}

export const actionWorkflowRequestInit = (): WorkflowRequestInitAction => {
  return { type: WORKFLOW_REQUEST.INIT }
};

export const actionWorkflowRequestStart = (): WorkflowRequestStartAction => {
  return { type: WORKFLOW_REQUEST.START }
};

export const actionWorkflowRequestEnd = (): WorkflowRequestEndAction => {
  return { type: WORKFLOW_REQUEST.END, loadingStatus: loadingStatusHelper() }
};

export const actionSetWorkflowErrorCode = (payload: WORKFLOW_ERROR_CODE): SetWorkflowErrorCodeAction => {
  return {
    type: WORKFLOW_REQUEST.SET_WORKFLOW_ERROR_CODE,
    payload
  }
}
