import { getAccessToken } from "./../helpers/axios-helper";
import isString from "lodash/isString";
import { isJson } from "../helpers/utils";
import {
  completeTask,
  goToStep,
  onTimeOut,
  sendHeartBeatWorkflow,
  startOrResumeWorkflow,
  startOrResumeWorkflowDS
} from "./../actions/WorkflowActions/workflowActions";
import { setInterval } from "timers";
import { log, LoggerType } from "../helpers/log-helper";
import {
  boundSetWorkflowErrorCode,
  boundWorkflowRequestEnd,
  boundWorkflowRequestStart
} from "../actions/WorkflowActions/boundWorkflowActions";
import { EnvConfig } from "../utils/types/common";
import { WORKFLOW_STEP_NAME } from "../utils/enums/common";

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

  constructor( applicationId: string, candidateId: string, appConfig: EnvConfig, requisitionId?: string, jobId?: string, scheduleId?: string ) {
    this.applicationId = applicationId;
    this.candidateId = candidateId;
    this.appConfig = appConfig;

    if(applicationId && candidateId) {
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

      if(token) {
        websocketURL = `${websocketURL}&authToken=${encodeURIComponent(token)}`;
      }

      this.stepFunctionEndpoint = websocketURL;
      this.websocket = new WebSocket(this.stepFunctionEndpoint);
      this.websocket.onopen = ( event ) => this.connect(event);
      this.websocket.onclose = this.close;
      this.websocket.onmessage = this.message;
      this.websocket.onerror = this.error;

      this.interval = setInterval(
          sendHeartBeatWorkflow,
          this.SECONDS * this.MINUTES
      );
    }
  }

  static load( requisitionId: string, applicationId: string, candidateId: string, appConfig: EnvConfig ) {
    return new this(applicationId, candidateId, appConfig, requisitionId);
  }

  static loadDS( jobId: string, scheduleId: string, applicationId: string, candidateId: string, appConfig: EnvConfig ) {
    return new this(applicationId, candidateId, appConfig, undefined, jobId, scheduleId);
  }

  connect( event: any ) {
    boundWorkflowRequestStart();
    log("Websocket is connected");
    if(window.isCompleteTaskOnLoad) {
      // This is from old BB and it is not working, may remove it later
      // Using hasCompleteTaskOnWorkflowConnect below instead
      completeTask(window.applicationData, "Complete Task On Load");
    }
    else {
      this.jobId ? startOrResumeWorkflowDS() : startOrResumeWorkflow();
    }
  }

  close( event: any ) {
    window.setTimeout(() => {
      log("Websocket closed event executed", event);
      onTimeOut();
    }, 10000);
  }

  async message( event: MessageEvent ) {
    log("Message received from Websocket", event);
    const { data } = event;
    const message = isJson(data) ? JSON.parse(data) : data;

    log("workflow service message", message);
    if(!isString(message)) {
      //Update workflowErrorCode when page is rehire eligibility status as ew rely on errorCode to display different contents
      if (message.stepName === WORKFLOW_STEP_NAME.REHIRE_ELIGIBILITY_STATUS) {
        boundSetWorkflowErrorCode(message.errorMessageCode);
      }
      // Ignore current step and wait until stepName is job-opportunities
      if(window.hasCompleteTaskOnSkipSchedule) {
        if(message.stepName === WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES) {
          window.hasCompleteTaskOnSkipSchedule();
          window.hasCompleteTaskOnSkipSchedule = undefined;
        }
        // The reason we have this logic is to make sure the workflow start successfully before taking completeTask action
        // Once it get the first message means the workflow service is ready to accpet completeTask action
      }
      else if(window.hasCompleteTaskOnWorkflowConnect) {
        window.hasCompleteTaskOnWorkflowConnect();
        window.hasCompleteTaskOnWorkflowConnect = undefined;
      }
      else {
        await goToStep(message);
      }
    }
  }

  error( event: any ) {
    log("Error on received from wWebsocket", event, LoggerType.ERROR);
    boundWorkflowRequestEnd();
  }
}
