import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { actionCreateApplicationAndSkipScheduleDSFailed, actionCreateApplicationAndSkipScheduleDSSuccess, actionCreateApplicationDSFailed, actionCreateApplicationDSSuccess, actionGetApplicationFailed, actionGetApplicationSuccess, actionUpdateApplicationDSFailed, actionUpdateApplicationDSSuccess, actionUpdateWorkflowName, actionUpdateWorkflowNameFailed, actionUpdateWorkflowNameSuccess } from "../actions/ApplicationActions/applicationActions";
import { Application } from "../utils/types/common";
import { CreateApplicationActionDS, CreateApplicationAndSkipScheduleActionDS, CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE, CREATE_APPLICATION_TYPE, GetApplicationAction, GetApplicationSuccessAction, GET_APPLICATION_TYPE, UpdateApplicationActionDS, UpdateWorkflowStepNameAction, UPDATE_APPLICATION_TYPE, UPDATE_WORKFLOW_NAME_TYPE } from "../actions/ApplicationActions/applicationActionTypes";
import CandidateApplicationService from "../services/candidate-application-service";
import { completeTask, loadWorkflowDS } from "../actions/WorkflowActions/workflowActions";
import store from "../store/store";
import { actionWorkflowRequestEnd, actionWorkflowRequestInit, actionWorkflowRequestStart } from "../actions/UiActions/uiActions";
import { routeToAppPageWithPath, sanitizeApplicationData } from "../utils/helper";
import { APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE, APPLICATION_STATE_TO_STEP_NAME, STEPS_NOT_CONNECT_WORKFLOW_SERVICE } from "../constants";
import { QUERY_PARAMETER_NAME } from "../utils/enums/common";
import { CONSENT } from "../components/pageRoutes";
import { boundWorkflowRequestStart } from "../actions/UiActions/boundUi";
import { WORKFLOW_STEP_NAME } from "../utils/constants/common";

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

export const GetApplicationSuccessEpic = (action$: Observable<any>) => {
    return action$.pipe(
      ofType(GET_APPLICATION_TYPE.SUCCESS),
      map((action) => {
        const applicationData: Application = sanitizeApplicationData(action.payload);
        const state = store.getState();
        // Dont initiate Workflow when workflowStepName is in STEPS_NOT_CONNECT_WORKFLOW_SERVICE
        // Dont initiate Workflow when currentState is in APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE
        if(
            APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.currentState) ||
            STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
        ){
            const stepName = STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
            ? applicationData.workflowStepName
            : APPLICATION_STATE_TO_STEP_NAME[applicationData.currentState];

            routeToAppPageWithPath(stepName);
        } else {
            if(state.appConfig.results?.envConfig){
                loadWorkflowDS(
                    applicationData.jobScheduleSelected.jobId || "",
                    applicationData.jobScheduleSelected.scheduleId || "",
                    applicationData.applicationId,
                    applicationData.candidateId,
                    state.appConfig.results.envConfig
                );
                return actionWorkflowRequestInit();
            } else {
                return actionWorkflowRequestEnd();
            }
        }
      })
    );
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
                    map((data: Application) => {
                        if (action.onSuccess) action.onSuccess(data);
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

export const UpdateApplicationDSEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(UPDATE_APPLICATION_TYPE.UPDATE),
        switchMap((action: UpdateApplicationActionDS) =>
            from(new CandidateApplicationService().updateApplication(action.payload))
                .pipe(
                    switchMap(async (response) => {
                        return response
                    }),
                    map((data: Application) => {
                        if (action.onSuccess) action.onSuccess(data);
                        return actionUpdateApplicationDSSuccess(data);
                    }),
                    catchError((error: any) => {
                        if (action.onError) action.onError();
                        return of(actionUpdateApplicationDSFailed({
                            error
                        }));
                    })
                )
        )
    )
};

export const UpdateWorkflowStepNameEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(UPDATE_WORKFLOW_NAME_TYPE.UPDATE),
        switchMap((action: UpdateWorkflowStepNameAction) =>
            from(new CandidateApplicationService().updateWorkflowStepName(action.payload.applicationId, action.payload.workflowStepName))
                .pipe(
                    switchMap(async (response) => {
                        return response
                    }),
                    map((data: Application) => {
                        if (action.onSuccess) action.onSuccess(data.applicationId);
                        return actionUpdateWorkflowNameSuccess(data);
                    }),
                    catchError((error: any) => {
                        if (action.onError) action.onError(error);
                        return of(actionUpdateWorkflowNameFailed({
                            error
                        }));
                    })
                )
        )
    )
};

export const CreateApplicationAndSkipScheduleDSEpic = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(CREATE_APPLICATION_AND_SKIP_SCHEDULE_TYPE.CREATE),
        switchMap((action: CreateApplicationAndSkipScheduleActionDS) =>
            from(new CandidateApplicationService().createApplicationDS(action.payload)).pipe(
                switchMap(async (response) => {
                    return response
                }),
                map((data: Application) => {
                    if (action.onSuccess) action.onSuccess(data);
                    createApplicationAndSkipScheduleHelper(data);
                    return actionCreateApplicationAndSkipScheduleDSSuccess(data);
                }),
                catchError((error: any) => {
                    if (action.onError) action.onError(error);
                    return of(actionCreateApplicationAndSkipScheduleDSFailed({
                        error
                    }));
                })
            )       
        )
    )
};

export const createApplicationAndSkipScheduleHelper = (createApplicationResponse: Application) => {
    const state = store.getState();
    const jobId = createApplicationResponse.jobScheduleSelected?.jobId;
    const scheduleId = createApplicationResponse.jobScheduleSelected?.scheduleId;
    const applicationId = createApplicationResponse.applicationId;
    const candidateId = createApplicationResponse.candidateId;
    const scheduleDetail = state.schedule.scheduleDetail;
    if(scheduleId && state.appConfig.results?.envConfig){
        window.hasCompleteTaskOnSkipSchedule = () => {
            routeToAppPageWithPath(CONSENT, [
                {paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: applicationId},
                {paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID, paramValue: scheduleId}])
            completeTask(createApplicationResponse, WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES, undefined, undefined, jobId, scheduleDetail);
        }
        boundWorkflowRequestStart();
        loadWorkflowDS(
            jobId || "",
            scheduleId || "",
            applicationId,
            candidateId,
            state.appConfig.results.envConfig
        );
    } else {
        throw new Error('');
    }
}
