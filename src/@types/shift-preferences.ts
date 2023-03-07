import { DAYS_OF_WEEK, SHIFT_PATTERN } from "../utils/enums/common";

export interface QuestionSet {
  SHIFT_PREFERENCES: string;
  DISQUALIFICATION: string;
  DIVERSITY?: string;
  PRESCREENING: string;
  SELF_IDENTIFICATION: string;
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

export interface ShiftDay {
  label: string;
  checked: boolean;
  value: string;
}

export interface ShiftTimeInterval {
  from: string;
  to: string;
}

export interface ShiftTiming {
  label: string;
  checked: boolean;
  value: ShiftTimeInterval;
}

export interface HoursPerWeekValue {
  maximumValue: number;
  minimumValue: number;
}

export interface ShiftHour {
  label: string;
  checked: boolean;
  value: HoursPerWeekValue;
}

export interface Location {
  label: string;
  checked: boolean;
  value: string;
}

export interface ShiftPreferenceResponse {
  childRequisitions: ChildRequisition[];
  shiftDays: ShiftDay[];
  shiftTimings: ShiftTiming[];
  shiftHours: ShiftHour[];
  locations: Location[];
}

// Old, on a deprecation path, stored inside the application object
export interface ShiftPreference {
  jobRoles?: string[];
  locations?: string[];
  hoursPerWeek?: HoursPerWeekValue[];
  daysOfWeek?: string[];
  shiftTimeIntervals?: ShiftTimeInterval[];
  candidateTimezone?: string;
  preferenceSelectedOn?: string;
}

// New, stored inside candidate object
export interface ShiftPreferences {
  earliestStartDate: string;
  preferredDaysToWork: DAYS_OF_WEEK[];
  hoursPerWeek: { maximumValue: number; minimumValue: number }[];
  shiftTimePattern: SHIFT_PATTERN;
}
