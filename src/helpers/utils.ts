import queryString from "query-string";
import isEmpty from "lodash/isEmpty";

export const convertPramsToJson = (params: string) => {
  if (!isEmpty(params)) {
    return JSON.parse(
      '{"' +
        decodeURI(params.substring(1))
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } else {
    return {};
  }
};

export const launchAuthentication = () => {
  const queryParamsInSession = window.sessionStorage.getItem("query-params");
  const queryParams = queryParamsInSession
    ? JSON.parse(queryParamsInSession)
    : {};
  delete queryParams.page;
  delete queryParams.requisitionId;
  delete queryParams.applicationId;
  const queryStr = queryString.stringify(queryParams);
  let hash = window.location.hash.substr(2).split("/");
  const origin = window.location.origin;
  const state = window.reduxStore.getState();
  const currentPage = "resume-application";
  let redirectUrl = origin;
  redirectUrl = `${redirectUrl}/?page=${currentPage}&requisitionId=${hash[1]}&applicationId=${hash[2]}&${queryStr}`;
  if (hash.length === 4) {
    redirectUrl = `${redirectUrl}&misc=${hash[3]}`;
  }

  let url = `${
    state.app.appConfig.authenticationURL
  }/?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  window.location.assign(url);
};

export const isJson = (obj: string) => {
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }
  return true;
};

export const objectToQuerystring = (obj: any) => {
  return Object.keys(obj).reduce((str: string, key: string, i: number) => {
    let delimiter, val;
    delimiter = i === 0 ? "?" : "&";
    key = encodeURIComponent(key);
    val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, "=", val].join("");
  }, "");
};
