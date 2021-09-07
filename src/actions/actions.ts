import IPayload, { UrlParam } from "./../@types/IPayload";
import { push } from "react-router-redux";
import PageService from "../services/page-service";
import { completeTask } from "./workflow-actions";
import isEmpty from "lodash/isEmpty";
import {
  addMetricForPageLoad,
  postAdobeMetrics,
  sendDataLayerAdobeAnalytics
} from "./adobe-actions";
import { getDataForEventMetrics } from "../helpers/adobe-helper";
import { PAGE_TITLE } from "../constants/adobe-analytics";
import { isNil } from "lodash";
import { onUpdateError } from "./error-actions";
import { log, logError } from "../helpers/log-helper";
import i18n from "../i18n";
import { checkIfIsLegacy } from "../helpers/utils";
import queryString from "query-string";
import {REMOVE_MESSAGE} from "./requisition-actions";
import {REMOVE_CANCELLATION_RESCHEDULE_QUESTION} from "./application-actions";

export const UPDATE_VALUE_CHANGE = "UPDATE_VALUE_CHANGE";
export const UPDATE_OUTPUT = "UPDATE_OUTPUT";
export const ON_REDIRECT = "ON_REDIRECT";
export const ON_UPDATE_PAGE_ID = "ON_UPDATE_PAGE_ID";
export const ON_SET_LOADING = "ON_SET_LOADING";
export const RESET_IS_UPDATE_ACTION_EXECUTED =
  "RESET_IS_UPDATE_ACTION_EXECUTED";
export const RESET_PAGE_OUTPUT = "RESET_PAGE_OUTPUT";
export const SHOW_NAVBAR = "SHOW_NAVBAR";
export const ON_SET_WORKFLOW_LOADING = "ON_SET_WORKFLOW_LOADING";
export const SET_STEPS_COMPLETED = "SET_STEPS_COMPLETED";

export const onUpdateChange = (payload: IPayload) => (dispatch: Function) => {
  const {
    keyName,
    value,
    pageId,
    isContentContainsSteps,
    activeStepIndex
  } = payload;
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName,
      value,
      pageId,
      isContentContainsSteps,
      activeStepIndex
    }
  });
};

export const onUpdateOutput = (payload: IPayload) => (dispatch: Function) => {
  const { output } = payload;
  dispatch({
    type: UPDATE_OUTPUT,
    payload: {
      output: output
    }
  });
};

export const onFilterChange = (payload: IPayload) => (dispatch: Function) => {
  const {
    keyName,
    value,
    pageId,
    isContentContainsSteps,
    activeStepIndex
  } = payload;
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName,
      value,
      pageId,
      isContentContainsSteps,
      activeStepIndex
    }
  });
};

export const onRedirect = (payload: any) => async (dispatch: Function) => {
  dispatch(push(`/app${payload.redirectPath}`));
};

export const onRedirectToASHChecklist = (payload: IPayload): void => {
  const isLegacy = checkIfIsLegacy();
  const { requisitionId, jobId } = payload.urlParams
  const ASHChecklistURL = payload.appConfig.ASHChecklistURL.replace(
    "{applicationId}",
    payload.urlParams.applicationId
  ).replace("{requisitionId}", (isLegacy? requisitionId : jobId) as string);
  window.location.assign(ASHChecklistURL);
};

export const goTo = (path: string, urlParams?: UrlParam) => (
  dispatch: Function
) => {
  const isLegacy = checkIfIsLegacy();
  if (urlParams) {
    const { requisitionId, applicationId, misc, jobId } = urlParams;
    const page = path;
    path = `/app/${isLegacy? requisitionId : jobId}/${applicationId || ""}`;
    if (misc) {
      path = `${path}/${misc}`;
    }
    onUpdatePageId(page)(dispatch);
    dispatch(push(path));
  } else {
    dispatch(push(path));
  }
};

export const onGoToAction = (payload: IPayload) => (dispatch: Function) => {
  const isLegacy = checkIfIsLegacy();
  const { requisitionId, applicationId, jobId } = payload.urlParams;
  const { goTo } = payload.options;
  let path = `/app/${isLegacy ? requisitionId : jobId}`;
  if (applicationId) {
    path = `${path}/${applicationId}`;
  }
  onUpdatePageId(goTo)(dispatch);
  dispatch(push(path));
};

