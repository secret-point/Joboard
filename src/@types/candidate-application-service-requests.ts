export interface CreateApplicationRequest {
  candidateId: string;
  parentRequisitionId: string;
  language: string;
  candidateEmail: string;
  candidateMobile: string;
  sfCandidateId: string;
}

export interface CreateApplicationRequestDS {
  jobId: string;
  scheduleId?: string;
  dspEnabled?: boolean | null;
}

export interface CreateApplicationResponseDS {
  applicationId: string;
}

export interface UpdateApplicationRequest {
  applicationId: string;
  payload: any;
  type: string;
  isCsRequest?: boolean;
  dspEnabled?: boolean;
}
export interface UpdateContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}
export interface SelfIdentificationInfo {
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
}

export interface GetAssessmentElegibilityResponse {
  assessmentEligibility: boolean;
}
