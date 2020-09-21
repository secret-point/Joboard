import actionMap from "./action-map";
import IPayload, { Page } from "./../@types/IPayload";
import { InitialLoadActions } from "../@types/IActionType";

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
    console.log(`${actionName} is executed`);
    UIExecutedActionsMetrics.publishCounterMonitor(actionName, 1);
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    action(payload)(dispatch);
  } else {
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    UIExecutedActionsMetrics.publishCounterMonitor(`${actionName}-missing`, 1);
    console.log(`${actionName} is missing`);
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
    for (const actionObject of options.actions) {
      UIExecutedActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      await actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  } else {
    for (const actionObject of options.actions) {
      UIExecutedActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  }
};

export const onInitialLoadActions = (
  initialLoadActions: InitialLoadActions,
  payload: IPayload
) => async (dispatch: Function) => {
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
    }
  } else {
    for (const actionObject of initialLoadActions.actions) {
      UIInitialLoadActionsMetrics.publishCounterMonitor(actionObject.action, 1);
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  }
};
