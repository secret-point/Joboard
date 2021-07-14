import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";
import { AvailableFilter } from "../@types/IPayload";

export default class JobService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosHelper("/api/job", {
      "Cache-Control": "no-cache"
    });
  }

  async getJobInfo(jobId: string) {
    const response = await this.axiosInstance.get(
    `/${jobId}`
    );

    return response.data;
  }

  async getScheduleDetailByScheduleId(scheduleId: string) {
    const response = await this.axiosInstance.get(`/get-schedule-details/${scheduleId}`);

    return response.data;
  }

  async getAllSchedules({
    jobId,
    applicationId,
    filter,
  } : GetAllAvailableScheduleParams) {
    console.log(
      jobId,
      applicationId,
      filter)
    const response = await this.axiosInstance.post(
        `/get-all-schedules/${jobId}`,
        {
          jobId,
          applicationId,
          filter,
          locale: 'en-us',
        }
    );
    console.log(response.data);
    return response.data;
  }
}

export interface GetAllAvailableScheduleParams {
  jobId: string,
  applicationId?: string,
  filter?: AvailableFilter
}