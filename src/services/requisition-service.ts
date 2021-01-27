import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";
import { AvailableFilter } from "../@types/IPayload";

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

  async getChildRequisitions(
    requisitionId: string,
    getAllRequisitions?: boolean
  ) {
    let url = `/child-requisitions/${requisitionId}`;
    if (getAllRequisitions) {
      url = `${url}/${getAllRequisitions}`;
    }
    const response = await this.axiosInstance.get(url);

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

  async availableTimeSlots(payload: any) {
    const response = await this.axiosInstance.post(`/available-time-slots`, {
      ...payload
    });

    return response.data;
  }

  async getAllAvailableShifts(
    requisitionId: string,
    applicationId?: string,
    payload?: AvailableFilter
  ) {
    const response = await this.axiosInstance.post(
      `/get-all-available-shifts`,
      {
        requisitionId,
        applicationId,
        payload
      }
    );

    return response.data;
  }

  async getHeadCountRequest(hcrId: string) {
    const response = await this.axiosInstance.get(
      `/get-head-count-request/${hcrId}`
    );

    return response.data;
  }

  async getPossibleNHEDates(applicationId: string, hcrId: string) {
    const response = await this.axiosInstance.get(
      `/get-possible-nhe-dates/${applicationId}/${hcrId}`
    );

    return response.data;
  }

  async getShiftPreferenceDetails(
    applicationId: string,
    requisitionId: string
  ) {
    const response = await this.axiosInstance.get(
      `/get-shift-preference-details/${applicationId}/${requisitionId}`
    );

    return response.data;
  }
}
