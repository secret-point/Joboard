import RequisitionService from "../services/requisition-service";
import JobService from "../services/job-service";
import isEmpty from "lodash/isEmpty";
import IPayload, { AvailableFilter, DaysHoursFilter } from "../@types/IPayload";
import {
  setLoading,
  onUpdatePageId,
  onUpdateChange,
  onGoToAction
} from "./actions";
import { onUpdateError, onRemoveError } from "./error-actions";
import find from "lodash/find";
import HTTPStatusCodes from "../constants/http-status-codes";
import propertyOf from "lodash/propertyOf";
import CandidateApplicationService from "../services/candidate-application-service";
import isNil from "lodash/isNil";
import { push } from "react-router-redux";
import { sendDataLayerAdobeAnalytics } from "../actions/adobe-actions";
import { getDataForEventMetrics } from "../helpers/adobe-helper";
import moment from "moment";
import { sortWith, ascend, descend, prop } from "ramda";
import { log, logError } from "../helpers/log-helper";
import cloneDeep from "lodash/cloneDeep";
import removeFromObject from "lodash/remove";
import { EVENT_NAMES } from "../constants/adobe-analytics";
import { sendAdobeAnalytics } from "./application-actions";

export const GET_JOB_INFO = "GET_JOB_INFO";
export const UPDATE_REQUISITION = "UPDATE_REQUISITION";
export const UPDATE_JOB_INFO = "UPDATE_JOB_INFO";
export const UPDATE_SCHEDULES = "UPDATE_SCHEDULES";
export const UPDATE_SELECTED_JOB_ROLE = "UPDATE_SELECTED_JOB_ROLE";
export const SELECTED_REQUISITION = "SELECTED_REQUISITION";
export const UPDATE_JOB_DESCRIPTION = "UPDATE_JOB_DESCRIPTION";
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";
export const RESET_FILTERS = "RESET_FILTERS";
export const RESET_FILTERS_SELF_SERVICE = "RESET_FILTERS_SELF_SERVICE";
export const SET_LOADING_SHIFTS = "SET_LOADING_SHIFTS";
export const SET_LOADING_SCHEDULES = "SET_LOADING_SCHEDULES";
export const SET_PAGE_FACTOR = "SET_PAGE_FACTOR";
export const MERGE_SHIFTS = "MERGE_SHIFTS";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const UPDATE_POSSIBLE_NHE_DATES = "UPDATE_POSSIBLE_NHE_DATES";
export const UPDATE_SHIFT_PREF_DETAILS = "UPDATE_SHIFT_PREF_DETAILS";
export const SET_SELECTED_SCHEDULE = "SET_SELECTED_SCHEDULE";
export const SELECTED_SCHEDULE = "SELECTED_SCHEDULE";
const SORT_KEY_DEFAULT = "FEATURED";
const MAX_HOURS_PER_WEEK_DEFAULT = "40";
const MINIMUM_AVAILABLE_TIME_SLOTS = 3;

export const onGetJobInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
  log("onGetJobInfo", payload);
  const jobId = payload.urlParams?.jobId as string;
  console.log(jobId);

  if (jobId && isEmpty(payload.data.job)) {
    try {
      onRemoveError()(dispatch);
      setLoading(true)(dispatch);
      log(`Getting Job info for ${jobId}`);
      const response = await new JobService().getJobInfo(jobId);
      dispatch({
        type: GET_JOB_INFO,
        payload: response
      });
      log(`loaded job info for ${jobId} and updated state`);
      setLoading(false)(dispatch);
    } catch (ex) {
      logError("Error while fetching job info", ex);
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get job info"
      )(dispatch);
    }
  }
};

