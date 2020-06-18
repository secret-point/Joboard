import { WorkflowData, AppConfig } from "../@types/IPayload";
import StepFunctionService from "../services/step-function-service";

export const loadWorkflow = (
  requisitionId: string,
  applicationId: string,
  candidateId: string,
  appConfig: AppConfig,
  dispatch: Function
) => {
  if (!window?.stepFunctionService?.websocket) {
    window.stepFunctionService = StepFunctionService.load(
      requisitionId,
      applicationId,
      candidateId,
      appConfig,
      dispatch
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

export const goToStep = (workflowData: WorkflowData) => {
  const { app } = window.reduxStore.getState();
  const application = app.data.application;
  if (workflowData.stepName) {
    window.location.assign(
      `/#/app/${workflowData.stepName}/${application.parentRequisitionId}/${application.applicationId}`
    );
  }
};

export const completeTask = (stepName?: string) => {
  console.log(`${stepName} completed`);
  if (window.stepFunctionService?.websocket) {
    window.stepFunctionService.websocket?.send(
      JSON.stringify({
        action: "completeTask",
        applicationId: window.stepFunctionService.applicationId,
        candidateId: window.stepFunctionService.candidateId,
        requisitionId: window.stepFunctionService.requisitionId
      })
    );
  }
};
