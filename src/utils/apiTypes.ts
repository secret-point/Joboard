import { AvailableFilter, Locale } from "./types/common";
import { WORKFLOW_STEP_NAME } from "./enums/common";

export interface GetJobDetailRequest {
  locale: Locale;
  jobId: string;
}

export interface GetApplicationRequest {
  locale: Locale;
  applicationId: string;
}

export interface GetApplicationListRequest {
  status: string;
  candidateId: string;
}

export interface GetRequisitionRequest {
  requisitionId: string;
}

export interface GetScheduleListByJobIdRequest {
  locale: Locale;
  jobId: string;
  applicationId: string;
  filter?: AvailableFilter;
}

export interface GetScheduleDetailRequest {
  locale: Locale;
  scheduleId: string;
}
export interface CreateApplicationRequestDS {
  jobId: string;
  scheduleId?: string;
  dspEnabled?: boolean | null;
}

export interface CreateApplicationResponseDS {
  applicationId: string;
}

export interface CreateApplicationAndSkipScheduleRequestDS {
  jobId: string;
  dspEnabled?: boolean | null;
  // No schedule Id needed for create application. Will fail make BB backend skip reserving schedule in NHE.
}

export interface UpdateApplicationRequestDS {
  applicationId: string;
  payload: any;
  type: string;
  isCsRequest?: boolean;
  dspEnabled?: boolean;
}

export interface UpdateWorkflowNameRequest {
  applicationId: string;
  workflowStepName: WORKFLOW_STEP_NAME;
}

export interface SelectedScheduleForUpdateApplication {
  jobId: string;
  scheduleDetails: string;
  scheduleId: string;
  jobScheduleSelectedTime?: string;
}