export const onGoToSelfServicePage = (payload: IPayload) => (
  dispatch: Function
) => {
  const isLegacy = checkIfIsLegacy();
  const { requisitionId, applicationId, jobId } = payload.urlParams;
  const { hasShiftSelected } = payload.options;
  const { noShiftSelected } = payload.options;
  let path = `/app/${isLegacy ? requisitionId : jobId}`;
  if (applicationId) {
    path = `${path}/${applicationId}`;
  }
  if (isNil(payload.data.application.jobSelected)) {
    onUpdatePageId(noShiftSelected)(dispatch);
  } else {
    onUpdatePageId(hasShiftSelected)(dispatch);
  }

  dispatch(push(path));
};

export const onGoBack = (payload: IPayload) => (dispatch: Function) => {
  const { options } = payload;
  if (options?.adobeMetrics) {
    postAdobeMetrics(options.adobeMetrics, {});
  }
  onUpdatePageId(payload.previousPage.id)(dispatch);
};

export const onSubmit = (payload: any) => async (dispatch: Function) => {
  console.log(payload);
};

export const onUpdatePageId = (page: string, errorCode?: string) => async (
  dispatch: Function
) => {
  const metric = (window as any).MetricsPublisher?.newChildActionPublisherForMethod(
    "PageConfigLoad"
  );

  const responseTime = Date.now();
  setLoading(true)(dispatch);
  const isLegacy = checkIfIsLegacy();
  try {
    log(`Loading page configuration ${page}`);
    const pageConfig = await new PageService().getPageConfig(`${isLegacy
      ? page
      : DsPages[page]
        ? DsPages[page]
        : page}.json`);
    (window as any).isPageMetricsUpdated = false;
    if (!(window as any).pageLoadMetricsInterval) {
      const pageLoadMetric = (window as any).MetricsPublisher?.newChildActionPublisherForMethod(
        "PageLoad"
      );
      pageLoadMetric?.publishCounterMonitor(page, 1);
      (window as any).pageLoadMetricsInterval = setInterval(() => {
        addMetricForPageLoad();
      }, 5000);
    }

    if (page === "pre-consent") {
      const dataLayer = {
        event: "page load",
        page: {
          name: "BB - welcome",
          type: "application"
        }
      };
      sendDataLayerAdobeAnalytics(dataLayer);
    } else {
      (window as any).isPageMetricsUpdated = false;
      if (!(window as any).pageLoadMetricsInterval) {
        (window as any).pageLoadMetricsInterval = setInterval(() => {
          addMetricForPageLoad();
        }, 5000);
      }
    }
    if (PAGE_TITLE.has(page)) {
      document.title = `Amazon Jobs - ${i18n.t(`pageTitles:${page}`)}`;
    }
    dispatch({
      type: ON_UPDATE_PAGE_ID,
      payload: {
        updatedPageId: page,
        page: pageConfig,
        errorCode
      }
    });
    metric?.publishTimerMonitor(`${page}-load-time`, Date.now() - responseTime);
    metric?.publishCounterMonitor(`${page}-loaded`, 1);
    log(`${page} - page configuration loaded`, {
      loadDate: new Date().toISOString(),
      apiResponseTime: Date.now() - responseTime
    });
  } catch (ex) {
    logError(`Error while loading page (${page}) configuration`, ex);
    setLoading(false)(dispatch);
    onUpdateError("Unable to load page configuration")(dispatch);
    metric?.publishTimerMonitor(`${page}-load-time`, Date.now() - responseTime);
    metric?.publishCounterMonitor(`${page}-load-failed`, 1);
    metric?.publishCounterMonitor(`page-config-load-failed`, 1);
  }
};

export const onDismissModal = (dataKey: string, pageId: string) => (
  dispatch: Function
) => {
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName: dataKey,
      value: undefined,
      pageId
    }
  });
};

/**
 * toggle the loading on the screen.
 * @param dispatch Function action dispatch
 */
export const setLoading = (value: boolean) => (dispatch: Function) => {
  dispatch({
    type: ON_SET_LOADING,
    payload: value
  });
};

export const setWorkflowLoading = (value: boolean) => (dispatch: Function) => {
  dispatch({
    type: ON_SET_WORKFLOW_LOADING,
    payload: value
  });
};

export const setStepsCompleted = (value: boolean) => (dispatch: Function) => {
  dispatch({
    type: SET_STEPS_COMPLETED,
    payload: value
  });
};

export const onResetIsUpdateActionExecuted = () => (dispatch: Function) => {
  dispatch({
    type: RESET_IS_UPDATE_ACTION_EXECUTED
  });
};

export const onGoToDashboard = (payload: IPayload) => (dispatch: Function) => {
  const { appConfig } = payload;
  window.location.assign(appConfig.dashboardUrl);
};

