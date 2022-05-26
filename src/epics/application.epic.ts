import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionCreateApplicationDSFailed, actionCreateApplicationDSSuccess, actionGetApplicationFailed, actionGetApplicationSuccess } from "../actions/ApplicationActions/applicationActions";
import { Application } from "../utils/types/common";
import { CreateApplicationActionDS, CREATE_APPLICATION_TYPE, GetApplicationAction, GET_APPLICATION_TYPE } from "../actions/ApplicationActions/applicationActionTypes";
import CandidateApplicationService from "../services/candidate-application-service";
import { CreateApplicationResponseDS } from "../utils/apiTypes";

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

export const CreateApplicationDSEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(CREATE_APPLICATION_TYPE.CREATE),
        switchMap((action: CreateApplicationActionDS) =>
            from(new CandidateApplicationService().createApplicationDS(action.payload))
                .pipe(
                    switchMap(async (response) => {
                        return response
                    }),
                    map((data: CreateApplicationResponseDS) => {
                        if (action.onSuccess) action.onSuccess(data.applicationId);
                        return actionCreateApplicationDSSuccess(data);
                    }),
                    catchError((error: any) => {
                        if (action.onError) action.onError();
                        return of(actionCreateApplicationDSFailed({
                            error
                        }));
                    })
                )
        )
    )
};