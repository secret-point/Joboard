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
