import { AssessmentActionTypes, ASSESSMENT_ACTION_TYPES } from "../actions/AssessmentActions/assessmentActionsTypes";

export interface AssessmentState {
  loading: boolean;
  results: {
    assessmentElegibility: boolean;
  };
  failed: boolean;
  
}

export const initCandidateState: AssessmentState = {
  loading: false,
  failed: false,
  results: {
    assessmentElegibility: false
  }
};

export default function assessmentReducer( state: AssessmentState = initCandidateState, action: AssessmentActionTypes ): AssessmentState {
  switch (action.type) {
    case ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY:
      return {
        ...state,
        loading: true,
        failed: false,     
      };
    case ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_SUCCESS: 
      return {
        ...state,
        loading: false,
        failed: false,
        results: {
          assessmentElegibility: action.payload.assessmentElegibility
        }
      };

    case ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_FAILED: 
      return {
        ...state,
        loading: false,
        failed: true,
        results: {
          assessmentElegibility: false
        }
      };

    default:
      return state;
  }

}
