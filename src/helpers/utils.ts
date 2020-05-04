import axios from "axios";
import isNull from "lodash/isNull";

export const getAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
};

export const ajaxHelper = (baseUrl: string = "/api") => {
  const accessToken = getAccessToken();
  const authorizationObject: any = {};

  if (!isNull(accessToken)) {
    authorizationObject.Authorization = accessToken;
  }

  return axios.create({
    baseURL: baseUrl,
    headers: {
      ...authorizationObject
    }
  });
};
