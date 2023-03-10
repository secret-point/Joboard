import store from "../../store/store";
import {
  actionGetCandidateInfo,
  actionSetCandidatePatchRequest,
  actionUpdateCandidateInfoError,
  actionUpdateCandidateShiftPreferencesRequest,
} from "./candidateActions";
import { CandidateInfoErrorState, CandidatePatchRequest } from "../../utils/types/common";
import { CandidateShiftPreferences } from "../../@types/shift-preferences";

export const boundGetCandidateInfo = () => store.dispatch(actionGetCandidateInfo());

export const boundSetCandidatePatchRequest = (candidate: CandidatePatchRequest) =>
  store.dispatch(actionSetCandidatePatchRequest(candidate));

export const boundUpdateCandidateInfoError = (payload: CandidateInfoErrorState) =>
  store.dispatch(actionUpdateCandidateInfoError(payload));

export const boundUpdateCandidateShiftPreferencesRequest = (payload: CandidateShiftPreferences, onSuccess?: Function, onError?: Function) => {
  store.dispatch(actionUpdateCandidateShiftPreferencesRequest(payload, onSuccess, onError));
};

