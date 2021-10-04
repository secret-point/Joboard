import { CheckBoxItem } from "../@types";
import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import filter from "lodash/filter";
import { Metric, MetricData, MetricsValue } from "../@types/adobe-metrics";
import propertyOf from "lodash/propertyOf";
import { CS_DOMAIN_LIST } from "../constants";
import { isArray } from "lodash";

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
  redirectUrl = `${redirectUrl}${pathByDomain()}/?page=${currentPage}&${isLegacy? "requisitionId" : "jobId"}=${hash[1]}&applicationId=${hash[2]}${queryStr}`;
  if (hash.length === 4) {
    redirectUrl = `${redirectUrl}&misc=${hash[3]}`;
  }

  let queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');

  let url = `${state.app.appConfig.CSDomain}/app${queryStringFor3rdParty}#/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
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

export const checkIfIsLegacy = () => {
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
  const isLegacy = !queryParams.jobId;
  return isLegacy;
}

export const checkIfIsCSRequest = () => {
  const origin = window.location.origin;
  const isCSRequest = CS_DOMAIN_LIST.includes(origin);
  return isCSRequest;
}

export const pathByDomain = () => {
  const csPath = checkIfIsCSRequest()? "/application" : "";
  return csPath
}

export const NonDGSCandidateSelfServicePage = [
  "no-shift-selected",
  "current-shift",
  "view-shift",
  "update-shift",
  "update-shift-confirmation",
  "update-shift-success",
  "cancel-shift-confirmation",
  "cancel-shift-success"
];

export const DGSCandidateSelfServicePage = [
  "no-shift-selected-ds",
  "current-shift-ds",
  "view-shift-ds",
  "update-shift-ds",
  "update-shift-confirmation-ds",
  "update-shift-success-ds",
  "cancel-shift-confirmation-ds",
  "cancel-shift-success-ds"
];

export const checkIfIsNonDGSCSS = (page : string) => {
  if (NonDGSCandidateSelfServicePage.includes(page)) {
    return true;
  } else {
    return false;
  }
}

export const checkIfIsDGSCSS = (page : string) => {
  if (DGSCandidateSelfServicePage.includes(page)) {
    return true;
  } else {
    return false;
  }
}

export const checkIfIsCSS = (page : string) => {
  return checkIfIsDGSCSS(page) || checkIfIsNonDGSCSS(page);
}

export const get3rdPartyFromQueryParams = (queryParams: any, notationOverride?: string): string => {
  let queryString = '';

  // These keys are 3rd Party params we allowed to pass with redirectUrl after login.
  const includedKeyList = ["cmpid", "ccuid", "ccid", "etd", "piq_uuid", "pandocampaignid", "piq_source"];

  Object.keys(queryParams).forEach((key) => {
      if (includedKeyList.includes(key)) {
          queryString += `&${key}=${queryParams[key] || ''}`;
      }
  });

  if(notationOverride && queryString.length > 0){
      return `${notationOverride}${queryString.substring(1)}`;
  } else {
      return queryString;
  }
};

export const parseQueryParamsArrayToSingleItem = (queryParams: any) => {
  const parsedQueryParams = {...queryParams};
  Object.keys(parsedQueryParams).forEach((key: string) => {
    let item = parsedQueryParams[key];
    if( isArray(item) && item.length > 0){
      parsedQueryParams[key] = item[0];
    }
    if (key === "jobId"){
      parsedQueryParams[key] = jobIdSanitizer(parsedQueryParams[key]);
    } else if(key === "requisitionId"){
      parsedQueryParams[key] = requisitionIdSanitizer(parsedQueryParams[key]);
    }
  });
  return parsedQueryParams;
}

export const jobIdSanitizer = (jobId: string) => {
  let rawJobId = decodeURIComponent(jobId);
  let sanitizedJobId = rawJobId;
  // Check ?
  if(rawJobId.includes("?")){
    const items = rawJobId.split("?");
    items.forEach((item:string)=>{
      if(item.includes('JOB')){
        sanitizedJobId = item;
      }
    })
  }
  // Check &
  if(sanitizedJobId.includes("&")){
    const items = rawJobId.split("&");
    items.forEach((item:string)=>{
      if(item.includes('JOB')){
        sanitizedJobId = item;
      }
    })
  }
  return sanitizedJobId;
}

export const requisitionIdSanitizer = (jobId: string) => {
  let rawJobId = decodeURIComponent(jobId);
  let sanitizedJobId = rawJobId;
  // Check ?
  if(rawJobId.includes("?")){
    const items = rawJobId.split("?");
    sanitizedJobId = items[0];
  }
  // Check &
  if(sanitizedJobId.includes("&")){
    const items = rawJobId.split("&");
    sanitizedJobId = items[0];
  }
  return sanitizedJobId;
}