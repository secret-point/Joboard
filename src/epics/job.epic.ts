import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionGetJobDetailFailed, actionGetJobDetailSuccess } from "../actions/JobActions/jobDetailActions";
import { GET_JOB_DETAIL_TYPE, GetJobDetailAction } from "../actions/JobActions/jobDetailActionTypes";
import { log, LoggerType } from "../helpers/log-helper";
import JobService from "../services/job-service";
import { GetJobInfoErrorMessages, UpdateApplicationErrorMessage } from "../utils/api/errorMessages";
import { ApiError, GetJobInfoResponse } from "../utils/api/types";
import { UPDATE_APPLICATION_ERROR_CODE } from "../utils/enums/common";
import { formatLoggedApiError, setEpicApiCallErrorMessage } from "../utils/helper";
import { epicSwitchMapHelper } from "./helper";

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

            if(action.onSuccess) {
              action.onSuccess(jobData);
            }

            return actionGetJobDetailSuccess(jobData);
          }),
          catchError((error: ApiError) => {
            log(`[Epic] JobEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if(action.onError) {
              action.onError();
            }

            const errorMessage = GetJobInfoErrorMessages[error.errorCode] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);
            return of(actionGetJobDetailFailed(error));
          })
        )
    )
  );
};
