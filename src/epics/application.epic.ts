import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionCalculateInclinedValueResult,
  actionCreateApplicationAndSkipScheduleDSFailed,
  actionCreateApplicationAndSkipScheduleDSSuccess,
  actionCreateApplicationDSSuccess,
  actionGetApplicationFailed,
  actionGetApplicationListFailed,
  actionGetApplicationListSuccess,
  actionGetApplicationSuccess,
  actionUpdateApplicationDSFailed,
  actionUpdateApplicationDSSuccess,
  actionUpdateWorkflowNameFailed,
  actionUpdateWorkflowNameSuccess,
  actionWithdrawMultipleApplicationFailed,
  actionWithdrawMultipleApplicationSuccess
} from "../actions/ApplicationActions/applicationActions";
import {
  APPLICATION_ACTION_TYPES,
  CalculateInclinedValueAction,
  CreateApplicationActionDS,
  CreateApplicationAndSkipScheduleActionDS,
  GetApplicationAction,
  GetApplicationListAction,
  UpdateApplicationActionDS,
  UpdateWorkflowStepNameAction,
  WithdrawMultipleApplicationAction
} from "../actions/ApplicationActions/applicationActionTypes";
import {
  boundSetApplicationErrorCode,
  boundUpdateApplicationDS
} from "../actions/ApplicationActions/boundApplicationActions";
import { boundWorkflowRequestStart } from "../actions/WorkflowActions/boundWorkflowActions";
import {
  actionWorkflowRequestEnd,
  actionWorkflowRequestInit,
  completeTask,
  loadWorkflowDS,
  onCompleteTaskHelper,
  startOrResumeWorkflowDS
} from "../actions/WorkflowActions/workflowActions";
import { PAGE_ROUTES, PagesControlledByWorkFlowService } from "../components/pageRoutes";
import {
  APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE,
  APPLICATION_STATE_TO_STEP_NAME,
  STEPS_NOT_CONNECT_WORKFLOW_SERVICE
} from "../constants";
import { log, LoggerType } from "../helpers/log-helper";
import CandidateApplicationService from "../services/candidate-application-service";
import store from "../store/store";
import {
  CreateApplicationErrorMessage,
  GetApplicationErrorMessage,
  GetApplicationsByCandidateIdErrorMessage,
  UpdateApplicationErrorMessage,
  WithdrawApplicationErrorMessage
} from "../utils/api/errorMessages";
import {
  ApiError,
  CreateApplicationResponse,
  GetApplicationListResponse,
  GetApplicationResponse,
  UpdateApplicationResponse,
  UpdateWorkflowNameResponse,
  WithdrawMultipleApplicationResponse
} from "../utils/api/types";
import { SelectedScheduleForUpdateApplication } from "../utils/apiTypes";
import {
  CREATE_APPLICATION_ERROR_CODE,
  GET_APPLICATION_ERROR_CODE,
  GET_APPLICATIONS_BY_CANDIDATE_ID_ERROR_CODE,
  QUERY_PARAMETER_NAME,
  UPDATE_APPLICATION_API_TYPE,
  UPDATE_APPLICATION_ERROR_CODE,
  WITHDRAW_APPLICATION_ERROR_CODE,
  WORKFLOW_STEP_NAME
} from "../utils/enums/common";
import {
  createUpdateApplicationRequest,
  formatLoggedApiError,
  getCurrentStepNameFromHash,
  routeToAppPageWithPath,
  sanitizeApplicationData,
  setEpicApiCallErrorMessage
} from "../utils/helper";
import { Application } from "../utils/types/common";
import { epicSwitchMapHelper } from "./helper";

const { CONSENT } = PAGE_ROUTES;

