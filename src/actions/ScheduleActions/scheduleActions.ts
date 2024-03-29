import { GetScheduleDetailRequest, GetScheduleListByJobIdRequest } from "../../utils/apiTypes";
import {
  GetOldScheduleDetailSuccessAction,
  GetScheduleDetailAction,
  GetScheduleDetailFailedAction,
  GetScheduleDetailSuccessAction,
  GetScheduleListByJobIdAction,
  GetScheduleListByJobIdFailedAction,
  GetScheduleListByJobIdSuccessAction,
  SCHEDULE_ACTION_TYPE,
  UpdateScheduleFiltersAction
} from "./scheduleActionTypes";
import { Schedule, ScheduleStateFilters } from "../../utils/types/common";
import { loadingStatusHelper } from "../../utils/helper";

export const actionGetScheduleListByJobId = ( payload: GetScheduleListByJobIdRequest, routeWhenEmpty: boolean ): GetScheduleListByJobIdAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB, payload, routeWhenEmpty };
};

export const actionGetScheduleListByJobIdSuccess = ( payload: Schedule[] ): GetScheduleListByJobIdSuccessAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetScheduleListByJobIdFailed = ( payload: any ): GetScheduleListByJobIdFailedAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB_FAILED, payload };
};

export const actionGetScheduleDetail =
    ( payload: GetScheduleDetailRequest, onSuccess?: Function, onError?: Function ): GetScheduleDetailAction => {
      return {
        type: SCHEDULE_ACTION_TYPE.GET_DETAIL,
        payload,
        onSuccess,
        onError
      };
    };

export const actionGetScheduleDetailSuccess = ( payload: Schedule): GetScheduleDetailSuccessAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetOldScheduleDetailSuccess = ( payload: Schedule): GetOldScheduleDetailSuccessAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_OLD_DETAIL_SUCCESS, payload, loadingStatus: loadingStatusHelper() };
};

export const actionGetScheduleDetailFailed = ( payload: any ): GetScheduleDetailFailedAction => {
  return { type: SCHEDULE_ACTION_TYPE.GET_DETAIL_FAILED, payload };
};

export const actionUpdateScheduleFilters = (payload: ScheduleStateFilters): UpdateScheduleFiltersAction => {
  return {
    type: SCHEDULE_ACTION_TYPE.UPDATE_FILTERS,
    payload
  };
};
