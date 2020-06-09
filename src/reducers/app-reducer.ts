import { LOAD_INIT_DATA } from "../actions";
import {
  UPDATE_VALUE_CHANGE,
  ON_UPDATE_PAGE_ID,
  ON_SET_LOADING,
  RESET_IS_UPDATE_ACTION_EXECUTED
} from "../actions/actions";
import { ON_REMOVE_ERROR, ON_RESPONSE_ERROR } from "../actions/error-actions";
import set from "lodash/set";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import { IAction } from "../@types/IActionType";
import updateState from "immutability-helper";
import {
  GET_REQUISITION_HEADER_INFO,
  UPDATE_REQUISITION
} from "../actions/requisition-actions";
import {
  GET_APPLICATION,
  SET_APPLICATION_DATA,
  UPDATE_APPLICATION,
  UPDATE_NON_FCRA_QUESTIONS,
  ON_GET_CANDIDATE,
  UPDATE_ADDITIONAL_BG_INFO,
  UPDATE_CONTINGENT_OFFER
} from "../actions/application-actions";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";


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
  loading: false,
  isUpdateActionExecuted: false
};

const AppReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_INIT_DATA: {
      const outputDataObject = getOutputDataObject(payload[1].pageOrder);
      return updateState(state, {
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
      const {
        keyName,
        value,
        pageId,
        isContentContainsSteps,
        activeStepIndex
      } = payload;

      const id = pageId || state.currentPage.id;
      let key = `${id}.${keyName}`;
      if (isContentContainsSteps) {
        key = `${id}.${activeStepIndex}.${keyName}`;
      }

      set(output, key, value);
      return updateState(state, {
        data: {
          output: {
            $set: output
          }
        }
      });
    }
    case ON_UPDATE_PAGE_ID: {
      const newState = { ...state };
      newState.loading = false;
      newState.currentPage = find(state.pageOrder, {
        id: payload.updatedPageId
      });
      const nextPageIndex = findIndex(state.pageOrder, {
        id: newState.currentPage.id
      });
      newState.nextPage = state.pageOrder[nextPageIndex + 1];
      newState.pageConfig = payload.page.pageConfig;
      newState.isUpdateActionExecuted = false;
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
      return updateState(state, {
        data: {
          requisition: {
            $merge: {
              consentInfo: payload
            }
          }
        }
      });
    }

    case UPDATE_REQUISITION: {
      const requisition=cloneDeep(state.data.requisition);
      const updatedRequisition=merge(payload, requisition);
      return updateState(state, {
        data: {
          requisition: {
            $set: updatedRequisition
          }
        }
      });
    }

    case GET_APPLICATION: {
      return updateState(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }
    case SET_APPLICATION_DATA: {
      return updateState(state, {
        applicationData: {
          $merge: payload.application
        }
      });
    }
    case UPDATE_APPLICATION: {
      return updateState(state, {
        data: {
          application: {
            $set: payload.application
          }
        },
        isUpdateActionExecuted: {
          $set: true
        }
      });
    }

    case UPDATE_NON_FCRA_QUESTIONS: {
      return updateState(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }

    case ON_GET_CANDIDATE: {
      return updateState(state, {
        data: {
          candidate: {
            $set: payload
          }
        }
      });
    }
    case ON_SET_LOADING: {
      return updateState(state, {
        loading: {
          $set: payload
        }
      });
    }

    case UPDATE_CONTINGENT_OFFER: {
      return updateState(state, {
        data: {
          application: {
            $set: payload.application
          }
        }
      });
    }

    case RESET_IS_UPDATE_ACTION_EXECUTED: {
      return updateState(state, {
        isUpdateActionExecuted: {
          $set: false
        }
      });
    }

    default:
      return state;
  }
};

export default AppReducer;
