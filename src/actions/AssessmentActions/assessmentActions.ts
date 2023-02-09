import { ProxyApiError } from "../../utils/api/types";
import { GetAssessmentElegibilityRequest, GetAssessmentElegibilitySucccessResponse } from "../../utils/types/common";
import { ASSESSMENT_ACTION_TYPES, GetAssessmentElegibilityAction, GetAssessmentElegibilityFailedAction, GetAssessmentElegibilitySuccessAction } from "./assessmentActionsTypes";

export const actionGetAssessmentElegibility = (payload: GetAssessmentElegibilityRequest, onSuccess?: Function, onError?: Function): GetAssessmentElegibilityAction => {
  return { type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY, payload, onSuccess, onError };
};

export const actionGetAssessmentElegibilitySuccess = (payload: GetAssessmentElegibilitySucccessResponse): GetAssessmentElegibilitySuccessAction => {
  return { type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_SUCCESS, payload };
};

export const actionGetAssessmentElegibilityFailed = (payload: ProxyApiError): GetAssessmentElegibilityFailedAction => {
  return { type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_FAILED, payload };
};