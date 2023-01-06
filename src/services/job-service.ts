import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";
import { AvailableFilter } from "../@types/IPayload";
import { GetScheduleListByJobIdRequest } from "../utils/apiTypes";
import { getLocale } from "../utils/helper";

export default class JobService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosHelper("/api/job", { "Cache-Control": "no-cache" });
  }

  async getJobInfo( jobId: string ) {
    const response = await this.axiosInstance.get(`/${jobId}`, {
      params: { locale: getLocale() }
    });
    return response.data;
  }

  async getScheduleDetailByScheduleId( scheduleId: string ) {
    const response = await this.axiosInstance.get(`/get-schedule-details/${scheduleId}`, {
      params: { locale: getLocale() }
    });
    return response.data;
  }

  async getAllSchedulesWithStartDateAvailability( { jobId, applicationId, filter, }: GetAllAvailableScheduleParams ) {
    const response = await this.axiosInstance.post(`/get-all-schedules-with-start-date-availability/${jobId}`, {
      jobId,
      applicationId,
      filter,
      locale: getLocale()
    });
    return response.data;
  }

  async getAllSchedules( request: GetScheduleListByJobIdRequest ) {
    const { jobId, applicationId, locale, filter } = request;

    const response = await this.axiosInstance.post(`/get-all-schedules/${jobId}`, {
      jobId,
      applicationId,
      filter,
      locale: locale || getLocale()
    });
    return response.data;
  }
}

export interface GetAllAvailableScheduleParams {
  jobId: string;
  applicationId?: string;
  filter?: AvailableFilter;
}
