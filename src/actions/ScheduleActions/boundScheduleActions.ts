import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import store from "../../store/store";
import { actionGetScheduleDetail, actionGetScheduleListByJobId, actionUpdateScheduleFilters } from "./scheduleActions";
import { ScheduleStateFilters } from "../../utils/types/common";

export const boundGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest, routeWhenEmpty = true ) =>
  store.dispatch(actionGetScheduleListByJobId(payload, routeWhenEmpty));

export const boundGetScheduleDetail = ( payload: GetScheduleDetailRequest, onSuccess?: Function, onError?: Function ) =>
  store.dispatch(actionGetScheduleDetail(payload, onSuccess, onError));

export const boundUpdateScheduleFilters = (payload: ScheduleStateFilters) =>
  store.dispatch(actionUpdateScheduleFilters(payload));
