import { WorkflowData, AppConfig, JobDescriptor } from "./../../@types/IPayload";
import StepFunctionService from "./../../services/step-function-service";
import ICandidateApplication from "./../../@types/ICandidateApplication";
import { setWorkflowLoading, onUpdatePageId } from "./actions";
import CandidateApplicationService from "./../../services/candidate-application-service";
import { UPDATE_APPLICATION } from "./application-actions";
import { push } from "react-router-redux";
import moment from "moment";
import { MAX_MINUTES_FOR_HEARTBEAT } from "./../../constants";
import { getDataForEventMetrics } from "./../../helpers/adobe-helper";
import { sendDataLayerAdobeAnalytics } from "./adobe-actions";
import { log, logError } from "./../../helpers/log-helper";
import _get from "lodash/get";
import { addApplicationIdInUrl, checkIfIsCSRequest, checkIfIsLegacy, pathByDomain } from "./../../helpers/utils";

export const loadWorkflow = (
  requisitionId: string,
  applicationId: string,
  candidateId: string,
  appConfig: AppConfig,
  isCompleteTaskOnLoad?: boolean,
  applicationData?: ICandidateApplication
) => {
  if (!window?.stepFunctionService?.websocket) {
    if (isCompleteTaskOnLoad) {
      window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
      window.applicationData = applicationData;
    }
    log("Initiated to connect websocket");
    window.stepFunctionService = StepFunctionService.load(
      requisitionId,
      applicationId,
      candidateId,
      appConfig
    );
  }
};

export const loadWorkflowDS = (
  jobId: string,
  scheduleId: string,
  applicationId: string,
  candidateId: string,
  appConfig: AppConfig,
  isCompleteTaskOnLoad?: boolean,
  applicationData?: ICandidateApplication
) => {
  if (!window?.stepFunctionService?.websocket) {
    if (isCompleteTaskOnLoad) {
      window.isCompleteTaskOnLoad = isCompleteTaskOnLoad;
      window.applicationData = applicationData;
    }
    log("Initiated to connect websocket", [
      jobId,
      scheduleId,
      applicationId,
      candidateId,
      appConfig
    ]);
    window.stepFunctionService = StepFunctionService.loadDS(
      jobId,
      scheduleId,
      applicationId,
      candidateId,
      appConfig
    );
  }
};

export const startOrResumeWorkflow = () => {
  log("Started workflow");
  window.stepFunctionService.websocket?.send(
    JSON.stringify({
      action: "startWorkflow",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      requisitionId: window.stepFunctionService.requisitionId,
      isCsDomain: checkIfIsCSRequest()
    })
  );
};

export const startOrResumeWorkflowDS = () => {
  log("Started DS workflow");
  window.stepFunctionService.websocket?.send(
    JSON.stringify({
      action: "startWorkflow",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      jobId: window.stepFunctionService.jobId,
      scheduleId: window.stepFunctionService.scheduleId,
      isCsDomain: checkIfIsCSRequest()
    })
  );
  if(window.hasCompleteTask){
    window.hasCompleteTask();
    window.hasCompleteTask = undefined;
  }
};

export const sendHeartBeatWorkflow = () => {
  const websocket = window.stepFunctionService.websocket;
  if (window.hearBeatTime) {
    log("Sending the heart beat event");
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));
    if (
      duration.asMinutes() < MAX_MINUTES_FOR_HEARTBEAT &&
      websocket?.OPEN === websocket?.readyState
    ) {
      window.stepFunctionService.websocket?.send(
        JSON.stringify({
          action: "heartbeat"
        })
      );
    } else {
      log("Websocket timed out, moved to timed out page");
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  } else {
    window.hearBeatTime = moment().toISOString();
    if (websocket?.OPEN === websocket?.readyState) {
      log("Sending the heart beat event");
      window.stepFunctionService.websocket?.send(
        JSON.stringify({
          action: "heartbeat"
        })
      );
    } else {
      log("Websocket timed out, moved to timed out page");
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  }
};

