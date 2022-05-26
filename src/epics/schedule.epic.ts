import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
    GetScheduleDetailAction,
    GetScheduleListByJobIdAction,
    SCHEDULE_ACTION_TYPE
} from "../actions/ScheduleActions/scheduleActionTypes";
import JobService from "../services/job-service";
import {
    actionGetScheduleDetailFailed,
    actionGetScheduleDetailSuccess,
    actionGetScheduleListByJobIdFailed,
    actionGetScheduleListByJobIdSuccess
} from "../actions/ScheduleActions/scheduleActions";
import { ScheduleListResponse } from "../utils/api/types";
import { Schedule } from "../utils/types/common";

export const GetScheduleListByJobIdEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(SCHEDULE_ACTION_TYPE.GET_LIST_BY_JOB),
        switchMap((action: GetScheduleListByJobIdAction) =>
            from(new JobService().getAllSchedules(action.payload))
                .pipe(
                    switchMap(async (response: ScheduleListResponse) => {
                        return response?.availableSchedules?.schedules || [];
                    }),
                    map((data: Schedule[]) => {
                        return actionGetScheduleListByJobIdSuccess(data);
                    }),
                    catchError((error: any) => {
                        return of(actionGetScheduleListByJobIdFailed({
                            error
                        }));
                    })
                )
        )
    )
};

export const GetScheduleDetailEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(SCHEDULE_ACTION_TYPE.GET_DETAIL),
        switchMap((action: GetScheduleDetailAction) =>
            from(new JobService().getScheduleDetailByScheduleId(action.payload.scheduleId))
                .pipe(
                    switchMap(async (response: Schedule) => {
                        return response
                    }),
                    map((data: Schedule) => {
                        if(action.onSuccess) {
                            action.onSuccess()
                        }

                        return actionGetScheduleDetailSuccess(data);
                    }),
                    catchError((error: any) => {
                        if(action.onError) {
                            action.onError()
                        }

                        return of(actionGetScheduleDetailFailed({
                            error
                        }));
                    })
                )
        )
    )
};
