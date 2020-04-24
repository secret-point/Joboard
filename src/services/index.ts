import axios from "axios";
import PageService from "./page-service";
import ConfigService from "./config-service";

export const getInitialData = async () => {
  const pageService = new PageService();
  const configService = new ConfigService();
  const response = await axios.all([
    configService.getConfig(),
    pageService.getPageOrder()
  ]);

  return response;
};
