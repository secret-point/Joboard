import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionGetCandidateInfoFailed,
  actionGetCandidateInfoSuccess
} from "../actions/CandidateActions/candidateActions";
import { CANDIDATE_ACTION_TYPES, GetCandidateInfoAction } from "../actions/CandidateActions/candidateActionTypes";
import { log, LoggerType } from "../helpers/log-helper";
import CandidateApplicationService from "../services/candidate-application-service";
import { GetCandidateErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { ApiError, GetCandidateResponse } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";

export const GetCandidateInfoEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(CANDIDATE_ACTION_TYPES.GET_CANDIDATE),
    switchMap((action: GetCandidateInfoAction) =>
      from(new CandidateApplicationService().getCandidate())
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetCandidateResponse) => {
            return actionGetCandidateInfoSuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] GetCandidateInfoEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            const errorMessage = GetCandidateErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetCandidateInfoFailed(error));
          })
        )
    )
  );
};
