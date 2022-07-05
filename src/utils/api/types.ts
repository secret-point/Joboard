import { Application, Schedule } from "../types/common";
import { CREATE_APPLICATION_ERROR_CODE } from "../enums/common";

export interface ScheduleListResponse {
    availableSchedules: {
        schedules: Schedule[]
    }
}

export interface CreateApplicationResponse {
    data: Application;
    error: string;
    errorCode: CREATE_APPLICATION_ERROR_CODE;
}

export interface ProxyApiError {
    errorCode: string
}
