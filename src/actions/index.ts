import actionMap from "./action-map";
import IPayload, { Page } from "./../@types/IPayload";

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
    UIExecutedActionsMetrics.publishCounter(actionName, 1);
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    action(payload)(dispatch);
  } else {
    if (payload.currentPage) {
      logPageAndActionMetric(payload.currentPage, actionName);
    }
    UIExecutedActionsMetrics.publishCounter(`${actionName}-missing`, 1);
    console.log(`${actionName} is missing`);
  }
};

const logPageAndActionMetric = (currentPage: Page, actionName: string) => {
  const metric = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    currentPage.id
  );
  metric.publishCounter(actionName, 1);
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
      UIExecutedActionsMetrics.publishCounter(actionObject.action, 1);
      await actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  } else {
    for (const actionObject of options.actions) {
      UIExecutedActionsMetrics.publishCounter(actionObject.action, 1);
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  }
};
