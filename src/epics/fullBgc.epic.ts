import { actionInitiateEditBgcPageFailed, actionInitiateEditBgcPageSuccess, actionSubmitBgcPageFailed, actionSubmitBgcPageSuccess, actionUpdateCandidateAddressHistoryFailed, actionUpdateCandidateAddressHistorySuccess, actionUpdateCandidateBackgroundInformationFailed, actionUpdateCandidateBackgroundInformationSuccess, actionUpdateCandidateBirthHistoryFailed, actionUpdateCandidateBirthHistorySuccess, actionUpdateCandidateDisclosureFailed, actionUpdateCandidateDisclosureSuccess, actionWithdrawApplicationFailed, actionWithdrawApplicationSuccess } from "./../actions/FullBgcActions/fullBgcActions";
import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { epicSwitchMapHelper } from "./helper";
import FullBgcService from "../services/full-bgc.service";
import { FULL_BGC_ACTION_TYPE } from "../actions/FullBgcActions/fullBgcActionTypes";

export const UpdateCandidateBgcDisclosureEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE),
    switchMap((action) =>
      from(new FullBgcService().updateCandidateBgcDisclosure(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionUpdateCandidateDisclosureSuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionUpdateCandidateDisclosureFailed());
          })
        )
    )
  );
};

export const WithdrawApplicationBgcEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION),
    switchMap((action) =>
      from(new FullBgcService().withdrawApplication(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionWithdrawApplicationSuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionWithdrawApplicationFailed());
          })
        )
    )
  );
};

export const UpdateCandidateBackgroundInformationEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION),
    switchMap((action) =>
      from(new FullBgcService().updateCandidateBackgroundInformation(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionUpdateCandidateBackgroundInformationSuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionUpdateCandidateBackgroundInformationFailed());
          })
        )
    )
  );
};

export const UpdateCandidateAddressHistoryEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION),
    switchMap((action) =>
      from(new FullBgcService().updateCandidateAddressHistory(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionUpdateCandidateAddressHistorySuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionUpdateCandidateAddressHistoryFailed());
          })
        )
    )
  );
};

export const UpdateCandidateBirthHistoryEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY),
    switchMap((action) =>
      from(new FullBgcService().updateCandidateBirthHistory(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionUpdateCandidateBirthHistorySuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionUpdateCandidateBirthHistoryFailed());
          })
        )
    )
  );
};

export const InitiateEditBgcPageEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY),
    switchMap((action) =>
      from(new FullBgcService().getListOfCandidateAttachmentMetadata())
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionInitiateEditBgcPageSuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionInitiateEditBgcPageFailed());
          })
        )
    )
  );
};

export const SubmitBgcPageEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE),
    switchMap((action) =>
      from(new FullBgcService().updateCaaSStatus(action.payload))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionSubmitBgcPageSuccess();
          }),
          catchError((error: any) => {
            if (action.onError) {
              action.onError(error);
            }
            return of(actionSubmitBgcPageFailed());
          })
        )
    )
  );
};

// pending: step 5 for submit document