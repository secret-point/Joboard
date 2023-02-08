import store from "../../store/store";
import { GetAssessmentElegibilityErrorState, GetAssessmentElegibilityRequest, GetAssessmentElegibilitySucccessResponse } from "../../utils/types/common";

import {
  actionGetAssessmentElegibility, actionGetAssessmentElegibilityFailed, actionGetAssessmentElegibilitySuccess
} from "./assessmentActions";

export const boundGetAssessmentElegibility = (payload: GetAssessmentElegibilityRequest, onSuccess?: Function,) =>
  store.dispatch(actionGetAssessmentElegibility(payload, onSuccess));

export const boundGetAssessmentElegibilitySuccess = (payload: GetAssessmentElegibilitySucccessResponse, ) =>
  store.dispatch(actionGetAssessmentElegibilitySuccess(payload));

export const boundGetAssessmentElegibilityFailed = (payload: GetAssessmentElegibilityErrorState, ) =>
  store.dispatch(actionGetAssessmentElegibilityFailed(payload));
