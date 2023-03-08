import assessmentReducer, { initAssessmentState } from "../../../src/reducers/assessment.reducer";
import { ASSESSMENT_ACTION_TYPES } from "../../../src/actions/AssessmentActions/assessmentActionsTypes";

describe("assessment reducer", () => {
  test("should return the initial state", () => {

    const expectedResult = {
      ...initAssessmentState,
      loading: true
    };
    expect(assessmentReducer(initAssessmentState, {
      type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY,
      payload: {}
    })).toEqual(expectedResult);
  });

  test("should return the succesful payload", () => {

    const expectedResult = {
      ...initAssessmentState,
      loading: false,
      results: {
        assessmentElegibility: true
      }
    };
    expect(assessmentReducer(initAssessmentState, {
      type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_SUCCESS,
      payload: {
        assessmentElegibility: true
      }
    })).toEqual(expectedResult);
  });
  test("should return the failed payload", () => {

    const expectedResult = {
      ...initAssessmentState,
      loading: false,
      failed: true,
      results: {
        assessmentElegibility: false
      }
    };
    expect(assessmentReducer(initAssessmentState, {
      type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_FAILED,
      payload: { }
    })).toEqual(expectedResult);
  });
});