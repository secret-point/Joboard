import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionGetApplicationFailed, actionGetApplicationSuccess } from "../actions/ApplicationActions/applicationActions";
import { Application } from "../utils/types/common";
import { GetApplicationAction, GET_APPLICATION_TYPE } from "../actions/ApplicationActions/applicationActionTypes";
import CandidateApplicationService from "../services/candidate-application-service";

export const GetApplicationEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(GET_APPLICATION_TYPE.GET),
        switchMap((action: GetApplicationAction) =>
            from(new CandidateApplicationService().getApplication(action.payload.applicationId))
                .pipe(
                    switchMap(async (response) => {
                        return response
                    }),
                    map((data: Application) => {
                        return actionGetApplicationSuccess(data);
                    }),
                    catchError((error: any) => {
                        return of(actionGetApplicationFailed({
                            error
                        }));
                    })
                )
        )
    )
};
