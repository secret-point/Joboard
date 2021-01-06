import { getAccessToken } from "./../helpers/axios-helper";
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
import { log, LoggerType } from "../helpers/log-helper";
import ConfigService from "./config-service";

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
      new ConfigService().getStepFunctionConfig().then(data => {
        let websocketURL = data.stepFunctionEndpoint as string;
        websocketURL = websocketURL
          .replace("{applicationId}", applicationId)
          .replace("{candidateId}", candidateId);
        if (!websocketURL.includes("authToken")) {
          websocketURL = appConfig.stepFunctionEndpoint;
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
      });
    }
  }

  getConfig() {
    return new ConfigService()
      .getStepFunctionConfig()
      .then(data => Promise.resolve(data));
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
    log("Websocket is connected");
    if (window.isCompleteTaskOnLoad) {
      completeTask(window.applicationData, "Complete Task On Load");
    } else {
      startOrResumeWorkflow();
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
