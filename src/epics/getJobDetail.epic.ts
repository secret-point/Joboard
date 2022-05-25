import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { GetJobDetailAction, GET_JOB_DETAIL_TYPE } from "../actions/JobActions/jobDetailActionTypes";
import { actionGetJobDetailFailed, actionGetJobDetailSuccess } from "../actions/JobActions/jobDetailActions";
import { Job } from "../utils/commonTypes";
import JobService from "../services/job-service";

export const getJobDetailEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(GET_JOB_DETAIL_TYPE.GET),
        switchMap((action: GetJobDetailAction) =>
            from(new JobService().getJobInfo(action.payload.jobId))
                .pipe(
                    switchMap(async (response) => {
                        return response
                    }),
                    map((data: Job) => {
                        return actionGetJobDetailSuccess(data);
                    }),
                    catchError((error: any) => {
                        return of(actionGetJobDetailFailed({
                            error
                        }));
                    })
                )
        )
    )
};