import IPayload, { UrlParam } from "./../@types/IPayload";
import { push } from "react-router-redux";
import PageService from "../services/page-service";
import { completeTask } from "./workflow-actions";
import isEmpty from "lodash/isEmpty";
import { addMetricForPageLoad } from "./adobe-actions";

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

type IOnChangeProps = {
  keyName: string;
  value: string;
  pageId: string;
};

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

export const goTo = (path: string, urlParams?: UrlParam) => (
  dispatch: Function
) => {
  if (urlParams) {
    const { requisitionId, applicationId, misc } = urlParams;
    const page = path;
    path = `/app/${requisitionId}/${applicationId}`;
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
  const { requisitionId, applicationId } = payload.urlParams;
  const { goTo } = payload.options;
  let path = `/app/${requisitionId}`;
  if (applicationId) {
    path = `${path}/${applicationId}`;
  }
  onUpdatePageId(goTo)(dispatch);
  dispatch(push(path));
};

export const onGoBack = (payload: IPayload) => (dispatch: Function) => {
  onUpdatePageId(payload.previousPage.id)(dispatch);
};

export const onSubmit = (payload: any) => async (dispatch: Function) => {
  console.log(payload);
};

export const onUpdatePageId = (page: any) => async (dispatch: Function) => {
  const pageConfig = await new PageService().getPageConfig(`${page}.json`);

  window.isPageMetricsUpdated = false;
  if (!window.pageLoadMetricsInterval) {
    window.pageLoadMetricsInterval = setInterval(() => {
      addMetricForPageLoad();
    }, 5000);
  }

  dispatch({
    type: ON_UPDATE_PAGE_ID,
    payload: {
      updatedPageId: page,
      page: pageConfig
    }
  });
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
  completeTask(application, "on-complete-task");
};

export const onBackButtonCompleteTask = (payload: IPayload) => (
  dispatch: Function
) => {
  const { application } = payload.data;
  const options = payload.options;
  if (!isEmpty(options?.stepName)) {
    completeTask(application, options?.stepName, true);
  }
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
