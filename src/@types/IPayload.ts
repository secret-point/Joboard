import ICandidateApplication from "./ICandidateApplication";
import { History } from "history";
export interface Consent {}

export interface WorkflowData {
  stepName: string;
}

export interface Bgc {}

export interface OutputData {
  consent: Consent;
  bgc: Bgc;
}

export interface ConsentInfo {
  jobTitle: string;
  questions: string[];
}

export interface Requisition {
  consentInfo: ConsentInfo;
  childRequisitions: any[];
  selectedChildRequisition: any;
  jobDescription: any;
  availableShifts:requistionAvailableShifts;
}

export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}

export interface ApplicationData {
  requisition: Requisition;
  application: ICandidateApplication;
  output: any;
  candidate: any;
}

export interface Page {
  id: string;
  orderNumber: number;
  configPath: string;
}

export interface UrlParam {
  page: string;
  requisitionId: string;
  applicationId: string;
  misc: string;
}

export interface AppConfig {
  stage: string;
  authenticationURL: string;
  dashboardUrl: string;
  stepFunctionEndpoint: string;
}

export interface PageOrder {
  id: string;
  orderNumber: number;
  configPath: string;
}

export default interface Payload {
  outputData: OutputData;
  data: ApplicationData;
  currentPage: Page;
  nextPage: Page;
  urlParams: UrlParam;
  appConfig: AppConfig;
  pageOrder: PageOrder[];
  keyName: string;
  candidateId: string;
  isContentContainsSteps?: boolean;
  activeStepIndex?: number;
  updatedPageId: string;
  options: any;
  value: any;
  pageId: string;
  stepId: string;
  stepsLength: number;
  selectedShift: any;
  selectedRequisitionId: string;
  history: History;
}
export interface requistionAvailableShifts {
  shifts:requistionShifts[];
}
export interface requistionShifts {
  basePayRate: string;
  currency: string;
  day1Date: string;
  days: string;
  daysOfWeek: [];
  endTime: string;
  fillRate: number;
  headCountRequestId: string;
  hireStartDate: string;
  hoursPerWeek: number;
  iconUrl: string;
  isTemporaryReq: boolean;
  jobTitle: string;
  locationDescription: string;
  openCount: number;
  phoneToolTitle: string;
  requisitionId:string;
  shortDescription: string;
  startTime:string;
  time: string;
}
