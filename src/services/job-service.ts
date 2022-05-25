import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";
import { AvailableFilter, Schedule } from "../@types/IPayload";
import { GetScheduleListByJobIdRequest } from "../utils/apiTypes";

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

  async getAllSchedulesWithStartDateAvailability({
    jobId,
    applicationId,
    filter,
  } : GetAllAvailableScheduleParams) {
    console.log(
      jobId,
      applicationId,
      filter)
    const response = await this.axiosInstance.post(
        `/get-all-schedules-with-start-date-availability/${jobId}`,
        {
          jobId,
          applicationId,
          filter,
          locale: 'en-us',
        }
    );
    return response.data;
  }

    async getAllSchedules( request: GetScheduleListByJobIdRequest ) {
        const { jobId, applicationId, locale, filter } = request;

        const response = await this.axiosInstance.post(
            `/get-all-schedules/${jobId}`,
            {
                jobId,
                applicationId,
                filter,
                locale: 'en-us' //TODO to be replaced by actual Locale from Cookie when proxy started to support the new locale
            }
        );
        return response.data;
    }
}

export interface GetAllAvailableScheduleParams {
  jobId: string,
  applicationId?: string,
  filter?: AvailableFilter
}
