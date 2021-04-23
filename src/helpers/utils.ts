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
  let currentPage;
  const previousPage = window.localStorage.getItem("page");
  if (previousPage === "no-shift-selected" || previousPage === "current-shift") {
    //in candidate-self-service workflow
    currentPage = previousPage;
  } else {
    currentPage = "resume-application";
  }
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
