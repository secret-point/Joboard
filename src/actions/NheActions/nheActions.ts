import {
  GetNheTimeSlotRequestDs,
  GetNheTimeSlotRequestThroughNheDS,
  GetPossibleNhePreferenceRequest,
  NHETimeSlot,
  PossibleNhePreferenceConfig,
  SavePossibleNhePreferenceRequest
} from "../../utils/types/common";
import {
  GetNheTimeSlotsDsAction,
  GetNheTimeSlotsDsFailedAction,
  GetNheTimeSlotsDsSuccessAction,
  GetNheTimeSlotsThroughNheDsAction,
  GetPossibleNhePreferencesAction,
  GetPossibleNhePreferencesFailedAction,
  GetPossibleNhePreferencesSuccessAction,
  NHE_ACTION_TYPES,
  SetPossibleNhePreferenceRequestAction
} from "./nheActionTypes";

export const actionGetNheTimeSlotsThroughNheDs = (payload: GetNheTimeSlotRequestThroughNheDS, redirectWhenNoData: boolean): GetNheTimeSlotsThroughNheDsAction => {
  return {
    type: NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS,
    redirectWhenNoData,
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

export const actionGetPossibleNhePreference = (payload: GetPossibleNhePreferenceRequest): GetPossibleNhePreferencesAction => {
  return {
    type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES,
    payload
  };
};

export const actionGetPossibleNhePreferenceSuccess = (payload: PossibleNhePreferenceConfig): GetPossibleNhePreferencesSuccessAction => {
  return {
    type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_SUCCESS,
    payload
  };
};

export const actionGetPossibleNhePreferenceFailed = (payload: any): GetPossibleNhePreferencesFailedAction => {
  return {
    type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_FAILED,
    payload
  };
};
export const actionSetPossibleNhePreferenceRequest = (payload: SavePossibleNhePreferenceRequest): SetPossibleNhePreferenceRequestAction => {
  return {
    type: NHE_ACTION_TYPES.SET_POSSIBLE_NHE_PREFERENCE_REQUEST,
    payload
  };
};

