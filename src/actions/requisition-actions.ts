import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload, { AvailableFilter, DaysHoursFilter } from "../@types/IPayload";
import { setLoading, onUpdatePageId } from "./actions";
import { onUpdateError, onRemoveError } from "./error-actions";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
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
import { CheckboxItem } from "@amzn/hvh-candidate-application-ui-components/lib/types/ICheckboxProps";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";
export const UPDATE_REQUISITION = "UPDATE_REQUISITION";
export const UPDATE_SELECTED_JOB_ROLE = "UPDATE_SELECTED_JOB_ROLE";
export const SELECTED_REQUISITION = "SELECTED_REQUISITION";
export const UPDATE_JOB_DESCRIPTION = "UPDATE_JOB_DESCRIPTION";
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";
export const RESET_FILTERS = "RESET_FILTERS";
export const SET_LOADING_SHIFTS = "SET_LOADING_SHIFTS";
export const SET_PAGE_FACTOR = "SET_PAGE_FACTOR";
export const MERGE_SHIFTS = "MERGE_SHIFTS";
const SORT_KEY_DEFAULT = "FEATURED";
const MAX_HOURS_PER_WEEK_DEFAULT = "40";

export const onGetRequisitionHeaderInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId && isEmpty(payload.data.requisition)) {
    try {
      log(`Getting requisition header info for ${requisitionId}`);
      const response = await new RequisitionService().getRequisitionHeaderInfo(
        requisitionId
      );
      dispatch({
        type: GET_REQUISITION_HEADER_INFO,
        payload: response
      });
      log(
        `loaded requisition header info for ${requisitionId} and updated state`
      );
      setLoading(false)(dispatch);
    } catch (ex) {
      logError("Error while fetching requisition header info", ex);
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onGetChildRequisitions = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId) {
    try {
      log(`Getting child requisitions for ${requisitionId}`);
      const response = await new RequisitionService().getChildRequisitions(
        requisitionId,
        payload.options.getAllChildRequisitions
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          childRequisitions: response
        }
      });
      log(`loaded child requisitions for ${requisitionId} and updated state`);
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      logError("Unable to get child requisitions", ex);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onGetRequisition = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const id = payload.urlParams?.requisitionId;
  if (id) {
    try {
      log(`Getting requisition for ${id}`);
      const response = await new RequisitionService().getRequisition(id);
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...response
        }
      });
      log(`loaded requisition for ${id} and update state`);
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onSelectedRequisition = (requisitionId: string) => async (
  dispatch: Function
) => {
  log(`getting selected requisition ${requisitionId}`);
  const response = await new RequisitionService().getRequisition(requisitionId);
  dispatch({
    type: SELECTED_REQUISITION,
    payload: response
  });
  log(`loaded selected requisition ${requisitionId} and update state`);
};

export const onGetJobDescription = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const childRequisitionId =
    payload.selectedRequisitionId ||
    payload.data.requisition.selectedChildRequisition.requisitionId;
  if (childRequisitionId) {
    try {
      if (!payload.data.requisition.selectedChildRequisition) {
        onSelectedRequisition(childRequisitionId)(dispatch);
      }
      log(
        `getting job description for child requisition ${childRequisitionId}`
      );
      const response = await new RequisitionService().getJobDescription(
        childRequisitionId
      );
      dispatch({
        type: UPDATE_JOB_DESCRIPTION,
        payload: {
          jobDescription: response
        }
      });
      log(
        `loaded job description for child requisition ${childRequisitionId} and update state`
      );
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get requisition"
      )(dispatch);
    }
  }
};

export const onGoToDescription = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  const { goTo } = payload.options;
  const childRequisitionId =
    payload.selectedRequisitionId ||
    payload.data.requisition.selectedChildRequisition.requisitionId;

  const { requisition } = payload.data;

  let childRequisition;
  log(`getting child requisition ${childRequisitionId}`);
  if (requisition.childRequisitions) {
    childRequisition = find(requisition.childRequisitions, {
      requisitionId: payload.selectedRequisitionId
    });
  } else {
    childRequisition = await new RequisitionService().getRequisition(
      childRequisitionId
    );
  }

  onGetJobDescription(payload)(dispatch);
  dispatch({
    type: UPDATE_REQUISITION,
    payload: {
      selectedChildRequisition: childRequisition
    }
  });
  log(`loaded child requisition ${childRequisitionId} and updated state`);
  onUpdatePageId(goTo)(dispatch);
};

