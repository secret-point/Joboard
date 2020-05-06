import * as actions from "../application-actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Test for Application Actions", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);
  const getStore = () => {
    const initState = {};

    return mockStore(initState);
  };

  test("Test on start application", async () => {
    jest.spyOn(window.location, "assign").mockImplementation(l => {
      expect(l).toEqual(
        `http://auth-url/?redirectUrl=http%3A%2F%2Flocalhost%23%2Fconsent%2F123123`
      );
    });
    const store = getStore();
    await actions.onStartApplication({
      appConfig: {
        authenticationURL: "http://auth-url"
      },
      nextPage: {
        id: "consent"
      },
      urlParams: {
        requisitionId: "123123"
      }
    })(store.dispatch);
  });
});
