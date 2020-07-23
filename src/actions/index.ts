import actionMap from "./action-map";
import IPayload from "./../@types/IPayload";

export const LOAD_INIT_DATA = "LOAD_INIT_DATA";

export const onAction = (actionName: string, payload: any) => async (
  dispatch: Function
) => {
  const action =
    actionName === "EXECUTE_ACTIONS"
      ? onExecuteMultipleActions
      : actionMap[actionName];
  if (action) {
    console.log(`${actionName} is executed`);
    action(payload)(dispatch);
  } else {
    console.log(`${actionName} is missing`);
  }
};

export const onExecuteMultipleActions = (payload: IPayload) => async (
  dispatch: Function
) => {
  const { options } = payload;
  if (!options.async) {
    for (const actionObject of options.actions) {
      await actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  } else {
    for (const actionObject of options.actions) {
      actionMap[actionObject.action]({
        ...payload,
        options: actionObject.options
      })(dispatch);
    }
  }
};
