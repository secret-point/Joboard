import { AxiosError } from "axios";
import {
  ASSESSMENT_ELIGIBILITY_ERROR_CODE,
  CREATE_APPLICATION_ERROR_CODE,
  GET_APPLICATION_ERROR_CODE,
  GET_JOB_INFO_ERROR_CODE,
  GET_NHE_TIME_SLOT_LIST_ERROR_CODE,
  GET_SCHEDULE_DETAIL_ERROR_CODE,
  GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE,
  UPDATE_APPLICATION_ERROR_CODE,
  UPDATE_WORKFLOW_NAME_ERROR_CODE,
  UPDATE_WOTC_STATUS_ERROR_CODE,
  VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE,
  WITHDRAW_APPLICATION_ERROR_CODE
} from "../enums/common";
import { Application, Candidate, Job, NHETimeSlot, PossibleNhePreferenceConfig, Schedule } from "../types/common";

export interface CreateApplicationResponse {
  data: Application;
  error: string;
  errorCode: CREATE_APPLICATION_ERROR_CODE;
}

export interface GetAssessmentElegibilityResponse {
  data: any;
  error: string;
  errorCode: ASSESSMENT_ELIGIBILITY_ERROR_CODE;
}

export interface GetApplicationResponse {
  data: Application;
  error: string;
  errorCode: GET_APPLICATION_ERROR_CODE;
}

export interface WithdrawMultipleApplicationResponse {
  data: Application[];
  error: string;
  errorCode: WITHDRAW_APPLICATION_ERROR_CODE;
}

export interface GetApplicationListResponse {
  data: Application[];
  error: string;
  errorCode: GET_APPLICATION_ERROR_CODE;
}
export interface UpdateApplicationResponse {
  data: Application;
  error: string;
  errorCode: UPDATE_APPLICATION_ERROR_CODE;
}

export interface UpdateWorkflowNameResponse {
  data: Application;
  error: string;
  errorCode: UPDATE_WORKFLOW_NAME_ERROR_CODE;
}

export interface ProxyApiError {
  errorCode: string;
  errorMessage?: string;
  
}
export interface ApiError extends ProxyApiError, AxiosError {}

export interface GetJobInfoResponse {
  data: Job;
  error: string;
  errorCode: GET_JOB_INFO_ERROR_CODE;
}

export interface GetScheduleData {
  availableSchedules: {
    total: number;
    schedules: Schedule[];
  };
  pageFactor: number;
}

export interface GetScheduleListResponse {
  data: GetScheduleData;
  error: string;
  errorCode: GET_SCHEDULE_LIST_BY_JOB_ID_ERROR_CODE;
}

export interface GetNheTimeSlotsDsResponse {
  data: NHETimeSlot[];
  error: string;
  errorCode: GET_NHE_TIME_SLOT_LIST_ERROR_CODE;
}

export interface GetScheduleDetailResponse {
  data: Schedule;
  error: string;
  errorCode: GET_SCHEDULE_DETAIL_ERROR_CODE;
}

export interface GetCandidateResponse {
  data: Candidate;
  error: string;
  errorCode: GET_SCHEDULE_DETAIL_ERROR_CODE;
}

export interface UpdateWotcStatusResponse {
  data: any;
  error: string;
  errorCode: UPDATE_WOTC_STATUS_ERROR_CODE;
}

export interface ValidateamazonLoginIDResponse {
  data: any;
  error: string;
  errorCode: VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE;
}

export interface GetPossibleNhePreferenceResponse {
  data: PossibleNhePreferenceConfig;
  error: string;
  errorCode: any;
}