export const onCompleteTask = (payload: IPayload) => (dispatch: Function) => {
  const { application } = payload.data;
  const { options } = payload;
  const currentStepName = options?.currentStepName
    ? options?.currentStepName
    : window.localStorage.getItem("page");
  log(`Completed task on ${currentStepName}`);
  completeTask(application, currentStepName, undefined, undefined, payload.data?.job);
};

export const onBackButtonCompleteTask = (payload: IPayload) => (
  dispatch: Function
) => {
  const { application } = payload.data;
  const options = payload.options;
  onResetPageOutput()(dispatch);
  if (!isEmpty(options?.stepName)) {
    const currentStepName =
      options?.currentStepName || window.localStorage.getItem("page");
    log(
      `Completed task on back button execution, current step is ${currentStepName}`
    );
    if(options?.stepName === "job-opportunities"){
      if(!checkIfIsLegacy()){
        const jobId = payload.urlParams.jobId;
        const applicationId = payload.urlParams.applicationId;
        // Remove schedule Id before go to contingent-offer page
        window.history.replaceState(
          {},
          document.title,
          `${window.location.origin}${window.location.pathname}?applicationId=${applicationId}&jobId=${jobId}${window.location.hash}`
        );
      }
    }
    completeTask(application, currentStepName, true, options?.stepName, payload.data?.job);
  }
};

export const onGoToSelfServicePageDS = (payload: IPayload) => (
    dispatch: Function
) => {
  const isLegacy = checkIfIsLegacy();
  console.log('=========isLegacy=========onGoToSelfServicePageDS==================', isLegacy);
  const { requisitionId, applicationId, jobId } = payload.urlParams;
  const { hasShiftSelected } = payload.options;
  const { noShiftSelected } = payload.options;
  let path = `/app/${isLegacy ? requisitionId : jobId}`;
  if (applicationId) {
    path = `${path}/${applicationId}`;
  }
  if (isNil(payload.data.application.schedule)) {
    onUpdatePageId(noShiftSelected)(dispatch);
  } else {
    onUpdatePageId(hasShiftSelected)(dispatch);
  }

  dispatch(push(path));
};

export const onResetPageOutput = () => (dispatch: Function) => {
  dispatch({
    type: RESET_PAGE_OUTPUT
  });
};

export const onShowNavbar = () => (dispatch: Function) => {
  dispatch({
    type: SHOW_NAVBAR,
    payload: {
      pageConfig: {
        showNavbar: true
      }
    }
  });
};

export const onLogVideoMetrics = (payload: IPayload) => (
  dispatch: Function
) => {
  const { data, options } = payload;
  const selectedRequisition =
    data.requisition.childRequisitions[options.selectedRequisitionIndex];
  console.log(options);
  const eventName = options.started ? "start-job-video" : "finish-job-video";
  const metrics = getDataForEventMetrics(eventName);
  metrics.job = {
    ...metrics.job,
    role: selectedRequisition.jobTitle
  };

  sendDataLayerAdobeAnalytics(metrics);
};

export const onLogSpecificJobVideoMetrics = (payload: IPayload) => (
    dispatch: Function
  ) => {
    const { options } = payload;
    console.log(options);
    const eventName = options.started ? "start-specific-job-video" : "finish-specific-job-video";
    const metrics = getDataForEventMetrics(eventName);
    sendDataLayerAdobeAnalytics(metrics);
  };

export const onClearWarningMessage = (payload: IPayload) => (
    dispatch: Function
) => {
  dispatch({
    type: REMOVE_MESSAGE
  });
  dispatch({
    type: REMOVE_CANCELLATION_RESCHEDULE_QUESTION
  });
};

export const DsPages: { [key: string]: string } = {
  "job-opportunities": "job-opportunities-ds",
  "job-confirmation": "job-confirmation-ds",
  "job-description": "job-description-ds",
  "consent": "consent-ds",
  "bgc": "bgc-ds",
  "review-submit": "review-submit-ds",
  "contingent-offer": "contingent-offer-ds",
  "cali-disclosure": "cali-disclosure-ds",
  "nhe": "nhe-ds",
  "appointment-detail-page": "appointment-detail-page-ds",
  "wotc": "wotc-ds",
  "self-identification": "self-identification-ds",
  "rehire-eligibility-status": "rehire-eligibility-status-ds",
  "rehire-not-eligible": "rehire-not-eligible-ds",
  "rehire-not-eligible-seasonal-only": "rehire-not-eligible-seasonal-only-ds",
}