import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";

export default class RequisitionService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosHelper("/api/requisition", {
      "Cache-Control": "no-cache"
    });
  }

  async getDisqualifiedQuestions(requisitionId: string) {
    const response = await this.axiosInstance.get(
      `/disqualified-questions/${requisitionId}`
    );

    return response.data;
  }

  async getRequisitionHeaderInfo(requisitionId: string) {
    const response = await this.axiosInstance.get(
      `/header-info/${requisitionId}`
    );

    return response.data;
  }

  async getChildRequisitions(requisitionId: string) {
    const response = await this.axiosInstance.get(
      `/child-requisitions/${requisitionId}`
    );

    return response.data;
  }

  async getRequisition(requisitionId: string) {
    const response = await this.axiosInstance.get(`/${requisitionId}`);

    return response.data;
  }

  async getJobDescription(childRequisitionId: string) {
    const response = await this.axiosInstance.get(
      `/job-description/${childRequisitionId}`
    );

    return response.data;
  }

  async getTimeSlots(childRequisitionId: string) {
    const response = await this.axiosInstance.get(
      `/get-time-slots/${childRequisitionId}`
    );

    return response.data;
  }

  async getAllAvailableShifts(requisitionId: string) {
    const response = await this.axiosInstance.get(
      `/get-all-available-shifts/${requisitionId}`
    );

    return response.data;
  }
}
