import { TEST_PAYLOAD, hasAction, TEST_REQUISITION_ID, TEST_HCR_ID, TEST_APPLICATION_ID } from './../../../tests/test-data';
import {ON_RESPONSE_ERROR} from '../error-actions';
import * as requisitionActions from "../requisition-actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import RequisitionService from "../../services/requisition-service";
import cloneDeep from "lodash/cloneDeep";
import CandidateApplicationService from '../../services/candidate-application-service';

jest.mock("axios");
jest.mock("../../services/requisition-service");
jest.mock("../../services/candidate-application-service.ts");
jest.mock("../../actions/adobe-actions");
jest.mock("../../helpers/adobe-helper", () => ({
  getDataForEventMetrics: jest.fn((eventData: any) => {
    return {
      shifts: {
        errorMessage: ""
      },
      filter: {
        daysOfWeek: [

        ]
      }
    }
  })
}));
describe("Test for Actions", () => {
  let store: any;
  let payload: any;

  beforeEach(() => {
    const mockStore = configureStore([
      thunk,
      routerMiddleware(createHashHistory())
    ]);
    const getStore = () => {
      const initState = {
        data: {
          requisition: {}
        }
      };
  
      return mockStore(initState);
    };
    store = getStore();
    payload = cloneDeep(TEST_PAYLOAD);
    window.sessionStorage.clear();
  });
  

  test("Test on onGetRequisitionHeaderInfo with requisitionId", async () => {
    const mockGetRequisitionHeaderInfo = jest.fn();
    RequisitionService.prototype.getRequisitionHeaderInfo = mockGetRequisitionHeaderInfo;
    mockGetRequisitionHeaderInfo.mockReturnValue(Promise.resolve({}));
    payload.data.requisition = "";
    await requisitionActions.onGetRequisitionHeaderInfo(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.GET_REQUISITION_HEADER_INFO)).toBe(true);
    expect(mockGetRequisitionHeaderInfo).toBeCalledTimes(1);
  });

  test("Test on onGetRequisitionHeaderInfo without requisitionId", async () => {
    payload.urlParams.requisitionId = null;
    const mockGetRequisitionHeaderInfo = jest.fn();
    RequisitionService.prototype.getRequisitionHeaderInfo = mockGetRequisitionHeaderInfo;
    mockGetRequisitionHeaderInfo.mockReturnValue(Promise.resolve({}));

    await requisitionActions.onGetRequisitionHeaderInfo(payload)(store.dispatch);
    expect(store.getActions().length).toBe(2);
    expect(mockGetRequisitionHeaderInfo).toBeCalledTimes(0);
  });

  test("Test on onGetRequisitionHeaderInfo with requisitionId with API call fail", async () => {
    const mockGetRequisitionHeaderInfo = jest.fn();
    RequisitionService.prototype.getRequisitionHeaderInfo = mockGetRequisitionHeaderInfo;
    mockGetRequisitionHeaderInfo.mockReturnValue(Promise.reject({}));
    payload.data.requisition = "";
    await requisitionActions.onGetRequisitionHeaderInfo(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetRequisitionHeaderInfo).toBeCalledTimes(1);
  });

  test("Test on onGetChildRequisitions with requisitionId", async () => {
    const mockGetChildRequisitions = jest.fn();
    RequisitionService.prototype.getChildRequisitions = mockGetChildRequisitions;
    mockGetChildRequisitions.mockReturnValue(Promise.resolve({}));

    await requisitionActions.onGetChildRequisitions(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(mockGetChildRequisitions).toBeCalledTimes(1);
  });

  test("Test on onGetChildRequisitions without requisitionId", async () => {
    const mockGetChildRequisitions = jest.fn();
    RequisitionService.prototype.getChildRequisitions = mockGetChildRequisitions;
    mockGetChildRequisitions.mockReturnValue(Promise.resolve({}));
    payload.urlParams.requisitionId = null;

    await requisitionActions.onGetChildRequisitions(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(mockGetChildRequisitions).toBeCalledTimes(0);
  });

  test("Test on onGetChildRequisitions with requisitionId with API failed", async () => {
    const mockGetChildRequisitions = jest.fn();
    RequisitionService.prototype.getChildRequisitions = mockGetChildRequisitions;
    mockGetChildRequisitions.mockReturnValue(Promise.reject({}));

    await requisitionActions.onGetChildRequisitions(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetChildRequisitions).toBeCalledTimes(1);
  });

  test("Test on onGetRequisition with requisitionId", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));

    await requisitionActions.onGetRequisition(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(1);
  });

  test("Test on onGetRequisition without requisitionId", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    payload.urlParams.requisitionId = null;

    await requisitionActions.onGetRequisition(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(mockGetRequisition).toBeCalledTimes(0);
  });

  test("Test on onGetRequisition with requisitionId with API failed", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.reject({}));

    await requisitionActions.onGetRequisition(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(1);
  });

  test("Test on onSelectedRequisition with requisitionId", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));

    await requisitionActions.onSelectedRequisition(TEST_REQUISITION_ID)(store.dispatch);

    expect(store.getActions().length).toBe(1);
    expect(hasAction(store.getActions(), requisitionActions.SELECTED_REQUISITION)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(1);
  });

  test("Test on onGetJobDescription with selectedRequisitionId", async () => {
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.resolve({}));
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    payload.selectedRequisitionId = TEST_REQUISITION_ID;

    await requisitionActions.onGetJobDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_JOB_DESCRIPTION)).toBe(true);
    expect(mockGetJobDescription).toBeCalledTimes(1);
    expect(mockGetRequisition).toBeCalledTimes(1);
  });

  test("Test on onGetJobDescription with selectedChildRequisitionId", async () => {
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.resolve({}));
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    payload.data.requisition.selectedChildRequisition = {
      requisitionId: TEST_REQUISITION_ID
    };

    await requisitionActions.onGetJobDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_JOB_DESCRIPTION)).toBe(true);
    expect(mockGetJobDescription).toBeCalledTimes(1);
    expect(mockGetRequisition).toBeCalledTimes(0);
  });

  test("Test on onGetJobDescription without any requisitionId", async () => {
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.resolve({}));
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    payload.selectedRequisitionId = null;
    payload.data.requisition.selectedChildRequisition = {};

    await requisitionActions.onGetJobDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(mockGetJobDescription).toBeCalledTimes(0);
    expect(mockGetRequisition).toBeCalledTimes(0);
  });

  test("Test on onGetJobDescription without getJobDescription API Failed", async () => {
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.reject({}));
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    payload.selectedRequisitionId = TEST_REQUISITION_ID;

    await requisitionActions.onGetJobDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(mockGetJobDescription).toBeCalledTimes(1);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(1);
  });

  test("Test onGoToDescription with requisitionId", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.resolve({}));
    payload.selectedRequisitionId = TEST_REQUISITION_ID;

    await requisitionActions.onGoToDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(8);
    expect(mockGetJobDescription).toBeCalledTimes(1);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_JOB_DESCRIPTION)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(2);
  });

  test("Test onGoToDescription with selectedChildRequisitions", async () => {
    const mockGetRequisition = jest.fn();
    RequisitionService.prototype.getRequisition = mockGetRequisition;
    mockGetRequisition.mockReturnValue(Promise.resolve({}));
    const mockGetJobDescription = jest.fn();
    RequisitionService.prototype.getJobDescription = mockGetJobDescription;
    mockGetJobDescription.mockReturnValue(Promise.resolve({}));
    payload.data.requisition.selectedChildRequisition = {
      requisitionId: TEST_REQUISITION_ID
    };
    payload.data.requisition.childRequisitions = [
      {
        requisitionId: TEST_REQUISITION_ID
      }
    ]

    await requisitionActions.onGoToDescription(payload)(store.dispatch);

    expect(store.getActions().length).toBe(7);
    expect(mockGetJobDescription).toBeCalledTimes(1);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_JOB_DESCRIPTION)).toBe(true);
    expect(mockGetRequisition).toBeCalledTimes(0);
  });

  test("Test onGetNHETimeSlots with requisitionId and applicationId and valid timeslot", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.resolve([
      {
        location: {
          streetAddress: "streetAddress",
          city: "city",
          state: "state",
          postalCode: "postalCode",
          recruitingEventId: "recruitingEventId"
        }
      }
    ]));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(mockGetApplication).toBeCalledTimes(1);
    expect(mockGetTimeSlots).toBeCalledTimes(1);
  });

  test("Test onGetNHETimeSlots with requisitionId and applicationId and valid timeslot without any address info", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.resolve([
      {
        location: {}
      }
    ]));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(mockGetApplication).toBeCalledTimes(1);
    expect(mockGetTimeSlots).toBeCalledTimes(1);
  });

  test("Test onGetNHETimeSlots with requisitionId and applicationId with failed API call for timeslots", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.reject({}));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetApplication).toBeCalledTimes(1);
    expect(mockGetTimeSlots).toBeCalledTimes(1);
  });

  test("Test onGetNHETimeSlots with empty requisitionId", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.resolve([
      {
        location: {}
      }
    ]));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));
    payload.urlParams.requisitionId = null;

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(mockGetApplication).toBeCalledTimes(0);
    expect(mockGetTimeSlots).toBeCalledTimes(0);
  });

  test("Test onGetNHETimeSlots with non empty application", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.resolve([
      {
        location: {}
      }
    ]));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));
    payload.data.application = {
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    };

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(mockGetApplication).toBeCalledTimes(0);
    expect(mockGetTimeSlots).toBeCalledTimes(1);
  });

  test("Test onGetNHETimeSlots with requisitionId and applicationId and empty timeslots", async () => {
    const mockGetTimeSlots= jest.fn();
    RequisitionService.prototype.availableTimeSlots = mockGetTimeSlots;
    mockGetTimeSlots.mockReturnValue(Promise.resolve([]));
    const mockGetApplication = jest.fn();
    CandidateApplicationService.prototype.getApplication = mockGetApplication;
    mockGetApplication.mockReturnValue(Promise.resolve({
      jobSelected: {
        headCountRequestId: TEST_HCR_ID
      }
    }));

    await requisitionActions.onGetNHETimeSlots(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(mockGetApplication).toBeCalledTimes(1);
    expect(mockGetTimeSlots).toBeCalledTimes(1);
  });

  test("Test onGetAllAvailableShifts with requisitionId", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:1
      }
    }));

    await requisitionActions.onGetAllAvailableShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(6);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(true);
    expect(hasAction(store.getActions(), requisitionActions.SET_PAGE_FACTOR)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onGetAllAvailableShifts with requisitionId and API failed", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({}));

    await requisitionActions.onGetAllAvailableShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(hasAction(store.getActions(), requisitionActions.SET_PAGE_FACTOR)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onGetAllAvailableShifts with stored ApplicationId", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:1
      }
    }));
    payload.urlParams.applicationId = null;
    window.sessionStorage.setItem("applicationId", TEST_APPLICATION_ID);

    await requisitionActions.onGetAllAvailableShifts(payload)(store.dispatch);

    expect(window.location.href).toBe(`http://localhost/#/job-opportunities/${TEST_REQUISITION_ID}/${TEST_APPLICATION_ID}`);
    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(hasAction(store.getActions(), requisitionActions.SET_PAGE_FACTOR)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(0);
  });

  test("Test onGetAllAvailableShifts with empty requisitionId", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:1
      }
    }));
    payload.urlParams.requisitionId = null;

    await requisitionActions.onGetAllAvailableShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(hasAction(store.getActions(), requisitionActions.SET_PAGE_FACTOR)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(0);
  });

  test("Test onGetAllAvailableShifts with requisitionId with empty shifts", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:0
      }
    }));

    await requisitionActions.onGetAllAvailableShifts(payload)(store.dispatch);

    expect(store.getActions().length).toBe(6);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_REQUISITION)).toBe(false);
    expect(hasAction(store.getActions(), requisitionActions.SET_PAGE_FACTOR)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test applySortOnShift with valid shifts sort on FEATURE", async() => {
    const availableShifts: any = {
      shifts:[
        {
          pageFactor: 0,
          rankingOrder:0
        },
        {
          pageFactor: 1,
          rankingOrder:1
        }
      ]
    };
    const sortBy: any = {
      sortBy: "FEATURED"
    }
    requisitionActions.applySortOnShifts(availableShifts, sortBy);
    expect(availableShifts.shifts[0].pageFactor).toBe(0);
    expect(availableShifts.shifts[1].pageFactor).toBe(1);
  });

  test("Test applySortOnShift with valid shifts sort on PAY_RATE", async() => {
    const availableShifts: any = {
      shifts:[
        {
          totalPayRate: 100,
        },
        {
          totalPayRate: 1000,
        }
      ]
    };
    const sortBy: any = {
      sortBy: "PAY_RATE"
    }
    requisitionActions.applySortOnShifts(availableShifts, sortBy);
    expect(availableShifts.shifts[0].totalPayRate).toBe(1000);
    expect(availableShifts.shifts[1].totalPayRate).toBe(100);
  });

  test("Test applySortOnShift with valid shifts sort on HOURS_DESC", async() => {
    const availableShifts: any = {
      shifts:[
        {
          minHoursPerWeek: 10,
        },
        {
          minHoursPerWeek: 20,
        }
      ]
    };
    const sortBy: any = {
      sortBy: "HOURS_DESC"
    }
    requisitionActions.applySortOnShifts(availableShifts, sortBy);
    expect(availableShifts.shifts[0].minHoursPerWeek).toBe(20);
    expect(availableShifts.shifts[1].minHoursPerWeek).toBe(10);
  });

  test("Test applySortOnShift with valid shifts sort on HOURS_ASC", async() => {
    const availableShifts: any = {
      shifts:[
        {
          minHoursPerWeek: 10,
        },
        {
          minHoursPerWeek: 20,
        }
      ]
    };
    const sortBy: any = {
      sortBy: "HOURS_ASC"
    }
    requisitionActions.applySortOnShifts(availableShifts, sortBy);
    expect(availableShifts.shifts[0].minHoursPerWeek).toBe(10);
    expect(availableShifts.shifts[1].minHoursPerWeek).toBe(20);
  });

  test("Test applySortOnShift with valid shifts sort on DEFAULT", async() => {
    const availableShifts: any = {
      shifts:[
        {
          minHoursPerWeek: 10,
        },
        {
          minHoursPerWeek: 20,
        }
      ]
    };
    const sortBy: any = {
      sortBy: "DEFAULT"
    }
    requisitionActions.applySortOnShifts(availableShifts, sortBy);
  });

  test("Test onShiftsIncrementalLoad with page factor", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.shiftPageFactor = 0;
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onShiftsIncrementalLoad without page factor", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.shiftPageFactor = null;
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onShiftsIncrementalLoad without page factor with empty requisitionId", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.shiftPageFactor = null;
    payload.urlParams.requisitionId = null;
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(3);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(0);
  });

  test("Test onShiftsIncrementalLoad without page factor with empty shift returned", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:0,
        shifts:[]
      }
    }));
    payload.data.shiftPageFactor = null;
    
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onShiftsIncrementalLoad without page factor with failed API", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({}));
    payload.data.shiftPageFactor = null;
    
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(false);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onShiftsIncrementalLoad without page factor with not found response", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({
      response: {
        status: 404
      }
    }));
    payload.data.shiftPageFactor = null;
    
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.MERGE_SHIFTS)).toBe(false);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test coverage for constructFilterPayload", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({}));
    payload.data.shiftPageFactor = null;
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);
  });

  test("Test onApplyFilter without sort option", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };

    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });
  
  test("Test coverage for constructFilterPayload", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({}));
    payload.data.shiftPageFactor = null;
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    
    await requisitionActions.onShiftsIncrementalLoad(payload)(store.dispatch);
  });

  test("Test onApplyFilter without sort option", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onApplyFilter with sort option", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    payload.options["hasSortAction"] = true;

    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(0);
  });

  test("Test onApplyFilter with sort option with empty requisition Id", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    payload.options["hasSortAction"] = true;
    payload.urlParams.requisitionId = null;

    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(2);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(0);
  });

  test("Test onApplyFilter without sort option with no preferred schedule", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({
      availableShifts: {
        total:2,
        shifts:[
          {
            minHoursPerWeek: 10,
          },
          {
            minHoursPerWeek: 20,
          }
        ]
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };

    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(5);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(true);
    expect(hasAction(store.getActions(), requisitionActions.RESET_FILTERS)).toBe(true);

    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onApplyFilter without sort option with API failed", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({
      
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(true);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(false);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onApplyFilter without sort option with Not found response", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.reject({
      response: {
        status: 404
      }
    }));
    payload.data.output["job-opportunities"] = {
      maxHoursPerWeek: 40,
      daysHoursFilter: [
        {
          isActive: true,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
        },
        {
          isActive: false,
          day:"MON",
          startTime: "xxx",
          endTime: "xxx"
  
        }
      ]
    };
    await requisitionActions.onApplyFilter(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), ON_RESPONSE_ERROR)).toBe(false);
    expect(hasAction(store.getActions(), requisitionActions.UPDATE_SHIFTS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);
  });

  test("Test onRsetFilters", async () => {
    const mockGetAllAvailableShifts= jest.fn();
    RequisitionService.prototype.getAllAvailableShifts = mockGetAllAvailableShifts;
    mockGetAllAvailableShifts.mockReturnValue(Promise.resolve({}));

    requisitionActions.onResetFilters(payload)(store.dispatch);

    expect(store.getActions().length).toBe(4);
    expect(hasAction(store.getActions(), requisitionActions.RESET_FILTERS)).toBe(true);
    expect(mockGetAllAvailableShifts).toBeCalledTimes(1);

  });

});
