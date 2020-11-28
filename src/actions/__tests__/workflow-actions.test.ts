import cloneDeep from 'lodash/cloneDeep';
import { 
    TEST_REQUISITION_ID, 
    TEST_APPLICATION_ID, 
    TEST_CANDIDATE_ID, 
    TEST_APP_CONFIG, 
    TEST_APPLICATION,
    TEST_WORKFLOW_DATA,
    TEST_PAGE_ID,
    TEST_REDUX_STORE,
    EXCEPTION_MESSAGE,
    TEST_STEP_ID,
    hasAction
} from '../../../tests/test-data';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import * as actions from "../workflow-actions";
import StepFunctionService from '../../services/step-function-service';
import moment from "moment";
import {MAX_MINUTES_FOR_HEARTBEAT} from '../../constants';
import { getDataForEventMetrics } from "../../helpers/adobe-helper";
import { sendDataLayerAdobeAnalytics } from "../../actions/adobe-actions";
import CandidateApplicationService from "../../services/candidate-application-service";
import { UPDATE_APPLICATION } from '../application-actions';

jest.mock("../../services/step-function-service");
jest.mock("../../actions/adobe-actions");
jest.mock("../../services/candidate-application-service");
jest.mock("../../helpers/adobe-helper", () => ({
  getDataForEventMetrics: jest.fn((eventData: any) => {
    return {
      shift: {
        position: 0
      }
    }
  })
}));

