import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";
import { GetNheTimeSlotRequestThroughNheDS } from "../utils/types/common";

export default class NheService {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axiosHelper("/api/nhe", { "Cache-Control": "no-cache" });
    }

    async availableTimeSlots(payload: GetNheTimeSlotRequestThroughNheDS) {
        const response = await this.axiosInstance.post(`/available-time-slots`, payload);

        return response.data;
    }
}
