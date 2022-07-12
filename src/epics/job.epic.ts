import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { GET_JOB_DETAIL_TYPE, GetJobDetailAction } from "../actions/JobActions/jobDetailActionTypes";
import { actionGetJobDetailFailed, actionGetJobDetailSuccess } from "../actions/JobActions/jobDetailActions";
import JobService from "../services/job-service";
import { epicSwitchMapHelper } from "./helper";
import { GetJobInfoResponse, ProxyApiError } from "../utils/api/types";
import { GetJobInfoErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { setEpicApiCallErrorMessage } from "../utils/helper";

export const JobEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(GET_JOB_DETAIL_TYPE.GET),
    switchMap((action: GetJobDetailAction) =>
      from(new JobService().getJobInfo(action.payload.jobId))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map((response: GetJobInfoResponse) => {
            const jobData = response.data;
            return actionGetJobDetailSuccess(jobData);
          }),
          catchError((error: ProxyApiError) => {
            const errorMessage = GetJobInfoErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetJobDetailFailed(error));
          })
        )
    )
  );
};
