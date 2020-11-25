import { completeTask } from './../workflow-actions';
import IPayload, { UrlParam } from './../../@types/IPayload';
import * as actions from "../actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import PageService from "../../services/page-service";
import * as test_data from "../../../tests/test-data";

jest.mock("../../services/page-service");
jest.mock("../workflow-actions.ts");

var completeMethod_methodCalled = 0;

describe("Test for Actions", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);
  const getStore = () => {
    const initState = {};
    return mockStore(initState);
  };
  
  const getPayload = () => {
    return test_data.TEST_PAYLOAD;
  }

  test("Test on redirect action", async () => {
    const store = getStore();
    await actions.onRedirect({ redirectPath: "/bgc" })(store.dispatch);
    expect(window.location.href).toBe("http://localhost/#/app/bgc");
  });

  test("Test on Update Page Id not pre-consent", async () => {
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
    await actions.onUpdatePageId("assessment")(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.ON_UPDATE_PAGE_ID);
    expect(store.getActions()[0].payload.updatedPageId).toEqual("assessment");
  });

  test("Test on Update Page Id is pre-consent", async () => {
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
    await actions.onUpdatePageId("pre-consent")(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.ON_UPDATE_PAGE_ID);
    expect(store.getActions()[0].payload.updatedPageId).toEqual("pre-consent");
  });

  test("Test goto action without params", async () => {
    const store = getStore();
    await actions.goTo("/test-path")(store.dispatch);
    expect(window.location.href).toBe("http://localhost/#/test-path");
  });

  test("Test goto action with params", async () => {
    const store = getStore();
    const params: UrlParam = {
      requisitionId: "test-req-id",
      applicationId: "test-app-id",
      misc: "test-misc",
      page: "test-page"
    }
    await actions.goTo("/test-path", params)(store.dispatch);
    expect(window.location.href).toBe("http://localhost/#/app/test-req-id/test-app-id/test-misc");
  });

  test("Test onUpdateChange action", async () => {
    const store = getStore();
    const payload = getPayload();
    //update fields
    payload.keyName = "updated-key-name";
    payload.value = "updated-value";
    payload.pageId = "updated-page-id";
    payload.isContentContainsSteps = true;
    payload.activeStepIndex = 10;

    await actions.onUpdateChange(payload)(store.dispatch)
    expect(store.getActions()[0].type).toBe(actions.UPDATE_VALUE_CHANGE);
    expect(store.getActions()[0].payload.keyName).toEqual("updated-key-name");
    expect(store.getActions()[0].payload.value).toEqual("updated-value");
    expect(store.getActions()[0].payload.pageId).toEqual("updated-page-id");
    expect(store.getActions()[0].payload.isContentContainsSteps).toEqual(true);
    expect(store.getActions()[0].payload.activeStepIndex).toEqual(10);
  });

  test("Test OnUpdate]Output action", async () => {
    const store = getStore();
    const payload = getPayload();
    //update output
    payload.output = {
      testField: "test-data"
    };
    await actions.onUpdateOutput(payload)(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.UPDATE_OUTPUT);
    expect(store.getActions()[0].payload.output.testField).toEqual("test-data");
  });

  test("Test onFilterChange action", async () => {
    const store = getStore();
    const payload = getPayload();
    //update fields
    payload.keyName = "updated-key-name";
    payload.value = "updated-value";
    payload.pageId = "updated-page-id";
    payload.isContentContainsSteps = true;
    payload.activeStepIndex = 10;

    await actions.onFilterChange(payload)(store.dispatch)
    expect(store.getActions()[0].type).toBe(actions.UPDATE_VALUE_CHANGE);
    expect(store.getActions()[0].payload.keyName).toEqual("updated-key-name");
    expect(store.getActions()[0].payload.value).toEqual("updated-value");
    expect(store.getActions()[0].payload.pageId).toEqual("updated-page-id");
    expect(store.getActions()[0].payload.isContentContainsSteps).toEqual(true);
    expect(store.getActions()[0].payload.activeStepIndex).toEqual(10);
  });

  test("Test onRedirectToASHChecklist action", async () => {
    const store = getStore();
    const payload = getPayload();
    //spy on window object
    window.location.assign = jest.fn();

    actions.onRedirectToASHChecklist(payload);
    const expectedUrl = test_data.TEST_URL
      .replace("{applicationId}", test_data.TEST_APPLICATION_ID)
      .replace("{requisitionId}", test_data.TEST_REQUISITION_ID);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(expectedUrl);
  });

  test("Test OnGoTo Action", async () => {
    const store = getStore();
    const payload = getPayload();
    //set goto
    payload.options = {
      goTo: "contingent-offer"
    };

    await actions.onGoToAction(payload)(store.dispatch);

    expect(store.getActions()[0].type).toBe(actions.ON_UPDATE_PAGE_ID);
    expect(store.getActions()[0].payload.updatedPageId).toEqual("contingent-offer");
    expect(window.location.href).toBe(`http://localhost/#/app/${test_data.TEST_REQUISITION_ID}/${test_data.TEST_APPLICATION_ID}`);
  });

  test("Test OnGoBack action", async () => {
    const store = getStore();
    const payload = getPayload();

    await actions.onGoBack(payload)(store.dispatch);

    expect(store.getActions()[0].type).toBe(actions.ON_UPDATE_PAGE_ID);
    expect(store.getActions()[0].payload.updatedPageId).toEqual(test_data.TEST_PAGE_ID);
    expect(window.location.href).toBe(`http://localhost/#/app/${test_data.TEST_REQUISITION_ID}/${test_data.TEST_APPLICATION_ID}`);
  });

  test("Test OnSubmit action", async () => {
    const store = getStore();
    const payload = getPayload();

    await actions.onSubmit(payload)(store.dispatch); 

    //Nothing to verify. this function is empty. Just to get code coverage
  });

  test("Test GoToDashboard Action", async () => {
    const store = getStore();
    const payload = getPayload();
    window.location.assign = jest.fn();
    
    await actions.onGoToDashboard(payload)(store.dispatch);

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(test_data.TEST_URL);
  });

  test("Test OnCompleteTask Action", async () => {
    const store = getStore();
    const payload = getPayload();
    
    await actions.onCompleteTask(payload)(store.dispatch);
    completeMethod_methodCalled++;
    expect(completeTask).toHaveBeenCalledTimes(completeMethod_methodCalled)
    expect(completeTask).toHaveBeenCalledWith(test_data.TEST_APPLICATION_DATA.application, "on-complete-task");
  });

  test("Test OnBackButtonCompleteTask Action with step name", async () => {
    const store = getStore();
    const payload = getPayload();

    payload.options = {
      stepName: "job-opportunities"
    };
    
    await actions.onBackButtonCompleteTask(payload)(store.dispatch);
    completeMethod_methodCalled++;
    expect(store.getActions()[0].type).toBe(actions.RESET_PAGE_OUTPUT);

    expect(completeTask).toHaveBeenCalledTimes(completeMethod_methodCalled)
    expect(completeTask).toHaveBeenCalledWith(test_data.TEST_APPLICATION_DATA.application, "job-opportunities", true);
  });

  test("Test OnBackButtonCompleteTask Action without step name", async () => {
    const store = getStore();
    const payload = getPayload();
    payload.options = {
      stepName: ""
    };
    
    await actions.onBackButtonCompleteTask(payload)(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.RESET_PAGE_OUTPUT);
    expect(completeTask).toHaveBeenCalledTimes(completeMethod_methodCalled);
  });

  test("Test onDismissModal action", async () => {
    const store = getStore();
    await actions.onDismissModal("test-data-key", "test-page-id")(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.UPDATE_VALUE_CHANGE);
    expect(store.getActions()[0].payload.keyName).toEqual("test-data-key");
    expect(store.getActions()[0].payload.pageId).toEqual("test-page-id");
  });

  test("Test setLoading action", async () => {
    const store = getStore();
    await actions.setLoading(true)(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.ON_SET_LOADING);
    expect(store.getActions()[0].payload).toEqual(true);
  });

  test("Test setWorkflowLoading action", async () => {
    const store = getStore();
    await actions.setWorkflowLoading(true)(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.ON_SET_WORKFLOW_LOADING);
    expect(store.getActions()[0].payload).toEqual(true);
  });

  test("Test onResetIsUpdateActionExecuted action", async () => {
    const store = getStore();
    await actions.onResetIsUpdateActionExecuted()(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.RESET_IS_UPDATE_ACTION_EXECUTED);
  });

  test("Test onResetPageOutput action", async () => {
    const store = getStore();
    await actions.onResetPageOutput()(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.RESET_PAGE_OUTPUT);
  });

  test("Test onShowNavbar action", async () => {
    const store = getStore();
    await actions.onShowNavbar()(store.dispatch);
    expect(store.getActions()[0].type).toBe(actions.SHOW_NAVBAR);
    expect(store.getActions()[0].payload.pageConfig.showNavbar).toEqual(true);
  });
});