export const onGetNHETimeSlots = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  if (requisitionId) {
    try {
      let application = payload.data.application;
      if (!application || isEmpty(application)) {
        log(`getting application in NHE if application not exits in state`);
        application = await new CandidateApplicationService().getApplication(
          applicationId
        );
      }
      const { jobSelected } = application;
      log(`getting time slots for HCR ${jobSelected.headCountRequestId}`, {
        childRequisitionId: jobSelected.childRequisitionId,
        headCountRequestId: jobSelected.headCountRequestId,
        parentRequisitionId: requisitionId
      });
      const response = await new RequisitionService().availableTimeSlots({
        childRequisitionId: jobSelected.childRequisitionId,
        headCountRequestId: jobSelected.headCountRequestId,
        parentRequisitionId: requisitionId
      });

      if (!isEmpty(response)) {
        log(`load time slots for HCR ${jobSelected.headCountRequestId}`, {
          timeSlotsCount: response.length
        });
        const nheSlots: any[] = [];
        response.forEach((slot: any) => {
          const nheSlot: any = {};
          nheSlot.value = JSON.stringify(slot);
          //format the date with
          nheSlot.title = moment(slot.dateWithoutFormat, "DD/MM/yyyy").format(
            "dddd, MMM Do YYYY"
          );
          let nheSlotLocation: string = isNil(slot.location.streetAddress)
            ? ""
            : slot.location.streetAddress;
          nheSlotLocation = isNil(slot.location.city)
            ? nheSlotLocation
            : nheSlotLocation + ", " + slot.location.city;
          nheSlotLocation = isNil(slot.location.state)
            ? nheSlotLocation
            : nheSlotLocation + ", " + slot.location.state;
          nheSlotLocation = isNil(slot.location.postalCode)
            ? nheSlotLocation
            : nheSlotLocation + ", " + slot.location.postalCode;
          nheSlot.details = slot.timeRange + `${"\n"}` + nheSlotLocation;
          nheSlot.recruitingEventId = slot.recruitingEventId;
          nheSlots.push(nheSlot);
        });
        dispatch({
          type: UPDATE_REQUISITION,
          payload: {
            nheTimeSlots: nheSlots
          }
        });
        log(`sanitized and updated state with time slots`);
      } else {
        log(`load time slots for HCR ${jobSelected.headCountRequestId}`, {
          timeSlotsCount: response?.length
        });
        onUpdatePageId("no-available-time-slots")(dispatch);
      }
      setLoading(false)(dispatch);
    } catch (ex) {
      logError(`Unable to get NHE time slots`, ex);
      setLoading(false)(dispatch);
      onUpdateError(
        ex?.response?.data?.errorMessage || "Unable to get NHE time slots"
      )(dispatch);
    }
  }
};

