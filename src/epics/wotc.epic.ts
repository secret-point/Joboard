import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionUpdateWotcStatusFailed, actionUpdateWotcStatusSuccess } from "../actions/WotcActions/wotcActions";
import { UpdateWotcStatusAction, WOTC_ACTION_TYPES } from "../actions/WotcActions/wotcActionTypes";
import { log, LoggerType } from "../helpers/log-helper";
import CandidateApplicationService from "../services/candidate-application-service";
import { UpdateApplicationErrorMessage, UpdateWotcStatusErrorMessages } from "../utils/api/errorMessages";
import { ApiError, UpdateWotcStatusResponse } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";

export const UpdateWotcStatusEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(WOTC_ACTION_TYPES.UPDATE_WOTC_STATUS),
    switchMap((action: UpdateWotcStatusAction) =>
      from(new CandidateApplicationService().updateWOTCStatus(action.payload.applicationId, action.payload.candidateId, action.payload.status))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: UpdateWotcStatusResponse) => {
            log("[Epic] UpdateWotcStatusEpic successful", response);
            if (action.onSuccess) {
              action.onSuccess(response.data);
            }

            return actionUpdateWotcStatusSuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] UpdateWotcStatusEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorMessage = UpdateWotcStatusErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionUpdateWotcStatusFailed(error));
          })
        )
    )
  );
};
