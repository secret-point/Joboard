import {
    CANDIDATE_ACTION_TYPES,
    GetCandidateInfoAction,
    GetCandidateInfoFailedAction,
    GetCandidateInfoSuccessAction,
    SetCandidatePatchRequestAction,
    UpdateCandidateInfoErrorAction
} from "./candidateActionTypes";
import { Candidate, CandidateInfoErrorState, CandidatePatchRequest } from "../../utils/types/common";
import { loadingStatusHelper } from "../../utils/helper";

export const actionGetCandidateInfo = (): GetCandidateInfoAction => {
    return {
        type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE
    }
}

export const actionGetCandidateInfoSuccess = (payload: Candidate): GetCandidateInfoSuccessAction => {
    return {
        type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_SUCCESS,
        payload,
        loadingStatus:loadingStatusHelper()
    }
}

export const actionGetCandidateInfoFailed = (payload: any): GetCandidateInfoFailedAction => {
    return {
        type: CANDIDATE_ACTION_TYPES.GET_CANDIDATE_FAILED,
        payload
    }
}

export const actionSetCandidatePatchRequest = (payload: CandidatePatchRequest): SetCandidatePatchRequestAction => {
    return {
        type: CANDIDATE_ACTION_TYPES.SET_PATCH_REQUEST,
        payload
    }
}

export const actionUpdateCandidateInfoError = (payload: CandidateInfoErrorState): UpdateCandidateInfoErrorAction => {
    return {
        type: CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_INFO_ERROR,
        payload
    }
}
