import { AppConfig } from "../@types/IPayload";
import isString from "lodash/isString";
import { isJson } from "../helpers/utils";
import {
  startOrResumeWorkflow,
  goToStep,
  completeTask,
  sendHeartBeatWorkflow,
  onTimeOut
} from "../actions/workflow-actions";
import { setInterval } from "timers";

export default class StepFunctionService {
  websocket: WebSocket | undefined;
  requisitionId: string | undefined;
  applicationId: string | undefined;
  candidateId: string | undefined;
  appConfig: any;
  stepFunctionEndpoint: string | undefined;
  isCompleteTaskOnLoad: boolean | undefined;
  interval: any;
  SECONDS: number = 60000;
  MINUTES: number = 5;

  constructor(
    requisitionId: string,
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig
  ) {
    this.applicationId = applicationId;
    this.candidateId = candidateId;
    this.appConfig = appConfig;
    if (applicationId && candidateId) {
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

      this.interval = setInterval(
        sendHeartBeatWorkflow,
        this.SECONDS * this.MINUTES
      );
    }
  }

  static load(
    requisitionId: string,
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig
  ) {
    return new this(requisitionId, applicationId, candidateId, appConfig);
  }

  connect(event: any) {
    console.log("Connected");
    if (window.isCompleteTaskOnLoad) {
      completeTask(window.applicationData, "Complete Task On Load");
    } else {
      startOrResumeWorkflow();
    }
  }

  close(event: any) {
    console.log(event);
    onTimeOut();
  }

  async message(event: MessageEvent) {
    console.log("Message Received");
    const { data } = event;
    const message = isJson(data) ? JSON.parse(data) : data;
    if (!isString(message)) {
      await goToStep(message);
    }
  }

  error(event: any) {
    console.log(event);
  }
}
