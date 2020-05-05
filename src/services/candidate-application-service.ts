import { AxiosInstance } from "axios";
import { ajaxHelper } from "../helpers/utils";
import { CreateApplicationRequest } from "../@types/candidate-application-service-requests";
export default class CandidateApplicationService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = ajaxHelper("/api/candidate-application");
  }

  async getApplication(applicationId: string) {
    const response = await this.axiosInstance.get(`/${applicationId}`, {
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    return response.data;
  }

  async createApplication(payload: CreateApplicationRequest) {
    const response = await this.axiosInstance.post(
      "/createApplication",
      payload
    );
    return response.data;
  }
}
