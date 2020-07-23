import isEmpty from "lodash/isEmpty";
import { getDataForMetrics } from "../helpers/adobe-helper";

export const JOB_OPPORTUNITIES = "job-opportunities";
export const CONSENT = "consent";

export const sendDataLayerAdobeAnalytics = (dataLayer: any) => {
  window.dataLayerArray.push(dataLayer);
};

export const addMetricForPageLoad = () => {
  try {
    const { app } = window.reduxStore.getState();
    if (!isEmpty(app.data.requisition) && !window.isPageMetricsUpdated) {
      const dataLayer = getDataForMetrics();
      window.isPageMetricsUpdated = true;
      sendDataLayerAdobeAnalytics(dataLayer);
    }
  } catch (ex) {
    console.log(ex);
    console.log("unable to update metrics");
  }
};
