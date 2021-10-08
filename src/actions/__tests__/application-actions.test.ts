import { onRemoveError } from './../error-actions';
import { loadWorkflow, completeTask } from './../workflow-actions';
import * as actions from "../application-actions";
import {ON_SET_LOADING, onUpdatePageId, UPDATE_VALUE_CHANGE} from "../actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import IPayload from "../../@types/IPayload";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import {
  TEST_PAGE,
  TEST_PAGE_ID,
  TEST_PAYLOAD,
  EXCEPTION_MESSAGE,
  TEST_CANDIDATE,
  TEST_APPLICATION,
  TEST_REQUISITION_ID,
  TEST_APPLICATION_ID,
  TEST_CANDIDATE_ID,
  TEST_STEP_ID,
  TEST_KEY,
  hasAction,
  TEST_JOB,
} from "../../../tests/test-data";
import {getDataForEventMetrics} from "../../helpers/adobe-helper";
import {sendDataLayerAdobeAnalytics} from "../../actions/adobe-actions";
import CandidateApplicationService from "../../services/candidate-application-service";
import {onUpdateError} from "../error-actions";
import cloneDeep from "lodash/cloneDeep";
import { NO_APPLICATION_ID } from "../../constants/error-messages";

jest.mock("../../actions/adobe-actions");
jest.mock("../../helpers/adobe-helper", () => ({
  getDataForEventMetrics: jest.fn((eventData: any) => {
    return {
      shift: {
        position: 0
      }
    }
  })
}));
jest.mock("../requisition-actions", () => ({
  onGetRequisitionHeaderInfo: jest.fn((payload: IPayload) => async (dispatch: Function) => {}),
  onSelectedRequisition: jest.fn((requisitionId: string) => async (dispatch: Function) => {}),
}));

jest.mock("../../services/candidate-application-service");
//need to mock some of the methods in this module.
jest.unmock("../actions");
jest.unmock("../error-actions");
jest.unmock("../workflow-actions.ts");

