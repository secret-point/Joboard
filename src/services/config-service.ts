import axios from "axios";
import Axios, { AxiosInstance } from "axios";
import { pathByDomain } from "../helpers/utils";

export default class ConfigService {
  readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${pathByDomain()}/api/config` });
  }

  async getConfig(): Promise<any> {
    const response = await this.axiosInstance.get("/");

    return response.data;
  }

  async getCountryStateList(): Promise<any> {
    const response = await Axios.get("https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/state-country-list.json");

    return response.data;
  }
}
