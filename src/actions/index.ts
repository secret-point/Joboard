import actionMap from "./action-map";
import IPayload, { Page } from "./../@types/IPayload";
import { InitialLoadActions } from "../@types/IActionType";
import { log } from "../helpers/log-helper";

export const LOAD_INIT_DATA = "LOAD_INIT_DATA";

export const onAction = (actionName: string, payload: IPayload) => async (
  dispatch: Function
) => {
  const UIExecutedActionsMetrics = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    "UIExecutedActions"
  );
  const action =
    actionName === "EXECUTE_ACTIONS"
      ? onExecuteMultipleActions
      : actionMap[actionName];
  if (action) {
    UIExecutedActionsMetrics.publishCounterMonitor(actionName, 1);
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    action(payload)(dispatch);
    log(`${actionName} is executed`);
  } else {
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    UIExecutedActionsMetrics.publishCounterMonitor(`${actionName}-missing`, 1);
    log(`${actionName} is missing`);
  }
};

const logPageAndActionMetric = (currentPage: Page, actionName: string) => {
  const metric = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    currentPage.id
  );
  metric.publishCounterMonitor(actionName, 1);
};

export const onExecuteMultipleActions = (payload: IPayload) => async (
  dispatch: Function
) => {
  const UIExecutedActionsMetrics = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    "UIExecutedActions"
  );
  const { options } = payload;
  if (!options.async) {
    log(`Executed multiple actions in synchronous`);
    for (const actionObject of options.actions) {
      UIExecutedActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      await actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
      log(`${actionObject.action} is executed at multiple actions`);
    }
  } else {
    log(`Executed multiple actions in asynchronous`);
    for (const actionObject of options.actions) {
      UIExecutedActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
      log(`${actionObject.action} is executed at multiple actions`);
    }
  }
};

export const onInitialLoadActions = (
  initialLoadActions: InitialLoadActions,
  payload: IPayload
) => async (dispatch: Function) => {
  log(`Executed initial load actions`);
  const UIInitialLoadActionsMetrics = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    "UIInitialLoadActions"
  );
  if (!initialLoadActions.async) {
    for (const actionObject of initialLoadActions.actions) {
      UIInitialLoadActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      await actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
      log(`${actionObject.action} is executed at initial load`);
    }
  } else {
    for (const actionObject of initialLoadActions.actions) {
      UIInitialLoadActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
      log(`${actionObject.action} is executed at initial load`);
    }
  }
};
