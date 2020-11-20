import { log } from "./../helpers/log-helper";

export const ON_RESPONSE_ERROR = "ON_RESPONSE_ERROR";
export const ON_REMOVE_ERROR = "ON_REMOVE_ERROR";

export const onUpdateError = (errorMessage: string) => (dispatch: Function) => {
  log(`Updating screen with error message`, {
    errorMessage: errorMessage
  });
  dispatch({
    type: ON_RESPONSE_ERROR,
    payload: {
      errorMessage
    }
  });
};

export const onRemoveError = () => (dispatch: Function) => {
  dispatch({
    type: ON_REMOVE_ERROR
  });
};
