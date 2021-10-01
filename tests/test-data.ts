import { filter } from 'lodash';
import { History, createHashHistory } from "history";

export const TEST_REQUISITION_ID = "test-req-id";
export const TEST_APPLICATION_ID = "test-app-id";
export const TEST_CANDIDATE_ID = "test-candidate-id";
export const TEST_PAGE_ID = "test-page-id";
export const TEST_PAGE_CONFIG_PATH = "test-config-path";
export const TEST_MISC = "test-misc";
export const TEST_STAGE = "";
export const TEST_URL = "https://test-me.url.fake/{applicationId}/{requisitionId}";
export const TEST_KEY = "test-key";
export const TEST_STEP_ID = "job-opportunities";
export const TEST_HCR_ID = "test-hcr-id";
export const TEST_SCHEDULE_ID = "test-schedule-id";
export const TEST_CS_DOMAIN = "https://hiring.amazon.com";


export const TEST_CANDIDATE: any = {
  candidateId: TEST_CANDIDATE_ID
}
export const TEST_APPLICATION: any = {
  applicationId: TEST_APPLICATION_ID
}

export const TEST_JOB: any = {
    selectedChildSchedule: {
      scheduleId: TEST_SCHEDULE_ID
    },
    jobDescription: "",
}

export const TEST_APPLICATION_DATA: any = {
    requisition: {
      availableShifts:{
        shifts: [
          {
            headCountRequestId: TEST_HCR_ID
          }
        ]
      }
    },
    application: {
      applicationId: TEST_APPLICATION_ID
    },
    job: TEST_JOB,
    output: {},
    candidate: {},
    showPreviousNames: "",
    selectedShift: {
        requisitionId: TEST_REQUISITION_ID
    },
    loadingShifts: true,
    shiftsEmptyOnFilter: false,
    shiftPageFactor: 0
}


export const TEST_PAGE: any = {
  id: TEST_PAGE_ID,
  orderNumber: 0,
  configPath: TEST_PAGE_CONFIG_PATH
}

export const TEST_URL_PARAM: any = {
  page: TEST_PAGE_ID,
  requisitionId: TEST_REQUISITION_ID,
  applicationId: TEST_APPLICATION_ID,
  misc: TEST_MISC
}

export const TEST_APP_CONFIG: any = {
  stage: TEST_STAGE,
  authenticationURL: TEST_URL,
  dashboardUrl: TEST_URL,
  stepFunctionEndpoint: TEST_URL,
  ASHChecklistURL: TEST_URL,
  ASHChecklistURLCS: TEST_URL,
  defaultDaysHoursFilter: [],
  defaultAvailableFilter: {
    filter: {
      range: {
        HOURS_PER_WEEK: {
          maximumValue: 30
        }
      }
    }
  },
  defaultAvailableFilterDS: {
    filter: {
      range: {
        HOURS_PER_WEEK: {
          maximumValue: 30
        }
      }
    }
  },
  CSDomain: TEST_CS_DOMAIN
}
export const TEST_PAYLOAD: any = {
  output: {}, 
  data: TEST_APPLICATION_DATA,
  currentPage: TEST_PAGE,
  nextPage: TEST_PAGE,
  previousPage: TEST_PAGE,
  urlParams: TEST_URL_PARAM,
  appConfig: TEST_APP_CONFIG,
  pageOrder: [],
  keyName: TEST_KEY,
  candidateId: TEST_CANDIDATE_ID,
  updatedPageId: TEST_PAGE_ID,
  options: {},
  value: {},
  pageId: TEST_PAGE_ID,
  stepId: TEST_STEP_ID,
  stepsLength: 1,
  selectedShift: {
    headCountRequestId: TEST_HCR_ID
  },
  selectedRequisitionId: "",
  history: createHashHistory(),
  activeStepIndex: 0,
  isContentContainsSteps: false
}

export const EXCEPTION_MESSAGE = "EXCEPTION_MESSAGE";

export const TEST_REDUX_STORE: any = {
  app: {
    data: {
      requisition: {
        requisitionId: TEST_REQUISITION_ID
      },
      application: {
        applicationId: TEST_APPLICATION_ID,
        parentRequisitionId: TEST_REQUISITION_ID
      }
    },
    appConfig:{
      CSDomain: "https://hiring.amazon.com"
    }
  }
}

export const TEST_WORKFLOW_DATA: any = {
  stepName: TEST_STEP_ID
}

//util functions
export const hasAction = (actions: any[], actionToCheck: string) => {
  let result = false;
  actions.forEach(element => {
    if (element.type === actionToCheck) {
      result = true;
    }
  });
  return result;
}