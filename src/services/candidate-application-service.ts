import { AxiosInstance } from "axios";
import { ajaxHelper } from "../helpers/utils";

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
}
