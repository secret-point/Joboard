import { axiosHelper } from "./../helpers/axios-helper";
import { AxiosInstance } from "axios";
import {
  CreateApplicationRequest,
  UpdateNonFcraRequest,
  UpdateAdditionalBackgroundInfoRequest
} from "../@types/candidate-application-service-requests";
export default class CandidateApplicationService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axiosHelper("/api/candidate-application");
  }

  async getApplication(applicationId: string) {
    const response = await this.axiosInstance.get(
      `/applications/${applicationId}`,
      {
        headers: {
          "Cache-Control": "no-cache"
        }
      }
    );
    return response.data;
  }

  async createApplication(payload: CreateApplicationRequest) {
    const response = await this.axiosInstance.post(
      "/createApplication",
      payload
    );
    return response.data;
  }

  async updateNonFcraQuestions(
    applicationId: string,
    payload: UpdateNonFcraRequest
  ) {
    const response = await this.axiosInstance.put(
      `/updateNonFcraQuestions/${applicationId}`,
      payload,
      {
        headers: {
          "Cache-Control": "no-cache"
        }
      }
    );
    return response.data;
  }

  async getCandidate() {
    const response = await this.axiosInstance.get(`/candidate`);
    return response.data;
  }

  async updateAdditionalBackgroundInfo(
    //applicationId: string,
    payload: UpdateAdditionalBackgroundInfoRequest
  ) {
    const response = await this.axiosInstance.put(
      `/updateAdditionalBackgroundInfo`,
      payload,
      {
        headers: {
          "Cache-Control": "no-cache"
        }
      }
    );
    return response.data;
  }
}
