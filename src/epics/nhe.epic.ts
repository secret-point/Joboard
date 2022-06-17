import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { NHETimeSlot } from "../utils/types/common";
import { GetNheTimeSlotsDsAction, NHE_ACTION_TYPES } from "../actions/NheActions/nheActionTypes";
import RequisitionService from "../services/requisition-service";
import { actionGetNheTimeSlotsDsFailed, actionGetNheTimeSlotsDsSuccess } from "../actions/NheActions/nheActions";

export const GetNheTimeSlotsDs = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(NHE_ACTION_TYPES.GET_SLOTS_DS),
        switchMap(( action: GetNheTimeSlotsDsAction ) =>
            from(new RequisitionService().availableTimeSlots(action.payload))
                .pipe(
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map(( data: NHETimeSlot[] ) => {
                        return actionGetNheTimeSlotsDsSuccess(data);
                    }),
                    catchError(( error: any ) => {
                        return of(actionGetNheTimeSlotsDsFailed({
                            error
                        }));
                    })
                )
        )
    )
};