export const onGetChildSchedule = (payload: IPayload) => async (
  dispatch: Function
) => {
  const jobId = payload.urlParams.jobId as string;
  if (jobId) {
    try {
      onRemoveError()(dispatch);
      setLoading(true)(dispatch);
      log(`Getting child requisitions for ${jobId}`);
      const response = await new JobService().getScheduleDetailByScheduleId(
        "blah"
        // payload.options.getAllChildSchedules
      );
      dispatch({
        type: UPDATE_SCHEDULES,
        payload: {
          childSchedules: response
        }
      });
      log(`loaded child requisitions for ${jobId} and updated state`);
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      logError("Unable to get child schedule", ex);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onGetScheduleDetails = (payload: IPayload) => async (
  dispatch: Function
) => {
  await onSelectedSchedule(localStorage.getItem("scheduleId") as string)(
    dispatch
  );
};

export const onSelectedSchedule = (scheduleId: string) => async (
  dispatch: Function
) => {
  console.log("============onSelectedSchedule", scheduleId);
  log(`getting selected schedule ${scheduleId}`);
  const response = await new JobService().getScheduleDetailByScheduleId(
    scheduleId
  );
  console.log(response);
  dispatch({
    type: SELECTED_SCHEDULE,
    payload: response
  });
  localStorage.setItem("scheduleId", scheduleId);

  log(`loaded selected scheduleId ${scheduleId} and update state`);
};

export const onGetAllSchedules = (payload: IPayload) => async (
  dispatch: Function
) => {
  dispatch({
    type: SET_LOADING_SCHEDULES,
    payload: true
  });
  console.log("========onGetAllSchedules============start", payload);
  const jobId = payload.urlParams.jobId as string;
  // const jobId = payload.urlParams?.jobId;
  console.log("========onGetAllSchedules============jobId", jobId);
  const applicationId = payload.urlParams?.applicationId;
  console.log(payload.urlParams);
  const storedApplicationId = window.sessionStorage.getItem("applicationId");
  if (!applicationId && storedApplicationId) {
    console.log(
      "========applicationId============storedApplicationId",
      applicationId,
      storedApplicationId
    );
    dispatch(push(`/job-opportunities/${jobId}/${storedApplicationId}`));
  } else if (jobId) {
    try {
      log(`getting all available shifts for job ${jobId}`);
      console.log(
        "========onGetAllSchedules============jobId",
        jobId,
        applicationId
      );
      onRemoveError()(dispatch);
      setLoading(true)(dispatch);
      const response = await new JobService().getAllSchedules({
        jobId,
        applicationId
      });
      log(`loaded all available shifts for job ${jobId}`, {
        pageFactor: response.pageFactor,
        availableSchedulesCount: response.availableSchedules.total
      });
      if (response.availableSchedules.total > 0) {
        dispatch({
          type: UPDATE_SCHEDULES,
          payload: {
            availableSchedules: response.availableSchedules
          }
        });
        log("updated sate with available shifts");
      } else {
        log(
          "there are no shifts, application redirected to no-available-shift"
        );
        onUpdatePageId("no-available-shift")(dispatch);
      }
      dispatch({
        type: SET_PAGE_FACTOR,
        payload: response.pageFactor
      });
      log("updated sate with page factor");
      setLoading(false)(dispatch);
    } catch (ex) {
      logError("Error while fetching available shits", ex);
      setLoading(false)(dispatch);
      let errorMessage = ex?.response?.data?.errorMessage
        ? ex?.response?.data?.errorMessage
        : ex?.message;

      errorMessage = errorMessage
        ? errorMessage
        : "CLIENT_ERROR: something went wrong while fetching shifts";

      //send the error message to Adobe Analytics
      let dataLayer: any = {};
      dataLayer = getDataForEventMetrics("get-all-avaliable-shift-error");
      dataLayer.schedules.errorMessage = errorMessage;
      sendDataLayerAdobeAnalytics(dataLayer);

      onUpdateError(errorMessage)(dispatch);
    }
  }
};

export const applySortOnSchedules = (
  availableSchedules: any,
  filter: AvailableFilter
) => {
  let schedules: any[] = [];
  log("applying sort on schedules", {
    filter: JSON.stringify(filter)
  });
  switch (filter.sortBy) {
    case "FEATURED": {
      const schedulesData = [...availableSchedules.schedules];
      const sortFunction = sortWith<any>([
        ascend(prop("pageFactor")),
        ascend(prop("rankingOrder"))
      ]);
      schedules = sortFunction(schedulesData);
      break;
    }
    case "PAY_RATE": {
      const schedulesData = [...availableSchedules.schedules];
      const sortFunction = sortWith<any>([descend(prop("totalPayRate"))]);
      schedules = sortFunction(schedulesData);
      break;
    }
    case "HOURS_DESC": {
      const schedulesData = [...availableSchedules.schedules];
      const sortFunction = sortWith<any>([descend(prop("minHoursPerWeek"))]);
      schedules = sortFunction(schedulesData);
      break;
    }
    case "HOURS_ASC": {
      const schedulesData = [...availableSchedules.schedules];
      const sortFunction = sortWith<any>([ascend(prop("minHoursPerWeek"))]);
      schedules = sortFunction(schedulesData);
      break;
    }
    case "DATE_ASC": {
      const schedulesData = [...availableSchedules.schedules];
      const sortFunction = sortWith<any>([ascend(prop("day1Date"))]);
      schedules = sortFunction(schedulesData);
      break;
    }
    default: {
      console.log("Sort key is not available");
      break;
    }
  }
  availableSchedules.schedules = schedules;
  availableSchedules.total = schedules.length;
  return availableSchedules;
};

const constructFilterPayload = (payload: IPayload) => {
  const selectedSortKey =
    propertyOf(payload.data.output)("job-opportunities.sortKey") || "FEATURED";

  const maxHoursPerWeek = propertyOf(payload.data.output)(
    "job-opportunities.maxHoursPerWeek"
  );

  let daysHoursFilter = (propertyOf(payload.data.output)(
    "job-opportunities.daysHoursFilter"
  ) || payload.appConfig.defaultDaysHoursFilter) as DaysHoursFilter[];

  const defaultFilter = payload.appConfig.defaultAvailableFilter;

  const scheduleReference: any = {};
  daysHoursFilter.forEach(filter => {
    if (filter.isActive) {
      scheduleReference[filter.day.toUpperCase()] = {
        startTime: filter.startTime,
        endTime: filter.endTime
      };
    }
  });

  defaultFilter.filter.schedulePreferences = scheduleReference;
  defaultFilter.sortBy = selectedSortKey;
  if (maxHoursPerWeek) {
    defaultFilter.filter.range.HOURS_PER_WEEK.maximumValue = parseInt(
      maxHoursPerWeek
    );
  }
  return defaultFilter;
};

export const onSchedulesIncrementalLoad = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  dispatch({
    type: SET_LOADING_SCHEDULES,
    payload: true
  });
  const filter = constructFilterPayload(payload);
  if (!isNil(payload.data.schedulePageFactor)) {
    filter.pageFactor = payload.data.schedulePageFactor + 1;
  } else {
    filter.pageFactor = filter.pageFactor + 1;
  }
  const jobId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;

  if (jobId) {
    try {
      log(`getting available shifts for requisition ${jobId} in incremental`, {
        filter: JSON.stringify(filter)
      });
      const response = await new RequisitionService().getAllAvailableShifts(
        jobId,
        applicationId,
        filter
      );

      log(`loaded available shifts for requisition ${jobId} in incremental`, {
        pageFactor: response.pageFactor,
        availableShiftsCount: response.availableShifts.total,
        filter: JSON.stringify(filter)
      });
      if (response.availableShifts.total > 0) {
        const availableShifts = applySortOnSchedules(
          response.availableShifts,
          filter
        );
        dispatch({
          type: MERGE_SHIFTS,
          payload: {
            shifts: availableShifts.shifts,
            pageFactor: response.pageFactor
          }
        });
        log("Updated shifts in state");
      }
      setLoading(false)(dispatch);
    } catch (ex) {
      logError("Error while getting shifts in incremental", ex);
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.NOT_FOUND) {
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Unable to get shifts"
        )(dispatch);
      }
    }
  }
};