export const onGetAllAvailableShifts = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  dispatch({
    type: SET_LOADING_SHIFTS,
    payload: true
  });
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  const storedApplicationId = window.sessionStorage.getItem("applicationId");
  if (!applicationId && storedApplicationId) {
    dispatch(
      push(`/job-opportunities/${requisitionId}/${storedApplicationId}`)
    );
  } else if (requisitionId) {
    try {
      log(`getting all available shifts for requisition ${requisitionId}`);
      const response = await new RequisitionService().getAllAvailableShifts(
        requisitionId,
        applicationId
      );
      log(`loaded all available shifts for requisition ${requisitionId}`, {
        pageFactor: response.pageFactor,
        availableShiftsCount: response.availableShifts.total
      });
      if (response.availableShifts.total > 0) {
        dispatch({
          type: UPDATE_REQUISITION,
          payload: {
            availableShifts: response.availableShifts
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
      dataLayer.shifts.errorMessage = errorMessage;
      sendDataLayerAdobeAnalytics(dataLayer);

      onUpdateError(errorMessage)(dispatch);
    }
  }
};

export const applySortOnShifts = (
  availableShifts: any,
  filter: AvailableFilter
) => {
  let shifts: any[] = [];
  log("applying sort on shifts", {
    filter: JSON.stringify(filter)
  });
  switch (filter.sortBy) {
    case "FEATURED": {
      const shiftsData = [...availableShifts.shifts];
      const sortFunction = sortWith<any>([
        ascend(prop("pageFactor")),
        ascend(prop("rankingOrder"))
      ]);
      shifts = sortFunction(shiftsData);
      break;
    }
    case "PAY_RATE": {
      const shiftsData = [...availableShifts.shifts];
      const sortFunction = sortWith<any>([descend(prop("totalPayRate"))]);
      shifts = sortFunction(shiftsData);
      break;
    }
    case "HOURS_DESC": {
      const shiftsData = [...availableShifts.shifts];
      const sortFunction = sortWith<any>([descend(prop("minHoursPerWeek"))]);
      shifts = sortFunction(shiftsData);
      break;
    }
    case "HOURS_ASC": {
      const shiftsData = [...availableShifts.shifts];
      const sortFunction = sortWith<any>([ascend(prop("minHoursPerWeek"))]);
      shifts = sortFunction(shiftsData);
      break;
    }
    default: {
      console.log("Sort key is not available");
      break;
    }
  }
  availableShifts.shifts = shifts;
  availableShifts.total = shifts.length;
  return availableShifts;
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

export const onShiftsIncrementalLoad = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  dispatch({
    type: SET_LOADING_SHIFTS,
    payload: true
  });
  const filter = constructFilterPayload(payload);
  if (!isNil(payload.data.shiftPageFactor)) {
    filter.pageFactor = payload.data.shiftPageFactor + 1;
  } else {
    filter.pageFactor = filter.pageFactor + 1;
  }
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;

  if (requisitionId) {
    try {
      log(
        `getting available shifts for requisition ${requisitionId} in incremental`,
        {
          filter: JSON.stringify(filter)
        }
      );
      const response = await new RequisitionService().getAllAvailableShifts(
        requisitionId,
        applicationId,
        filter
      );

      log(
        `loaded available shifts for requisition ${requisitionId} in incremental`,
        {
          pageFactor: response.pageFactor,
          availableShiftsCount: response.availableShifts.total,
          filter: JSON.stringify(filter)
        }
      );
      if (response.availableShifts.total > 0) {
        const availableShifts = applySortOnShifts(
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

export const onApplyFilter = (payload: IPayload) => async (
  dispatch: Function
) => {
  const { options } = payload;
  onRemoveError()(dispatch);
  let filter = constructFilterPayload(payload);
  filter.pageFactor = 1;
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
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

  log("Applying filter", {
    filter: JSON.stringify(filter)
  });

  if (requisitionId) {
    try {
      let availableShifts: any = {};
      let pageFactor;
      if (options?.hasSortAction) {
        log("Applying sorting selected sort", {
          filter: JSON.stringify(filter)
        });
        const shiftsInRequisition = payload.data.requisition.availableShifts;
        availableShifts = applySortOnShifts(shiftsInRequisition, filter);
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
        const response = await new RequisitionService().getAllAvailableShifts(
          requisitionId,
          applicationId,
          filter
        );
        pageFactor = response.pageFactor;
        log("Applying sorting if user selected sort", {
          pageFactor: response.pageFactor,
          availableShiftsCount: response.availableShifts.total,
          filter: JSON.stringify(filter)
        });
        availableShifts = applySortOnShifts(response.availableShifts, filter);
      }
      dispatch({
        type: UPDATE_SHIFTS,
        payload: {
          availableShifts,
          pageFactor,
          shiftsEmptyOnFilter: isEmpty(availableShifts.shifts) ? true : false
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
          type: UPDATE_SHIFTS,
          payload: {
            availableShifts: {
              shifts: [],
              total: 0
            },
            shiftsEmptyOnFilter: true
          }
        });
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Unable to get shifts"
        )(dispatch);
      }
    }
  }
};

export const onResetFilters = (payload: IPayload) => async (
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

  onApplyFilter(payload)(dispatch);
};

export const selectJobRole = (payload: IPayload) => (dispatch: Function) => {
  const selectedIndex = payload.selectedRequisitionIndex;
  if (selectedIndex > -1) {
    const childRequisitions = [...payload.data.requisition.childRequisitions];
    const selectedRequisition = childRequisitions[selectedIndex];
    selectedRequisition.selected = selectedRequisition.selected ? false : true;
    childRequisitions[selectedIndex] = selectedRequisition;
    // construct locations
    const locationDescription = selectedRequisition.locationDescription;
    const searchIndex = locationDescription.lastIndexOf("(");
    const selectedLocations = payload.data.requisition.selectedLocations || [];
    const location = locationDescription.substring(
      searchIndex + 1,
      locationDescription.length - 1
    );
    const selectedLocationIndex = findIndex(selectedLocations, {
      label: location
    });
    if (selectedLocationIndex === -1) {
      selectedLocations.push({
        label: location,
        checked: false,
        value: location
      });
    } else {
      selectedLocations.splice(selectedLocationIndex, 1);
    }

    dispatch({
      type: UPDATE_SELECTED_JOB_ROLE,
      payload: {
        selectedIndex,
        selectedRequisition,
        selectedLocations
      }
    });
  }
};

export const onGetPossibleNHEDates = (payload: IPayload) => async (dispatch: Function) => {
  const hcrId = payload.data.application.jobSelected.headCountRequestId;
  const response = await new RequisitionService().getPossibleNHEDates(hcrId);

  try {
    dispatch({
      type: UPDATE_REQUISITION,
      payload: {
        possibleNHEDates: response
      }
    });
  } catch (e) {
    log("Error while fetching possible NHE dates", e);
  }
}
