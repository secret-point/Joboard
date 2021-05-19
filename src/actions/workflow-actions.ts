import { WorkflowData, AppConfig } from "../@types/IPayload";
import StepFunctionService from "../services/step-function-service";
import ICandidateApplication from "../@types/ICandidateApplication";
import { setWorkflowLoading, onUpdatePageId } from "./actions";
import CandidateApplicationService from "../services/candidate-application-service";
import { UPDATE_APPLICATION } from "./application-actions";
import { push } from "react-router-redux";
import moment from "moment";
import { MAX_MINUTES_FOR_HEARTBEAT } from "../constants";
import { getDataForEventMetrics } from "../helpers/adobe-helper";
import { sendDataLayerAdobeAnalytics } from "../actions/adobe-actions";
import { log, logError } from "../helpers/log-helper";
import _get from "lodash/get";

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

export const startOrResumeWorkflow = () => {
  log("Started workflow");
  window.stepFunctionService.websocket?.send(
    JSON.stringify({
      action: "startWorkflow",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      requisitionId: window.stepFunctionService.requisitionId
    })
  );
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
      window.location.assign("/#/timeout");
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
      window.location.assign("/#/timeout");
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
    window.reduxStore.dispatch(
      push(
        `/${stepName}/${
          application.parentRequisitionId
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
  goToStep?: string
) => {
  if (window.stepFunctionService?.websocket) {
    const jobSelectedOn = application?.jobSelected?.jobSelectedOn;
    setWorkflowLoading(true)(window.reduxStore.dispatch);
    const data: any = {
      action: "completeTask",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      requisitionId: window.stepFunctionService.requisitionId,
      eventSource: "HVH-CA-UI",
      jobSelectedOn,
      currentWorkflowStep: step
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
      window.location.assign("/#/timeout");
    }
  } else {
    setWorkflowLoading(false)(window.reduxStore.dispatch);
    const adobeDataLayer = getDataForEventMetrics("session-timeout");
    sendDataLayerAdobeAnalytics(adobeDataLayer);
    window.location.assign("/#/timeout");
  }
};
