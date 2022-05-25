import { Locale } from "./commonTypes";

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