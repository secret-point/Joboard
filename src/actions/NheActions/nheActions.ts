import { GetNheTimeSlotRequestDs, GetNheTimeSlotRequestThroughNheDS, NHETimeSlot } from "../../utils/types/common";
import {
  GetNheTimeSlotsDsAction,
  GetNheTimeSlotsDsFailedAction,
  GetNheTimeSlotsDsSuccessAction,
  GetNheTimeSlotsThroughNheDsAction,
  NHE_ACTION_TYPES
} from "./nheActionTypes";

export const actionGetNheTimeSlotsThroughNheDs = (payload: GetNheTimeSlotRequestThroughNheDS): GetNheTimeSlotsThroughNheDsAction => {
  return {
    type: NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS,
    payload
  };
};

export const actionGetNheTimeSlotsDs = (payload: GetNheTimeSlotRequestDs): GetNheTimeSlotsDsAction => {
  return {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS,
    payload
  };
};

export const actionGetNheTimeSlotsDsSuccess = (payload: NHETimeSlot[]): GetNheTimeSlotsDsSuccessAction => {
  return {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS_SUCCESS,
    payload
  };
};

export const actionGetNheTimeSlotsDsFailed = (payload: any): GetNheTimeSlotsDsFailedAction => {
  return {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED,
    payload
  };
};
