import propertyOf from "lodash/propertyOf";
import { ADOBE_PAGE_LOAD_METRICS } from "../constants/page-load-metric-constants";
import { isArray } from "lodash";
import isEmpty from "lodash/isEmpty";

export const getDataForMetrics = () => {
  const { app } = window.reduxStore.getState();
  const currentPage = app.currentPage.id;
  app.data.requisitionId = window.urlParams.requisitionId;

  const metricObject: any = ADOBE_PAGE_LOAD_METRICS[currentPage];
  let metricData: any;
  if (!isEmpty(metricObject)) {
    metricData = metricObject.eventPayload;

    metricObject.dataPayload?.forEach((d: any) => {
      metricData[d.key] = {};
      d.values?.forEach((v: any) => {
        if (isArray(v.values)) {
          metricData[d.key][v.key] = {};
          v.values?.forEach((value: any) => {
            metricData[d.key][v.key][value.key] = propertyOf(app.data)(
              value.value
            );
          });
        } else {
          if (v.key === "workflow") {
            metricData[d.key][v.key] = `BB ${propertyOf(app.data)(v.value)}`;
          } else {
            metricData[d.key][v.key] = propertyOf(app.data)(v.value);
          }
        }
      });
    });
  }
  return metricData;
};

export const getDataForEventMetrics = (eventName: any) => {
  const { app } = window.reduxStore.getState();
  app.data.requisitionId = window.urlParams.requisitionId;

  const metricObject: any = ADOBE_PAGE_LOAD_METRICS[eventName];
  let metricData: any;
  if (!isEmpty(metricObject)) {
    metricData = metricObject.eventPayload;
    metricObject.dataPayload?.forEach((d: any) => {
      metricData[d.key] = {};
      d.values?.forEach((v: any) => {
        if (isArray(v.values)) {
          metricData[d.key][v.key] = {};
          v.values?.forEach((value: any) => {
            metricData[d.key][v.key][value.key] = propertyOf(app.data)(
              value.value
            );
          });
        } else {
          if (v.key === "workflow") {
            metricData[d.key][v.key] = `BB ${propertyOf(app.data)(v.value)}`;
          } else {
            metricData[d.key][v.key] = propertyOf(app.data)(v.value);
          }
        }
      });
    });

    //dataPayload: using data from app.appConfig
    metricObject.appConfigPayload?.forEach((d: any) => {
      metricData[d.key] = {};
      if (isArray(d.values)) {
        d.values?.forEach((v: any) => {
          metricData[d.key][v.key] = propertyOf(app.appConfig)(v.value);
        });
      } else {
        metricData[d.key] = propertyOf(app.appConfig)(d.value);
      }
    });
  }
  return metricData;
};