export const GetApplicationEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.GET_APPLICATION),
    switchMap(( action: GetApplicationAction ) =>
      from(new CandidateApplicationService().getApplication(action.payload.applicationId))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map(( response: GetApplicationResponse ) => {
            const application: Application = response.data;

            if (action.onSuccess) {
              action.onSuccess(application);
            }
            return actionGetApplicationSuccess(application);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] GetApplicationEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            // Route to access denied page if candidate try to login another candidate's application
            if (error.errorCode === GET_APPLICATION_ERROR_CODE.CANDIDATE_NOT_AUTHORIZED) {
              routeToAppPageWithPath(PAGE_ROUTES.ACCESS_DENIED);
            }

            const errorMessage = GetApplicationErrorMessage[error.errorCode] || GetApplicationErrorMessage[GET_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);

            return of(actionGetApplicationFailed(error));
          })
        )
    )
  );
};

export const GetApplicationSuccessEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS),
    map(( action ) => {
      const applicationData: Application = sanitizeApplicationData(action.payload);
      const state = store.getState();
      // Dont initiate Workflow when workflowStepName is in STEPS_NOT_CONNECT_WORKFLOW_SERVICE
      // Dont initiate Workflow when currentState is in APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE
      if (
        APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.currentState) ||
                STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
      ) {
        const stepName = STEPS_NOT_CONNECT_WORKFLOW_SERVICE.includes(applicationData.workflowStepName)
          ? applicationData.workflowStepName
          : APPLICATION_STATE_TO_STEP_NAME[applicationData.currentState];

        routeToAppPageWithPath(stepName);
      } else {
        if (state.appConfig.results?.envConfig && !window?.stepFunctionService?.websocket) {
          const { jobScheduleSelected, applicationId, candidateId } = applicationData;
          loadWorkflowDS(jobScheduleSelected.jobId || "", jobScheduleSelected.scheduleId || "", applicationId, candidateId, state.appConfig.results.envConfig);
          return actionWorkflowRequestInit();
        }
                
        const currentStepName = getCurrentStepNameFromHash();
        if (PagesControlledByWorkFlowService.includes(currentStepName as PAGE_ROUTES)) startOrResumeWorkflowDS();

        return actionWorkflowRequestEnd();
                
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
            return response;
          }),
          map((response: CreateApplicationResponse) => {
            const application = response.data;
            if (action.onSuccess) {
              action.onSuccess(application);
            }
            return actionCreateApplicationDSSuccess(application);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] CreateApplicationDSEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorMessage = CreateApplicationErrorMessage[error.errorCode] || CreateApplicationErrorMessage["DEFAULT"];

            if (error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST
                || error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST_CAN_BE_RESET) {
              boundSetApplicationErrorCode(error.errorCode, error.errorMetadata || undefined);
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

export const UpdateApplicationDSEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.UPDATE_APPLICATION),
    switchMap(( action: UpdateApplicationActionDS ) =>
      from(new CandidateApplicationService().updateApplication(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map((response: UpdateApplicationResponse) => {
            const application: Application = response.data;

            if (action.onSuccess) {
              action.onSuccess(application);
            }

            return actionUpdateApplicationDSSuccess(application);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] UpdateApplicationDSEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorKey = error.errorCode || UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR;
            const errorMessage = UpdateApplicationErrorMessage[errorKey] || UpdateApplicationErrorMessage[UPDATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];

            setEpicApiCallErrorMessage(errorMessage);

            return of(actionUpdateApplicationDSFailed(error));
          })
        )
    )
  );
};

export const UpdateWorkflowStepNameEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.UPDATE_WORKFLOW_NAME),
    switchMap(( action: UpdateWorkflowStepNameAction ) =>
      from(new CandidateApplicationService().updateWorkflowStepName(action.payload.applicationId, action.payload.workflowStepName))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map(( response: UpdateWorkflowNameResponse ) => {

            const application = response.data;

            if (action.onSuccess) {
              action.onSuccess(application);
            }

            return actionUpdateWorkflowNameSuccess(application);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] UpdateWorkflowStepNameEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) action.onError(error);

            const errorMessage = UpdateApplicationErrorMessage[error.errorCode] || UpdateApplicationErrorMessage[CREATE_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);

            return of(actionUpdateWorkflowNameFailed(error));
          })
        )
    )
  );
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
        catchError((error: ApiError) => {
          log(`[Epic] CreateApplicationAndSkipScheduleDSEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

          if (action.onError) {
            action.onError(error);
          }

          const errorMessage = CreateApplicationErrorMessage[error.errorCode] || CreateApplicationErrorMessage["DEFAULT"];

          if (error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST
              || error.errorCode === CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST_CAN_BE_RESET) {
            boundSetApplicationErrorCode(error.errorCode, error.errorMetadata || undefined);
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
  const { applicationId } = createApplicationResponse;
  const { candidateId } = createApplicationResponse;
  const { scheduleDetail } = state.schedule.results;
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
      // no page redirect, candidate is still on consent page, just add applicationId and scheduleId to url
      routeToAppPageWithPath(CONSENT, [
        { paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: applicationId },
        { paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID, paramValue: scheduleId }]);
      if (scheduleId !== createApplicationResponse?.jobScheduleSelected?.scheduleId) {
        window.hasCompleteTaskOnSkipSchedule = () => {
          completeTask(applicationResponse, WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES, undefined, undefined, jobId, scheduleDetail);
        };
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
      log("[Epic] createApplicationAndSkipScheduleHelper error: no_scheduleId", applicationResponse, LoggerType.ERROR);
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

export const GetApplicationListEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST),
    switchMap(( action: GetApplicationListAction ) =>
      from(new CandidateApplicationService().getCandidateApplicationList(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map(( response: GetApplicationListResponse ) => {
            const applicationList: Application[] = response.data;

            if (action.onSuccess) {
              action.onSuccess(applicationList);
            }
            return actionGetApplicationListSuccess(applicationList);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] GetCandidateApplicationListEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorMessage = GetApplicationsByCandidateIdErrorMessage[error.errorCode] || GetApplicationsByCandidateIdErrorMessage[GET_APPLICATIONS_BY_CANDIDATE_ID_ERROR_CODE.UNABLE_TO_GET_APPLICATIONS];
            setEpicApiCallErrorMessage(errorMessage);

            return of(actionGetApplicationListFailed(error));
          })
        )
    )
  );
};

export const WithdrawMultipleApplicationEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.WITHDRAW_MULTIPLE_APPLICATION),
    switchMap(( action: WithdrawMultipleApplicationAction ) =>
      from(new CandidateApplicationService().withdrawMultipleApplication(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map(( response: WithdrawMultipleApplicationResponse ) => {
            const applicationList: Application[] = response.data;

            if (action.onSuccess) {
              action.onSuccess(applicationList);
            }
            return actionWithdrawMultipleApplicationSuccess(applicationList);
          }),
          catchError(( error: ApiError ) => {
            log(`[Epic] WithdrawApplicationEpic error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);

            if (action.onError) {
              action.onError(error);
            }

            const errorMessage = WithdrawApplicationErrorMessage[error.errorCode] || WithdrawApplicationErrorMessage[WITHDRAW_APPLICATION_ERROR_CODE.INTERNAL_SERVER_ERROR];
            setEpicApiCallErrorMessage(errorMessage);

            return of(actionWithdrawMultipleApplicationFailed(error));
          })
        )
    )
  );
};

export const CalculateInclinedValueEpic = ( action$: Observable<any> ) => {
  return action$.pipe(
    ofType(APPLICATION_ACTION_TYPES.CALCULATE_INCLINED_VALUE),
    switchMap(( action: CalculateInclinedValueAction ) =>
      from(new CandidateApplicationService().calculateInclinedValue(action.applicationId))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async ( response ) => {
            return response;
          }),
          map(() => {
            if (action.onResult) {
              action.onResult();
            }
            return actionCalculateInclinedValueResult();
          }),
          catchError(( error: ApiError ) => {
            // even on failure, we still want to submit the application, so log but eat the error
            log(`[Epic] UpdateCalculateInclinedValue error: ${error?.errorCode}`, formatLoggedApiError(error), LoggerType.ERROR);
            if (action.onResult) {
              action.onResult();
            }
            return of(actionCalculateInclinedValueResult());
          })
        )
    )
  );
};
