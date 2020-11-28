import { FRCA_ACTIONS } from "../frca-actions"
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
    test("test", () => {
      getStore();
      const coverage = FRCA_ACTIONS;
    });
  });