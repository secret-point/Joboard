import { axiosHelper } from "./../helpers/axios-helper";
import { AxiosInstance } from "axios";
import {
  CreateApplicationRequest,
  CreateApplicationRequestDS,
  UpdateApplicationRequest
} from "../@types/candidate-application-service-requests";
import { CreateApplicationResponse } from "../utils/api/types";
import { GetApplicationListRequest } from "../utils/apiTypes";
import { Application, GetAssessmentElegibilityRequest } from "../utils/types/common";

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

  async createApplicationDS(
    payload: CreateApplicationRequestDS
  ): Promise<CreateApplicationResponse> {
    const response = await this.axiosInstance.post(
      "/ds/create-application/",
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
    const response = await this.axiosInstance.get("/candidate");
    return response.data;
  }

  async terminateApplication(applicationId: string, state: string) {
    const response = await this.axiosInstance.put(
      `/terminate-application/${applicationId}/${state}`
    );
    return response.data;
  }

  async updateWOTCStatus(
    applicationId: string,
    candidateId: string,
    status: string
  ) {
    const response = await this.axiosInstance.put("/update-wotc-status", {
      applicationId,
      candidateId,
      status
    });
    return response.data;
  }

  async updateWorkflowStepName(
    applicationId: string,
    workflowStepName: string
  ) {
    const response = await this.axiosInstance.put(
      "/update-workflow-step-name",
      { applicationId, workflowStepName }
    );
    return response.data;
  }

  async getApplicationSelfServiceDS(applicationId: string) {
    const response = await this.axiosInstance.get(
      `/applications/reserved/${applicationId}`,
      {
        headers: { "Cache-Control": "no-cache" }
      }
    );
    return response.data;
  }

  async getAssessmentEligibility(payload: GetAssessmentElegibilityRequest) {

    const response = await this.axiosInstance.post(
      "/assessment-eligibility",
      payload
    );

    return response.data;
  }

  async getCandidateApplicationList(request: GetApplicationListRequest) {
    const { candidateId, status = "active" } = request;
    const pageSize = 25;
    const startPage = 1;
    const fetchPage = async (page: number) => {
      try {
        const response = await this.axiosInstance.get(
          `/applications?candidateId=${candidateId}&status=${status}&pageSize=${pageSize}&page=${page}`,
          {
            headers: {
              "Cache-Control": "no-cache"
            }
          }
        );

        return response.data;
      } catch (err) {
        console.error("error response", err);
        return err;
      }
    };

    let candidateApplications = [] as any[];
    const responseData = await fetchPage(startPage);
    const initialData = responseData.data;
    const appList = initialData.items || [];
    candidateApplications = [...candidateApplications, ...appList];

    const { totalPages } = initialData;

    for (let page = initialData.page + 1; page <= totalPages; page++) {
      const tempData = await fetchPage(page);
      const { data } = tempData;

      candidateApplications = [...candidateApplications, ...data.items];
    }

    return {
      data: candidateApplications
    };
  }

  async withdrawMultipleApplication(applicationList: Application[]) {
    const withdrawnApps: Application[] = [];
    try {
      for (const application of applicationList) {
        const response = await this.axiosInstance.put(
          `/withdraw-application/${application.applicationId}`
        );

        if (response.data.errorCode || !response.data.data) {
          return response.data;
        }
        withdrawnApps.push(response.data.data);
      }
    } catch (err) {
      console.error("error response", err);
      return err;
    }

    return {
      data: withdrawnApps
    };
  }
}
