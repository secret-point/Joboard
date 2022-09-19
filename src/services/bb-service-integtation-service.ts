import { AxiosInstance } from "axios";
import { axiosHelper } from "../helpers/axios-helper";

export default class BBServiceIntegrationService {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axiosHelper("/api/bb-service-integration", { "Cache-Control": "no-cache" });
    }

    async validateAmazonLoginId( loginId: string ) {
        const response = await this.axiosInstance.post("/validate-amazon-login-id", {
            loginId
        });
        return response.data;
    }

}