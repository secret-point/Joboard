import configData from "../config/configuration";
import { CREATE_APPLICATION_DATA, UPDATE_APPLICATION_DATA } from "../actions";
import { UPDATE_VALUE_CHANGE, SAVE_AND_MOVE_TO_NEXT_PAGE, ON_UPDATE_PAGE_ID } from "../actions/actions";
import { ON_REMOVE_ERROR, ON_RESPONSE_ERROR } from "../actions/error-actions";
import set from "lodash/set";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import { IAction } from "../types/IActionType";

const getOutputDataObject = () => {
  const outputData:any = {};
  map(configData.pages, (data: any) => {
    outputData[data.id] = {};
  })
  return outputData;
}

const currentPage = (() => {
  return configData.pages[0];
})();

const nextPage = (() => {
  return configData.pages[1];
})();

const initialState: any = {
  applicationData: {},
  outputData: getOutputDataObject(),
  ...configData,
  currentPage,
  nextPage,
  currentStep: 0,
  hasResponseError: false,
  errorMessage: null
}

const AppReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_VALUE_CHANGE: {
      const newState = {...state};
      const { keyName, value, pageId } = payload;
      set(newState["outputData"][pageId], keyName, value);
      return newState;
    }
    case CREATE_APPLICATION_DATA: {
      const newState = {...state};
      const { applicationData } = payload;
      newState["applicationData"] = applicationData;
      return newState;
    }
    case UPDATE_APPLICATION_DATA: {
      const newState = {...state};
      const { applicationData } = payload;
      newState["applicationData"] = { ...newState["applicationData"], ...applicationData};
      return newState;
    }
    case SAVE_AND_MOVE_TO_NEXT_PAGE: {
      const newState = {...state};
      newState.currentPage = state.nextPage;
      const nextPageIndex = findIndex(state.pages, { id: state.nextPage.id });
      newState.nextPage = state.pages[nextPageIndex + 1];
      return newState;
    }
    case ON_UPDATE_PAGE_ID: {
      const newState = { ...state };
      newState.currentPage = find(state.pages, { id: payload.updatedPageId });
      const nextPageIndex = findIndex(state.pages, { id: newState.currentPage.id });
      newState.nextPage = state.pages[nextPageIndex + 1];
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
    default:
      return state;
  }
}

export default AppReducer;