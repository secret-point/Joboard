import * as errorActions from "../error-actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Test for Error Actions", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);
  const getStore = () => {
    const initState = {};

    return mockStore(initState);
  };
  test("test onUpdateError", () => {
    const store = getStore();
    errorActions.onUpdateError("Sample Error")(store.dispatch);
    expect(store.getActions()[0].type).toBe(errorActions.ON_RESPONSE_ERROR);
  });

  test("test onRemoveError", () => {
    const store = getStore();
    errorActions.onRemoveError()(store.dispatch);
    expect(store.getActions()[0].type).toBe(errorActions.ON_REMOVE_ERROR);
  });
});
