import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionGetAssessmentElegibilityFailed, actionGetAssessmentElegibilitySuccess } from "../actions/AssessmentActions/assessmentActions";
import { ASSESSMENT_ACTION_TYPES } from "../actions/AssessmentActions/assessmentActionsTypes";
import { log, LoggerType } from "../helpers/log-helper";
import CandidateApplicationService from "../services/candidate-application-service";
import { GetCandidateErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { ApiError, GetAssessmentElegibilityResponse } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";

export const GetAsssessmentElegibilityEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(ASSESSMENT_ACTION_TYPES.GET_ASSESSMENT_ELEGIBILITY),
    switchMap((action) =>
      from(new CandidateApplicationService().getAssessmentEligibility(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetAssessmentElegibilityResponse) => {
            return actionGetAssessmentElegibilitySuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] GetCandidateInfoEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            const errorMessage = GetCandidateErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetAssessmentElegibilityFailed(error));
          })
        )
    )
  );
};
