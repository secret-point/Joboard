import { CheckBoxItem } from "../@types";
import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import filter from "lodash/filter";
import { Metric, MetricData, MetricsValue } from "../@types/adobe-metrics";
import propertyOf from "lodash/propertyOf";

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
  if (window.location.pathname.startsWith("/ds/")) {
    launchAuthenticationDS();
    return;
  }
  const queryParamsInSession = window.sessionStorage.getItem("query-params");
  const queryParams = queryParamsInSession
    ? JSON.parse(queryParamsInSession)
    : {};
  delete queryParams.page;
  delete queryParams.requisitionId;
  delete queryParams.applicationId;
  delete queryParams.jobId;
  const queryStr = isEmpty(queryParams)? "" :`&${queryString.stringify(queryParams)}`;
  let hash = window.location.hash.substr(2).split("/");
  const origin = window.location.origin;
  const state = window.reduxStore.getState();
  let currentPage;
  const previousPage = window.localStorage.getItem("page");
  const candidateSelfServicePage = [
      "no-shift-selected",
      "current-shift",
      "view-shift",
      "no-shift-selected-ds",
      "current-shift-ds",
      "view-shift-ds"];

  if (candidateSelfServicePage.includes(<string>previousPage)) {
    //in candidate-self-service workflow
    currentPage = previousPage;
  } else {
    currentPage = "resume-application";
  }
  let redirectUrl = origin;
  const isLegacy = checkIfIsLegacy();
  redirectUrl = `${redirectUrl}/?page=${currentPage}&${isLegacy? "requisitionId" : "jobId"}=${hash[1]}&applicationId=${hash[2]}${queryStr}`;
  if (hash.length === 4) {
    redirectUrl = `${redirectUrl}&misc=${hash[3]}`;
  }

  let url = `${
    state.app.appConfig.authenticationURL
  }/?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  window.location.assign(url);
};

export const launchAuthenticationDS = () => {
  /* Build auth URL using this URL for redirect */
  const state = window.reduxStore.getState();
  const url = `${
    state.app.appConfig.authenticationURL
  }/?redirectUrl=${encodeURIComponent(window.location.origin + window.location.pathname + window.location.search)}`;

  /* Redirect to auth */
  window.location.assign(url);
}

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

export const getCheckBoxListLabels = (items: CheckBoxItem[]): string[] => {
  return map(filter(items, { checked: true }), v => {
    return v.label;
  });
};

export const getMetricValues = (
  metricsValues: MetricsValue,
  metric: Metric,
  data: { [key: string]: string | string[] } | MetricData
) => {
  if (!isEmpty(metricsValues)) {
    for (const key in metricsValues) {
      const metricMappings = metricsValues[key];
      if (!metric[key]) {
        metric[key] = {};
      }
      metricMappings.forEach(metricMapping => {
        metric[key][metricMapping.key] = propertyOf(data)(metricMapping.value);
      });
    }
  }
  return metric;
};

export const checkIfIsLegacy = () => {
  const queryParams = queryString.parse(window.location.search);
  const isLegacy = !queryParams.jobId;
  return isLegacy;
}