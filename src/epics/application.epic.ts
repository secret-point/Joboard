import { from, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionCreateApplicationAndSkipScheduleDSFailed,
  actionCreateApplicationAndSkipScheduleDSSuccess,
  actionCreateApplicationDSSuccess,
  actionGetApplicationFailed,
  actionGetApplicationSuccess,
  actionUpdateApplicationDSFailed,
  actionUpdateApplicationDSSuccess,
  actionUpdateWorkflowNameFailed,
  actionUpdateWorkflowNameSuccess
} from "../actions/ApplicationActions/applicationActions";
import { Application } from "../utils/types/common";
import {
  APPLICATION_ACTION_TYPES,
  CreateApplicationActionDS,
  CreateApplicationAndSkipScheduleActionDS,
  GetApplicationAction,
  UpdateApplicationActionDS,
  UpdateWorkflowStepNameAction
} from "../actions/ApplicationActions/applicationActionTypes";
import CandidateApplicationService from "../services/candidate-application-service";
import {
  actionWorkflowRequestEnd,
  actionWorkflowRequestInit,
  completeTask,
  loadWorkflowDS,
  onCompleteTaskHelper,
  startOrResumeWorkflowDS
} from "../actions/WorkflowActions/workflowActions";
import store from "../store/store";
import {
  createUpdateApplicationRequest,
  routeToAppPageWithPath,
  sanitizeApplicationData,
  setEpicApiCallErrorMessage
} from "../utils/helper";
import {
  APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE,
  APPLICATION_STATE_TO_STEP_NAME,
  STEPS_NOT_CONNECT_WORKFLOW_SERVICE
} from "../constants";
import {
  CREATE_APPLICATION_ERROR_CODE,
  GET_APPLICATION_ERROR_CODE,
  QUERY_PARAMETER_NAME,
  UPDATE_APPLICATION_API_TYPE,
  WORKFLOW_STEP_NAME
} from "../utils/enums/common";
import { boundWorkflowRequestStart } from "../actions/WorkflowActions/boundWorkflowActions";
import { epicSwitchMapHelper } from "./helper";
import {
  CreateApplicationResponse,
  GetApplicationResponse,
  ProxyApiError,
  UpdateApplicationResponse,
  UpdateWorkflowNameResponse
} from "../utils/api/types";
import {
  CreateApplicationErrorMessage,
  GetApplicationErrorMessage,
  UpdateApplicationErrorMessage
} from "../utils/api/errorMessages";
import { PAGE_ROUTES } from "../components/pageRoutes";
import { boundUpdateApplicationDS } from "../actions/ApplicationActions/boundApplicationActions";
import { SelectedScheduleForUpdateApplication } from "../utils/apiTypes";

const { CONSENT } = PAGE_ROUTES;

export const GetApplicationEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(APPLICATION_ACTION_TYPES.GET_APPLICATION),
        switchMap(( action: GetApplicationAction ) =>
            from(new CandidateApplicationService().getApplication(action.payload.applicationId))
                .pipe(
                    switchMap(epicSwitchMapHelper),
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map(( response: GetApplicationResponse ) => {
                      const application: Application = response.data;

                      if (action.onSuccess) {
                        action.onSuccess(application)
                      }
                        return actionGetApplicationSuccess(application);
                    }),
                    catchError(( error: ProxyApiError ) => {
                      if(action.onError){
                        action.onError(error);
                      }

                      const errorMessage = GetApplicationErrorMessage[error.errorCode] || GetApplicationErrorMessage[GET_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
                      setEpicApiCallErrorMessage(errorMessage);

                        return of(actionGetApplicationFailed(error));
                    })
                )
        )
    )
};

export const GetApplicationSuccessEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS),
        map(( action ) => {
            const applicationData: Application = sanitizeApplicationData(action.payload);
            const state = store.getState();
            // Dont initiate Workflow when workflowStepName is in STEPS_NOT_CONNECT_WORKFLOW_SERVICE
            // Dont initiate Workflow when currentState is in APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE
            if(
                APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.currentState) ||
                STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
            ) {
                const stepName = STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
                    ? applicationData.workflowStepName
                    : APPLICATION_STATE_TO_STEP_NAME[applicationData.currentState];

                routeToAppPageWithPath(stepName);
            }
            else {
                if(state.appConfig.results?.envConfig && !window?.stepFunctionService?.websocket) {
                    const {jobScheduleSelected, applicationId, candidateId} = applicationData;
                    loadWorkflowDS(jobScheduleSelected.jobId || "", jobScheduleSelected.scheduleId || "", applicationId, candidateId, state.appConfig.results.envConfig);
                    return actionWorkflowRequestInit();
                }
                else {
                    startOrResumeWorkflowDS();
                    return actionWorkflowRequestEnd();
                }
            }
        })
    );
};

export const CreateApplicationDSEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(APPLICATION_ACTION_TYPES.CREATE_APPLICATION),
        switchMap(( action: CreateApplicationActionDS ) =>
            from(new CandidateApplicationService().createApplicationDS(action.payload))
                .pipe(
                    switchMap(epicSwitchMapHelper),
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map((response: CreateApplicationResponse) => {
                      const application = response.data;
                        if (action.onSuccess) {
                          action.onSuccess(application)
                        }
                        return actionCreateApplicationDSSuccess(application);
                    }),
                  catchError(( error: ProxyApiError ) => {
                    if(action.onError){
                      action.onError(error);
                    }

                    const errorMessage = CreateApplicationErrorMessage[error.errorCode] || CreateApplicationErrorMessage["DEFAULT"];

                    if(error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST) {
                      routeToAppPageWithPath(PAGE_ROUTES.ALREADY_APPLIED);
                    }
                    else {
                      setEpicApiCallErrorMessage(errorMessage);
                    }

                    return of(actionCreateApplicationAndSkipScheduleDSFailed(error));
                  })
                )
        )
    )
};

