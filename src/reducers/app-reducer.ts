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
import {
  GET_APPLICATION,
  SET_APPLICATION_DATA,
  UPDATE_APPLICATION,
  UPDATE_NON_FCRA_QUESTIONS,
  ON_GET_CANDIDATE,
  UPDATE_ADDITIONAL_BG_INFO
} from "../actions/application-actions";
import cloneDeep from "lodash/cloneDeep";

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
    application: {},
    candidate: {},
    output: {}
  },
  applicationData: {},
  output: {},
  currentPageOutput: {},
  currentPage: {},
  nextPage: {},
  currentStep: 0,
  hasResponseError: false,
  errorMessage: null,
  pageConfig: {},
  pageOrder: [],
  appConfig: {},
  candidateId: "098d6c95-268f-4d68-8cfd-269686ebe01a"
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
        output: {
          $set: outputDataObject
        },
        data: {
          output: {
            $set: outputDataObject
          }
        }
      });
    }
    case UPDATE_VALUE_CHANGE: {
      const output = cloneDeep(state.data.output);
      const { keyName, value, pageId } = payload;
      set(output[pageId], keyName, value);
      return updateSate(state, {
        data: {
          output: {
            $set: output
          }
        }
      });
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
    case GET_APPLICATION: {
      return updateSate(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }
    case SET_APPLICATION_DATA: {
      return updateSate(state, {
        applicationData: {
          $merge: payload.application
        }
      });
    }
    case UPDATE_APPLICATION: {
      return updateSate(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }

    case UPDATE_NON_FCRA_QUESTIONS: {
      return updateSate(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }

    case ON_GET_CANDIDATE: {
      return updateSate(state, {
        data: {
          candidate: {
            $set: payload
          }
        }
      });
    }
    //TODO: once api is moved to application add this back
    /*case UPDATE_ADDITIONAL_BG_INFO: {
      return updateSate(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      })
    }*/
    default:
      return state;
  }
};

export default AppReducer;
