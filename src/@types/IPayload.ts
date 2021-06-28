import ICandidateApplication, { Candidate } from "./ICandidateApplication";
import { History } from "history";
import { ChildRequisition } from "./shift-preferences";
export interface Consent {}

export interface WorkflowData {
  stepName: string;
  errorMessageCode: string;
}

export interface Bgc {}

export interface OutputData {
  consent: Consent;
  bgc: Bgc;
}

export interface ConsentInfo {
  jobTitle: string;
  questions: string[];
  locationDescription: string;
  requisitionStatus: string;
  requisitionType: string;
  isCandidatePreferencesEnabled: boolean;
  isCandidateNHEPreferencesEnabled: boolean;
}

export interface SelectedLocations {
  label: string;
  checked: boolean;
  value: string;
}
export interface Location {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface NHETimeSlots {
  timeSlotId: string;
  startTime: string;
  endTime: string;
  location: Location;
  timezone: string;
  availableResources: number;
  appointmentsBooked: number;
  recruitingEventId: string;
  timeRange: string;
  date: string;
  dateWithoutFormat: string;
  childRequisitionId: string;
  nheSource: string;
}

export interface Requisition {
  consentInfo: ConsentInfo;
  childRequisitions: ChildRequisition[];
  selectedChildRequisition: ChildRequisition;
  jobDescription: any;
  availableShifts: AvailableShifts;
  selectedLocations: SelectedLocations[];
  nheTimeSlots: NHETimeSlots[];
}

export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}

export interface ApplicationData {
  requisition: Requisition;
  job: Job;
  application: ICandidateApplication;
  output: any;
  candidate: Candidate;
  showPreviousNames: string;
  selectedShift: any;
  selectedSchedule: any;
  loadingSchedules:boolean;
  loadingShifts: boolean;
  shiftsEmptyOnFilter: boolean;
  schedulesEmptyOnFilter?: boolean;
  shiftPageFactor: number;
  schedulePageFactor: number;
}

export interface Job {
  jobId: string;
  selectedChildSchedule: Schedule;
  availableSchedules: { schedules: AvailableSchedule[] };
  language: string,
  dataSource: string,
  requisitionType: string,
  jobIdNumber: string,
  jobTitle: string,
  jobType: string,
  employmentType: string,
  fullAddress: string,
  country: string,
  city: string,
  postalCode: string,
  totalPayRateMin: number,
  totalPayRateMax: number,
  currencyCode: string,
  tagLine: string,
  letterOfIntent: string,
  image: string,
  jobPreviewVideo: string,
  limitedTimeOffer: string,
  featuredJob: boolean,
  bonusJob: boolean,
  jobDescription: string,
  jobQualification: string,
  careerPortalURL: string,
  blackbirdPortalURL: string,
  postingStatus: string
}

export interface AvailableSchedule {
  scheduleId: string;
}

export interface Schedule {
  employmentType: string;
  scheduleId: string;
  jobId: string;
  state: string;
  language: string,
  dataSource: string,
  currencyCode: string,
  address: string,
  city: string,
  postalCode: string,
  businessLine: string,
  contingencyTat: number,
  externalJobTitle: string,
  tagLine: string,
  jobPreviewVideo: string,
  detailedJobDescription: string,
  briefDescription: string,
  image: string,
  financeWeekStartDate: string,
  financeWeekEndDate: string,
  signOnBonus: number,
  surgePay: number,
  scheduleBannerText: string,
  scheduleType: string,
  phoneToolTitle: string,
  scheduleText: string,
  hoursPerWeek: number,
  totalWeeklyPay: string,
  financeWeek: number,
  alpsCode: string,
  departmentCode: string,
  managerLogin: string,
  managerEmployeeId: string,
  trainingShiftCode: string,
  crsCode: string,
  nhoType: string,
  trainingDate: string,
  hireStartDate: string,
  hireEndDate: string,
  firstDateOnSite: string,
  startTime: string,
  isPublicSchedule: string,
  locationCode: string
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
  jobId?: string;
  scheduleId?: string;
}

export interface DaysHoursFilter {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

export interface HOURS_PER_WEEK {
  maximumValue: number;
  minimumValue: number;
}

export interface Range {
  HOURS_PER_WEEK: HOURS_PER_WEEK;
}
export interface day {
  startTime: string;
  endTime: string;
}

export interface SchedulePreference {
  MONDAY: day;
  TUESDAY: day;
  WEDNESDAY: day;
  THURSDAY: day;
  FRIDAY: day;
  SATURDAY: day;
  SUNDAY: day;
}

export interface In {}

export interface Eq {}

export interface Filter {
  range: Range;
  schedulePreferences: SchedulePreference;
  in: In;
  eq: Eq;
}

export interface AvailableFilter {
  sortBy: string;
  filter: Filter;
  seasonalOnly: boolean;
  locale: string;
  pageFactor: number;
  isCRSJobsDisplayed: boolean;
}

export interface AppConfig {
  stage: string;
  authenticationURL: string;
  dashboardUrl: string;
  stepFunctionEndpoint: string;
  ASHChecklistURL: string;
  defaultDaysHoursFilter: DaysHoursFilter[];
  defaultAvailableFilter: AvailableFilter;
}

export interface PageOrder {
  id: string;
  orderNumber: number;
  configPath: string;
}

export default interface Payload {
  output: any;
  data: ApplicationData;
  currentPage: Page;
  nextPage: Page;
  previousPage: Page;
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
  selectedSchedule: any;
  selectedRequisitionId: string;
  selectedRequisitionIndex: number;
  history: History;
}
export interface AvailableShifts {
  shifts: Shifts[];
  total: any;
}

export interface AvailableShifts {
  schedules: Schedules[];
  total: any;
}

export interface Shifts {
  headCountRequestId: string;
  jobTitle: string;
  isTemporaryReq: boolean;
  requisitionId: string;
  jobType: string;
  locationDescription: string;
  fillRate: number;
  openCount: number;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  hoursPerWeek: HoursPerWeek;
  haveMedicalBenefits: boolean;
  day1Date: string;
  hireStartDate: string;
  basePayRate: number;
  shiftDifferential: number;
  shortDescription: string;
  days: string;
  time: string;
  iconUrl: string;
  currency: string;
  jobClass: string;
  shiftCode: string;
  altShiftCode: string;
  locationPostalCode: string;
  locationState: string;
  country: string;
}

export interface Schedules {
  headCountRequestId: string;
  jobTitle: string;
  isTemporaryReq: boolean;
  requisitionId: string;
  jobType: string;
  locationDescription: string;
  fillRate: number;
  openCount: number;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  hoursPerWeek: HoursPerWeek;
  haveMedicalBenefits: boolean;
  day1Date: string;
  hireStartDate: string;
  basePayRate: number;
  shiftDifferential: number;
  shortDescription: string;
  days: string;
  time: string;
  iconUrl: string;
  currency: string;
  jobClass: string;
  shiftCode: string;
  altShiftCode: string;
  locationPostalCode: string;
  locationState: string;
  country: string;
}

export interface HoursPerWeek {
  maximumValue: number;
  minimumValue: number;
}
