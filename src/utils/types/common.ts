import {
  APPLICATION_STATE,
  BACKGROUND_AGENT,
  BGC_STEPS,
  BGC_VENDOR_TYPE,
  DAYS_OF_WEEK,
  DESIRED_WORK_HOURS,
  FCRA_DISCLOSURE_TYPE,
  FEATURE_FLAG,
  INFO_CARD_STEP_STATUS,
  JOB_REFERRAL_VALUE,
  QUERY_PARAMETER_NAME,
  SCHEDULE_FILTER_TYPE,
  SELF_IDENTIFICATION_STEPS,
  SHIFT_PATTERN,
  UPDATE_APPLICATION_API_TYPE,
  WORKFLOW_STEP_NAME
} from "../enums/common";
import { MessageBannerType } from "@amzn/stencil-react-components/message-banner";

export interface QueryParamItem {
  paramName?: QUERY_PARAMETER_NAME;
  paramValue?: string;
}

export interface AppConfig {
  envConfig?: EnvConfig;
  pageOrder?: PageOrder[];
  countryStateConfig?: CountryStateConfig;
}

export interface EnvConfig {
  stage: string;
  appStage: string;
  authenticationURL: string;
  dashboardUrl: string;
  stepFunctionEndpoint: string;
  ASHChecklistURL: string;
  ASHChecklistURLCS: string;
  defaultDaysHoursFilter: DaysHoursFilter[];
  defaultAvailableFilter: AvailableFilter;
  defaultAvailableFilterDS: AvailableFilter;
  featureList?: FeatureFlagList;
  CSDomain: string;
  loggerUrl: string;
}

