import propertyOf from "lodash/propertyOf";
import { ADOBE_PAGE_LOAD_METRICS } from "../constants/page-load-metric-constants";
import { PAGE_NAME } from "../constants/adobe-analytics";

export const getDataForMetrics = () => {
  const { app } = window.reduxStore.getState();
  const currentPage = app.currentPage.id;
  app.data.requisitionId = window.urlParams.requisitionId;

  const metricObject: any = ADOBE_PAGE_LOAD_METRICS[currentPage];

  let metricData: any = {};

  metricData = metricObject.eventPayload;
  metricData.page.name = PAGE_NAME[currentPage];

  metricObject.dataPayload?.forEach((d: any) => {
    metricData[d.key] = {};
    d.values?.forEach((v: any) => {
      metricData[d.key][v.key] = propertyOf(app.data)(v.value);
    });
  });

  return metricData;
};
