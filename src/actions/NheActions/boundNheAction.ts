import store from "../../store/store";
import {
  GetNheTimeSlotRequestDs,
  GetNheTimeSlotRequestThroughNheDS,
  GetPossibleNhePreferenceRequest,
  SavePossibleNhePreferenceRequest
} from "../../utils/types/common";
import {
  actionGetNheTimeSlotsDs,
  actionGetNheTimeSlotsThroughNheDs,
  actionGetPossibleNhePreference,
  actionSetPossibleNhePreferenceRequest
} from "./nheActions";

export const boundGetNheTimeSlotsDs = (payload: GetNheTimeSlotRequestDs, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionGetNheTimeSlotsDs(payload, onSuccess, onError));

export const boundGetNheTimeSlotsThroughNheDs = (payload: GetNheTimeSlotRequestThroughNheDS, redirectWhenNoData = true, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionGetNheTimeSlotsThroughNheDs(payload, redirectWhenNoData, onSuccess, onError));

export const boundGetPossibleNhePreference = (payload: GetPossibleNhePreferenceRequest) =>
  store.dispatch(actionGetPossibleNhePreference(payload));

export const boundSetPossibleNhePreferenceRequest = (payload: SavePossibleNhePreferenceRequest) =>
  store.dispatch(actionSetPossibleNhePreferenceRequest(payload));
