import {
  CANDIDATE_ACTION_TYPES,
  GetCandidateInfoAction,
  GetCandidateInfoFailedAction,
  GetCandidateInfoSuccessAction,
  SetCandidatePatchRequestAction,
  UpdateCandidateInfoErrorAction,
  UpdateCandidateShiftPreferencesAction,
  UpdateCandidateShiftPreferencesErrorAction,
  UpdateCandidateShiftPreferencesSuccessAction
} from "./candidateActionTypes";
import { Candidate, CandidateInfoErrorState, CandidatePatchRequest } from "../../utils/types/common";
import { loadingStatusHelper } from "../../utils/helper";
import { ShiftPreferences } from "../../@types/shift-preferences";

export const actionGetCandidateInfo = (): GetCandidateInfoAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE
  };
};

export const actionGetCandidateInfoSuccess = (payload: Candidate): GetCandidateInfoSuccessAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_SUCCESS,
    payload,
    loadingStatus: loadingStatusHelper()
  };
};

export const actionGetCandidateInfoFailed = (payload: any): GetCandidateInfoFailedAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_FAILED,
    payload
  };
};

export const actionSetCandidatePatchRequest = (payload: CandidatePatchRequest): SetCandidatePatchRequestAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.SET_PATCH_REQUEST,
    payload
  };
};

export const actionUpdateCandidateInfoError = (payload: CandidateInfoErrorState): UpdateCandidateInfoErrorAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_INFO_ERROR,
    payload
  };
};

export const actionUpdateCandidateShiftPreferencesRequest =
    ( payload: ShiftPreferences, onSuccess?: Function, onError?: Function ): UpdateCandidateShiftPreferencesAction => {
      return { type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES, payload, onSuccess, onError };
    };

export const actionUpdateCandidateShiftPreferencesSuccess = (payload: ShiftPreferences): UpdateCandidateShiftPreferencesSuccessAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES_SUCCESS,
    payload,
  };
};

export const actionUpdateCandidateShiftPreferencesError = (payload: any): UpdateCandidateShiftPreferencesErrorAction => {
  return {
    type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES_ERROR,
    payload,
  };
};