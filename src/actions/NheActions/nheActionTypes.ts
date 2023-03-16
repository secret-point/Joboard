import { Action } from "redux";
import {
  GetNheTimeSlotRequestDs,
  GetNheTimeSlotRequestThroughNheDS,
  GetPossibleNhePreferenceRequest,
  NHETimeSlot,
  PossibleNhePreferenceConfig, SavePossibleNhePreferenceRequest
} from "../../utils/types/common";

export enum NHE_ACTION_TYPES {
  GET_SLOTS_DS = "GET_AVAILABLE_TIME_SLOTS_DS",
  GET_SLOTS_THROUGH_NHE_DS = "GET_AVAILABLE_TIME_SLOTS_THROUGH_NHE_DS",
  GET_SLOTS_DS_SUCCESS = "GET_AVAILABLE_TIME_SLOTS_DS_SUCCESS",
  GET_SLOTS_DS_FAILED = "GET_AVAILABLE_TIME_SLOTS_DS_FAILED",
  GET_POSSIBLE_NHE_PREFERENCES = "GET_POSSIBLE_NHE_PREFERENCES",
  GET_POSSIBLE_NHE_PREFERENCES_SUCCESS = "GET_POSSIBLE_NHE_PREFERENCES_SUCCESS",
  GET_POSSIBLE_NHE_PREFERENCES_FAILED = "GET_POSSIBLE_NHE_PREFERENCES_FAILED",
  SET_POSSIBLE_NHE_PREFERENCE_REQUEST = "SET_POSSIBLE_NHE_PREFERENCE_REQUEST"
}

export interface GetNheTimeSlotsDsAction extends Action {
  type: NHE_ACTION_TYPES.GET_SLOTS_DS;
  payload: GetNheTimeSlotRequestDs;
  onSuccess?: Function;
  onError?: Function;
}

export interface GetNheTimeSlotsThroughNheDsAction extends Action {
  type: NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS;
  redirectWhenNoData: boolean;
  payload: GetNheTimeSlotRequestThroughNheDS;
  onSuccess?: Function;
  onError?: Function;
}

export interface GetNheTimeSlotsDsSuccessAction extends Action {
  type: NHE_ACTION_TYPES.GET_SLOTS_DS_SUCCESS;
  payload: NHETimeSlot[];
}

export interface GetNheTimeSlotsDsFailedAction extends Action {
  type: NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED;
  payload: any;
}

export interface GetPossibleNhePreferencesAction extends Action {
  type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES;
  payload: GetPossibleNhePreferenceRequest;
}

export interface GetPossibleNhePreferencesSuccessAction extends Action {
  type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_SUCCESS;
  payload: PossibleNhePreferenceConfig;
}

export interface GetPossibleNhePreferencesFailedAction extends Action {
  type: NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_FAILED;
  payload: any;
}

export interface SetPossibleNhePreferenceRequestAction extends Action {
  type: NHE_ACTION_TYPES.SET_POSSIBLE_NHE_PREFERENCE_REQUEST;
  payload: SavePossibleNhePreferenceRequest;
}

export type NheTimeSlotsActions =
    GetNheTimeSlotsDsAction |
    GetNheTimeSlotsDsSuccessAction |
    GetNheTimeSlotsDsFailedAction |
    GetNheTimeSlotsThroughNheDsAction |
    GetPossibleNhePreferencesAction |
    GetPossibleNhePreferencesSuccessAction |
    GetPossibleNhePreferencesFailedAction |
    SetPossibleNhePreferenceRequestAction;
