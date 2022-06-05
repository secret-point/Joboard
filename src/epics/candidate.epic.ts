import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import CandidateApplicationService from "../services/candidate-application-service";
import { CANDIDATE_ACTION_TYPES, GetCandidateInfoAction } from "../actions/CandidateActions/candidateActionTypes";
import { Candidate } from "../utils/types/common";
import {
    actionGetCandidateInfoFailed,
    actionGetCandidateInfoSuccess
} from "../actions/CandidateActions/candidateActions";

export const GetCandidateInfoEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(CANDIDATE_ACTION_TYPES.GET_CANDIDATE),
        switchMap(( action: GetCandidateInfoAction ) =>
            from(new CandidateApplicationService().getCandidate())
                .pipe(
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map(( data: Candidate ) => {
                        return actionGetCandidateInfoSuccess(data);
                    }),
                    catchError(( error: any ) => {
                        return of(actionGetCandidateInfoFailed({
                            error
                        }));
                    })
                )
        )
    )
};
