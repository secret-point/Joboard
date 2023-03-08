import { Candidate, CandidateInfoErrorState, CandidatePatchRequest } from "../utils/types/common";
import { CANDIDATE_ACTION_TYPES, CandidateActionTypes } from "../actions/CandidateActions/candidateActionTypes";

export interface CandidateState {
  loading: boolean;
  results: {
    candidateData?: Candidate;
  };
  failed: boolean;
  candidatePatchRequest?: CandidatePatchRequest;
  formError: CandidateInfoErrorState;
}

export const initCandidateState: CandidateState = {
  formError: {},
  loading: false,
  failed: false,
  results: {
    candidateData: undefined
  }
};

export default function candidateReducer( state: CandidateState = initCandidateState, action: CandidateActionTypes ): CandidateState {
  switch (action.type) {
    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE:
      return {
        ...state,
        loading: true,
        failed: false,     
      };
    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        results: {
          candidateData: action.payload
        }
      };

    case CANDIDATE_ACTION_TYPES.GET_CANDIDATE_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        results: {
          candidateData: undefined
        }
      };

    case CANDIDATE_ACTION_TYPES.SET_PATCH_REQUEST: {
      return {
        ...state,
        candidatePatchRequest: action.payload
      };
    }

    case CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_INFO_ERROR:
      return {
        ...state,
        formError: action.payload
      };

    default:
      return state;
  }

}
