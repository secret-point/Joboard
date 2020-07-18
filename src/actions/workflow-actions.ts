import { WorkflowData, AppConfig } from "../@types/IPayload";
import StepFunctionService from "../services/step-function-service";
import ICandidateApplication from "../@types/ICandidateApplication";
import { setWorkflowLoading, onUpdatePageId } from "./actions";
import CandidateApplicationService from "../services/candidate-application-service";
import { UPDATE_APPLICATION } from "./application-actions";
import { push } from "react-router-redux";
import moment from "moment";
import { MAX_MINUTES_FOR_HEARTBEAT } from "../constants";

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
    window.stepFunctionService = StepFunctionService.load(
      requisitionId,
      applicationId,
      candidateId,
      appConfig
    );
  }
};

export const startOrResumeWorkflow = () => {
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
  if (window.hearBeatTime) {
    const endTime = moment();
    const startTime = moment(window.hearBeatTime);
    const duration = moment.duration(endTime.diff(startTime));
    if (duration.asMinutes() < MAX_MINUTES_FOR_HEARTBEAT) {
      window.stepFunctionService.websocket?.send(
        JSON.stringify({
          action: "heartbeat"
        })
      );
    }
  } else {
    window.hearBeatTime = moment().toISOString();
    window.stepFunctionService.websocket?.send(
      JSON.stringify({
        action: "heartbeat"
      })
    );
  }
};

export const goToStep = async (workflowData: WorkflowData) => {
  const { app } = window.reduxStore.getState();
  const application = app.data.application;
  if (workflowData.stepName) {
    setWorkflowLoading(true)(window.reduxStore.dispatch);
    await new CandidateApplicationService()
      .updateWorkflowStepName(application.applicationId, workflowData.stepName)
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
        console.log(ex);
        setWorkflowLoading(false)(window.reduxStore.dispatch);
      });
    onUpdatePageId(workflowData.stepName)(window.reduxStore.dispatch);
    window.localStorage.setItem("page", workflowData.stepName);
    window.reduxStore.dispatch(
      push(
        `/${workflowData.stepName}/${application.parentRequisitionId}/${application.applicationId}`
      )
    );
  }
};

export const completeTask = (
  application?: ICandidateApplication,
  step?: string,
  isBackButton?: boolean
) => {
  console.log(`${step} completed`);
  if (window.stepFunctionService?.websocket) {
    const jobSelectedOn = application?.jobSelected?.jobSelectedOn;
    setWorkflowLoading(true)(window.reduxStore.dispatch);
    const data: any = {
      action: "completeTask",
      applicationId: window.stepFunctionService.applicationId,
      candidateId: window.stepFunctionService.candidateId,
      requisitionId: window.stepFunctionService.requisitionId,
      jobSelectedOn
    };

    if (isBackButton) {
      data.workflowStepName = step;
    } else {
      data.workflowStepName = "";
    }

    window.stepFunctionService.websocket?.send(JSON.stringify(data));
  }
};

export const onTimeOut = () => {
  setWorkflowLoading(false)(window.reduxStore.dispatch);
  window.location.assign("/#/timeout");
};
