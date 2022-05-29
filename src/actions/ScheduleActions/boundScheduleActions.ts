import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import store from "../../store/store";
import { actionGetScheduleDetail, actionGetScheduleListByJobId, actionUpdateScheduleFilters } from "./scheduleActions";
import { ScheduleStateFilters } from "../../reducers/schedule.reducer";

export const boundGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest ) =>
    store.dispatch(actionGetScheduleListByJobId(payload));

export const boundGetScheduleDetail = ( payload: GetScheduleDetailRequest, onSuccess?: Function, onError?: Function ) =>
    store.dispatch(actionGetScheduleDetail(payload, onSuccess, onError));

export const boundUpdateScheduleFilters = (payload: ScheduleStateFilters) =>
    store.dispatch(actionUpdateScheduleFilters(payload));
