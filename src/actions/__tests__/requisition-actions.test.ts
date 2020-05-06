import * as requisitionActions from "../requisition-actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import RequisitionService from "../../services/requisition-service";
jest.mock("axios");
jest.mock("../../services/requisition-service");

describe("Test for Actions", () => {
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

  test("Test on onGetRequisitionHeaderInfo with requisitionId", async () => {
    const mockGetRequisitionHeaderInfo = jest.fn();
    RequisitionService.prototype.getRequisitionHeaderInfo = mockGetRequisitionHeaderInfo;
    mockGetRequisitionHeaderInfo.mockReturnValue(Promise.resolve({}));
    const store = getStore();
    await requisitionActions.onGetRequisitionHeaderInfo({
      urlParams: {
        requisitionId: "123123"
      },
      data: {
        requisition: {}
      }
    })(store.dispatch);
    expect(store.getActions()[0].type).toBe(
      requisitionActions.GET_REQUISITION_HEADER_INFO
    );
  });

  test("Test on onGetRequisitionHeaderInfo without requisitionId", async () => {
    const store = getStore();
    await requisitionActions.onGetRequisitionHeaderInfo({
      urlParams: {}
    })(store.dispatch);
    expect(store.getActions().length).toBe(0);
  });
});
