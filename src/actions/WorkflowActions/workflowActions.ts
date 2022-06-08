import { Application, EnvConfig, Schedule, WorkflowData } from "../../utils/types/common";
import StepFunctionService from "../../services/step-function-service";
import moment from "moment";
import { MAX_MINUTES_FOR_HEARTBEAT } from "../../constants";
import { getDataForEventMetrics } from "../../helpers/adobe-helper";
import { sendDataLayerAdobeAnalytics } from "../AdobeActions/adobeActions";
import { log, logError } from "../../helpers/log-helper";
import { checkIfIsCSRequest, pathByDomain } from "../../helpers/utils";
import { boundWorkflowRequestEnd, boundWorkflowRequestStart } from "../UiActions/boundUi";
import store from "../../store/store";
import { boundUpdateWorkflowName } from "../ApplicationActions/boundApplicationActions";
import { getCurrentStepNameFromHash, routeToAppPageWithPath } from "../../utils/helper";
import { WORKFLOW_STEP_NAME } from "../../utils/enums/common";

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

export const goToStep = async ( workflowData: WorkflowData ) => {
  const state = store.getState();
  const applicationData = state.application.results;
  const currentStepName = getCurrentStepNameFromHash();
  const { stepName } = workflowData;

  log("Received data from step function", { workflowData, currentStepName: currentStepName, goToStepName: stepName });

  if(stepName && stepName !== currentStepName && applicationData) {
    boundWorkflowRequestStart();

    log(`current step name (${currentStepName}) and go to step name (${stepName}) is not matched`);
    log("updating workflow step name in application", { applicationId: applicationData.applicationId, stepName });

    boundUpdateWorkflowName({ applicationId: applicationData.applicationId, workflowStepName: stepName }, () => {
          boundWorkflowRequestEnd();
          routeToAppPageWithPath(stepName);
          log(`update workflow step in local storage as ${stepName}`);
        }, ( ex: any ) => {
          logError("Unable to update workflow step in application", ex);
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
    log(`Received same as current step name ${currentStepName}`);
    boundWorkflowRequestEnd();
  }
};

export const completeTask =
    ( application?: Application, currentStep?: string, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME, jobId?: string, schedule?: Schedule ) => {
      if(window.stepFunctionService?.websocket) {
        boundWorkflowRequestStart();
        const jobSelectedOn = application?.jobSelected?.jobSelectedOn || application?.jobScheduleSelected?.jobScheduleSelectedTime;
        const state = schedule?.state;
        const employmentType = schedule?.employmentType;
        const data: any = {
          action: "completeTask",
          applicationId: window.stepFunctionService.applicationId,
          candidateId: window.stepFunctionService.candidateId,
          requisitionId: window.stepFunctionService.requisitionId || "", // requisitionId can't be null
          jobId: jobId || "",
          state,
          employmentType,
          eventSource: "HVH-CA-UI",
          jobSelectedOn,
          currentWorkflowStep: currentStep,
          isCsDomain: checkIfIsCSRequest()
        };

        if(isBackButton) {
          data.workflowStepName = targetStep;
        }
        else {
          data.workflowStepName = "";
        }
        window.stepFunctionService.websocket?.send(JSON.stringify(data));
        log(`${currentStep} completed`, { ...data });
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

export const onCompleteTaskHelper = ( application: Application, isBackButton?: boolean, targetStep?: WORKFLOW_STEP_NAME ) => {
  const state = store.getState();
  const jobId = application.jobScheduleSelected?.jobId;
  const scheduleId = application.jobScheduleSelected?.scheduleId;
  const applicationId = application.applicationId;
  const candidateId = application.candidateId;
  const currentStepName = getCurrentStepNameFromHash();
  const scheduleDetail = state.schedule.scheduleDetail;

  if(isBackButton) {
    log(`Completed task on back button execution, current step is ${currentStepName}`);
  }
  else {
    log(`Completed task on ${currentStepName}`);
  }

  if(!window?.stepFunctionService?.websocket && state.appConfig.results?.envConfig) {
    window.hasCompleteTaskOnSkipSchedule = () => {
      completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
    }
    boundWorkflowRequestStart();
    loadWorkflowDS(jobId || "", scheduleId || "", applicationId, candidateId, state.appConfig.results.envConfig);
  }
  else {
    completeTask(application, currentStepName, isBackButton, targetStep, jobId, scheduleDetail);
  }
}
