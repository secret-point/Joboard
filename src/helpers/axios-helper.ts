import axios from "axios";
import isNull from "lodash/isNull";
import { pathByDomain, redirectToLoginCSDS } from "./utils";

export const getAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
};

const isHandlerEnabled = (config: any) => {
  return config &&
    config.hasOwnProperty("handlerEnabled") &&
    !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = (request: any) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
  }
  return request;
};

const errorHandler = (error: any) => {
  console.log(error);
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }

  if (error.response && error.response.status === 401) {
    redirectToLoginCSDS();
  } else if (error.response && error.response.status === 403) {
    window.location.assign(`${pathByDomain()}/#/403`);
  }
  return Promise.reject({ ...error });
};

const successHandler = (response: any) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

export const axiosHelper = (baseUrl: string = "/api", headers: any = {}) => {
  const accessToken = getAccessToken();
  const authorizationObject: any = {};

  if (!isNull(accessToken)) {
    authorizationObject.Authorization = accessToken;
  }

  const axiosInstance = axios.create({
    baseURL: `${pathByDomain()}${baseUrl}`,
    headers: {
      ...authorizationObject,
      ...headers
    }
  });
  axiosInstance.interceptors.request.use(request => requestHandler(request));
  axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  );

  return axiosInstance;
};
