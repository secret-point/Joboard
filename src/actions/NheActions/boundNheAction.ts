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

export const boundGetNheTimeSlotsDs = (payload: GetNheTimeSlotRequestDs) =>
  store.dispatch(actionGetNheTimeSlotsDs(payload));

export const boundGetNheTimeSlotsThroughNheDs = (payload: GetNheTimeSlotRequestThroughNheDS, redirectWhenNoData = true) =>
  store.dispatch(actionGetNheTimeSlotsThroughNheDs(payload, redirectWhenNoData));

export const boundGetPossibleNhePreference = (payload: GetPossibleNhePreferenceRequest) =>
  store.dispatch(actionGetPossibleNhePreference(payload));

export const boundSetPossibleNhePreferenceRequest = (payload: SavePossibleNhePreferenceRequest) =>
  store.dispatch(actionSetPossibleNhePreferenceRequest(payload));
