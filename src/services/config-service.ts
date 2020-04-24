import axios, { AxiosInstance } from "axios";

export default class ConfigService {
  readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api/config"
    });
  }

  async getConfig(): Promise<any> {
    const response = await this.axiosInstance.get("/");
    return response.data;
  }
}
