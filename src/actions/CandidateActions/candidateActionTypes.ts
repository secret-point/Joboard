import { Action } from "redux";
import { Candidate, CandidateInfoErrorState, CandidatePatchRequest } from "../../utils/types/common";

export enum CANDIDATE_ACTION_TYPES {
    GET_CANDIDATE = 'GET_CANDIDATE_INFO',
    GET_CANDIDATE_SUCCESS = 'GET_CANDIDATE_INFO_SUCCESS',
    GET_CANDIDATE_FAILED = 'GET_CANDIDATE_INFO_FAILED',
    SET_PATCH_REQUEST = "SET_PATCH_REQUEST",
    UPDATE_CANDIDATE_INFO_ERROR = "UPDATE_CANDIDATE_INFO_ERROR"
}

export interface GetCandidateInfoAction extends Action {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE;
}

export interface GetCandidateInfoSuccessAction extends Action {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_SUCCESS,
    payload: Candidate
}

export interface GetCandidateInfoFailedAction extends Action {
    type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_FAILED,
    payload: any // TODO to be aligned after error handling
}

export interface SetCandidatePatchRequestAction extends Action {
    type: CANDIDATE_ACTION_TYPES.SET_PATCH_REQUEST,
    payload: CandidatePatchRequest
}

export interface UpdateCandidateInfoErrorAction extends Action {
    type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_INFO_ERROR
    payload: CandidateInfoErrorState
}

export type CandidateActionTypes =
    GetCandidateInfoAction |
    GetCandidateInfoSuccessAction |
    GetCandidateInfoFailedAction |
    SetCandidatePatchRequestAction |
    UpdateCandidateInfoErrorAction ;