export interface DaysHoursFilter {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

export interface AvailableFilter {
  sortBy: string;
  filter: Filter;
  seasonalOnly: boolean;
  locale: string;
  pageFactor: number;
  isCRSJobsDisplayed: boolean;
}

export interface Filter {
  range: Range;
  schedulePreferences: SchedulePreference;
  in: In;
  eq: Eq;
  startDateBegin?: string;
  startDateEnd?: string;
  city?: string[];
}

export interface SchedulePreference {
  MONDAY?: Day;
  TUESDAY?: Day;
  WEDNESDAY?: Day;
  THURSDAY?: Day;
  FRIDAY?: Day;
  SATURDAY?: Day;
  SUNDAY?: Day;
}

export interface Day {
  startTime: string;
  endTime: string;
}

export interface Range {
  HOURS_PER_WEEK: HOURS_PER_WEEK;
}

export interface HOURS_PER_WEEK {
  maximumValue: number;
  minimumValue: number;
}

export interface In {}

export interface Eq {}

export type CountryStateConfig = State[]

export interface State {
  value: string;
  text: string;
}

interface PageOrder {
  orderNumber: number;
  configPath: string;
}

export interface Job {
  jobId: string;
  activateReferralIncentive?: boolean;
  availableSchedules: { schedules: AvailableSchedule[] };
  language: string;
  dataSource: string;
  requisitionType: string;
  jobIdNumber: string;
  jobTitle: string;
  jobType: string;
  employmentType: string;
  fullAddress: string;
  country: string;
  city: string;
  postalCode: string;
  totalPayRateMin: number;
  totalPayRateMax: number;
  currencyCode: string;
  tagLine: string;
  letterOfIntent: string;
  image: string;
  jobPreviewVideo: string;
  limitedTimeOffer: string;
  featuredJob: boolean;
  bonusJob: boolean;
  jobDescription: string;
  jobQualification: string;
  careerPortalURL: string;
  blackbirdPortalURL: string;
  postingStatus: string;
  dspEnabled?: boolean | null;
  qualificationCriteria: string[];
  assessmentType: string;
  bypassAssessment: boolean;
}

export interface AvailableSchedule {
  scheduleId: string;
}

export enum Locale {
  enGB = "en-GB",
  enUS = "en-US",
  esUS = "es-US",
  esMX = "es-MX",
}

export interface Requisition {
  consentInfo: ConsentInfo;
  childRequisitions: ChildRequisition[];
  selectedChildRequisition: ChildRequisition;
  jobDescription: any;
  availableShifts: AvailableShifts;
  selectedLocations: SelectedLocations[];
  nheTimeSlots: NHETimeSlot[];
}

export type NHETimeSlot = NHETimeSlotUS | NHETimeSlotUK;

export interface NHETimeSlotUS {
  timeSlotId: string;
  startTime: string;
  endTime: string;
  location: NheTimeSlotLocation;
  timezone: string;
  availableResources: number;
  appointmentsBooked: number;
  recruitingEventId: string;
  timeRange: string;
  date: string;
  dateWithoutFormat: string;
  childRequisitionId: string;
  nheSource: string;
  spokenLanguageAlternatives: string[];
}

export interface NHETimeSlotUK {
  nheDirect?: boolean;
  title: string;
  details?: string;
  address?: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  venueId?: string;
  venueName?: string;
  timeSlotLengthInMinutes: number;
  timeZone?: string;
  startTimestamp?: number;
  endTimestamp?: number;
  timeSlotId: string;
  date: string;
  startTime: string;
  endTime: string;
  hireStartDate?: string;
  contingencyTat?: string;
}

export interface NheTimeSlotLocation {
  city: string;
  country: string;
  postalCode: string;
  streetAddress: string;
  state: string;
}

export interface SelectedLocations {
  label: string;
  checked: boolean;
  value: string;
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

export interface ChildRequisition {
  requisitionId: string;
  requisitionTitle: string;
  requisitionStatus: string;
  parentRequisitionId: string;
  requisitionFunction: string;
  requisitionCategory: string;
  requisitionType: string;
  phoneToolTitle: string;
  panProcessing: string;
  recruiterName: string;
  postingStatus: string;
  applicationWorkflow: string;
  backgroundCheckType: string;
  isPoolingReq: boolean;
  isTemporaryReq: boolean;
  isNodeReq: boolean;
  isPAPIenabled: boolean;
  bypassDrugTest: boolean;
  isTemplate: boolean;
  isTestReq: boolean;
  showAllShifts: boolean;
  considerSimilarPositions: boolean;
  country: string;
  locationCode: string;
  locationState: string;
  locationCity: string;
  locationDescription: string;
  locationPostalCode: string;
  companyCode: string;
  jobCode: string;
  jobTitle: string;
  standardHours: number;
  payBasis: string;
  basePayRate: number;
  isVariableCompPayEligible: boolean;
  isStockEligible: boolean;
  questionSets: QuestionSet;
  isCentralizationEnabled: boolean;
  externalReferenceId: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModificationDate: string;
  isCandidatePreferencesEnabled: boolean;
  isCandidateNHEPreferencesEnabled: boolean;
  shortDescription: string;
  selected: boolean;
  imageUrl: string;
  videoUrl: string;
  posterUrl: string;
}

export interface QuestionSet {
  SHIFT_PREFERENCES: string;
  DISQUALIFICATION: string;
  DIVERSITY?: string;
  PRESCREENING: string;
  SELF_IDENTIFICATION: string;
}

export interface AvailableShifts {
  schedules: Schedules[];
  total: any;
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

export type Schedule = ScheduleUK | ScheduleUS;

export interface ScheduleUS {
  scheduleId: string;
  jobId: string;
  dataSource: string;
  language: string;
  externalJobTitle: string;
  basePay: number;
  basePayL10N: string;
  totalPayRate: number;
  currencyCode: string;
  scheduleText: string;
  hoursPerWeek: number;
  firstDayOnSite: string;
  scheduleBannerText: string;
  scheduleType: string;
  employmentType: string;
  tagLine: string;
  image: string;
  jobPreviewVideo: string;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  distance?: number;
  iconUrl: string;
  bgcVendorName: BGC_VENDOR_TYPE;
  bonusSchedule?: boolean;
  signOnBonus: number;
  briefJobDescription: string;
  jobDescription: string;
  siteId: string;
  hireStartDate: string;
  contingencyTat: number;
  signOnBonusL10N: string;
  firstDayOnSiteL10N: string;
  totalPayRateL10N: string;
  employmentTypeL10N: string;
  requiredLanguage: string[] | null;
  parsedTrainingDate: string | null;
  monthlyBasePay?: number | null;
  monthlyBasePayL10N?: string | null;
  shiftDifferential?: number;
  hoursPerWeekDecimal?: number;
  scheduleTypeL10N: string;
  geoClusterId: string;
  geoClusterName: string;
  distanceL10N: string;
  featuredSchedule?: string;
  isPrivateSchedule?: boolean;
  scheduleBusinessCategory?: string;
  scheduleBusinessCategoryL10N?: string;
  priorityRank: number;
  surgePay: number;
  financeWeekStartDate: string;
  financeWeekStartDateL10N: string;
  laborDemandAvailableCount: number;
  employeeClass?: string;
  hireEndDate: string;
}

export interface ScheduleUK {
  scheduleId: string;
  language: string;
  dataSource: string;
  geoClusterId: string;
  geoClusterName: string;
  region: string;
  zone: string;
  currencyCode: string;
  countryGroup: string;
  siteId: string;
  businessLine: string;
  address: string;
  city: string;
  county: string;
  locationCode: string;
  msa: null;
  state: string;
  postalCode: string;
  companyCode: string;
  contingencyTat: number;
  internalJobCode: string;
  internalJobTitle: string;
  basePay: number;
  signOnBonus: number;
  surgePay: number;
  basePayL10N: string;
  signOnBonusL10N: string;
  surgePayL10N: string;
  shiftDifferential: number;
  shiftDifferentialL10N: string;
  employeeClass: string;
  employmentType: string;
  employmentTypeL10N: string;
  agencyName: string;
  standardShiftCode: string;
  externalJobTitle: string;
  tagLine: string;
  jobPreviewVideo: string;
  jobDescription: string;
  detailedJobDescription: string;
  briefJobDescription: string;
  image: string;
  isPrivateSchedule: string;
  financeWeekStartDate: string;
  financeWeekEndDate: string;
  scheduleBannerText: string;
  scheduleType: string;
  phoneToolTitle: string;
  scheduleText: string;
  parsedTrainingDate: string | null;
  hoursPerWeek: number;
  hoursPerWeekL10N: string;
  hoursPerWeekDecimal: number;
  hoursPerWeekCapped: number;
  financeWeek: number;
  alpsCode: string;
  departmentCode: string;
  managerLogin: string;
  managerName: string | null;
  managerEmployeeId: string | null;
  trainingShiftCode: string | null;
  crsCode: string | null;
  nhoType: string;
  trainingDate: string;
  hireStartDate: string;
  hireEndDate: string;
  firstDayOnSite: string;
  firstDayOnSiteL10N: string;
  startTime: string;
  startTimeL10N: string;
  laborOrderId: string;
  laborDemandId: string | null;
  laborOrderCount: number;
  laborDemandCount: number;
  laborDemandOpenCount: number;
  laborDemandFillCount: number;
  laborDemandAvailableCount: number;
  laborDemandSoftMatchCount: number;
  laborDemandHardMatchCount: number;
  startDateDemandCount: number;
  startDateFillCount: number;
  startDateAvailableCount: number;
  startDateDeniedCount: number;
  cssmString: string | null;
  totalPayRate: number;
  totalPayRateL10N: string;
  requiredLanguage: string | null;
  monthlyBasePay: number | null;
  monthlyBasePayL10N: string | null;
  esl: string | null;
  iconUrl: string;
  bgcVendorName: BGC_VENDOR_TYPE;
  duration?: string | null;
}

export interface HoursPerWeek {
  maximumValue: number;
  minimumValue: number;
}

export enum APPLICATION_STEP {
  APPLICATION= "Application",
  CANDIDATE_EVALUATION = "Candidate Evaluation",
  CANDIDATE_SCHEDULE = "Candidate Schedule",
  CONTINGENT_OFFER = "Contingent Offer",
  BACKGROUND_CHECK_INFO = "Background Check Info",
  CONTINGENCY = "Contingency",
  PRE_HIRE = "Pre-Hire",
  HIRE_CONFIRMED = "Hire Confirmed"
}

export enum APPLICATION_SUB_STEP {
  // Common
  AMAZON_WITHDRAWS = "Amazon Withdraws",
  CANDIDATE_WITHDRAWS = "Candidate Withdraws",
  AMAZON_REJECTS = "Amazon Rejects",
  MERGE_DUPLICATE_APPLICATION = "Merge Duplicate Application",
  REAPPLIED_DUPLICATE = "Reapplied Duplicate",
  DUPLICATE_ACTIVE_APPLICATION = "Duplicate Active Application",
  PROCESSING_ON_ANOTHER_REQ = "Processing On Another REQ",

