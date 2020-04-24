import axios, { AxiosInstance } from "axios";
import IPageOrderResponse from "../@types/IPageOrderResponse";

export default class PageService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api/page-config"
    });
  }

  async getPageOrder(): Promise<IPageOrderResponse> {
    const response = await this.axiosInstance.get("/page-orders");
    return response.data;
  }

  async getPageConfigWithPath(pageName: String): Promise<any> {
    const response = await this.axiosInstance.get("/" + pageName);
    return response.data;
  }

  async getPageConfig(configPath?: string) {
    if (!configPath) {
      configPath = "ConsentPage.json";
    }
    const response = await this.getPageConfigWithPath(configPath);

    return {
      pageConfig: response
    };
  }
}
