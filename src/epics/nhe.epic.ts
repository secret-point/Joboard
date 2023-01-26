import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionGetNheTimeSlotsDsFailed,
  actionGetNheTimeSlotsDsSuccess,
  actionGetPossibleNhePreferenceSuccess
} from "../actions/NheActions/nheActions";
import {
  GetNheTimeSlotsDsAction,
  GetNheTimeSlotsThroughNheDsAction,
  GetPossibleNhePreferencesAction,
  NHE_ACTION_TYPES
} from "../actions/NheActions/nheActionTypes";
import { PAGE_ROUTES } from "../components/pageRoutes";
import { log, LoggerType } from "../helpers/log-helper";
import RequisitionService from "../services/requisition-service";
import NheService from "../services/nhe-service";
import { GetTimeSlotsErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { ApiError, GetNheTimeSlotsDsResponse, GetPossibleNhePreferenceResponse } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, routeToAppPageWithPath, setEpicApiCallErrorMessage } from "../utils/helper";
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

            if (response.data.length === 0) {
              routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            }

            return actionGetNheTimeSlotsDsSuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] GetNheTimeSlotsDs error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            const errorMessage = GetTimeSlotsErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetNheTimeSlotsDsFailed(error));
          })
        )
    )
  );
};

export const GetNheTimeSlotsThroughNheDs = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS),
    switchMap((action: GetNheTimeSlotsThroughNheDsAction) =>
      from(new NheService().availableTimeSlots(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetNheTimeSlotsDsResponse) => {

            if (response.data.length === 0) {
              routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            }

            return actionGetNheTimeSlotsDsSuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] GetNheTimeSlotsDs error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            const errorMessage = GetTimeSlotsErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            routeToAppPageWithPath(PAGE_ROUTES.NO_AVAILABLE_TIME_SLOTS);
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetNheTimeSlotsDsFailed(error));
          })
        )
    )
  );
};

export const GetPossibleNhePreferences = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES),
    switchMap((action: GetPossibleNhePreferencesAction) =>
      from(new NheService().getPossibleNHEDates(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetPossibleNhePreferenceResponse) => {

            return actionGetPossibleNhePreferenceSuccess(response.data);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] Get Possible Nhe Preferences(dates) error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            const errorMessage = GetTimeSlotsErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];

            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetNheTimeSlotsDsFailed(error));
          })
        )
    )
  );
};

