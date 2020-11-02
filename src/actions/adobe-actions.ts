import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { getDataForMetrics } from "../helpers/adobe-helper";

export const JOB_OPPORTUNITIES = "job-opportunities";
export const CONSENT = "consent";

const getCmpId = () => {
  const cmpIdKeys = ["CMPID", "cmpid", "cmpID", "cmpId"];
  let cmpIdValue;
  for (let key of cmpIdKeys) {
    const cmpId = window.sessionStorage.getItem(key);
    if (!isNil(cmpId)) {
      cmpIdValue = cmpId;
      break;
    }
  }
  return cmpIdValue;
};

export const sendDataLayerAdobeAnalytics = (metric: any) => {
  const cmpId = getCmpId();
  if (!isNil(cmpId)) {
    metric = {
      ...metric,
      campaign: {
        cmpid: cmpId
      }
    };
  }
  window.dataLayerArray = window.dataLayerArray || [];
  window.dataLayerArray.push(metric);
};

export const addMetricForPageLoad = () => {
  let dataLayer: any = {};
  try {
    const { app } = window.reduxStore.getState();
    if (!isEmpty(app.data.requisition) && !window.isPageMetricsUpdated) {
      dataLayer = getDataForMetrics();
      window.isPageMetricsUpdated = true;
      if (!isEmpty(dataLayer)) {
        sendDataLayerAdobeAnalytics(dataLayer);
      }
    }
  } catch (ex) {
    console.log(ex);
    console.log("unable to update metrics");
  }
};
