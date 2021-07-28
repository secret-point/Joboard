import ICandidateApplication, { Candidate } from "./ICandidateApplication";
import { History } from "history";
import { ChildRequisition } from "./shift-preferences";
import { type } from "ramda";
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
  job: JobDescriptor;
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

export interface JobDescriptor {
  consentInfo: Job;
  jobDescription: Job;
  availableSchedules: unknown;
  selectedChildSchedule: ScheduleDetails;
}

export interface Job {
  jobId: string;
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

export type Schedule = ScheduleDetails | ScheduleCard;

export interface ScheduleDetails {
  address: string;
  agencyName: string;
  alpsCode: string;
  basePay: number;
  briefJobDescription: string;
  businessLine: string;
  city: string;
  companyCode: string;
  contingencyTat: number;
  county: string;
  crsCode: string;
  /**
   * ISO 4217 Currency Code
   * for Salesforce: examples:
   *      "Argentina","ARS",
   *      "Australia","AUD",
   *      "Austria","EUR",
   *      "Brazil","BRL",
   *      "Canada","CAD",
   *      "Colombia","COP",
   *      "China","CNY",
   *      "Costa Rica","CRC",
   *      "Czech Republic","CZK",
   *      "Denmark","DKK",
   *      "Egypt","EGP",
   *      "Hong Kong","HKD",
   *      "India","INR",
   *      "Ireland","EUR",
   *      "Israel","ILS",
   *      "Japan","JPY",
   *      "Korea, Republic of","KRW",
   *      "Mexico","MXN",
   *      "United Kingdom","GBP",
   *      "United States", "USD",
   *      "Germany","EUR",
   *      "Italy","EUR",
   *      "France","EUR",
   *      "Netherlands","EUR",
   *      "Spain","EUR",
   */
  currencyCode: string;
  dataSource: string;
  departmentCode: string;
  detailedJobDescription: string;
  eSL: boolean;
  employeeClass: string;
  employmentType: string;
  externalJobTitle: string;
  financeWeek: number;
  financeWeekEndDate: string;
  financeWeekStartDate: string;
  firstDayOnSite: string;
  geoClusterId: string;
  geoClusterName: string;
  hireStartDate: string;
  hoursPerWeek: number;
  image: string;
  internalJobCode: string;
  internalJobTitle: string;
  jobPreviewVideo: string;
  laborDemandCount: number;
  laborOrderCount: number;
  language: string;
  locationCode: string;
  managerEmployeeId: string;
  managerLogin: string;
  managerName: string;
  msa: string;
  nhoType: string;
  phoneToolTitle: string;
  postalCode: string;
  scheduleBannerText: string;
  scheduleId: string;
  scheduleText: string;
  scheduleType: string;
  shiftDifferential: number;
  siteId: string;
  standardShiftCode: string;
  startDateAvailableCount: number;
  startDateDemandCount: number;
  startDateDeniedCount: number;
  startDateFillCount: number;
  startTime: string;
  state: string;
  tagLine: string;
  trainingDate: string;
  trainingShiftCode: string;
}

export interface ScheduleCard {
  /**
   * Schedule ID
   */
  scheduleId: string;
  /**
   * Job ID
   */
  jobId: string;
  /**
   * Data Source, either `Salesforce` or `Dragonstone`
   */
  dataSource: string;
  /**
   * Language of the Schedule
   */
  language: string;
  /**
   * External Job Title.
   */
  externalJobTitle: string;
  /**
   * @Deprecated
   * Base Pay.
   * The value of this field was updated to basePay + shiftDifferential
   * Use totalPayRate instead
   */
  basePay: number;
  /**
   * totalPayRate = schedule -> basePay + shiftDifferential.
   */
  totalPayRate: number;
  /**
   * ISO 4217 Currency Code
   * for Salesforce: examples:
   *      "Argentina","ARS",
   *      "Australia","AUD",
   *      "Austria","EUR",
   *      "Brazil","BRL",
   *      "Canada","CAD",
   *      "Colombia","COP",
   *      "China","CNY",
   *      "Costa Rica","CRC",
   *      "Czech Republic","CZK",
   *      "Denmark","DKK",
   *      "Egypt","EGP",
   *      "Hong Kong","HKD",
   *      "India","INR",
   *      "Ireland","EUR",
   *      "Israel","ILS",
   *      "Japan","JPY",
   *      "Korea, Republic of","KRW",
   *      "Mexico","MXN",
   *      "United Kingdom","GBP",
   *      "United States", "USD",
   *      "Germany","EUR",
   *      "Italy","EUR",
   *      "France","EUR",
   *      "Netherlands","EUR",
   *      "Spain","EUR",
   */
  currencyCode: string;

  /**
   * Schedule Text.
   */
  scheduleText: string;
  /**
   * Hours per Week.
   */
  hoursPerWeek: number;
  /**
   * First Day on Site.
   */
  firstDayOnSite: string;
  /**
   * Schedule Banner Text.
   */
  scheduleBannerText: string;
  /**
   * Schedule Type.
   */
  scheduleType: string;
  /**
   * Employment Type.
   */
  employmentType: string;
  /**
   * Tag Line of the Job.
   */
  tagLine: string;
  /**
   * Image/Icon URL
   */
  image: string;
  /**
   * Job Preview Video URL Link
   */
  jobPreviewVideo: string;
  /**
   * Location Address
   */
  address: string;
  /**
   * Location City
   */
  city: string;
  /**
   * Location State
   */
  state: string;
  /**
   * Location Postal Code
   */
  postalCode: string;
  /**
   * Distance
   */
  distance: number;
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
  defaultAvailableFilterDS: AvailableFilter;
  featuresList?: any;
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
  shiftType: string;
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
