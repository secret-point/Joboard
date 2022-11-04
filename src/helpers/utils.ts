import { isArray, isBoolean } from "lodash";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import propertyOf from "lodash/propertyOf";
import queryString from "query-string";
import { CheckBoxItem } from "../@types";
import { Metric, MetricData, MetricsValue } from "../@types/adobe-metrics";
import { PAGE_ROUTES } from "../components/pageRoutes";
import { CS_DOMAIN_LIST } from "../countryExpansionConfig";
import store from "../store/store";
import { getLocale } from "../utils/helper";
import { Application } from "../utils/types/common";

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
  const urlParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
  const jobIdFromUrl = urlParams.jobId;
  const requisitionIdFromUrl = urlParams.requisitionId;
  const applicationIdFromUrl = urlParams.applicationId;

  const queryParamsInSession = window.sessionStorage.getItem("query-params");
  const queryParams = queryParamsInSession
    ? JSON.parse(queryParamsInSession)
    : {};
  delete queryParams.page;
  delete queryParams.requisitionId;
  delete queryParams.applicationId;
  delete queryParams.jobId;
  const queryStr = isEmpty(queryParams)? "" :`&${queryString.stringify(queryParams)}`;
  const hash = window.location.hash.substr(2).split("/");
  const { origin } = window.location;
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
  const jobIdOrRequisitionIdFromHash = hash[1] && hash[1] != 'undefined' ? hash[1] : null;
  const applicationIdFromHash = hash[2] && hash[2] != 'undefined' ? hash[2] : null;
  const targetJobIdOrRequisitionId = isLegacy
    ? jobIdOrRequisitionIdFromHash || requisitionIdFromUrl
    : jobIdOrRequisitionIdFromHash || jobIdFromUrl;
  const targetApplicationId = applicationIdFromHash || applicationIdFromUrl;

  redirectUrl = `${redirectUrl}${pathByDomain()}/?page=${currentPage}&${isLegacy? "requisitionId" : "jobId"}=${targetJobIdOrRequisitionId}&applicationId=${targetApplicationId}${queryStr}`;
  if (hash.length === 4) {
    redirectUrl = `${redirectUrl}&misc=${hash[3]}`;
  }

  const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');

  const url = `${state.app.appConfig.CSDomain}/app${queryStringFor3rdParty}#/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
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

export const checkIfIsCSRequest = (override?: boolean) => {
  if(isBoolean(override)){
    return override
  }
  const { origin } = window.location;
  const isCSRequest = CS_DOMAIN_LIST.includes(origin);
  return isCSRequest;
}

export const pathByDomain = () => {
  const csPath = checkIfIsCSRequest()? "/application" : "";
  return csPath;
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

export const checkIfIsNonDGSCSS = (page: string) => {
  if (NonDGSCandidateSelfServicePage.includes(page)) {
    return true;
  } else {
    return false;
  }
}

export const checkIfIsDGSCSS = (page: string) => {
  if (DGSCandidateSelfServicePage.includes(page)) {
    return true;
  } else {
    return false;
  }
}

export const checkIfIsCSS = (page: string) => {
  return checkIfIsDGSCSS(page) || checkIfIsNonDGSCSS(page);
}

export const get3rdPartyFromQueryParams = (queryParams: any, notationOverride?: string): string => {
  let queryString = '';

  // These keys are 3rd Party params we allowed to pass with redirectUrl after login.
  const includedKeyList = ["cmpid", "ccuid", "ccid", "etd", "piq_uuid", "pandocampaignid", "pandocandidateid", "piq_source", "ikey", "akey", "tid"];

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
  const parsedQueryParams = { ...queryParams };
  Object.keys(parsedQueryParams).forEach((key: string) => {
    const item = parsedQueryParams[key];
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
  const rawJobId = decodeURIComponent(jobId);
  let sanitizedJobId = rawJobId;
  // Check ?
  if(rawJobId.includes("?")){
    const items = rawJobId.split("?");
    items.forEach((item: string)=>{
      if(item.includes('JOB')){
        sanitizedJobId = item;
      }
    })
  }
  // Check &
  if(sanitizedJobId.includes("&")){
    const items = rawJobId.split("&");
    items.forEach((item: string)=>{
      if(item.includes('JOB')){
        sanitizedJobId = item;
      }
    })
  }
  return sanitizedJobId;
}

export const requisitionIdSanitizer = (jobId: string) => {
  const rawJobId = decodeURIComponent(jobId);
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

export const injectCsNavAndFooter = (CSDomain: string) => {
  const topNav = document.createElement("div");
  topNav.id = 'hvh-bb-header';
  topNav.className = "hvh-widget";
  topNav.setAttribute("data-hvh-position", "header")
  document.body.prepend(topNav);
  const footer = document.createElement("div");
  footer.id = "hvh-bb-footer";
  document.body.appendChild(footer);
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = `${CSDomain}/app/main.prod.js`;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href=`${CSDomain}/app/main.prod.css`;
  head.appendChild(script);
  head.appendChild(link);
  fetch(`${CSDomain}/amabot-rest?page=common&res=footer&locale=${getLocale()}`)
    .then((res) => res.json())
    .then((body) => {
      document.getElementById("hvh-bb-footer")!.innerHTML = body.contentMap.footer.bodyContent;
    });
}

export const addApplicationIdInUrl = (application?: Application) => {
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
  const currentSearch = window.location.search;
  let newSearch = currentSearch;
  let newUrl = window.location.href;
  if(application && application.applicationId && (!queryParams.applicationId || queryParams.applicationId === 'undefined')){
    if(isEmpty(queryParams)){
      newSearch = `?applicationId=${application.applicationId}`
      newUrl = window.location.href.replace(`${window.location.origin}/`, `${window.location.origin}/${newSearch}`);
    } else {
      newSearch = `${currentSearch}&applicationId=${application.applicationId}`
      newUrl = window.location.href.replace(currentSearch,newSearch);
    }
    // replace url params without reload page
    window.history.replaceState(
      {},
      document.title,
      newUrl
    );
  }
}

export const getPageNameFromPath = (path: string) => {
  const { JOB_CONFIRMATION, JOB_DESCRIPTION, BACKGROUND_CHECK_FCRA } = PAGE_ROUTES;
  const isSubPath = path.includes(JOB_CONFIRMATION) || path.includes(JOB_DESCRIPTION) || path.includes(BACKGROUND_CHECK_FCRA);
  //Return subPath as pathname to send correct page name to BI
  return isSubPath ? path.split("/")[2] : path.split("/")[1];
};

export const redirectToLoginCSDS = () => {
  const state = store.getState();
  const CSDomain = state?.appConfig?.results?.envConfig?.CSDomain;
  const redirectUrl = window.location.href;
  const url = `${CSDomain}/app#/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  window.location.assign(url);
};

export const redirectToDashboard = () => {
  const state = store.getState();
  const envConfig = state.appConfig?.results?.envConfig;
  const isCandidateDashboardEnabled = envConfig?.featureList?.CANDIDATE_DASHBOARD?.isAvailable;
  const queryParamsInSession = window.sessionStorage.getItem("query-params");
  const queryParams = queryParamsInSession
    ? JSON.parse(queryParamsInSession)
    : {};
  const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');
  const candidateDashboardUrl = `${envConfig?.CSDomain}/app${queryStringFor3rdParty}#/myApplications`;

  if (isCandidateDashboardEnabled) {
    window.location.assign(candidateDashboardUrl);
  } else if (envConfig?.dashboardUrl){
    window.location.assign(envConfig?.dashboardUrl);
  }
};

export const resetIsPageMetricsUpdated = (pageName: string) => {
  const isPageMetricsUpdated = window.isPageMetricsUpdated || {};
  isPageMetricsUpdated[pageName] = false;
  window.isPageMetricsUpdated = isPageMetricsUpdated;
}
