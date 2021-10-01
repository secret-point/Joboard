import axios, { AxiosInstance } from "axios";
import IPageOrderResponse from "../@types/IPageOrderResponse";
import { pathByDomain } from "../helpers/utils";

export default class PageService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: pathByDomain("/api/page-config"),
      headers: {
        "Cache-Control": "no-cache"
      }
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
