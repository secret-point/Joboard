import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import isNull from "lodash/isNull";
import { ApiError } from "../utils/api/types";
import { BB_UI_VERSION, PROXY_ERROR_MESSAGE } from "../utils/enums/common";
import { log, LoggerType } from "./log-helper";
import { pathByDomain, redirectToLoginCSDS } from "./utils";
import { routeToAppPageWithPath } from "../utils/helper";
import { PAGE_ROUTES } from "../components/pageRoutes";

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

const getApiDetails = (config: AxiosRequestConfig) => {
  const { method, url, baseURL } = config;

  return `${method?.toUpperCase()} ${baseURL}${url}`;
};

export const requestHandler = (config: AxiosRequestConfig) => {
  if (isHandlerEnabled(config)) {
    // Modify request here
  }

  // add custom header to differentiate request from old BB UI and new BB UI
  config.headers["bb-ui-version"] = BB_UI_VERSION.BB_UI_NEW;

  log(`[Axios] Request (API ${getApiDetails(config)}):`, config);

  return config;
};

const getErrorCode = (error: AxiosError): string => {
  if (error.response?.data?.errorCode) {
    return error.response?.data?.errorCode;
  }
  if (error.response?.status === 401) {
    return PROXY_ERROR_MESSAGE.USER_UNAUTHORIZED;
  }
  return "API_ERROR";
};

export const errorHandler = (error: AxiosError) => {
  console.error(error);
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    log(`[Axios] Response Error: ${error.response.statusText} ${error.response.status}`, error.response, LoggerType.ERROR);

    if (error.response.status === 401) {
      log("[Axios] - Candidate not authorized, redirecting to login", error.response, LoggerType.ERROR);
      redirectToLoginCSDS();
    } else if (error.response.status === 403) {
      log("[Axios] - Access denied, redirecting to access denied page", error.response, LoggerType.ERROR);
      routeToAppPageWithPath(PAGE_ROUTES.ACCESS_DENIED);
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    log(`[Axios] Request Error: ${error.request.readyState}`, error.request, LoggerType.ERROR);
  } else {
    // Something happened in setting up the request that triggered an Error
    log(`[Axios] Error: ${error.message}`, error, LoggerType.ERROR);
  }

  return Promise.reject({
    ...error,
    // no API_ERROR in the error mapping, so they will fall back to the default error code and message
    // it's only used in logging to differentiate with the normal proxy error for now
    errorCode: getErrorCode(error),
    errorMessage: error.response?.data?.errorMessage || error.message,
  } as ApiError);
};

export const successHandler = (response: AxiosResponse) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }

  log(`[Axios] Response (API ${getApiDetails(response.config)}):`, response);
  return response;
};

export const axiosHelper = (baseUrl = "/api", headers: any = {}) => {
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
  axiosInstance.interceptors.request.use(
    request => requestHandler(request),
    error => errorHandler(error)
  );
  axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  );

  return axiosInstance;
};
