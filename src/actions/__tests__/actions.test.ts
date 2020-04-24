import * as actions from "../actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import PageService from "../../services/page-service";

jest.mock("../../services/page-service");

describe("Test for Actions", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);
  const getStore = () => {
    const initState = {};

    return mockStore(initState);
  };

  test("Test on redirect action", async () => {
    const store = getStore();
    await actions.onRedirect({ redirectPath: "/bgc" })(store.dispatch);
    expect(window.location.href).toBe("http://localhost/#/app/bgc");
  });

  test("Test on Update Page Id without pageOrder", async () => {
    const store = getStore();
    await actions.onUpdatePageId({})(store.dispatch);
    expect(store.getActions().length).toBe(0);
  });

  test("Test on Update Page Id with pageOrder", async () => {
    const mockGetPageConfig = jest.fn();
    PageService.prototype.getPageConfig = mockGetPageConfig;
    mockGetPageConfig.mockReturnValue(
      Promise.resolve({
        content: {},
        header: {},
        footer: {}
      })
    );
    const store = getStore();
    await actions.onUpdatePageId({
      updatedPageId: "consent",
      pageOrder: [
        {
          id: "consent",
          configPath: "ConsentPage.json"
        }
      ]
    })(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.ON_UPDATE_PAGE_ID);
  });
});
