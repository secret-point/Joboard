import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload, { DaysHoursFilter } from "../@types/IPayload";
import { goTo, setLoading, onUpdatePageId } from "./actions";
import { onUpdateError, onRemoveError } from "./error-actions";
import find from "lodash/find";
import HTTPStatusCodes from "../constants/http-status-codes";
import propertyOf from "lodash/propertyOf";
import orderBy from "lodash/orderBy";
import CandidateApplicationService from "../services/candidate-application-service";
import isNil from "lodash/isNil";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";
export const UPDATE_REQUISITION = "UPDATE_REQUISITION";
export const SELECTED_REQUISITION = "SELECTED_REQUISITION";
export const UPDATE_JOB_DESCRIPTION = "UPDATE_JOB_DESCRIPTION";
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";
export const RESET_FILTERS = "RESET_FILTERS";

export const onGetRequisitionHeaderInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  if (requisitionId && isEmpty(payload.data.requisition)) {
    try {
      const response = await new RequisitionService().getRequisitionHeaderInfo(
        requisitionId
      );
      dispatch({
        type: GET_REQUISITION_HEADER_INFO,
        payload: response
      });
      setLoading(false)(dispatch);
    } catch (ex) {
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
      const response = await new RequisitionService().getChildRequisitions(
        requisitionId
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          childRequisitions: response
        }
      });
      setLoading(false)(dispatch);
    } catch (ex) {
      setLoading(false)(dispatch);
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
      const response = await new RequisitionService().getRequisition(id);
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...response
        }
      });
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
  const response = await new RequisitionService().getRequisition(requisitionId);
  dispatch({
    type: SELECTED_REQUISITION,
    payload: response
  });
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
      const response = await new RequisitionService().getJobDescription(
        childRequisitionId
      );
      dispatch({
        type: UPDATE_JOB_DESCRIPTION,
        payload: {
          jobDescription: response
        }
      });
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
      if (application) {
        application = await new CandidateApplicationService().getApplication(
          applicationId
        );
      }
      const { jobSelected } = application;
      const response = await new RequisitionService().availableTimeSlots({
        childRequisitionId: jobSelected.childRequisitionId,
        headCountRequestId: jobSelected.headCountRequestId,
        parentRequisitionId: requisitionId
      });

      if (response) {
        const nheSlots: any[] = [];
        response.forEach((slot: any) => {
          const nheSlot: any = {};
          nheSlot.value = JSON.stringify(slot);
          nheSlot.title = slot.date;
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
      }
      setLoading(false)(dispatch);
    } catch (ex) {
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
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  if (requisitionId && isEmpty(payload.data.requisition.availableShifts)) {
    try {
      const response = await new RequisitionService().getAllAvailableShifts(
        requisitionId,
        applicationId
      );
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...response
        }
      });
      setLoading(false)(dispatch);
    } catch (ex) {
      console.log(ex);
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.NOT_FOUND) {
        onUpdatePageId("no-available-shift")(dispatch);
      } else {
        onUpdateError(
          ex?.response?.data?.errorMessage || "Unable to get shifts"
        )(dispatch);
      }
    }
  }
};

export const onApplySortSelection = (payload: IPayload) => async (
  dispatch: Function
) => {
  let { availableShifts } = payload.data.requisition;
  let shifts = availableShifts.shifts;
  const selectedSortKey = propertyOf(payload.data.output)(
    "job-opportunities.sortKey"
  );
  switch (selectedSortKey) {
    case "FEATURED": {
      shifts = orderBy(availableShifts.shifts, ["fillRate"], ["asc"]);
      break;
    }
    case "PAY_RATE": {
      shifts = orderBy(availableShifts.shifts, ["totalPayRate"], ["desc"]);
      break;
    }
    case "HOURS_MOST": {
      shifts = orderBy(availableShifts.shifts, ["hoursPerWeek"], ["desc"]);
      break;
    }
    case "HOURS_LEAST": {
      shifts = orderBy(availableShifts.shifts, ["hoursPerWeek"], ["asc"]);
      break;
    }
    default: {
      console.log("Sort key is not availble");
      break;
    }
  }
  availableShifts.shifts = shifts;
  const { requisition } = payload.data;
  requisition.availableShifts = availableShifts;
  dispatch({
    type: UPDATE_REQUISITION,
    payload: {
      ...requisition
    }
  });
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

export const onApplyFilter = (payload: IPayload) => async (
  dispatch: Function
) => {
  onRemoveError()(dispatch);
  const filter = constructFilterPayload(payload);
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  if (requisitionId) {
    try {
      const response = await new RequisitionService().getAllAvailableShifts(
        requisitionId,
        applicationId,
        filter
      );
      dispatch({
        type: UPDATE_SHIFTS,
        payload: {
          ...response
        }
      });
      setLoading(false)(dispatch);
    } catch (ex) {
      console.log(ex);
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.NOT_FOUND) {
        dispatch({
          type: UPDATE_SHIFTS,
          payload: {
            availableShifts: {
              shifts: [],
              total: 0
            }
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
  const sortKey = "FEATURED";
  const maxHoursPerWeek = "40";
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

  onApplyFilter(payload)(dispatch);
};