  // Application
  CONTACT_INFORMATION = "Contact Information",
  GENERAL_QUESTIONS = "General Questions",
  TELL_US_ABOUT_YOURSELF = "Tell Us About Yourself",
  DIVERSITY = "Diversity",
  ASSESSMENT = "Assessment",
  ASSESSMENT_PENDING = "Assessment Pending",
  REVIEW_AND_SUBMIT = "Review & Submit",
  SELF_IDENTIFICATION = "Self Identification",

  // Candidate Evaluation
  APPLIED = "Applied",
  REHIRE_ELIGIBILITY_CHECK_PENDING = "Rehire Eligibility Check Pending",
  REHIRE_ELIGIBILITY_CHECK_COMPLETE = "Rehire Eligibility Check Complete",
  NOT_ELIGIBLE_FOR_REHIRE = "Not Eligible For Rehire",
  HIGHEST = "Highest",
  HIGH = "High",
  MODERATE = "Moderate",
  LOW = "Low",

  // Contingent Offer
  INTERVIEW_PENDING = "Interview Pending",
  JOB_DESCRIPTION = "Job Description",
  WOTC_SURVEY = "WOTC Survey",
  OFFER_EXTENDED = "Offer Extended",

  // Background Check Info
  BACKGROUND_CHECK_DISCLOSURE = "Background Check Disclosure",
  BACKGROUND_CHECK_CONSENT = "Background Check Consent",
  CALIFORNIA_DISCLOSURE = "California Disclosure",
  PRIOR_CONVICTIONS = "Prior Convictions",
  PERSONAL_INFORMATION = "Personal Information",
  CANDIDATE_BGC_INFO_COMPLETE = "Candidate BGC Info Complete",

