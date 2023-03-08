import { AssessmentActionTypes, ASSESSMENT_ACTION_TYPES } from "../actions/AssessmentActions/assessmentActionsTypes";

export interface AssessmentState {
  loading: boolean;
  results: {
    // boolean for the response from the API
    // and null as a default value to avoid subsequent calls to the API once the elegibility has been determined 
    assessmentElegibility: boolean | null;
  };
  failed: boolean;
  
}

export const initAssessmentState: AssessmentState = {
  loading: false,
  failed: false,
  results: {
    assessmentElegibility: null
  }
};

export default function assessmentReducer( state: AssessmentState = initAssessmentState, action: AssessmentActionTypes ): AssessmentState {
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
