import { LOAD_INIT_DATA } from "../actions";
import {
  UPDATE_VALUE_CHANGE,
  ON_UPDATE_PAGE_ID,
  ON_SET_LOADING,
  RESET_IS_UPDATE_ACTION_EXECUTED,
  UPDATE_OUTPUT,
  RESET_PAGE_OUTPUT,
  SHOW_NAVBAR,
  ON_SET_WORKFLOW_LOADING
} from "../actions/actions";
import { ON_REMOVE_ERROR, ON_RESPONSE_ERROR } from "../actions/error-actions";
import set from "lodash/set";
import map from "lodash/map";
import { IAction } from "../@types/IActionType";
import updateState from "immutability-helper";
import {
  GET_REQUISITION_HEADER_INFO,
  UPDATE_REQUISITION,
  UPDATE_SHIFTS,
  RESET_FILTERS,
  UPDATE_JOB_DESCRIPTION,
  SELECTED_REQUISITION
} from "../actions/requisition-actions";
import {
  GET_APPLICATION,
  SET_APPLICATION_DATA,
  UPDATE_APPLICATION,
  UPDATE_NON_FCRA_QUESTIONS,
  ON_GET_CANDIDATE,
  UPDATE_CONTINGENT_OFFER,
  SHOW_PREVIOUS_NAMES,
  SET_SELECTED_SHIFT
} from "../actions/application-actions";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import find from "lodash/find";
import { sortBy } from "lodash";

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
    output: {},
    config: {},
    showPreviousNames: "NO"
  },
  applicationData: {},
  output: {},
  currentPageOutput: {},
  currentPage: {},
  previousPage: {},
  currentStep: 0,
  hasResponseError: false,
  errorMessage: null,
  pageConfig: {},
  pageOrder: [],
  appConfig: {},
  loading: false,
  isUpdateActionExecuted: false,
  workflowLoading: false
};

const AppReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_INIT_DATA: {
      const outputDataObject = getOutputDataObject(payload[1].pageOrder);

      const countries = payload[2];
      let stateList: any[] = [];
      let theCountry: any = {};
      theCountry = find(countries, { code3: "USA" });
      let emptyState: any = {
        value: "",
        text: "Select a state"
      };
      stateList.push(emptyState);

      theCountry.states.forEach((state: any) => {
        const theState: any = {};
        theState.value = state.name;
        theState.text = state.code + " -- " + state.name;
        stateList.push(theState);
      });

      stateList = sortBy(stateList, ["value"], ["asc"]);

      return updateState(state, {
        pageOrder: {
          $set: payload[1].pageOrder
        },
        appConfig: {
          $set: payload[0]
        },
        data: {
          output: {
            $set: outputDataObject
          },
          config: {
            states: {
              $set: stateList
            }
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
    case UPDATE_OUTPUT: {
      const outputObject = cloneDeep(state.output);
      const { output } = payload;
      const newOutput = merge(output, outputObject);
      return updateState(state, {
        output: {
          $set: newOutput
        }
      });
    }
    case ON_UPDATE_PAGE_ID: {
      const currentPage: any = {};
      currentPage.id = payload.updatedPageId;
      return updateState(state, {
        loading: { $set: false },
        currentPage: {
          $set: currentPage
        },
        previousPage: {
          $set: state.currentPage
        },
        pageConfig: {
          $set: payload.page.pageConfig
        },
        isUpdateActionExecuted: {
          $set: false
        },
        output: {
          $set: {}
        }
      });
    }
    case ON_RESPONSE_ERROR: {
      const newState = { ...state };
      newState.hasResponseError = true;
      newState.errorMessage = payload.errorMessage;
      return newState;
    }
    case ON_REMOVE_ERROR: {
      return updateState(state, {
        hasResponseError: {
          $set: false
        },
        errorMessage: {
          $set: null
        }
      });
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
      const requisition = cloneDeep(state.data.requisition);
      const updatedRequisition = merge(payload, requisition);
      return updateState(state, {
        data: {
          requisition: {
            $set: updatedRequisition
          }
        }
      });
    }

    case SELECTED_REQUISITION: {
      return updateState(state, {
        data: {
          requisition: {
            selectedChildRequisition: {
              $set: payload
            }
          }
        }
      });
    }

    case SET_SELECTED_SHIFT: {
      return updateState(state, {
        data: {
          selectedShift: {
            $set: payload
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

    case ON_SET_WORKFLOW_LOADING: {
      return updateState(state, {
        workflowLoading: {
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

    case UPDATE_SHIFTS: {
      const requisition = cloneDeep(state.data.requisition);
      requisition.availableShifts = { ...payload.availableShifts };
      return updateState(state, {
        data: {
          requisition: {
            $set: requisition
          }
        }
      });
    }

    case UPDATE_JOB_DESCRIPTION: {
      const requisition = cloneDeep(state.data.requisition);
      requisition.jobDescription = { ...payload.jobDescription };
      return updateState(state, {
        data: {
          requisition: {
            $set: requisition
          }
        }
      });
    }

    case RESET_FILTERS: {
      let jobOpportunities = cloneDeep(state.data.output["job-opportunities"]);
      jobOpportunities = { ...payload };
      return updateState(state, {
        data: {
          output: {
            "job-opportunities": {
              $set: jobOpportunities
            }
          }
        }
      });
    }

    case RESET_PAGE_OUTPUT: {
      let data = cloneDeep(state.data);
      data.output = {};
      delete data.requisition.nheTimeSlots;
      delete data.requisition.shifts;
      return updateState(state, {
        data: {
          $set: data
        },
        output: {
          $set: {}
        }
      });
    }

    case SHOW_NAVBAR: {
      return updateState(state, {
        pageConfig: {
          $set: payload.pageConfig
        }
      });
    }

    case SHOW_PREVIOUS_NAMES: {
      return updateState(state, {
        data: {
          showPreviousNames: {
            $set: payload
          }
        }
      });
    }

    default:
      return state;
  }
};

export default AppReducer;
