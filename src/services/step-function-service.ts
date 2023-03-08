import { setInterval } from "timers";
import isString from "lodash/isString";
import {
  boundSetWorkflowErrorCode,
  boundWorkflowRequestEnd,
  boundWorkflowRequestStart
} from "../actions/WorkflowActions/boundWorkflowActions";
import { log, logError, LoggerType } from "../helpers/log-helper";
import { isJson } from "../helpers/utils";
import { WORKFLOW_ERROR_CODE, WORKFLOW_STEP_NAME } from "../utils/enums/common";
import { awaitWithTimeout, routeToAppPageWithPath, showErrorMessage } from "../utils/helper";
import { EnvConfig } from "../utils/types/common";
import {
  completeTask,
  goToStep,
  onTimeOut,
  sendHeartBeatWorkflow,
  startOrResumeWorkflow,
  startOrResumeWorkflowDS
} from "./../actions/WorkflowActions/workflowActions";
import { getAccessToken } from "./../helpers/axios-helper";

export default class StepFunctionService {
  websocket: WebSocket | undefined;
  requisitionId: string | undefined;
  applicationId: string | undefined;
  candidateId: string | undefined;
  jobId: string | undefined;
  scheduleId: string | undefined;
  appConfig: any;
  stepFunctionEndpoint: string | undefined;
  interval: any;
  SECONDS = 60000;
  MINUTES = 5;
  CONNECTION_TIMEOUT = 5000;
  disableTimeout = false;

  constructor( applicationId: string, candidateId: string, appConfig: EnvConfig, requisitionId?: string, jobId?: string, scheduleId?: string ) {
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

      this.message = this.message.bind(this);
      this.close = this.close.bind(this);
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

  /* eslint-disable @typescript-eslint/no-unused-vars */
  connect( event: any ) {
    boundWorkflowRequestStart();
    log("Websocket is connected");
    if (window.isCompleteTaskOnLoad) {
      // This is from old BB and it is not working, may remove it later
      // Using hasCompleteTaskOnWorkflowConnect below instead
      completeTask(window.applicationData, "Complete Task On Load");
    } else if (window.hasCompleteTaskOnWorkflowConnect) {
      window.hasCompleteTaskOnWorkflowConnect();
      window.hasCompleteTaskOnWorkflowConnect = undefined;
    } else {
      this.jobId ? startOrResumeWorkflowDS() : startOrResumeWorkflow();
    }
  }

  close( event: any ) {
    if (!this.disableTimeout) {
      window.setTimeout(() => {
        log("Websocket closed event executed", event);
        onTimeOut();
      }, 10000);
    }
  }

  async message( event: MessageEvent ) {
    log("Message received from Websocket", event);
    const { data } = event;
    let message = isJson(data) ? JSON.parse(data) : data;

    if (!message.stepName && isJson(message.data)) {
      message = JSON.parse(message.data);
    }

    log("workflow service message", message);
    if (!isString(message)) {
      // if the user has opened multiple tabs on the same application, then the old tab should display an error message,
      // allowing them to either take back control in that tab or to go back to the dashboard
      if (message.stepName === WORKFLOW_STEP_NAME.DUPLICATE_WINDOW) {
        // display the duplicate tab error modal
        boundSetWorkflowErrorCode(WORKFLOW_ERROR_CODE.DUPLICATE_WINDOW);

        // close the websocket - we don't want any more messages coming through. the user can either refresh the page,
        // giving them a new websocket, or they can return to the dashboard
        if (this.websocket) {

          // we don't want this treated as a timeout, this is a legitimate reason for closing the websocket forever
          this.disableTimeout = true;
          this.websocket.close();
        }
      } else if (message.stepName === WORKFLOW_STEP_NAME.REHIRE_ELIGIBILITY_STATUS) {
        // Update workflowErrorCode when page is rehire eligibility status as we rely on errorCode to display different contents
        boundSetWorkflowErrorCode(message.errorMessageCode);
        // redirect the user to the rehire eligibility status page
        boundWorkflowRequestEnd();
        routeToAppPageWithPath(message.stepName);
      } else if (window.hasCompleteTaskOnSkipSchedule) {
        // Ignore current step and wait until stepName is job-opportunities
        if (message.stepName === WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES) {
          window.hasCompleteTaskOnSkipSchedule();
          window.hasCompleteTaskOnSkipSchedule = undefined;
        }
        // The reason we have this logic is to make sure the workflow start successfully before taking completeTask action
        // Once it get the first message means the workflow service is ready to accpet completeTask action
      } else if (window.hasCompleteTaskOnWorkflowConnect) {
        window.hasCompleteTaskOnWorkflowConnect();
        window.hasCompleteTaskOnWorkflowConnect = undefined;
      } else {
        await goToStep(message);
      }
    }
  }

  error( event: any ) {
    log("Error on received from Websocket", event, LoggerType.ERROR);
    boundWorkflowRequestEnd();
  }

  // Wait for socket to be in open state
  waitForOpenSocket() {
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    return new Promise<void>((resolve, reject) => {
      if (this.websocket?.readyState === WebSocket.OPEN) {
        resolve();
      } else {
        this.websocket?.addEventListener("open", () => resolve(), { once: true });
      }
    });
  }

  // Race condition: there is a chance that during initial page load/refresh, the socket is still in connecting state (socket is
  // not null, our current logic only checks if socket is null) when we are trying to send message to websocket. The message won't
  // be sent in this case and the message will be lost.
  //
  // Send message after websocket is in open state, otherwise wait for socket to be open
  async sendMessage(message: string) {
    try {
      await awaitWithTimeout(this.waitForOpenSocket(), this.CONNECTION_TIMEOUT);
      this.websocket?.send(message);
    } catch (error) {
      logError("[WS] Error sending message to websocket", error as Error);
      showErrorMessage({
        translationKey: "BB-websocket-error-message-internal-server-error",
        value: "Something went wrong with the websocket server. Please try again or refresh the browser.",
      });
    }
  }

}