export const UpdateApplicationDSEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(APPLICATION_ACTION_TYPES.UPDATE_APPLICATION),
        switchMap(( action: UpdateApplicationActionDS ) =>
            from(new CandidateApplicationService().updateApplication(action.payload))
                .pipe(
                    switchMap(epicSwitchMapHelper),
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map((response: UpdateApplicationResponse) => {
                      const application: Application = response.data;

                        if (action.onSuccess) {
                          action.onSuccess(application);
                        }

                        return actionUpdateApplicationDSSuccess(application);
                    }),
                  catchError(( error: ProxyApiError ) => {

                    if(action.onError){
                      action.onError(error);
                    }

                    const errorKey = error.errorCode || CREATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR;
                    const errorMessage = UpdateApplicationErrorMessage[errorKey];

                    setEpicApiCallErrorMessage(errorMessage);

                        return of(actionUpdateApplicationDSFailed(error));
                    })
                )
        )
    )
};

export const UpdateWorkflowStepNameEpic = ( action$: Observable<any> ) => {
    return action$.pipe(
        ofType(APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME),
        switchMap(( action: UpdateWorkflowStepNameAction ) =>
            from(new CandidateApplicationService().updateWorkflowStepName(action.payload.applicationId, action.payload.workflowStepName))
                .pipe(
                    switchMap(epicSwitchMapHelper),
                    switchMap(async ( response ) => {
                        return response
                    }),
                    map(( response: UpdateWorkflowNameResponse ) => {

                      const application = response.data;

                        if(action.onSuccess) {
                          action.onSuccess(application);
                        }

                        return actionUpdateWorkflowNameSuccess(application);
                    }),
                    catchError(( error: ProxyApiError ) => {
                        if(action.onError) action.onError(error);

                      const errorMessage = UpdateApplicationErrorMessage[error.errorCode] || UpdateApplicationErrorMessage[CREATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
                      setEpicApiCallErrorMessage(errorMessage);

                        return of(actionUpdateWorkflowNameFailed(error));
                    })
                )
        )
    )
};

export const CreateApplicationAndSkipScheduleDSEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.CREATE_APPLICATION_AND_SKIP_SCHEDULE),
    switchMap((action: CreateApplicationAndSkipScheduleActionDS) =>
      from(new CandidateApplicationService().createApplicationDS(action.payload)).pipe(
        switchMap(epicSwitchMapHelper),
        switchMap(async (response) => {
          return response;
        }),
        map((response: CreateApplicationResponse) => {
          const application = response.data;
          if (action.onSuccess) {
            action.onSuccess(application);
          }
          createApplicationAndSkipScheduleHelper(application);
          return actionCreateApplicationAndSkipScheduleDSSuccess(application);
        }),
        catchError((error: ProxyApiError) => {
          if (action.onError) {
            action.onError(error);
          }

          const errorMessage = CreateApplicationErrorMessage[error.errorCode] || CreateApplicationErrorMessage["DEFAULT"];

          if (error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST) {
            routeToAppPageWithPath(PAGE_ROUTES.ALREADY_APPLIED);
          } else {
            setEpicApiCallErrorMessage(errorMessage);
          }

          return of(actionCreateApplicationAndSkipScheduleDSFailed(error));
        })
      )
    )
  );
};

const createApplicationAndSkipScheduleHelper = (createApplicationResponse: Application) => {
  const state = store.getState();
  const jobId = createApplicationResponse.jobScheduleSelected?.jobId;
  const applicationId = createApplicationResponse.applicationId;
  const candidateId = createApplicationResponse.candidateId;
  const scheduleDetail = state.schedule.results.scheduleDetail;
  const scheduleId = scheduleDetail?.scheduleId || "";

  const selectedSchedule: SelectedScheduleForUpdateApplication = {
    jobId,
    scheduleId,
    scheduleDetails: JSON.stringify(scheduleDetail)
  };
  const request = createUpdateApplicationRequest(createApplicationResponse, UPDATE_APPLICATION_API_TYPE.JOB_CONFIRM, selectedSchedule);

  boundUpdateApplicationDS(request, (applicationResponse: Application) => {
    const state = store.getState();

    if (scheduleId && state.appConfig.results?.envConfig) {
      window.hasCompleteTaskOnSkipSchedule = () => {
        routeToAppPageWithPath(CONSENT, [
          { paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: applicationId },
          { paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID, paramValue: scheduleId }]);
        completeTask(applicationResponse, WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES, undefined, undefined, jobId, scheduleDetail);
      };
      boundWorkflowRequestStart();
      loadWorkflowDS(
        jobId || "",
        scheduleId || "",
        applicationId,
        candidateId,
        state.appConfig.results.envConfig
      );
    } else {
      throw new Error("");
    }
  }, () => {
    const state = store.getState();
    if (state.appConfig.results?.envConfig) {
      routeToAppPageWithPath(CONSENT, [
        { paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: applicationId }
      ]);
      onCompleteTaskHelper(createApplicationResponse);
    }
  });
};
