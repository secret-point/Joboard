export interface ContingentOffer {
  offerAcceptedTime: string;
  offerAccepted: boolean;
}

export default interface ICandidateApplication {
  applicationId: string;
  sfApplicationId?: any;
  language: string;
  candidateId: string;
  sfCandidateId?: any;
  candidateName?: any;
  parentRequisitionId: string;
  currentState: string;
  assessmentUrl?: any;
  assessmentScore: number;
  contingentOffer: ContingentOffer;
  fcraQuestions?: any;
  nonFcraQuestions?: any;
  applicationSignature?: any;
  firstAvailableStartDate?: any;
  appointmentCompleted: boolean;
  rehireEligibilityAudit?: any;
  step?: any;
  subStep?: any;
  bgcDisclosureFCRA: string;
  metadata?: any;
  createdBy: string;
  lastModifiedBy?: any;
  creationDate: string;
  lastModificationDate?: any;
  submitted: boolean;
  active: boolean;
}
