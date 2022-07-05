import { axiosHelper } from "./../helpers/axios-helper";
import { AxiosInstance } from "axios";
import {
  CreateApplicationRequest,
  CreateApplicationRequestDS,
  UpdateApplicationRequest
} from "../@types/candidate-application-service-requests";
import { Application } from "../utils/types/common";
import { CreateApplicationResponse } from "../utils/api/types";

export default class CandidateApplicationService {

  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosHelper("/api/candidate-application");
  }

  async getApplication( applicationId: string ) {
    const response = await this.axiosInstance.get(`/applications/${applicationId}`, {
          headers: {
            "Cache-Control": "no-cache"
          }
        }
    );
    return response.data;
  }

  async createApplication( payload: CreateApplicationRequest ) {
    const response = await this.axiosInstance.post("/create-application", payload);
    return response.data;
  }

  async createApplicationDS( payload: CreateApplicationRequestDS ): Promise<CreateApplicationResponse> {
    const response = await this.axiosInstance.post("/ds/create-application/", payload);
    return response.data;
  }

  async updateApplication( payload: UpdateApplicationRequest ) {
    const response = await this.axiosInstance.put("/update-application", payload);
    return response.data;
  }

  async getCandidate() {
    const response = await this.axiosInstance.get(`/candidate`);
    return response.data;
  }

  async terminateApplication( applicationId: string, state: string ) {
    const response = await this.axiosInstance.put(`/terminate-application/${applicationId}/${state}`);
    return response.data;
  }

  async updateWOTCStatus( applicationId: string, candidateId: string, status: string ) {
    await this.axiosInstance.put(`/update-wotc-status`, { applicationId, candidateId, status });
    return await this.getApplication(applicationId);
  }

  async updateWorkflowStepName( applicationId: string, workflowStepName: string ) {
    const response = await this.axiosInstance.put(`/update-workflow-step-name`, { applicationId, workflowStepName });
    return response.data;
  }

  async getApplicationSelfServiceDS( applicationId: string ) {
    const response = await this.axiosInstance.get(`/applications/reserved/${applicationId}`, {
      headers: { "Cache-Control": "no-cache" }
    });
    return response.data;
  }
}
