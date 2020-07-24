import isEmpty from "lodash/isEmpty";
import { getDataForMetrics } from "../helpers/adobe-helper";

export const JOB_OPPORTUNITIES = "job-opportunities";
export const CONSENT = "consent";

export const sendDataLayerAdobeAnalytics = (metric: any) => {
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
