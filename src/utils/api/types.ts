import { Schedule } from "../types/common";

export interface ScheduleListResponse {
    availableSchedules: {
        schedules: Schedule[]
    }
}
