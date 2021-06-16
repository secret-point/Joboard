import { getAccessToken } from "./../helpers/axios-helper";
import { AppConfig } from "../@types/IPayload";
import isString from "lodash/isString";
import { isJson } from "../helpers/utils";
import {
  startOrResumeWorkflow,
  goToStep,
  completeTask,
  sendHeartBeatWorkflow,
  onTimeOut,
  startOrResumeWorkflowDS
} from "../actions/workflow-actions";
import { setInterval } from "timers";
import { log, LoggerType } from "../helpers/log-helper";

export default class StepFunctionService {
  websocket: WebSocket | undefined;
  requisitionId: string | undefined;
  applicationId: string | undefined;
  candidateId: string | undefined;
  jobId: string | undefined;
  scheduleId: string | undefined;
  appConfig: any;
  stepFunctionEndpoint: string | undefined;
  isCompleteTaskOnLoad: boolean | undefined;
  interval: any;
  SECONDS: number = 60000;
  MINUTES: number = 5;

  constructor(
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig,
    requisitionId?: string,
    jobId?: string,
    scheduleId?: string
  ) {
    this.applicationId = applicationId;
    this.candidateId = candidateId;
    this.appConfig = appConfig;
    if (applicationId && candidateId) {
      this.applicationId = applicationId;
      this.candidateId = candidateId;
      this.appConfig = appConfig;
      requisitionId && (this.requisitionId = requisitionId);
      jobId && (this.jobId = jobId);
      scheduleId && (this.scheduleId = scheduleId);
      let websocketURL = appConfig.stepFunctionEndpoint as string;
      const token = getAccessToken();
      websocketURL = websocketURL
        .replace("{applicationId}", this.applicationId)
        .replace("{candidateId}", this.candidateId);
      if (token) {
        websocketURL = `${websocketURL}&authToken=${encodeURIComponent(token)}`;
      }
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
    return new this(applicationId, candidateId, appConfig, requisitionId);
  }

  static loadDS(
    jobId: string,
    scheduleId: string,
    applicationId: string,
    candidateId: string,
    appConfig: AppConfig
  ) {
    return new this(
      applicationId,
      candidateId,
      appConfig,
      undefined,
      jobId,
      scheduleId
    );
  }

  connect(event: any) {
    log("Websocket is connected");
    if (window.isCompleteTaskOnLoad) {
      completeTask(window.applicationData, "Complete Task On Load");
    } else {
      this.jobId ? startOrResumeWorkflowDS() : startOrResumeWorkflow();
    }
  }

  close(event: any) {
    window.setTimeout(() => {
      log("Websocket closed event executed", event);
      onTimeOut();
    }, 10000);
  }

  async message(event: MessageEvent) {
    log("Message received from Websocket", event);
    const { data } = event;
    const message = isJson(data) ? JSON.parse(data) : data;
    if (!isString(message)) {
      await goToStep(message);
    }
  }

  error(event: any) {
    log("Error on received from wWebsocket", event, LoggerType.ERROR);
  }
}
