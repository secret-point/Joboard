import { Application, Schedule } from "../types/common";
import {
    CREATE_APPLICATION_ERROR_CODE,
    GET_APPLICATION_ERROR_CODE,
    UPDATE_APPLICATION_ERROR_CODE,
    UPDATE_WORKFLOW_NAME_ERROR_CODE
} from "../enums/common";

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

export interface GetApplicationResponse {
    data: Application;
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
    errorCode: string
}