describe("Test for Application Actions", () => {
    let mockCandidateAppService: Function;
    let loadBeingCalled = 0;

    beforeEach(() => {
        const mockWebSocket = new WebSocket("wss://some-url-endpoint");
        const mockWebsocketBehavior = () => {
            jest.spyOn(mockWebSocket, "send").mockReturnValue();
        }
        mockWebsocketBehavior();
        const mockStore = configureStore([
            thunk,
            routerMiddleware(createHashHistory())
        ]);
        const getStore = () => {
            const initState = {};
            return mockStore(initState);
        };

        mockCandidateAppService = (withException?: boolean, message?: string) => {
            CandidateApplicationService.mockImplementation(() => ({
                updateWorkflowStepName: (applicationId: string, workflowStepName: string) => {
                if (withException) {
                  return Promise.reject({
                    message: message || EXCEPTION_MESSAGE
                  });
                }

                return Promise.resolve([
                    TEST_APPLICATION
                ]);
              }
            }));
        };

        window.isCompleteTaskOnLoad = false;
        window.applicationData = undefined;
        window.stepFunctionService = new StepFunctionService(
            TEST_REQUISITION_ID, 
            TEST_APPLICATION_ID, 
            TEST_CANDIDATE_ID, 
            TEST_APP_CONFIG,
        );
        window.stepFunctionService.websocket = mockWebSocket;
        window.hearBeatTime = moment().toISOString();
        window.reduxStore = getStore();
        jest.spyOn(window.reduxStore, "getState").mockReturnValue(TEST_REDUX_STORE)
        window.localStorage.setItem("page", TEST_PAGE_ID);


    });

    test("Test loadWorkflow with complete task on load", async () => {
        window.stepFunctionService.websocket = undefined;
        actions.loadWorkflow(
            TEST_REQUISITION_ID, 
            TEST_APPLICATION_ID, 
            TEST_CANDIDATE_ID, 
            TEST_APP_CONFIG, 
            true, 
            TEST_APPLICATION
        );

        expect(StepFunctionService.load).toBeCalledTimes(loadBeingCalled += 1);
        expect(window.isCompleteTaskOnLoad).toBe(true);
        expect(StepFunctionService.load).toBeCalledWith(
            TEST_REQUISITION_ID, 
            TEST_APPLICATION_ID, 
            TEST_CANDIDATE_ID, 
            TEST_APP_CONFIG,
        );
    });

    test("Test loadWorkflow without complete task on load", async () => {
        window.stepFunctionService.websocket = undefined;
        actions.loadWorkflow(
            TEST_REQUISITION_ID, 
            TEST_APPLICATION_ID, 
            TEST_CANDIDATE_ID, 
            TEST_APP_CONFIG, 
            false, 
            TEST_APPLICATION);
            expect(StepFunctionService.load).toBeCalledTimes(loadBeingCalled += 1);
            expect(window.isCompleteTaskOnLoad).toBe(false);
            expect(StepFunctionService.load).toBeCalledWith(
                TEST_REQUISITION_ID, 
                TEST_APPLICATION_ID, 
                TEST_CANDIDATE_ID, 
                TEST_APP_CONFIG,
            );
    });

    test("Test loadWorkflow without complete task on and websocket already exist should do nothing", async () => {
        actions.loadWorkflow(
            TEST_REQUISITION_ID, 
            TEST_APPLICATION_ID, 
            TEST_CANDIDATE_ID, 
            TEST_APP_CONFIG, 
            false, 
            TEST_APPLICATION);
            expect(StepFunctionService.load).toBeCalledTimes(loadBeingCalled += 0);
    });

    test("Test startOrResumeWorkflow", async () => {
        actions.startOrResumeWorkflow();

        expect(window.stepFunctionService.websocket?.send).toBeCalledTimes(1);
        expect(window.stepFunctionService.websocket?.send).toBeCalledWith(JSON.stringify({
            action: "startWorkflow",
            applicationId: window.stepFunctionService.applicationId,
            candidateId: window.stepFunctionService.candidateId,
            requisitionId: window.stepFunctionService.requisitionId
        }));
    });

    //TODO: can't set websocket ready state to OPEN so this test can't have better coverage
    test("Test sendHeartBeatWorkflow with heartbeat time and socket close should redirect to timeout", async () => {
        
        actions.sendHeartBeatWorkflow();

        expect(window.stepFunctionService.websocket?.send).toBeCalledTimes(0);
        expect(window.location.href).toBe("http://localhost/#/timeout");
    });

    //TODO: can't set websocket ready state to OPEN so this test can't have better coverage
    test("Test sendHeartBeatWorkflow without heartbeat time and socket close should redirect to timeout", async () => {
        window.hearBeatTime = "";
        actions.sendHeartBeatWorkflow();

        expect(window.stepFunctionService.websocket?.send).toBeCalledTimes(0);
        expect(window.location.href).toBe("http://localhost/#/timeout");
    });

   test("Test completeTask with is back button false", async () => {
        actions.completeTask(TEST_APPLICATION, "job-opportunities", false, "contingent-offer");

        expect(window.reduxStore.getActions().length).toBe(1);
        expect(window.stepFunctionService.websocket?.send).toBeCalledTimes(1);
        expect(window.stepFunctionService.websocket?.send).toBeCalledWith(JSON.stringify({
            action: "completeTask",
            applicationId: window.stepFunctionService.applicationId,
            candidateId: window.stepFunctionService.candidateId,
            requisitionId: window.stepFunctionService.requisitionId,
            eventSource: "HVH-CA-UI",
            currentWorkflowStep: "job-opportunities",
            workflowStepName:""
        }));
   });

   test("Test completeTask with is back button true", async () => {
        actions.completeTask(TEST_APPLICATION, "job-opportunities", true, "contingent-offer");

        expect(window.reduxStore.getActions().length).toBe(1);
        expect(window.stepFunctionService.websocket?.send).toBeCalledTimes(1);
        expect(window.stepFunctionService.websocket?.send).toBeCalledWith(JSON.stringify({
            action: "completeTask",
            applicationId: window.stepFunctionService.applicationId,
            candidateId: window.stepFunctionService.candidateId,
            requisitionId: window.stepFunctionService.requisitionId,
            eventSource: "HVH-CA-UI",
            currentWorkflowStep: "job-opportunities",
            workflowStepName:"contingent-offer"
        }));
    
    });

    test("Test completeTask with no websocket associated should do nothing", async () => {
        window.stepFunctionService.websocket = undefined;

        actions.completeTask(TEST_APPLICATION, "job-opportunities", true, "contingent-offer");
    });

    test("Test onTimeout with heartBeatTime valid should dispatch event", async () => {
        //reset heartbeattime to exceed MAX_MINUTES_FOR_HEARTBEAT mins
        window.hearBeatTime = moment().subtract(MAX_MINUTES_FOR_HEARTBEAT + 1, "minutes").toISOString();

        actions.onTimeOut();

        expect(window.reduxStore.getActions().length).toBe(1);
        expect(getDataForEventMetrics).toBeCalled();
        expect(sendDataLayerAdobeAnalytics).toBeCalled();
        expect(window.location.href).toBe("http://localhost/#/timeout");
    });

    test("Test onTimeout without heartBeatTime should dispatch event", async () => {
        //reset heartbeattime to exceed MAX_MINUTES_FOR_HEARTBEAT mins
        window.hearBeatTime = "";

        actions.onTimeOut();

        expect(window.reduxStore.getActions().length).toBe(1);
        expect(getDataForEventMetrics).toBeCalled();
        expect(sendDataLayerAdobeAnalytics).toBeCalled();
        expect(window.location.href).toBe("http://localhost/#/timeout");
    });

    test("Test onTimeout with heartBeatTime invalid should do nothing", async () => {
        actions.onTimeOut();

        expect(window.reduxStore.getActions().length).toBe(0);
    });

    //goTostep includes await calls so need to await on action
    test("Test goToStep actions with different stepName than current should redirect to step", async () => {
        //setup
        mockCandidateAppService();

        await actions.goToStep(TEST_WORKFLOW_DATA);

        //TODO: how to validate candidateAppService calls
        expect(window.reduxStore.getActions().length).toBe(4);
        expect(hasAction(window.reduxStore.getActions(), UPDATE_APPLICATION)).toBe(true);
        expect(window.location.href).toBe(`http://localhost/#/${TEST_STEP_ID}/${TEST_REQUISITION_ID}/${TEST_APPLICATION_ID}`);
    });

    //goTostep includes await calls so need to await on action
    test("Test goToStep actions with different stepName than current with exception on API should catch exception", async () => {
        //setup
        mockCandidateAppService(true);

        await actions.goToStep(TEST_WORKFLOW_DATA);

        //TODO: how to validate candidateAppService calls
        expect(window.reduxStore.getActions().length).toBe(3);
        expect(hasAction(window.reduxStore.getActions(), UPDATE_APPLICATION)).toBe(false);
        expect(window.location.href).toBe(`http://localhost/#/${TEST_STEP_ID}/${TEST_REQUISITION_ID}/${TEST_APPLICATION_ID}`);
    });

    //goTostep includes await calls so need to await on action
    test("Test goToStep actions with same stepName than current should do nothing", async () => {
        //setup
        mockCandidateAppService();
        window.localStorage.setItem("page", TEST_WORKFLOW_DATA.stepName);

        await actions.goToStep(TEST_WORKFLOW_DATA);

        //TODO: how to validate candidateAppService calls
        expect(window.reduxStore.getActions().length).toBe(1);
        expect(hasAction(window.reduxStore.getActions(), UPDATE_APPLICATION)).toBe(false);
    });

    //goTostep includes await calls so need to await on action
    test("Test goToStep actions stepName as thank-you should publish metrics", async () => {
        //setup
        mockCandidateAppService();
        const fakeWorkflowData = cloneDeep(TEST_WORKFLOW_DATA);
        fakeWorkflowData.stepName = "thank-you";

        await actions.goToStep(fakeWorkflowData);

        //TODO: how to validate candidateAppService calls
        expect(window.reduxStore.getActions().length).toBe(4);
        expect(hasAction(window.reduxStore.getActions(), UPDATE_APPLICATION)).toBe(true);
        expect(window.location.href).toBe(`http://localhost/#/thank-you/${TEST_REQUISITION_ID}/${TEST_APPLICATION_ID}`);
    });
});