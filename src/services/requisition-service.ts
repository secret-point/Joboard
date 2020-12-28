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

  async getPossibleNHEDates() {
    /* Simulate until real service connected */
    return {
      "data": [
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "THURSDAY",
          "era": "CE",
          "dayOfYear": 352,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 17
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "FRIDAY",
          "era": "CE",
          "dayOfYear": 353,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 18
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "SATURDAY",
          "era": "CE",
          "dayOfYear": 354,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 19
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "SUNDAY",
          "era": "CE",
          "dayOfYear": 355,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 20
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "MONDAY",
          "era": "CE",
          "dayOfYear": 356,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 21
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "TUESDAY",
          "era": "CE",
          "dayOfYear": 357,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 22
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "WEDNESDAY",
          "era": "CE",
          "dayOfYear": 358,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 23
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "THURSDAY",
          "era": "CE",
          "dayOfYear": 359,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 24
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "FRIDAY",
          "era": "CE",
          "dayOfYear": 360,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 25
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "SATURDAY",
          "era": "CE",
          "dayOfYear": 361,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 26
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "SUNDAY",
          "era": "CE",
          "dayOfYear": 362,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 27
        },
        {
          "year": 2020,
          "month": "DECEMBER",
          "chronology": {
            "calendarType": "iso8601",
            "id": "ISO"
          },
          "dayOfWeek": "MONDAY",
          "era": "CE",
          "dayOfYear": 363,
          "leapYear": true,
          "monthValue": 12,
          "dayOfMonth": 28
        }
      ],
      "errors": null
    };
  }

}