  // Contingency
  DT_BGC_INITIATED = "DT/BGC Initiated",
  BGC_PENDING = "BGC Pending",
  PREPROCESSING = "PreProcessing",
  BGC_CANCELLED = "BGC Cancelled",
  BGC_NEEDS_REVIEW = "BGC Needs Review",
  BGC_NEEDS_REVIEW_NO_NOTICE = "BGC Needs Review - No Notice",
  BGC_NOT_ADJUDICATED = "BGC Not Adjudicated",
  BGC_DELAYED_DECISION = "BGC Delayed Decision",
  DT_FAILED = "DT Failed",
  BGC_FAILED = "BGC Failed",
  BGC_AND_DT_FAILED = "BGC and DT Failed",
  BGC_PREADVERSE = "BGC Pre-Adverse",
  SEND_CONTINGENT_OFFER = "Send Contingent Offer",

  // Pre-Hire
  ERROR_PREPROCESSING = "Error: Pre-processing",
  CANDIDATE_READY_FOR_MATCHING = "Candidate Ready for Matching",
  BGC_DT_INPROGRESS = "BGC DT Inprogress",
  DRUG_TEST_RETAKE = "Drug Test Retake",
  BGC_DT_COMPLETE_RESCHEDULE = "BGC DT Complete Reschedule",
  SCHEDULE_APPOINTMENT_4 = "Schedule Appointment 4",
  CANDIDATE_MATCHED = "Candidate Matched",
  PEOPLESOFT_MANAGE_HIRE = "PeopleSoft: Manage Hire",
  INITIATE_ONBOARDING = "Initiate Onboarding",
  ERROR_INITIATE_ONBOARDING = "Error: Initiate Onboarding",
  NO_SHOW_REHIRE = "No Show - Rehire",

