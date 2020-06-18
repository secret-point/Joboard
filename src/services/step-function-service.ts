import { AppConfig } from "../@types/IPayload";
import isString from "lodash/isString";
import { isJson } from "../helpers/utils";
import { startOrResumeWorkflow, goToStep } from "../actions/workflow-actions";

export default class StepFunctionService {
  websocket: WebSocket | undefined;
  requisitionId: string | undefined;
  applicationId: string | undefined;
  candidateId: string | undefined;
  appConfig: any;
  stepFunctionEndpoint: string | undefined;
  dispatch: Function | undefined;

  constructor(
    requisitionId: string,
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig,
    dispatch: Function
  ) {
    this.applicationId = applicationId;
    this.candidateId = candidateId;
    this.appConfig = appConfig;
    if (applicationId && candidateId) {
      this.dispatch = dispatch;
      this.applicationId = applicationId;
      this.candidateId = candidateId;
      this.appConfig = appConfig;
      this.requisitionId = requisitionId;
      let websocketURL = appConfig.stepFunctionEndpoint as string;
      websocketURL = websocketURL
        .replace("{applicationId}", this.applicationId)
        .replace("{candidateId}", this.candidateId);
      this.stepFunctionEndpoint = websocketURL;
      this.websocket = new WebSocket(this.stepFunctionEndpoint);
      this.websocket.onopen = this.connect;
      this.websocket.onclose = this.close;
      this.websocket.onmessage = this.message;
      this.websocket.onerror = this.error;
    }
  }

  static load(
    requisitionId: string,
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig,
    dispatch: Function
  ) {
    return new this(
      requisitionId,
      applicationId,
      candidateId,
      appConfig,
      dispatch
    );
  }

  connect(event: any) {
    console.log("Connected");
    startOrResumeWorkflow();
  }

  close(event: any) {
    console.log(event);
  }

  message(event: MessageEvent) {
    console.log("Message Received");
    const { data } = event;
    const message = isJson(data) ? JSON.parse(data) : data;
    if (!isString(message)) {
      goToStep(message);
    }
  }

  error(event: any) {
    console.log(event);
  }
}
