import { Action } from "redux";
import { ProxyApiError } from "../../utils/api/types";
import { GetAssessmentElegibilityRequest, GetAssessmentElegibilitySucccessResponse } from "../../utils/types/common";

export enum ASSESSMENT_ACTION_TYPES {

  GET_ASSESSMENT_ELEGIBILITY = "GET_ASSESSMENT_ELEGIBILITY",
  GET_ASSESSMENT_ELEGIBILITY_SUCCESS = "GET_ASSESSMENT_ELEGIBILITY_SUCCESS",
  GET_ASSESSMENT_ELEGIBILITY_FAILED = "GET_ASSESSMENT_ELEGIBILITY_FAILED",
 
}

export interface GetAssessmentElegibilityAction extends Action {
  type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY;
  payload: GetAssessmentElegibilityRequest;
  onSuccess?: Function;
  onError?: Function;
}

export interface GetAssessmentElegibilitySuccessAction extends Action {
  type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_SUCCESS;
  payload: GetAssessmentElegibilitySucccessResponse;
}

export interface GetAssessmentElegibilityFailedAction extends Action {
  type: ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY_FAILED;
  payload: ProxyApiError;
}

export type AssessmentActionTypes =
GetAssessmentElegibilityAction|
GetAssessmentElegibilitySuccessAction|
GetAssessmentElegibilityFailedAction;