describe("Test for Application Actions", () => {
  let getStore: Function;
  let mockCandidateAppService: Function;
  let payload: any;

  beforeEach(() => {
    const mockStore = configureStore([
      thunk,
      routerMiddleware(createHashHistory())
    ]);
    getStore = () => {
      const initState = {};

      return mockStore(initState);
    };

    payload = cloneDeep(TEST_PAYLOAD)

    mockCandidateAppService = (withException?: boolean, message?: string) => {
      CandidateApplicationService.mockImplementation(() => ({
        getCandidate: () => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_CANDIDATE}
        },
        getApplication: (applicationId: string) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        },
        createApplication: (payload: any) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        },
        updateApplication: (payload: any) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        },
        terminateApplication: (applicationId: string, state: string) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        },
        updateWOTCStatus: (applicationId: string, candidateId: string, status: string) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        },
        getApplicationSelfServiceDS: (applicationId: string) => {
          if (withException) {
            throw new Error(message || EXCEPTION_MESSAGE);
          }
          return {...TEST_APPLICATION}
        }
      }));
    }
  });

  afterEach(() => {
    payload = null;
  })

  const mockActionsPartial = () => {
    const mockModule = require("../actions");
    mockModule.onUpdatePageId = jest.fn((pageId: string) => async (dispatch: Function) => {});
  }
  const mockErrorActionsPartial = () => {
    const mockModule = require("../error-actions");
    mockModule.onUpdateError = jest.fn((message: string) => async (dispatch: Function) => {});
    mockModule.onRemoveError = jest.fn(() => (dispatch: Function) => {});
  }
  const mockWorkflowActionsPartial = () => {
    const mockModule = require("../workflow-actions");
    mockModule.loadWorkflow = jest.fn((requisitionId: string, applicationId: string, candidateId: string, appConfig: any) => {}),
    mockModule.completeTask = jest.fn((application: any, step?: string, isBackButton?: boolean, goToStep?: string) => {})
  }

  test("Test on start application", async () => {
    jest.spyOn(window.location, "assign").mockImplementation(l => {
      expect(l).toEqual(
        `https://hiring.amazon.com/app#/login?redirectUrl=http%3A%2F%2Flocalhost%2F%3Fpage%3Dcreate-application%26`
      );
    });
    const store = getStore();

    payload.appConfig.authenticationURL = "http://auth-url";
    payload.nextPage.id = "consent";
    payload.urlParams.UrlParam = "123123";

    await actions.onStartApplication(payload)(store.dispatch);


    expect(getDataForEventMetrics).toHaveBeenCalledWith("start-application");
    expect(getDataForEventMetrics).toBeCalledTimes(1);
    expect(sendDataLayerAdobeAnalytics).toBeCalledTimes(1);
  });

  test("Test onGetApplication action with normal behavior and application with shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    payload.options = {
      doNotInitiateWorkflow: true,
      ignoreApplicationData: true
    }
    payload.data.selectedShift = {
      requisitionId: TEST_REQUISITION_ID
    }
    await actions.onGetApplication(payload)(store.dispatch);
    //to verify: last 2 actions: GET_APPLICATION and ON_SET_LOADING
    const actionLength = store.getActions().length;
    expect(actionLength).toBe(4);
    expect(store.getActions()[actionLength - 2].type).toBe(actions.GET_APPLICATION);
    expect(store.getActions()[actionLength - 2].payload.application.applicationId).toBe(TEST_APPLICATION_ID);
    expect(store.getActions()[actionLength - 1].type).toBe(ON_SET_LOADING);
    expect(store.getActions()[actionLength - 1].payload).toBe(false);
  });

  test("Test onGetApplication action with normal behavior and application without shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    //manually set data
    payload.options = {
      doNotInitiateWorkflow: true,
      ignoreApplicationData: true
    }
    payload.data.selectedShift = null;
    await actions.onGetApplication(payload)(store.dispatch);
    //to verify: last action: GET_APPLICATION
    const actionLength = store.getActions().length;
    expect(actionLength).toBe(3);
    expect(store.getActions()[actionLength - 1].type).toEqual(actions.GET_APPLICATION);
    expect(store.getActions()[actionLength - 1].payload.application.applicationId).toEqual(TEST_APPLICATION_ID);
  });

  test("Test onGetApplication action with initiate workflow flag on", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    //manually set data
    payload.options = {
      doNotInitiateWorkflow: false,
      ignoreApplicationData: true
    }
    await actions.onGetApplication(payload)(store.dispatch);
    //to verify: last 2 actions: GET_APPLICATION and ON_SET_LOADING
    const actionLength = store.getActions().length;
    expect(loadWorkflow).toBeCalledTimes(1);
    expect(actionLength).toBe(4);
    expect(store.getActions()[actionLength - 2].type).toBe(actions.GET_APPLICATION);
    expect(store.getActions()[actionLength - 2].payload.application.applicationId).toBe(TEST_APPLICATION_ID);
    expect(store.getActions()[actionLength - 1].type).toBe(ON_SET_LOADING);
    expect(store.getActions()[actionLength - 1].payload).toBe(false);
  });

  test("Test onGetApplication action without applicationId should catch exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    //manually set data
    payload.urlParams.applicationId = null;
    await actions.onGetApplication(payload)(store.dispatch);

    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
    expect(hasAction(store.getActions(), actions.GET_APPLICATION)).toBe(false);
  });

  test("Test onGetApplication action exception during API call should execute onUpdateError", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockErrorActionsPartial();

    await actions.onGetApplication(payload)(store.dispatch);

    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("unable to get application");
  });

  test("Test onGetCandidate should return candidate", async () => {
    const store = getStore();
    mockCandidateAppService();

    const response = await actions.onGetCandidate(payload, true)(store.dispatch);

    expect(store.getActions()[0].type).toBe(actions.ON_GET_CANDIDATE);
    expect(store.getActions()[0].payload.candidateId).toBe(TEST_CANDIDATE_ID);
    expect(response.candidateId).toBe(TEST_CANDIDATE_ID);
  });

  test("Test onGetCandidate with ignore candidateData should do nothing", async () => {
    const store = getStore();
    //manually update data
    payload.data.candidate = TEST_CANDIDATE;

    const response = await actions.onGetCandidate(payload, false)(store.dispatch);

    expect(store.getActions().length).toBe(0);
    expect(hasAction(store.getActions(), actions.ON_GET_CANDIDATE)).toBe(false);
  });

  test("Test onLaunchFcra should update page to fcra", async () => {
    const store = getStore();
    mockActionsPartial();

    await actions.onLaunchFCRA(payload)(store.dispatch);

    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("fcra");
    expect(store.getActions().length).toBe(0);
  });

  test("Test continueWithFCRADecline should dispatch action", async () => {
    const store = getStore();

    await actions.continueWithFCRADecline(payload)(store.dispatch);

    expect(store.getActions()[0].type).toBe(UPDATE_VALUE_CHANGE);
    expect(store.getActions()[0].payload.keyName).toBe("fcraQuestions.showWithDrawnModal");
    expect(store.getActions()[0].payload.value).toBe(true);
    expect(store.getActions()[0].payload.pageId).toBe(TEST_PAGE.id);
  });

  test("Test createApplication with normal behavior should create application", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();

    payload.data.application = null;
    await actions.createApplication(payload)(store.dispatch);

    expect(onRemoveError).toBeCalledTimes(1);
    expect(store.getActions().length).toBe(3);
    expect(loadWorkflow).toBeCalledTimes(1);
    expect(loadWorkflow).toBeCalledWith(TEST_REQUISITION_ID, TEST_APPLICATION_ID, TEST_CANDIDATE_ID, payload.appConfig)
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test createApplication with duplicatedSSN should throw error and catch exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();

    //override behavior
    CandidateApplicationService.mockImplementation(() => ({
      getCandidate: () => {
        return {...TEST_CANDIDATE, isDuplicateSSN: true}
      }
    }));

    payload.data.application = null;

    await actions.createApplication(payload)(store.dispatch);

    expect(onRemoveError).toBeCalledTimes(1);
    expect(store.getActions().length).toBe(3);
    expect(loadWorkflow).toBeCalledTimes(0);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(window.localStorage.getItem('page')).toBe("duplicate-national-id")
    expect(window.location.href).toBe("http://localhost/#/app/test-req-id/test-app-id/test-misc");
  });

  test("Test createApplication with application already exist should do nothing", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();

    //manually set data
    payload.data.application = TEST_APPLICATION;

    await actions.createApplication(payload)(store.dispatch);

    expect(onRemoveError).toBeCalledTimes(0);
    expect(store.getActions().length).toBe(0);
    expect(loadWorkflow).toBeCalledTimes(0);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
  });

  test("Test createApplication with exception when calling API should catch exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();

    payload.data.application = null;
    await actions.createApplication(payload)(store.dispatch);

    expect(onRemoveError).toBeCalledTimes(1);
    expect(store.getActions().length).toBe(2);
    expect(loadWorkflow).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Unable to get application");
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
  })

  test("Test updateApplication with update data in output by page Id", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.isContentContainsSteps = true;
    payload.output[TEST_PAGE_ID] = [{
      testUpdatePayload: "test-fcra"
    }];
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      updateCandidate: true,
      executeCompleteStep: true,
      goTo: "go-to-step"
    }


    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(6);
    expect(completeTask).toBeCalledTimes(1);
    expect(completeTask).toHaveBeenCalledWith(TEST_APPLICATION, TEST_STEP_ID, undefined, undefined, TEST_JOB);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test updateApplication with update data in output directly", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.output[TEST_PAGE_ID] = {
      testUpdatePayload: "test-fcra"
    };
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      valueExitsInData: true
    }


    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with update data in option directly", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      takeOutputFromOptions: true,
      output: {}
    }
    payload.options.output[TEST_PAGE_ID] = {
      testUpdatePayload: "test-fcra"
    }


    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with update data in payload", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      checkDataInPayload: true,
      outputKey: TEST_PAGE_ID,
      dataKey: TEST_KEY
    }
    payload.data[TEST_KEY] = {
      testUpdatePayload: "test-fcra"
    }

    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with ignore API payload should not call API", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      ignoreAPIPayload: false,
      goTo: "go-to-step"
    }

    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with ignore API payload should not call API and without goto", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      ignoreAPIPayload: false
    }

    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with no application in data should throw exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    try {
      await actions.updateApplication(payload)(store.dispatch);
    } catch (ex) {
      expect(ex.message).toBe(NO_APPLICATION_ID)
      //TODO: verify calls for candidateAppService
      expect(store.getActions().length).toBe(1);
      expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
      expect(completeTask).toBeCalledTimes(0);
    }
  });

  test("Test updateApplication with update data in payload but exception while calling API", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      checkDataInPayload: true,
      outputKey: TEST_PAGE_ID,
      dataKey: TEST_KEY
    }
    payload.data[TEST_KEY] = {
      testUpdatePayload: "test-fcra"
    }

    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with update data in payload but exception while calling API and error message is NO_APPLICATION_ID", async () => {
    const store = getStore();
    mockCandidateAppService(true, NO_APPLICATION_ID);
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.options = {
      checkDataInPayload: true,
      outputKey: TEST_PAGE_ID,
      dataKey: TEST_KEY
    }
    payload.data[TEST_KEY] = {
      testUpdatePayload: "test-fcra"
    }

    await actions.updateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test updateApplication with no applicationId in payload should throw error", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockErrorActionsPartial();
    mockWorkflowActionsPartial();
    //manually set data
    payload.data.application = TEST_APPLICATION;
    payload.data.application.applicationId = undefined;
    payload.options = {
      checkDataInPayload: true,
      outputKey: TEST_PAGE_ID,
      dataKey: TEST_KEY
    }
    payload.data[TEST_KEY] = {
      testUpdatePayload: "test-fcra"
    }

    try {
      await actions.updateApplication(payload)(store.dispatch);
    } catch (ex) {
      expect(ex.message).toBe(NO_APPLICATION_ID)
      //TODO: verify calls for candidateAppService
      expect(store.getActions().length).toBe(1);
      expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
      expect(completeTask).toBeCalledTimes(0);
    }
  });


  test("Test onSelectedShifts with goto option should dispatch SET_REQUISITION_SHIFT action", async () => {
    const store = getStore();

    payload.options = {
      goTo: "go-to-step"
    }

    await actions.onSelectedShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(getDataForEventMetrics).toBeCalled();
    expect(getDataForEventMetrics).toBeCalledWith("shift-selection");
    expect(sendDataLayerAdobeAnalytics).toBeCalled();
    expect(hasAction(store.getActions(), actions.SET_SELECTED_SHIFT)).toBe(true);
  });

  test("Test onSelectedShifts without goto option should dispatch SET_REQUISITION_SHIFT action", async () => {
    const store = getStore();

    await actions.onSelectedShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(1);
    expect(getDataForEventMetrics).toBeCalled();
    expect(getDataForEventMetrics).toBeCalledWith("shift-selection");
    expect(sendDataLayerAdobeAnalytics).toBeCalled();
    expect(hasAction(store.getActions(), actions.SET_SELECTED_SHIFT)).toBe(true);
  });

  test("Test onUpdateShiftSelection with goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.options = {
      goTo: "go-to-step"
    }

    await actions.onUpdateShiftSelection(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(completeTask).toBeCalledTimes(1);
  });

  test("Test onUpdateShiftSelection without goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();

    await actions.onUpdateShiftSelection(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(completeTask).toBeCalledTimes(1);
    expect(completeTask).toBeCalledWith(payload.data.application, "job-opportunities", undefined, undefined, TEST_JOB);
  });

  test("Test onUpdateShiftSelection with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    mockActionsPartial();

    payload.urlParams.applicationId = null;

    await actions.onUpdateShiftSelection(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test onUpdateShiftSelection with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockWorkflowActionsPartial();
    mockActionsPartial();
    mockErrorActionsPartial();


    await actions.onUpdateShiftSelection(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Failed to update application");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test OnTerminatingApplication should dispatch UPDATE_APPLICATION action", async() => {
    const store = getStore();
    mockCandidateAppService();

    await actions.onTerminateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test OnTerminatingApplication with empty applicationId in payload should catch exception", async() => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    mockErrorActionsPartial();
    payload.urlParams.applicationId = null;

    await actions.onTerminateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test OnTerminatingApplication with exception in API call should catch exception", async() => {
    const store = getStore();
    mockCandidateAppService(true);
    mockActionsPartial();
    mockErrorActionsPartial();

    await actions.onTerminateApplication(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Failed to update application");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test onUpdateWotcStatus should dispatch UPDATE_APPLICATION action", async() => {
    const store = getStore();
    mockCandidateAppService();

    await actions.onUpdateWotcStatus(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
    expect(hasAction(store.getActions(), actions.ON_GET_CANDIDATE)).toBe(true);
  });

  test("Test onUpdateWotcStatus with empty applicationId in payload should catch exception", async() => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    mockErrorActionsPartial();
    payload.urlParams.applicationId = null;

    await actions.onUpdateWotcStatus(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test onUpdateWotcStatus with exception in API call should catch exception", async() => {
    const store = getStore();
    mockCandidateAppService(true);
    mockActionsPartial();
    mockErrorActionsPartial();

    await actions.onUpdateWotcStatus(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Failed to update application");
    expect(completeTask).toBeCalledTimes(0);
  });

  test("Test onShowPreviousName", async () => {
    const store = getStore();

    await actions.onShowPreviousName(payload)(store.dispatch);

    expect(store.getActions()[0].type).toBe(actions.SHOW_PREVIOUS_NAMES);
    expect(store.getActions()[0].payload).toBe("YES");
  })

  test("Test onSaveShiftPreferences with correct data without selected data should save preference", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    mockErrorActionsPartial();

    payload.data.requisition = {
      requisitionId: TEST_REQUISITION_ID,
      childRequisitions: [
        {
          requisitionId: TEST_REQUISITION_ID,
          selected:true
        },
        {
          requisitionId: TEST_REQUISITION_ID,
          selected:false
        }
      ]
    }

    await actions.onSaveShiftPreferences(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("job-preferences-thank-you")
  });

  test("Test onSaveShiftPreferences with correct data with selected data should save preference", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    mockErrorActionsPartial();

    payload.data.requisition = {
      requisitionId: TEST_REQUISITION_ID,
      childRequisitions: [
        {
          requisitionId: TEST_REQUISITION_ID,
          selected:true
        },
        {
          requisitionId: TEST_REQUISITION_ID,
          selected:false
        }
      ]
    }

    payload.data.output[payload.pageId] = {
      key: [
        {
          checked:true,
          value: "value"
        },
        {
          checked:false,
          value: "value"
        }
      ]
    }

    await actions.onSaveShiftPreferences(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("job-preferences-thank-you")
  });

  test("Test onSaveShiftPreferences with exception should catch exception", async () => {
    mockActionsPartial();
    mockErrorActionsPartial();

    const store = getStore();

    //bad data will throw exception
    await actions.onSaveShiftPreferences(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Unable to save shift preferences");
  });

  test("Test onUpdateShiftSelectionSelfService with goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["update-shift-confirmation.updateScheduleReason"] = "reason1";
    payload.data.application.jobSelected = {};
    payload.data.application.jobSelected.headCountRequestId = "210037986";
    payload.options = {
      goTo: "go-to-step"
    }

    await actions.onUpdateShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onUpdateShiftSelectionSelfService without goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["update-shift-confirmation.updateScheduleReason"] = "reason1";
    payload.data.application.jobSelected = {};
    payload.data.application.jobSelected.headCountRequestId = "210037986";

    await actions.onUpdateShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onUpdateShiftSelectionSelfService with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    mockActionsPartial();

    payload.urlParams.applicationId = null;
    payload.data.output["update-shift-confirmation.updateScheduleReason"] = "reason1";
    payload.data.application.jobSelected = {};
    payload.data.application.jobSelected.headCountRequestId = "210037986";
    await actions.onUpdateShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
  });

  test("Test onUpdateShiftSelectionSelfService with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockWorkflowActionsPartial();
    mockActionsPartial();
    mockErrorActionsPartial();

    payload.data.application.shift = {};
    await actions.onUpdateShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Failed to update application");
  });

  test("Test onUpdateShiftSelectionSelfServiceDS with goto option should update selected schedule", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["update-shift-confirmation-ds.updateScheduleReason"] = "reason1";
    payload.data.application.jobScheduleSelected = {};
    payload.data.application.jobScheduleSelected.scheduleId = "210037986";
    payload.options = {
      goTo: "go-to-step"
    }

    await actions.onUpdateShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onUpdateShiftSelectionSelfServiceDS without goto option should update selected schedule", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["update-shift-confirmation-ds.updateScheduleReason"] = "reason1";
    payload.data.application.jobScheduleSelected = {};
    payload.data.application.jobScheduleSelected.scheduleId = "210037986";

    await actions.onUpdateShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onUpdateShiftSelectionSelfServiceDS with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    mockActionsPartial();
    payload.data.output["update-shift-confirmation-ds.updateScheduleReason"] = "reason1";
    payload.data.application.jobScheduleSelected = {};
    payload.data.application.jobScheduleSelected.scheduleId = "210037986";

    payload.urlParams.applicationId = null;

    await actions.onUpdateShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
  });

  test("Test onUpdateShiftSelectionSelfServiceDS with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockWorkflowActionsPartial();
    mockActionsPartial();
    mockErrorActionsPartial();

    payload.data.application.schedule = {}
    await actions.onUpdateShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    //expect(onUpdateError).toBeCalledWith("Failed to update application");
  });

  test("Test onCancelShiftSelectionSelfService with goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["cancel-shift-confirmation.cancelScheduleReason"] = "reason1";

    payload.options = {
      goTo: "go-to-step"
    }

    await actions.onCancelShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onCancelShiftSelectionSelfService without goto option should update selected shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["cancel-shift-confirmation.cancelScheduleReason"] = "reason1";

    await actions.onCancelShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onCancelShiftSelectionSelfService with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    mockActionsPartial();
    payload.data.output["cancel-shift-confirmation.cancelScheduleReason"] = "reason1";
    payload.urlParams.applicationId = null;

    await actions.onCancelShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
  });

  test("Test onCancelShiftSelectionSelfService with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockWorkflowActionsPartial();
    mockActionsPartial();
    mockErrorActionsPartial();


    await actions.onCancelShiftSelectionSelfService(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("Failed to update application");
  });

  test("Test onCancelShiftSelectionSelfServiceDS with goto option should update selected schedule", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["cancel-shift-confirmation-ds.cancelScheduleReason"] = "reason1";
    payload.options = {
      goTo: "go-to-step"
    }
    await actions.onCancelShiftSelectionSelfServiceDS(payload)(store.dispatch);
    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onCancelShiftSelectionSelfServiceDS without goto option should update selected schedule", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    payload.data.output["cancel-shift-confirmation-ds.cancelScheduleReason"] = "reason1";
    await actions.onCancelShiftSelectionSelfServiceDS(payload)(store.dispatch);
    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(true);
  });

  test("Test onCancelShiftSelectionSelfServiceDS with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockWorkflowActionsPartial();
    mockActionsPartial();
    payload.urlParams.applicationId = null;
    payload.data.output["cancel-shift-confirmation-ds.cancelScheduleReason"] = "reason1";
    await actions.onCancelShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
  });

  test("Test onCancelShiftSelectionSelfServiceDS with empty applicationId in payload should capture exception", async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockWorkflowActionsPartial();
    mockActionsPartial();
    mockErrorActionsPartial();

    await actions.onCancelShiftSelectionSelfServiceDS(payload)(store.dispatch);

    //TODO: verify calls for candidateAppService
    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), actions.UPDATE_APPLICATION)).toBe(false);
    expect(onUpdatePageId).toBeCalledTimes(0);
    expect(onUpdateError).toBeCalledTimes(1);
    //expect(onUpdateError).toBeCalledWith("Failed to update application");
  });

  test("Test onGetApplicationSelfServiceDS action with normal behavior and application with shift", async () => {
    const store = getStore();
    mockCandidateAppService();
    payload.data.selectedShift = {
      requisitionId: TEST_REQUISITION_ID
    }
    await actions.onGetApplicationSelfServiceDS(payload)(store.dispatch);

    //to verify: last 2 actions: GET_APPLICATION and ON_SET_LOADING
    const actionLength = store.getActions().length;
    expect(actionLength).toBe(5);
    expect(store.getActions()[actionLength - 3].type).toBe(actions.GET_APPLICATION);
    expect(store.getActions()[actionLength - 2].type).toBe(actions.UPDATE_SCHEDULE_ID);
    expect(store.getActions()[actionLength - 1].type).toBe(ON_SET_LOADING);
    expect(store.getActions()[actionLength - 1].payload).toBe(false);
  });

  test("Test onGetApplicationSelfServiceDS action without applicationId should catch exception", async () => {
    const store = getStore();
    mockCandidateAppService();
    mockActionsPartial();
    //manually set data
    payload.urlParams.applicationId = null;
    await actions.onGetApplicationSelfServiceDS(payload)(store.dispatch);

    expect(onUpdatePageId).toBeCalledTimes(1);
    expect(onUpdatePageId).toBeCalledWith("applicationId-null");
    expect(hasAction(store.getActions(), actions.GET_APPLICATION)).toBe(false);
  });

  test("Test onGetApplicationSelfServiceDS action exception during API call should execute onUpdateError",
      async () => {
    const store = getStore();
    mockCandidateAppService(true);
    mockErrorActionsPartial();

    await actions.onGetApplicationSelfServiceDS(payload)(store.dispatch);

    expect(onUpdateError).toBeCalledTimes(1);
    expect(onUpdateError).toBeCalledWith("unable to get application");
  });
});