export const onApplyFilterDS = (payload: IPayload) => async (
  dispatch: Function
) => {
  const { options } = payload;
  onRemoveError()(dispatch);
  let filter = constructFilterPayload(payload);
  filter.pageFactor = 1;
  setLoading(true)(dispatch);
  const jobId = payload.urlParams.jobId as string;
  const applicationId = payload.urlParams?.applicationId;

  const activeDays: any[] = [];
  let daysHoursFilter = (propertyOf(payload.data.output)(
    "job-opportunities.daysHoursFilter"
  ) || payload.appConfig.defaultDaysHoursFilter) as DaysHoursFilter[];
  daysHoursFilter.forEach(filter => {
    if (filter.isActive) {
      activeDays.push(filter.day);
    }
  });

  let dataLayer: any = {};
  if (options?.hasSortAction) {
    dataLayer = getDataForEventMetrics("apply-sorting");
  } else {
    dataLayer = getDataForEventMetrics("apply-filter");
    dataLayer.filter.daysOfWeek = activeDays;
  }
  sendDataLayerAdobeAnalytics(dataLayer);

  log("Applying filter DS", {
    filter: JSON.stringify(filter)
  });

  if (jobId) {
    try {
      let availableSchedules: any = {};
      let pageFactor;
      if (options?.hasSortAction) {
        log("Applying sorting selected sort", {
          filter: JSON.stringify(filter)
        });
        const scheduleInJob = payload.data.job.availableSchedules;
        availableSchedules = applySortOnSchedules(scheduleInJob, filter);
      } else {
        if (isEmpty(filter.filter.schedulePreferences)) {
          const daysHoursFilter = payload.appConfig.defaultDaysHoursFilter;
          const maxHoursPerWeek = MAX_HOURS_PER_WEEK_DEFAULT;
          const sortKey = SORT_KEY_DEFAULT;
          const filterData = {
            sortKey,
            maxHoursPerWeek,
            daysHoursFilter
          };
          dispatch({
            type: RESET_FILTERS,
            payload: {
              ...filterData
            }
          });
          payload.data.output["job-opportunities"] = filterData;
          log("schedulePreference is empty, reset the filterData:", {
            filterData: JSON.stringify(filterData)
          });
          filter = constructFilterPayload(payload);
        }
        const response = await new JobService().getAllSchedules({
          jobId,
          applicationId,
          filter
        });
        console.log("===============", response);
        pageFactor = response.pageFactor;
        log("Applying sorting if user selected sort", {
          pageFactor: response.pageFactor,
          availableSchedulesCount: response.availableSchedules.total,
          filter: JSON.stringify(filter)
        });
        availableSchedules = applySortOnSchedules(
          response.availableSchedules,
          filter
        );
      }
      dispatch({
        type: UPDATE_SCHEDULES,
        payload: {
          availableSchedules,
          pageFactor,
          schedulesEmptyOnFilter: isEmpty(availableSchedules.schedules)
            ? true
            : false
        }
      });
      log("Updated shifts in state while applying filter");
      setLoading(false)(dispatch);
    } catch (ex) {
      log("Error while applying filter", ex);
      setLoading(false)(dispatch);
      if (
        ex?.response?.status === HTTPStatusCodes.NOT_FOUND ||
        ex?.response?.status === HTTPStatusCodes.BAD_REQUEST
      ) {
        dispatch({
          type: UPDATE_SCHEDULES,
          payload: {
            availableSchedules: {
              schedules: [],
              total: 0
            },
            schedulesEmptyOnFilter: true
          }
        });
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Unable to get schedules"
        )(dispatch);
      }
    }
  }
};

