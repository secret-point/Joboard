import { FULL_BGC_ACTION_TYPE, InitiateEditBgcPage, InitiateEditBgcPageFailed, InitiateEditBgcPageSuccess, SubmitBgcPage, SubmitBgcPageFailed, SubmitBgcPageSuccess, UpdateCandidateAddressHistory, UpdateCandidateAddressHistoryFailed, UpdateCandidateAddressHistorySuccess, UpdateCandidateBackgroundInformation, UpdateCandidateBackgroundInformationFailed, UpdateCandidateBackgroundInformationSuccess, UpdateCandidateBirthHistory, UpdateCandidateBirthHistoryFailed, UpdateCandidateBirthHistorySuccess, UpdateCandidateDisclosure, UpdateCandidateDisclosureFailed, UpdateCandidateDisclosureSuccess, UpdateFullBgcStepConfigAction, WithdrawApplication, WithdrawApplicationFailed, WithdrawApplicationSuccess } from "./fullBgcActionTypes";
import { CaaSBgcPageStatusUpdate, CandidateBgcAddressHistory, CandidateBgcBackgroundInfo, CandidateBgcBirthInformation, CandidateBgcDisclosure, FullBgcStepConfigType } from "../../utils/types/common";

export const actionUpdateFullBgcStepConfigAction = (payload: FullBgcStepConfigType): UpdateFullBgcStepConfigAction => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload
  };
};

export const actionUpdateCandidateDisclosure = (payload: CandidateBgcDisclosure, onSuccess?: Function, onError?: Function): UpdateCandidateDisclosure => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE,
    payload,
    onSuccess,
    onError
  };
};

export const actionUpdateCandidateDisclosureSuccess = (): UpdateCandidateDisclosureSuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_SUCCESS,
  };
};

export const actionUpdateCandidateDisclosureFailed = (): UpdateCandidateDisclosureFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_FAILED,
  };
};

export const actionWithdrawApplication = (payload: string, onSuccess?: Function, onError?: Function): WithdrawApplication => {
  return {
    type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION,
    payload,
    onSuccess,
    onError
  };
};

export const actionWithdrawApplicationSuccess = (): WithdrawApplicationSuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_SUCCESS,
  };
};

export const actionWithdrawApplicationFailed = (): WithdrawApplicationFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_FAILED,
  };
};

export const actionUpdateCandidateBackgroundInformation = (payload: CandidateBgcBackgroundInfo, onSuccess?: Function, onError?: Function): UpdateCandidateBackgroundInformation => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION,
    payload,
    onSuccess,
    onError
  };
};

export const actionUpdateCandidateBackgroundInformationSuccess = (): UpdateCandidateBackgroundInformationSuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_SUCCESS,
  };
};

export const actionUpdateCandidateBackgroundInformationFailed = (): UpdateCandidateBackgroundInformationFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_FAILED,
  };
};

export const actionUpdateCandidateAddressHistory = (payload: CandidateBgcAddressHistory, onSuccess?: Function, onError?: Function): UpdateCandidateAddressHistory => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY,
    payload,
    onSuccess,
    onError
  };
};

export const actionUpdateCandidateAddressHistorySuccess = (): UpdateCandidateAddressHistorySuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_SUCCESS,
  };
};

export const actionUpdateCandidateAddressHistoryFailed = (): UpdateCandidateAddressHistoryFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_FAILED,
  };
};

export const actionUpdateCandidateBirthHistory = (payload: CandidateBgcBirthInformation, onSuccess?: Function, onError?: Function): UpdateCandidateBirthHistory => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY,
    payload,
    onSuccess,
    onError
  };
};

export const actionUpdateCandidateBirthHistorySuccess = (): UpdateCandidateBirthHistorySuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_SUCCESS,
  };
};

export const actionUpdateCandidateBirthHistoryFailed = (): UpdateCandidateBirthHistoryFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_FAILED,
  };
};

export const actionInitiateEditBgcPage = (onSuccess?: Function, onError?: Function): InitiateEditBgcPage => {
  return {
    type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE,
    onSuccess,
    onError
  };
};

export const actionInitiateEditBgcPageSuccess = (): InitiateEditBgcPageSuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_SUCCESS,
  };
};

export const actionInitiateEditBgcPageFailed = (): InitiateEditBgcPageFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_FAILED,
  };
};

export const actionSubmitBgcPage = (payload: CaaSBgcPageStatusUpdate, onSuccess?: Function, onError?: Function): SubmitBgcPage => {
  return {
    type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE,
    payload,
    onSuccess,
    onError
  };
};

export const actionSubmitBgcPageSuccess = (): SubmitBgcPageSuccess => {
  return {
    type: FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_SUCCESS,
  };
};

export const actionSubmitBgcPageFailed = (): SubmitBgcPageFailed => {
  return {
    type: FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_FAILED,
  };
};