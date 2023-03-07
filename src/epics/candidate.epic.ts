import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionGetCandidateInfoFailed,
  actionGetCandidateInfoSuccess,
  actionUpdateCandidateShiftPreferencesError,
  actionUpdateCandidateShiftPreferencesSuccess
} from "../actions/CandidateActions/candidateActions";
import {
  CANDIDATE_ACTION_TYPES,
  UpdateCandidateShiftPreferencesAction
} from "../actions/CandidateActions/candidateActionTypes";
import { log, LoggerType } from "../helpers/log-helper";
import CandidateApplicationService from "../services/candidate-application-service";
import {
  GetCandidateErrorMessages,
  UpdateApplicationErrorMessage,
  UpdateCandidateShiftPreferencesErrorMessages
} from "../utils/api/errorMessages";
import {
  ApiError,
  GetCandidateResponse,
  UpdateCandidateShiftPreferencesResponse
} from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE, UPDATE_CANDIDATE_SHIFT_PREFERENCES_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";
import { ShiftPreferences } from "../@types/shift-preferences";

export const GetCandidateInfoEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(CANDIDATE_ACTION_TYPES.GET_CANDIDATE),
    switchMap(() =>
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

export const UpdateCandidateShiftPreferencesEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(CANDIDATE_ACTION_TYPES.UPDATE_CANDIDATE_SHIFT_PREFERENCES),
    switchMap(( action: UpdateCandidateShiftPreferencesAction ) =>
      from(new CandidateApplicationService().updateCandidateShiftPreferences(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map((response: UpdateCandidateShiftPreferencesResponse) => {
            const shiftPreferences: ShiftPreferences = response.data;

            if (action.onSuccess) {
              action.onSuccess(shiftPreferences);
            }

            return actionUpdateCandidateShiftPreferencesSuccess(shiftPreferences);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] UpdateCandidateShiftPreferencesEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorKey = error.errorCode || UPDATE_CANDIDATE_SHIFT_PREFERENCES_ERROR_CODE.FAILED_UPDATE_SHIFT_PREFERENCES;

            const errorMessage = UpdateCandidateShiftPreferencesErrorMessages[errorKey] || UpdateCandidateShiftPreferencesErrorMessages[UPDATE_CANDIDATE_SHIFT_PREFERENCES_ERROR_CODE.FAILED_UPDATE_SHIFT_PREFERENCES];
            setEpicApiCallErrorMessage(errorMessage);

            return of(actionUpdateCandidateShiftPreferencesError(error));
          })
        )
    )
  );
};
