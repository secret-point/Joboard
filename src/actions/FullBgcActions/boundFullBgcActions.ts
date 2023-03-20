import store from "../../store/store";
import { actionInitiateEditBgcPage, actionSubmitBgcPage, actionUpdateCandidateAddressHistory, actionUpdateCandidateBackgroundInformation, actionUpdateCandidateBirthHistory, actionUpdateCandidateDisclosure, actionUpdateFullBgcStepConfigAction, actionWithdrawApplication } from "./fullBgcActions";
import { CandidateBgcDisclosure, CandidateBgcBackgroundInfo, FullBgcStepConfigType, CandidateBgcAddressHistory, CandidateBgcBirthInformation, CaaSBgcPageStatusUpdate } from "../../utils/types/common";

export const boundUpdateFullBgcStepConfigAction = ( payload: FullBgcStepConfigType, ) =>
  store.dispatch(actionUpdateFullBgcStepConfigAction(payload));

export const boundUpdateCandidateDisclosure = (payload: CandidateBgcDisclosure, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateCandidateDisclosure(payload, onSuccess, onError));

export const boundWithdrawApplication = (payload: string, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionWithdrawApplication(payload, onSuccess, onError));

export const boundUpdateCandidateBackgroundInformation = (payload: CandidateBgcBackgroundInfo, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateCandidateBackgroundInformation(payload, onSuccess, onError));

export const boundUpdateCandidateAddressHistory = (payload: CandidateBgcAddressHistory, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateCandidateAddressHistory(payload, onSuccess, onError));

export const boundUpdateCandidateBirthHistory = (payload: CandidateBgcBirthInformation, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionUpdateCandidateBirthHistory(payload, onSuccess, onError));

export const boundInitiateEditBgcPage = (onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionInitiateEditBgcPage(onSuccess, onError));

export const boundSubmitBgcPage = (payload: CaaSBgcPageStatusUpdate, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionSubmitBgcPage(payload, onSuccess, onError));
