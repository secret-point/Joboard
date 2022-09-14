import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionGetNheTimeSlotsDsFailed, actionGetNheTimeSlotsDsSuccess } from "../actions/NheActions/nheActions";
import { GetNheTimeSlotsDsAction, NHE_ACTION_TYPES } from "../actions/NheActions/nheActionTypes";
import { PAGE_ROUTES } from "../components/pageRoutes";
import { log, LoggerType } from "../helpers/log-helper";
import RequisitionService from "../services/requisition-service";
import { GetTimeSlotsErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { GetNheTimeSlotsDsResponse, ProxyApiError } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { routeToAppPageWithPath, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";

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

            if(response.data.length === 0) {
              routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            }

            return actionGetNheTimeSlotsDsSuccess(response.data);
          }),
          catchError((error: ProxyApiError) => {
            log(`[Epic] GetNheTimeSlotsDs error: ${error?.errorCode}`, error, LoggerType.ERROR);
            const errorMessage = GetTimeSlotsErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetNheTimeSlotsDsFailed(error));
          })
        )
    )
  );
};

