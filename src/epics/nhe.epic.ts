import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { GetNheTimeSlotsDsAction, NHE_ACTION_TYPES } from "../actions/NheActions/nheActionTypes";
import RequisitionService from "../services/requisition-service";
import { actionGetNheTimeSlotsDsFailed, actionGetNheTimeSlotsDsSuccess } from "../actions/NheActions/nheActions";
import { epicSwitchMapHelper } from "./helper";
import { GetNheTimeSlotsDsResponse, ProxyApiError } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { GetTimeSlotsErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { setEpicApiCallErrorMessage } from "../utils/helper";

export const GetNheTimeSlotsDs = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(NHE_ACTION_TYPES.GET_SLOTS_DS),
    switchMap((action: GetNheTimeSlotsDsAction) =>
      from(new RequisitionService().availableTimeSlots(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetNheTimeSlotsDsResponse) => {

            return actionGetNheTimeSlotsDsSuccess(response.data);
          }),
          catchError((error: ProxyApiError) => {
            const errorMessage = GetTimeSlotsErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetNheTimeSlotsDsFailed(error));
          })
        )
    )
  );
};

