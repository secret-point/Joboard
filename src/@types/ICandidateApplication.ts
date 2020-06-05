export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
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
  jobSelected: any;
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
