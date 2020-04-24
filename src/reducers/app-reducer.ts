import { LOAD_INIT_DATA } from "../actions";
import { UPDATE_VALUE_CHANGE, ON_UPDATE_PAGE_ID } from "../actions/actions";
import { ON_REMOVE_ERROR, ON_RESPONSE_ERROR } from "../actions/error-actions";
import set from "lodash/set";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import { IAction } from "../@types/IActionType";
import updateSate from "immutability-helper";
import { GET_REQUISITION_HEADER_INFO } from "../actions/requisition-actions";

const getOutputDataObject = (pageOrder: any[]) => {
  const outputData: any = {};
  map(pageOrder, (data: any) => {
    outputData[data.id] = {};
  });
  return outputData;
};

const initialState: any = {
  data: {
    requisition: {},
    application: {}
  },
  applicationData: {},
  outputData: {},
  currentPage: {},
  nextPage: {},
  currentStep: 0,
  hasResponseError: false,
  errorMessage: null,
  pageConfig: {},
  pageOrder: [],
  appConfig: {}
};

const AppReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_INIT_DATA: {
      const outputDataObject = getOutputDataObject(payload[1].pageOrder);
      return updateSate(state, {
        pageOrder: {
          $set: payload[1].pageOrder
        },
        appConfig: {
          $set: payload[0]
        },
        outputData: {
          $set: outputDataObject
        }
      });
    }
    case UPDATE_VALUE_CHANGE: {
      const newState = { ...state };
      const { keyName, value, pageId } = payload;
      set(newState["outputData"][pageId], keyName, value);
      return newState;
    }
    case ON_UPDATE_PAGE_ID: {
      const newState = { ...state };
      newState.currentPage = find(state.pageOrder, {
        id: payload.updatedPageId
      });
      const nextPageIndex = findIndex(state.pageOrder, {
        id: newState.currentPage.id
      });
      newState.nextPage = state.pageOrder[nextPageIndex + 1];
      newState.pageConfig = payload.page.pageConfig;
      return newState;
    }
    case ON_RESPONSE_ERROR: {
      const newState = { ...state };
      newState.hasResponseError = true;
      newState.errorMessage = payload.errorMessage;
      return newState;
    }
    case ON_REMOVE_ERROR: {
      const newState = { ...state };
      newState.hasResponseError = false;
      newState.errorMessage = null;
      return newState;
    }
    case GET_REQUISITION_HEADER_INFO: {
      return updateSate(state, {
        data: {
          requisition: {
            $merge: {
              consentInfo: payload
            }
          }
        }
      });
    }
    default:
      return state;
  }
};

export default AppReducer;
