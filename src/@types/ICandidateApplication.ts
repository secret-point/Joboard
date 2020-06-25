import { SelfIdentificationInfo } from "./candidate-application-service-requests";

export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}

export interface JobSelected {
  childRequisitionId: string;
  headCountRequestId: string;
  jobSelectedOn: string;
}

export default interface ICandidateApplication {
  active: boolean;
  submitted: boolean;
  applicationId: string;
  sfApplicationId: string;
  language: string;
  candidateId: string;
  sfCandidateId: string;
  candidateName: string;
  parentRequisitionId: string;
  currentState: string;
  assessment: any;
  jobSelected: JobSelected;
  contingentOffer: ContingentOffer;
  fcraQuestions: any;
  nonFcraQuestions: any;
  nheAppointment: any;
  applicationSignature: any;
  firstAvailableStartDate: number;
  appointmentCompleted: boolean;
  wotcScreening: any;
  rehireEligibilityAudit: string;
  step: string;
  subStep: string;
  bgcDisclosureFCRA: string;
  metadata: any;
  createdBy: string;
  lastModifiedBy?: any;
  creationDate: string;
  lastModificationDate?: any;
  shift: any;
  onlySeasonalShifts: boolean;
}
export interface Candidate {
  candidateId: string;
  candidateSFId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nameSuffix: string;
  address: Address;
  timezone: string;
  mailId: string;
  language: string;
  preferredPhoneType: string;
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
}
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
  hasCriminalRecordWithinSevenYears: boolean | string;
  hasPreviouslyWorkedAtAmazon: boolean | string;
  mostRecentBuildingWorkedAtAmazon: string;
  mostRecentTimePeriodWorkedAtAmazon: string;
  previousLegalNames: string[];
  governmentIdType: GovernmentIdType;
  idNumber: string;
  dateOfBirth: string;
  address: Address;
}
export enum GovernmentIdType {
  DRIVERS_LICENSE = "DRIVERS_LICENSE",
  PASSPORT = "PASSPORT"
}
