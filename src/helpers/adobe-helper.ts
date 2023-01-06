import propertyOf from "lodash/propertyOf";
import { ADOBE_PAGE_LOAD_METRICS } from "../constants/page-load-metric-constants";
import { isArray } from "lodash";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import store from "../store/store";

const WORKFLOW = "BB NACF Tier-1 Node Workflow";

export const getDataForMetrics = (pageName: string) => {
  const state = store.getState();
  const metricObject: any = ADOBE_PAGE_LOAD_METRICS[pageName];
  let metricData: any;
  if (!isEmpty(metricObject)) {
    metricData = metricObject.eventPayload;

    metricObject.dataPayload?.forEach((d: any) => {
      metricData[d.key] = {};
      d.values?.forEach((v: any) => {
        if (isArray(v.values)) {
          metricData[d.key][v.key] = {};
          v.values?.forEach((value: any) => {
            metricData[d.key][v.key][value.key] = propertyOf(state)(
              value.value
            );
          });
        } else {
          if (v.key === "workflow") {
            metricData[d.key][v.key] = WORKFLOW;
          } else if (v.key === "day1Date") {
            // add day1Date, day1Week for page load
            const day1Date = formatDate(propertyOf(state)(v.value));
            metricData[d.key][v.key] = day1Date;
            metricData[d.key].daysUntilDay1 = getDaysUntilDay1(day1Date);
          } else if (d.key === "NHE" && v.key === "count") {
            // NHE sent the count of NHE, not the list
            metricData[d.key][v.key] =
              !propertyOf(state)(v.value) || propertyOf(state)(v.value).length === 0
                ? "zero"
                : propertyOf(state)(v.value).length;
          } else if (d.key === "shifts" && v.key === "list") {
            // filter shifts list
            const filteredShifts: any[] = [];
            propertyOf(state)(v.value)?.forEach((element: any) => {
              filteredShifts.push(element.headCountRequestId);
            });
            metricData[d.key][v.key] = filteredShifts;
          } else {
            metricData[d.key][v.key] = propertyOf(state)(v.value);
          }
        }
      });
    });
  }
  return metricData;
};

export const getDataForEventMetrics = (eventName: any) => {
  const state = store.getState();
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
            metricData[d.key][v.key][value.key] = propertyOf(state)(
              value.value
            );
          });
        } else {
          if (v.key === "workflow") {
            metricData[d.key][v.key] = WORKFLOW;
          } else if (v.key === "day1Date") {
            // add day1Date, daysUntilDay1 for event
            const day1Date = formatDate(propertyOf(state)(v.value));
            const daysUntilDay1 = getDaysUntilDay1(day1Date);
            metricData[d.key][v.key] = day1Date;
            metricData[d.key].daysUntilDay1 = daysUntilDay1;
          } else {
            metricData[d.key][v.key] = propertyOf(state)(v.value);
          }
        }
      });
    });

    const envConfig = state.appConfig?.results?.envConfig || {};
    // dataPayload: using data from app.appConfig
    metricObject.appConfigPayload?.forEach((d: any) => {
      metricData[d.key] = {};
      if (isArray(d.values)) {
        d.values?.forEach((v: any) => {
          metricData[d.key][v.key] = propertyOf(envConfig)(v.value);
        });
      } else {
        metricData[d.key] = propertyOf(envConfig)(d.value);
      }
    });
  }
  return metricData;
};

const formatDate = (ISODate: string) => {
  return moment(ISODate)
    .utc()
    .format("YYYY-MM-DD");
};

const getDaysUntilDay1 = (day: string) => {
  const currentDate = moment();
  const dayOne = moment(day);
  return dayOne.diff(currentDate, "days");
};
