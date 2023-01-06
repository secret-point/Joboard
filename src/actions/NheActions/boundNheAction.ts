import store from "../../store/store";
import { GetNheTimeSlotRequestDs, GetNheTimeSlotRequestThroughNheDS } from "../../utils/types/common";
import { actionGetNheTimeSlotsDs, actionGetNheTimeSlotsThroughNheDs } from "./nheActions";

export const boundGetNheTimeSlotsDs = (payload: GetNheTimeSlotRequestDs) =>
  store.dispatch(actionGetNheTimeSlotsDs(payload));

export const boundGetNheTimeSlotsThroughNheDs = (payload: GetNheTimeSlotRequestThroughNheDS) =>
  store.dispatch(actionGetNheTimeSlotsThroughNheDs(payload));