  // Hire Confirmed
  HIRED_DIRECT = "Hired Direct",
  HIRED_CONTINGENT = "Hired Contingent",
  HIRED_ADMIN_TERM = "Hired - Admin Term"
}

export interface ConsentsMap {
  FCRAQuestions?: Consent;
  NonFCRAQuestions?: Consent;
  LocalConsent?: Consent;
  BGCMedicalDrugTestConsent?: Consent;
}

export interface Consent {
  consentVendorType?: BGC_VENDOR_TYPE;
  isConsentDisclosureAccepted?: boolean;
  isCopyRequested?: boolean;
  acknowledgementsElectronicSignature: {
    signature: string;
    timestamp: string;
  };
}

export interface Application {
  active: boolean;
  submitted: boolean;
  applicationId: string;
  sfApplicationId: string;
  language: string;
  candidateId: string;
  sfCandidateId: string;
  candidateName: string;
  parentRequisitionId: string;
  currentState: APPLICATION_STATE;
  assessment: any;
  jobSelected: JobSelected;
  contingentOffer: ContingentOffer;
  fcraQuestions: FCRAQuestions;
  nonFcraQuestions: NonFCRAQuestions;
  consentsMap: ConsentsMap;
  nheAppointment: any;
  nhePreference: NHEPreferences;
  firstAvailableStartDate: number;
  appointmentCompleted: boolean;
  wotcScreening: any;
  rehireEligibilityAudit: string;
  step: APPLICATION_STEP;
  subStep: APPLICATION_SUB_STEP;
  bgcDisclosureFCRA: string;
  metadata: any;
  createdBy: string;
  lastModifiedBy?: any;
  creationDate: string;
  lastModificationDate?: any;
  shift: any;
  schedule: any;
  onlySeasonalShifts: boolean;
  workflowStepName: WORKFLOW_STEP_NAME;
  hasBGCCaliforniaDisclosureAcknowledged: boolean;
  jobReferral: JobReferral;
  jobScheduleSelected: JobScheduleSelected;
  dspEnabled?: boolean;
  applicationSignature: ElectronicSignature;
  additionalBackgroundInfo: AdditionalBackgroundInfoRequest;
  shiftPreference?: ShiftPreferenceData;
}

export interface JobScheduleSelected {
  jobId: string;
  scheduleId: string;
  scheduleDetails: any;
  jobScheduleSelectedTime: string;
}

export interface FCRAQuestions {
  bgcDisclosure: FCRA_DISCLOSURE_TYPE;
  bgcDisclosureEsign: ElectronicSignature;
}

export interface NonFCRAQuestions {
  requestedCopyOfBackgroundCheck: boolean;
  nonFcraAcknowledgementEsign: ElectronicSignature;
  nonFcraStateNoticeEsign: ElectronicSignature;
}

export interface ElectronicSignature {
  signature: string;
  signedDateTime: string;
}

export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}

export interface NHEPreferences {
  preferredNHEDates: string[];
  preferredNHETimeIntervals: string[];
  preferenceSelectedOn: string;
  locations: string[];
}

export interface JobSelected {
  childRequisitionId: string;
  headCountRequestId: string;
  jobSelectedOn: string;
  bgcVendorName: BGC_VENDOR_TYPE;
  shift: Shifts;
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

export interface JobReferral {
  hasReferral: boolean | JOB_REFERRAL_VALUE;
  referralInfo?: string;
}

export interface ApplicationStep {
  title: string;
  description?: string;
  titleTranslationKey: string;
  descriptionTranslationKey?: string;
  customIndex?: number;
}

export interface ScheduleSortBy {
  title: string;
  value: SCHEDULE_FILTER_TYPE;
  translationKey: string;
}

export interface DayHoursFilter {
  day: DAYS_OF_WEEK;
  isActive: boolean;
  startTime: string;
  endTime: string;
  dayTranslationKey: string;
}

export interface TimeRangeHoursData {
  time: string;
  hours: number;
}

export interface DesiredHoursPerWeek {
  title: string;
  value: DESIRED_WORK_HOURS;
  translationKey: string;
}

export interface WorkflowData {
  stepName: WORKFLOW_STEP_NAME;
  errorMessageCode: string;
}

export interface FcraDisclosureConfig {
  title: string;
  value: FCRA_DISCLOSURE_TYPE;
  titleTranslationKey: string;
}

export interface AdditionalBgcConfig {
  title: string;
  value: boolean;
  dataKey: string;
  titleTranslationKey: string;
}

export interface NonFcraESignatureAcknowledgement {
  title: string;
  translationKey: string;
  dataKeyDependency?: string;
  dependencyValue?: BACKGROUND_AGENT;
}

export interface StateSpecificNotice {
  noticeText: string;
  noticeTranslationKey: string;
  dataKeyDependency?: string;
  dependencyValue?: BACKGROUND_AGENT;
}

export interface FormInputItem {
  labelText: string;
  dataKey: string;
  type: string;
  defaultValue?: string;
  selectOptions?: any[] | i18nSelectOption[] | StateSelectOption[]; // TODO unify these two types into one
  required?: boolean;
  regex?: string | RegExp;
  id: string;
  errorMessage?: string;
  name?: string;
  inputType?: string;
  toolTipText?: string;
  hasError?: boolean;
  edited?: boolean;
  labelTranslationKey?: string;
  placeholder?: string;
  placeholderTranslationKey?: string;
  errorMessageTranslationKey?: string;
  secondaryLabelText?: string;
  secondaryLabelTranslationKey?: string;
}

export interface FormDateInputItem extends FormInputItem {
  maxYear: number;
  minYear: number;
}

export interface BgcStepConfig {
  completedSteps: BGC_STEPS[];
  [BGC_STEPS.ADDITIONAL_BGC]: InfoCardStepStatus;
  [BGC_STEPS.FCRA]: InfoCardStepStatus;
  [BGC_STEPS.NON_FCRA]: InfoCardStepStatus;
}

export interface BgcMXStepConfig {
  completedSteps: BGC_STEPS[];
  [BGC_STEPS.ADDITIONAL_BGC]: InfoCardStepStatus;
  [BGC_STEPS.NON_FCRA]: InfoCardStepStatus;
}

export type BgcStepConfigType = BgcStepConfig | BgcMXStepConfig

type SelfIdentificationStepType = {[key in SELF_IDENTIFICATION_STEPS]: InfoCardStepStatus};

export interface SelfIdentificationConfig extends Partial<SelfIdentificationStepType> {
  completedSteps: SELF_IDENTIFICATION_STEPS[];
}

export type InfoCardStepConfig = BgcStepConfig & SelfIdentificationConfig;

export interface ScheduleStateFilters {
  sortKey: SCHEDULE_FILTER_TYPE;
  maxHoursPerWeek: string;
  daysHoursFilter: DayHoursFilter[];
  startDateBegin?: string;
  startDateEnd?: string;
  city?: string[];
};

export interface Assessment {
  assessmentExpireDateTime: string | null;
  assessmentInitiationDateTime: string | null;
  assessmentOrderId: string;
  assessmentPackageId: string;
  assessmentScore: string | null;
  assessmentStatus: string;
  assessmentStatusDateTime: string;
  assessmentType: string;
  assessmentUrl: string;
};

export interface Candidate {
  candidateId: string;
  candidateSFId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nameSuffix: string;
  address: Address;
  timezone: string;
  emailId: string;
  language: string;
  preferredFirstName?: string;
  preferredLastName?: string;
  preferredMiddleName?: string;
  preferredPhoneType?: string;
  phoneNumber: string;
  phoneCountryCode: string;
  homePhoneNumber: string;
  homePhoneCountryCode: string;
  alternatePhoneNumber: string;
  alternatePhoneCountryCode: string;
  selfIdentificationInfo: SelfIdentificationInfo;
  employmentInfo: EmploymentInfo;
  additionalBackgroundInfo: AdditionalBackgroundInfoRequest;
  metadata: any;
  locale: string;
  isAgencyUser: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSFUser: boolean;
  isAgreeToCommunication: boolean;
  isDuplicateSSN: boolean;
  socialSecurityNumber: string;
  numSSNEdits: number;
  assessmentsTaken: Record<string, Assessment>;
};

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  countryCode: string;
}

export interface EmploymentInfo {
  employeeId: string;
  employeeType: string;
  rehireEligibilityStatus: string;
  rehireLocation: string;
  rehireOverride: string;
  startDate: string;
  managerLogin: string;
  department: string;
  shiftCode: string;
  agencyName: string;
}

export interface AdditionalBackgroundInfoRequest {
  hasCriminalRecordWithinSevenYears: boolean;
  hasPreviouslyWorkedAtAmazon: boolean;
  mostRecentBuildingWorkedAtAmazon: string;
  mostRecentTimePeriodWorkedAtAmazon: string;
  previousLegalNames: string[];
  governmentIdType: string;
  idNumber: string;
  dateOfBirth: string;
  address: Address;
  convictionDetails: string;
  isWithoutSSN: boolean;
}

export interface SelfIdentificationInfo {
  [key: string]: string | undefined;
  highestDegree: string;
  nationalId: string;
  nationalIdType: string;
  citizenship: string;
  driverLicence: string;
  gender: string;
  ethnicity: string;
  ethnicitySubGroup: string;
  ethnicityOther: string;
  militarySpouse: string;
  veteran: string;
  protectedVeteran: string;
  disability: string;
  disabilityDate: string;
  religion: string;
  otherReligion: string;
  sexualOrientation: string;
  pronoun?: string;
}

export interface CandidatePatchRequest {
  additionalBackgroundInfo?: Partial<AdditionalBackgroundInfoRequest>;
}

export interface CandidateInfoErrorState {
  [key: string]: boolean;
}

export interface InfoCardStepStatus {
  status: INFO_CARD_STEP_STATUS;
  editMode: boolean;
}

export interface NonFcraFormErrorStatus {
  hasError: boolean;
  ackESignHasError: boolean;
  noticeESignHasError?: boolean;
  mismatchError?: boolean;
}
export interface GetNheTimeSlotRequestDs {
  requisitionServiceScheduleDetails: {
    scheduleId: string;
    locationCode: string;
    hireStartDate: string;
    contingencyTurnAroundDays: number | null;
  };
}

export interface GetNheTimeSlotRequestThroughNheDS_US {
  locationCode: string;
  applicationId: string;
}

export interface GetNheTimeSlotRequestThroughNheDS_UK {
  endDate: string;
  locale: string;
  siteId: string;
  startDate: string;
}

export type GetNheTimeSlotRequestThroughNheDS = GetNheTimeSlotRequestThroughNheDS_UK | GetNheTimeSlotRequestThroughNheDS_US;
export interface DetailedRadioButtonItem {
  title: string;
  titleTranslationKey: string;
  value: string;
  details?: string;
  detailsTranslationKey?: string;
}

export interface SelfIdentificationVeteranStatus {
  veteran: string;
  protectedVeteran: string;
  militarySpouse: string;
}

export interface SelfIdEqualOpportunityStatus {
  gender: string;
  ethnicity: string;
  pronoun?: string;
}

export interface SelfIdentificationDisabilityStatus {
  disability: string;
}

export interface DisabilityItem {
  title: string;
  translationKeyTitle: string;
}

export interface AlertMessage {
  title: string;
  isDismissible?: boolean;
  type: MessageBannerType;
  visible: boolean;
  dismissTime?: number;
}

export type InputType = "number" | "text" | "tel" | "url" | "email" | "password" | undefined;

export type i18nSelectOption = {
  showValue: string;
  value: string;
  translationKey: string;
  countryCode?: string;
}

export type StateSelectOption = {
  displayValue: string;
  value: string;
  translationKey: string;
  code?: string;
}

export interface ErrorMessage {
  translationKey: string;
  value: string;
}

export interface ApiErrorMessage extends ErrorMessage{
}

export interface UpdateWotcStatusRequest {
  applicationId: string;
  candidateId: string;
  status: string;
}

export type FeatureFlag = {
  isAvailable: boolean;
}

export type FeatureFlagsMapByCountry = {
  [country: string]: {
    isAvailable: boolean;
    jobIdAllowList?: string;
  };
}

export type FeatureFlagList = {
  [key in FEATURE_FLAG]: FeatureFlag | FeatureFlagsMapByCountry;
};

export interface CompleteTaskRequest {
  action: string;
  applicationId: string;
  candidateId: string;
  currentWorkflowStep: string;
  employmentType: string;
  eventSource: string;
  isCsDomain: boolean;
  jobId: string;
  jobSelectedOn: string;
  requisitionId: string;
  state: string;
  workflowStepName: string;
}

export interface IsPageMetricsUpdated {
  [key: string]: boolean;
}

export interface localeToLanguageItem {
  translationKey: string;
  language: string;
  locale: Locale;
}

export interface ValidateAmazonLoginIDRequest {
  loginId: string;
}

export interface DetailedRadioErrorType {
  errorMessage?: string;
  errorMessageTranslationKey?: string;
}

export interface ShiftPreferenceWorkHour {
  minimumValue: number;
  maximumValue: number;
}

export interface ShiftPreferenceWorkHourConfig {
  displayValue: string;
  translationKey: string;
  value: ShiftPreferenceWorkHour;
}

export interface ShiftPreferenceWeekDaysConfig {
  displayValue: string;
  translationKey: string;
  value: string;
}

export interface ShiftPreferenceShiftPatternConfig {
  displayValue: string;
  translationKey: string;
  value: string;
}

export interface ShiftPreferenceData {
  candidateTimezone: string;
  daysOfWeek: DAYS_OF_WEEK[];
  hoursPerWeek: ShiftPreferenceWorkHour[];
  earliestStartDate: string;
  jobRoles: string[];
  locations?: string[];
  shiftTimePattern: SHIFT_PATTERN;
  hoursPerWeekStrList: string[];
  shiftTimeIntervals?: string;
  preferenceSelectedOn?: string;

}
export interface ShiftPreferenceRequest {
  shiftPreference: {
    candidateTimezone: string;
    daysOfWeek: DAYS_OF_WEEK[];
    hoursPerWeek: ShiftPreferenceWorkHour[];
    earliestStartDate: string;
    jobRoles: string[];
    city?: string[];
    shiftTimePattern: SHIFT_PATTERN;
  };
  type: UPDATE_APPLICATION_API_TYPE;
}

export interface PossibleTimeSlotConfig {
  from: string;
  to: string;
}
export interface PossibleNhePreferenceItem {
  label: string;
  value: PossibleTimeSlotConfig | string;
  checked: boolean;
}

export interface PossibleNhePreferenceConfig {
  dates: PossibleNhePreferenceItem[];
  timeslots: PossibleNhePreferenceItem[];
  cityPass: PossibleNhePreferenceItem[];
}

export interface SavePossibleNhePreferenceRequest {
  possibleNHEDates: PossibleNhePreferenceItem[];
  possibleNHETimeSlots: PossibleNhePreferenceItem[];
  possibleCities: PossibleNhePreferenceItem[];
}
export interface GetPossibleNhePreferenceRequest {
  applicationId: string;
  scheduleId: string;
}
export interface GetAssessmentElegibilityRequest {
  applicationId: Application["applicationId"];
  candidateId: Candidate["candidateId"];
  jobId?: Job["jobId"];
  requisitionId?: string;
}
export interface GetAssessmentElegibilitySucccessResponse {
  assessmentElegibility: boolean;
}
