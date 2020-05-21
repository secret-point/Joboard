import ICandidateApplication from "./ICandidateApplication";
export interface Consent {}

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
  childRequisitionId: string;
}

export interface AppConfig {
  stage: string;
  authenticationURL: string;
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
  selectedShift: any;
  selectedRequisitionId: string;
}