export const onResetFiltersDS = (payload: IPayload) => async (
  dispatch: Function
) => {
  const sortKey = SORT_KEY_DEFAULT;
  const maxHoursPerWeek = MAX_HOURS_PER_WEEK_DEFAULT;
  const daysHoursFilter = payload.appConfig.defaultDaysHoursFilter;

  const filterData = {
    sortKey,
    maxHoursPerWeek,
    daysHoursFilter
  };
  dispatch({
    type: RESET_FILTERS,
    payload: {
      ...filterData
    }
  });
  payload.data.output["job-opportunities"] = filterData;
  log("Reset filter initiated", {
    filter: JSON.stringify(filterData)
  });

  onApplyFilterDS(payload)(dispatch);
};

export const onGoToDescriptionDS = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  const { goTo } = payload.options;
  onGetJobDescriptionDS(payload)(dispatch);
  onUpdatePageId(goTo)(dispatch);
};

export const onGetJobDescriptionDS = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  console.log(payload);
  
  const jobId =
    (payload.urlParams.jobId as string) ||
    payload.data.selectedSchedule.jobId ||
    payload.data.job.consentInfo.jobId;
  if (jobId) {
    try {
      if (!payload.data.job.selectedChildSchedule) {
        onSelectedSchedule(jobId)(dispatch);
      }
      log(`getting job description for job ${jobId}`);
      const response = await new JobService().getJobInfo(jobId);
      dispatch({
        type: UPDATE_JOB_INFO,
        payload: response
      });
      log(`loaded job description for child job ${jobId} and update state`);
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(ex?.response?.data?.errorMessage || "Unable to get job")(
        dispatch
      );
    }
  }
};
