import { axiosHelper } from "./../helpers/axios-helper";
import { AxiosInstance } from "axios";
import {
  CreateApplicationRequest,
  UpdateApplicationRequest
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
      "/create-application",
      payload
    );
    return response.data;
  }

  async updateApplication(payload: UpdateApplicationRequest) {
    const response = await this.axiosInstance.put(
      "/update-application",
      payload
    );
    return response.data;
  }

  async getCandidate() {
    const response = await this.axiosInstance.get(`/candidate`);
    return response.data;
  }
}