import { Locale } from "./types/common";
import { AvailableFilter } from "../@types/IPayload";

export interface GetJobDetailRequest {
    locale: Locale;
    jobId: string;
}

export interface GetApplicationRequest {
    locale: Locale;
    applicationId: string;
}

export interface GetRequisitionRequest {
    requisitionId: string;
}

export interface GetScheduleListByJobIdRequest {
    locale: Locale,
    jobId: string,
    applicationId: string,
    filter?: AvailableFilter
}

export interface GetScheduleDetailRequest {
    locale: Locale,
    scheduleId: string
}
export interface CreateApplicationRequestDS {
    jobId: string;
    scheduleId?: string;
    dspEnabled?: boolean | null;
}

export interface CreateApplicationResponseDS {
    applicationId: string;
}
