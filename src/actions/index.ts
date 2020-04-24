import actionMap from "./action-map";

export const LOAD_INIT_DATA = "LOAD_INIT_DATA";

export const onAction = (actionName: string, payload: any) => async (
  dispatch: Function
) => {
  const action = actionMap[actionName];
  if (action) {
    action(payload)(dispatch);
  } else {
    console.log(`${actionName} is missing`);
  }
};
