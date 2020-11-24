import { ApplicationData, Page } from './../src/@types/IPayload';
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



export const TEST_APPLICATION_DATA: any = {
    requisition: {},
    application: {},
    output: {},
    candidate: {},
    showPreviousNames: "",
    selectedShift: {},
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
  defaultDaysHoursFilter: [],
  defaultAvailableFilter: []
}
export const TEST_PAYLOAD = {
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
  selectedShift: {},
  selectedRequisitionId: "",
  history: createHashHistory(),
  activeStepIndex: 0,
  isContentContainsSteps: false
}