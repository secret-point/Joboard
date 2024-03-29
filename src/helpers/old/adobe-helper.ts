import propertyOf from "lodash/propertyOf";
import { ADOBE_PAGE_LOAD_METRICS } from "../../constants/page-load-metric-constants";
import { isArray } from "lodash";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

const WORKFLOW = "BB NACF Tier-1 Node Workflow";

export const getDataForMetrics = () => {
  const { app } = window.reduxStore.getState();
  const currentPage = app.currentPage.id;
  app.data.requisitionId = window.urlParams.requisitionId;
  app.data.jobId = window.urlParams.jobId;
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
            metricData[d.key][v.key] = WORKFLOW;
          } else if (v.key === "day1Date") {
            // add day1Date, day1Week for page load
            const day1Date = formatDate(propertyOf(app.data)(v.value));
            metricData[d.key][v.key] = day1Date;
            metricData[d.key].daysUntilDay1 = getDaysUntilDay1(day1Date);
          } else if (d.key === "NHE" && v.key === "count") {
            // NHE sent the count of NHE, not the list
            metricData[d.key][v.key] =
              propertyOf(app.data)(v.value).length === 0
                ? "zero"
                : propertyOf(app.data)(v.value).length;
          } else if (d.key === "shifts" && v.key === "list") {
            // filter shifts list
            const filteredShifts: any[] = [];
            propertyOf(app.data)(v.value)?.forEach((element: any) => {
              filteredShifts.push(element.headCountRequestId);
            });
            metricData[d.key][v.key] = filteredShifts;
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
  app.data.jobId = window.urlParams.jobId;

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
            metricData[d.key][v.key] = WORKFLOW;
          } else if (v.key === "day1Date") {
            // add day1Date, daysUntilDay1 for event
            const day1Date = formatDate(propertyOf(app.data)(v.value));
            const daysUntilDay1 = getDaysUntilDay1(day1Date);
            metricData[d.key][v.key] = day1Date;
            metricData[d.key].daysUntilDay1 = daysUntilDay1;
          } else {
            metricData[d.key][v.key] = propertyOf(app.data)(v.value);
          }
        }
      });
    });

    // dataPayload: using data from app.appConfig
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
