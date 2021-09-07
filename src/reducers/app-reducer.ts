import { LOAD_INIT_DATA } from "../actions";
import {
  UPDATE_VALUE_CHANGE,
  ON_UPDATE_PAGE_ID,
  ON_SET_LOADING,
  RESET_IS_UPDATE_ACTION_EXECUTED,
  UPDATE_OUTPUT,
  RESET_PAGE_OUTPUT,
  SHOW_NAVBAR,
  ON_SET_WORKFLOW_LOADING,
  SET_STEPS_COMPLETED
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
  RESET_FILTERS_SELF_SERVICE,
  SHOW_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_JOB_DESCRIPTION,
  SELECTED_REQUISITION,
  SET_LOADING_SHIFTS,
  MERGE_SHIFTS,
  SET_PAGE_FACTOR,
  UPDATE_SELECTED_JOB_ROLE,
  UPDATE_POSSIBLE_NHE_DATES,
  UPDATE_SHIFT_PREF_DETAILS
} from "../actions/requisition-actions";
import {
  GET_JOB_INFO,
  UPDATE_SCHEDULES,
  UPDATE_JOB_INFO,
  SELECTED_SCHEDULE,
  CLEAR_SELECTED_SCHEDULE,
  SET_LOADING_SCHEDULES,
  RESET_FILTERS_SELF_SERVICE_DS
} from "../actions/job-actions";
import {
  GET_APPLICATION,
  SET_APPLICATION_DATA,
  UPDATE_APPLICATION,
  UPDATE_CANCELLATION_RESCHEDULE_REASON,
  UPDATE_NON_FCRA_QUESTIONS,
  ON_GET_CANDIDATE,
  UPDATE_CONTINGENT_OFFER,
  SHOW_PREVIOUS_NAMES,
  SET_SELECTED_SHIFT,
  SET_SELECTED_SCHEDULE,
  REMOVE_CANCELLATION_RESCHEDULE_QUESTION,
  UPDATE_SCHEDULE_ID
} from "../actions/application-actions";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import find from "lodash/find";
import { sortBy } from "lodash";
import { checkIfIsNonDGSCSS, checkIfIsDGSCSS } from "../helpers/utils";
import { isNil } from "lodash";

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
    job: {},
    application: {},
    candidate: {},
    output: {},
    config: {},
    showPreviousNames: "NO",
    loadingShifts: false,
    shiftsEmptyOnFilter: false,
    stepsCompleted: false,
    workflowErrorCode: undefined
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
    /* TODO: refactor the typing on all these to be nicer */
    case "createApplication": {
      state.applicationId = action.payload.applicationId;
      return state;
    }
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
      const workflowErrorCode = payload.errorCode || "not-rehire-eligible";
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
        },
        data: {
          workflowErrorCode: {
            $set: workflowErrorCode
          }
        }
      });
    }
    case ON_RESPONSE_ERROR: {
      /* Don't post error if we've since moved to another page */
      if (payload.expectedPageId && state.currentPage.id !== payload.expectedPageId) {
        return state;
      }
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
    case GET_JOB_INFO: {
      return updateState(state, {
        data: {
          job: {
            $merge: {
              consentInfo: payload,
              jobDescription: payload
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

    case UPDATE_JOB_INFO: {
      const job = cloneDeep(state.data.job);
      const newJobInfo = {
        consentInfo: payload,
        jobDescription: payload,
      }
      const updatedJob = merge(job, newJobInfo);
      return updateState(state, {
        data: {
          job: {
            $set: updatedJob,
          }
        }
      });
    }

    case UPDATE_POSSIBLE_NHE_DATES: {
      return updateState(state, {
        data: {
          requisition: {
            possibleNHEDates: {
              $set: payload.possibleNHEDates
            },
            possibleNHETimeSlots: {
              $set: payload.possibleNHETimeSlots
            }
          }
        }
      });
    }

    case UPDATE_SELECTED_JOB_ROLE: {
      return updateState(state, {
        data: {
          requisition: {
            childRequisitions: {
              [payload.selectedIndex]: {
                $set: payload.selectedRequisition
              }
            },
            selectedLocations: {
              $set: payload.selectedLocations
            }
          }
        }
      });
    }

    case UPDATE_SHIFT_PREF_DETAILS: {
      return updateState(state, {
        data: {
          requisition: {
            childRequisitions: {
              $set: payload.childRequisitions
            },
            selectedLocations: {
              $set: payload.selectedLocations
            },
            shiftPrefDetails: {
              $set: payload.shiftPrefDetails
            },
            totalChildRequisitions: {
              $set: payload.totalChildRequisitions
            },
            jobTitles: {
              $set: payload.jobTitles
            }
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

    case SELECTED_SCHEDULE: {
      const application = { ...state.data.application };
      application.schedule = payload;
      return updateState(state, {
        data: {
          job: {
            selectedChildSchedule: {
              $set: payload
            }
          },
          application: {
            $set: application
          },
        }
      });
    }

    case CLEAR_SELECTED_SCHEDULE: {
      const application = { ...state.data.application };
      delete application.schedule;
      const job = { ...state.data.job };
      delete job.selectedChildSchedule;

      return updateState(state, {
        data: {
          job: {
            $set: job
          },
          application: {
            $set: application
          },
        }
      });
    }

    case SET_SELECTED_SHIFT: {
      const application = { ...state.data.application };
      application.shift = payload;
      return updateState(state, {
        data: {
          selectedShift: {
            $set: payload
          },
          application: {
            $set: application
          },
          shiftPageFactor: {
            $set: 0
          },
          loadingShifts: {
            $set: false
          },
          requisition: {
            availableShifts: {
              $set: {}
            }
          }
        }
      });
    }

    case SET_SELECTED_SCHEDULE: {
      const application = { ...state.data.application };
      application.schedule = payload;
      console.log(application);
      return updateState(state, {
        data: {
          selectedSchedule: {
            $set: payload
          },
          application: {
            $set: application
          },
          schedulePageFactor: {
            $set: 0
          },
          loadingSchedule: {
            $set: false
          },
          job: {
            availableSchedules: {
              $set: {}
            }
          }
        }
      });
    }

    case GET_APPLICATION: {
      let application = payload.application;
      if (state?.data?.application?.schedule) {
        const schedule = cloneDeep(state.data.application.schedule);
        const shift = cloneDeep(state.data.application.shift);
        application = { schedule, shift, ...payload.application};
      }
      return updateState(state, {
        data: {
          application: {
            $set: application
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
      const schedule = cloneDeep(state.data.application.schedule);
      const shift = cloneDeep(state.data.application.shift);
      const application = { schedule, shift, ...payload.application};
      return updateState(state, {
        data: {
          application: {
            $set: application
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
      const candidate = {...payload, loginStatus:true}
      return updateState(state, {
        data: {
          candidate: {
            $set: candidate
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
          },
          shiftPageFactor: {
            $set: payload.pageFactor || 0
          },
          shiftsEmptyOnFilter: {
            $set: payload.shiftsEmptyOnFilter
          },
          config: {
            message: {
              $set: ""
            }
          }
        }
      });
    }

    case UPDATE_SCHEDULES: {
      const job = cloneDeep(state.data.job);
      job.availableSchedules = { ...payload.availableSchedules };
      return updateState(state, {
        data: {
          job: {
            $set: job
          },
          shiftPageFactor: {
            $set: payload.pageFactor || 0
          },
          schedulesEmptyOnFilter: {
            $set: payload.schedulesEmptyOnFilter,

          },
          config: {
            message: {
              $set: ""
            }
          }
        }
      });
    }

    case MERGE_SHIFTS: {
      const requisition = cloneDeep(state.data.requisition);
      requisition.availableShifts.shifts = [
        ...requisition.availableShifts.shifts,
        ...payload.shifts
      ];
      return updateState(state, {
        data: {
          requisition: {
            $set: requisition
          },
          shiftPageFactor: {
            $set: payload.pageFactor
          },
          loadingShifts: {
            $set: false
          },
          shiftsEmptyOnFilter: {
            $set: false
          }
        }
      });
    }

    case SHOW_MESSAGE: {
      return updateState(state, {
        data: {
          config: {
            message: {
              $set: payload.message
            }
          }
        }
      });
    }

    case REMOVE_MESSAGE: {
      return updateState(state, {
        data: {
          config: {
            message: {
              $set: ""
            }
          }
        }
      });
    }

    case REMOVE_CANCELLATION_RESCHEDULE_QUESTION: {
      let page = state.pageConfig.id;
      let components = cloneDeep(state.pageConfig.content.components);
      if ((checkIfIsDGSCSS(page) && isNil(state?.data?.application?.jobScheduleSelected?.scheduleId))
          || (checkIfIsNonDGSCSS(page) && isNil(state?.data?.application?.jobSelected?.headCountRequestId))) {
        for (let i = components.length - 1; i >= 0; i--) {
          let component = components[i];
          if (component.properties.id === "cancellation-reschedule-reason") {
            components.splice(i, 1);
            return updateState(state, {
              pageConfig: {
                content: {
                  components: {
                    $set: components
                  }
                }
              }
            });
          }
        }
      }
      return updateState(state, {});
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

    case RESET_FILTERS_SELF_SERVICE: {
      let updateShift = cloneDeep(state.data.output["update-shift"]);
      updateShift = { ...payload };
      return updateState(state, {
        data: {
          output: {
            "update-shift": {
              $set: updateShift
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
      const output = {};
      return updateState(state, {
        data: {
          $set: data
        },
        output: {
          $set: output
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

    case SET_LOADING_SHIFTS: {
      return updateState(state, {
        data: {
          loadingShifts: {
            $set: payload
          }
        }
      });
    }

    case SET_LOADING_SCHEDULES: {
      return updateState(state, {
        data: {
          loadingSchedules: {
            $set: payload
          }
        }
      });
    }

    case SET_PAGE_FACTOR: {
      return updateState(state, {
        data: {
          shiftPageFactor: {
            $set: payload
          },
          loadingShifts: {
            $set: false
          }
        }
      });
    }

    case SET_STEPS_COMPLETED: {
      return updateState(state, {
        data: {
          stepsCompleted: {
            $set: payload
          }
        }
      });
    }

    case RESET_FILTERS_SELF_SERVICE_DS: {
      let updateShift = cloneDeep(state.data.output["update-shift-ds"]);
      updateShift = { ...payload };
      return updateState(state, {
        data: {
          output: {
            "update-shift-ds": {
              $set: updateShift
            }
          }
        }
      });
    }

    case UPDATE_CANCELLATION_RESCHEDULE_REASON: {
      return updateState(state, {
        data: {
          cancellationRescheduleReason: {
            $set: payload.reason
          }
        }
      });
    }

    case UPDATE_SCHEDULE_ID: {
      return updateState(state, {
        data: {
          application: {
            jobScheduleSelected: {
              scheduleId: {
                $set: payload.scheduleId
              }
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
