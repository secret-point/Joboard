import { WorkflowData, AppConfig } from "../@types/IPayload";
import StepFunctionService from "../services/step-function-service";
import ICandidateApplication from "../@types/ICandidateApplication";
import { setLoading, onUpdatePageId } from "./actions";
import CandidateApplicationService from "../services/candidate-application-service";
import { UPDATE_APPLICATION } from "./application-actions";
import { push } from "react-router-redux";

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
  window.stepFunctionService.websocket?.send(
    JSON.stringify({
      action: "heartbeat"
    })
  );
};

export const goToStep = (workflowData: WorkflowData) => {
  const { app } = window.reduxStore.getState();
  const application = app.data.application;
  if (workflowData.stepName) {
    setLoading(true)(window.reduxStore.dispatch);
    new CandidateApplicationService()
      .updateWorkflowStepName(application.applicationId, workflowData.stepName)
      .then(data => {
        window.reduxStore.dispatch({
          type: UPDATE_APPLICATION,
          payload: {
            application: data
          }
        });
        setLoading(false)(window.reduxStore.dispatch);
        return data;
      })
      .catch(ex => {
        console.log(ex);
        setLoading(false)(window.reduxStore.dispatch);
      });
    onUpdatePageId(workflowData.stepName)(window.reduxStore.dispatch);
    window.localStorage.setItem("page", workflowData.stepName);
    window.reduxStore.dispatch(
      push(
        `/app/${application.parentRequisitionId}/${application.applicationId}`
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
    setLoading(true)(window.reduxStore.dispatch);
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
