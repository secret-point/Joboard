import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import store from "../../store/store";
import { actionGetScheduleDetail, actionGetScheduleListByJobId } from "./scheduleActions";

export const boundGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest ) =>
    store.dispatch(actionGetScheduleListByJobId(payload));

export const boundGetScheduleDetail = ( payload: GetScheduleDetailRequest ) =>
    store.dispatch(actionGetScheduleDetail(payload));