export const goToStep = async (workflowData: WorkflowData) => {
  const { app } = window.reduxStore.getState();
  const application = app.data.application;
  const storedPageId = window.localStorage.getItem("page");
  const { stepName } = workflowData;
  log("Received data from step function", {
    workflowData,
    currentStepName: storedPageId,
    goToStepName: stepName
  });
  if (stepName && storedPageId !== stepName) {
    setWorkflowLoading(true)(window.reduxStore.dispatch);
    log(
      `current step name (${storedPageId}) and go to step name (${stepName}) is not matched`
    );
    log("updating workflow step name in application", {
      applicationId: application.applicationId,
      stepName
    });
    await new CandidateApplicationService()
      .updateWorkflowStepName(application.applicationId, stepName)
      .then(data => {
        window.reduxStore.dispatch({
          type: UPDATE_APPLICATION,
          payload: {
            application: data
          }
        });
        setWorkflowLoading(false)(window.reduxStore.dispatch);
        return data;
      })
      .catch(ex => {
        logError("Unable to update workflow step in application", ex);
        setWorkflowLoading(false)(window.reduxStore.dispatch);
      });
    onUpdatePageId(
      workflowData.stepName,
      workflowData?.errorMessageCode
    )(window.reduxStore.dispatch);
    if (
      workflowData.stepName === "supplementary-success" ||
      workflowData.stepName === "thank-you"
    ) {
      const metric = window.MetricsPublisher.newChildActionPublisherForMethod(
        "ApplicationCompleteTime"
      );

      const metricName =
        workflowData.stepName === "supplementary-success"
          ? "Completed"
          : "PreHireStepsCompleted";
      metric.publishTimerMonitor(
        metricName,
        Date.now() - window.applicationStartTime
      );
    }
    window.localStorage.setItem("page", stepName);
    log(`update workflow step in local storage as ${stepName}`);
    addApplicationIdInUrl(application);
    window.reduxStore.dispatch(
      push(
        `/${stepName}/${
          checkIfIsLegacy()? application.parentRequisitionId : application.jobScheduleSelected.jobId
        }/${application.applicationId || ""}`
      )
    );
  } else {
    log(`Received same as current step name ${storedPageId}`);
    setWorkflowLoading(false)(window.reduxStore.dispatch);
  }
};

export const completeTask = (
  application?: ICandidateApplication,
  step?: string,
  isBackButton?: boolean,
  goToStep?: string,
  job?: JobDescriptor
) => {
  if (window.stepFunctionService?.websocket) {
    const jobSelectedOn = application?.jobSelected?.jobSelectedOn || application?.jobScheduleSelected?.jobScheduleSelectedTime;
    const scheduleDetails = job?.selectedChildSchedule;
    const state = scheduleDetails?.state || "";
    const employmentType = scheduleDetails?.employmentType || "";
    setWorkflowLoading(true)(window.reduxStore.dispatch);
    const data: any = {
      action: "completeTask",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      requisitionId: window.stepFunctionService.requisitionId || "", // requisitionId can't be null
      jobId: job?.consentInfo?.jobId || job?.jobDescription?.jobId || "",
      state,
      employmentType,
      eventSource: "HVH-CA-UI",
      jobSelectedOn,
      currentWorkflowStep: step,
      isCsDomain: checkIfIsCSRequest()
    };

    if (isBackButton) {
      data.workflowStepName = goToStep;
    } else {
      data.workflowStepName = "";
    }

    window.stepFunctionService.websocket?.send(JSON.stringify(data));
    log(`${step} completed`, {
      ...data
    });
  }
};

export const onTimeOut = () => {
  if (window.hearBeatTime) {
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));
    if (duration.asMinutes() > MAX_MINUTES_FOR_HEARTBEAT) {
      setWorkflowLoading(false)(window.reduxStore.dispatch);
      const adobeDataLayer = getDataForEventMetrics("session-timeout");
      sendDataLayerAdobeAnalytics(adobeDataLayer);
      window.location.assign(`${pathByDomain()}/#/timeout`);
    }
  } else {
    setWorkflowLoading(false)(window.reduxStore.dispatch);
    const adobeDataLayer = getDataForEventMetrics("session-timeout");
    sendDataLayerAdobeAnalytics(adobeDataLayer);
    window.location.assign(`${pathByDomain()}/#/timeout`);
  }
};
