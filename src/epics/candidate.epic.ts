import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import CandidateApplicationService from "../services/candidate-application-service";
import { CANDIDATE_ACTION_TYPES, GetCandidateInfoAction } from "../actions/CandidateActions/candidateActionTypes";
import {
  actionGetCandidateInfoFailed,
  actionGetCandidateInfoSuccess
} from "../actions/CandidateActions/candidateActions";
import { epicSwitchMapHelper } from "./helper";
import { GetCandidateResponse } from "../utils/api/types";
import { GetCandidateErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { setEpicApiCallErrorMessage } from "../utils/helper";

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
          catchError((error: any) => {
            const errorMessage = GetCandidateErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetCandidateInfoFailed(error));
          })
        )
    )
  );
};
