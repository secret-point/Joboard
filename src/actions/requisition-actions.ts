import RequisitionService from "../services/requisition-service";
import isEmpty from "lodash/isEmpty";
import IPayload, { DaysHoursFilter } from "../@types/IPayload";
import { goTo, setLoading } from "./actions";
import { onUpdateError } from "./error-actions";
import { push } from "react-router-redux";
import find from "lodash/find";
import HTTPStatusCodes from "../constants/http-status-codes";
import propertyOf from "lodash/propertyOf";
import orderBy from "lodash/orderBy";
import CandidateApplicationService from "../services/candidate-application-service";

export const GET_REQUISITION_HEADER_INFO = "GET_REQUISITION_HEADER_INFO";
export const UPDATE_REQUISITION = "UPDATE_REQUISITION";
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";
export const RESET_FILTERS = "RESET_FILTERS";

export const onGetRequisitionHeaderInfo = (payload: IPayload) => async (
  dispatch: Function
) => {
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

export const onGetRequisition = (
  payload: IPayload,
  childRequisitionId?: string
) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  const id = childRequisitionId || payload.urlParams?.requisitionId;
  if (id) {
    try {
      const response = await new RequisitionService().getRequisition(id);
      let requisition = response;
      if (childRequisitionId) {
        requisition = {
          selectedChildRequisition: response
        };
      }
      dispatch({
        type: UPDATE_REQUISITION,
        payload: {
          ...requisition
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

export const onGetJobDescription = (
  payload: IPayload,
  requisitionId?: string
) => async (dispatch: Function) => {
  setLoading(true)(dispatch);
  const childRequisitionId = requisitionId
    ? requisitionId
    : payload.urlParams?.misc;
  if (childRequisitionId) {
    try {
      if (!payload.data.requisition.selectedChildRequisition) {
        onGetRequisition(payload, childRequisitionId)(dispatch);
      }
      const response = await new RequisitionService().getJobDescription(
        childRequisitionId
      );
      dispatch({
        type: UPDATE_REQUISITION,
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
  const { requisitionId, applicationId } = payload.urlParams;
  const { goTo } = payload.options;
  const childRequisitionId =
    payload.selectedRequisitionId ||
    payload.data.requisition.selectedChildRequisition.requisitionId;
  const path = `/app/${goTo}/${requisitionId}/${applicationId}/${childRequisitionId}`;

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

  onGetJobDescription(payload, childRequisitionId)(dispatch);
  dispatch({
    type: UPDATE_REQUISITION,
    payload: {
      selectedChildRequisition: childRequisition
    }
  });
  dispatch(push(path));
};

export const onGetNHETimeSlots = (payload: IPayload) => async (
  dispatch: Function
) => {
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
      const response = await new RequisitionService().getTimeSlots(
        application.jobSelected.childRequisitionId
      );

      if (response) {
        const nheSlots: any[] = [];
        response.forEach((slot: any) => {
          const nheSlot: any = {};
          nheSlot.value = JSON.stringify(slot);
          nheSlot.title = slot.date;
          const nheSlotLocation: string =
            slot.location.streetAddress +
            ", " +
            slot.location.city +
            ", " +
            slot.location.state +
            ", " +
            slot.location.postalCode;
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
  setLoading(true)(dispatch);
  const requisitionId = payload.urlParams?.requisitionId;
  const applicationId = payload.urlParams?.applicationId;
  if (requisitionId) {
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
      const { urlParams } = payload;
      setLoading(false)(dispatch);
      if (ex?.response?.status === HTTPStatusCodes.NOT_FOUND) {
        goTo(
          `/no-available-shift/${urlParams.requisitionId}/${urlParams.applicationId}`
        )(dispatch);
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
      shifts = orderBy(availableShifts.shifts, ["basePayRate"], ["desc"]);
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
