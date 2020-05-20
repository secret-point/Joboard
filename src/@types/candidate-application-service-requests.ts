export interface CreateApplicationRequest {
  candidateId: string;
  parentRequisitionId: string;
  language: string;
}

export interface UpdateApplicationRequest {
  applicationId: string;
  payload: any;
  type: string;
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
