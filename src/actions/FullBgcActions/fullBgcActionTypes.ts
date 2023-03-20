import { Action } from "redux";
import { CaaSBgcPageStatusUpdate, CandidateBgcAddressHistory, CandidateBgcBackgroundInfo, CandidateBgcBirthInformation, CandidateBgcDisclosure, FullBgcStepConfigType } from "../../utils/types/common";

export enum FULL_BGC_ACTION_TYPE {
  UPDATE_STEP_CONFIG = "UPDATE_FULL_BGC_STEP_CONFIG",
  UPDATE_CANDIDATE_DISCLOSURE = "UPDATE_CANDIDATE_DISCLOSURE",
  UPDATE_CANDIDATE_DISCLOSURE_SUCCESS = "UPDATE_CANDIDATE_DISCLOSURE_SUCCESS",
  UPDATE_CANDIDATE_DISCLOSURE_FAILED = "UPDATE_CANDIDATE_DISCLOSURE_FAILED",
  WITHDRAW_APPLICATION = "WITHDRAW_APPLICATION",
  WITHDRAW_APPLICATION_SUCCESS = "WITHDRAW_APPLICATION_SUCCESS",
  WITHDRAW_APPLICATION_FAILED = "WITHDRAW_APPLICATION_FAILED",
  UPDATE_CANDIDATE_BACKGROUND_INFORMATION = "UPDATE_CANDIDATE_BACKGROUND_INFORMATION",
  UPDATE_CANDIDATE_BACKGROUND_INFORMATION_SUCCESS = "UPDATE_CANDIDATE_BACKGROUND_INFORMATION_SUCCESS",
  UPDATE_CANDIDATE_BACKGROUND_INFORMATION_FAILED = "UPDATE_CANDIDATE_BACKGROUND_INFORMATION_FAILED",
  UPDATE_CANDIDATE_ADDRESS_HISTORY = "UPDATE_CANDIDATE_ADDRESS_HISTORY",
  UPDATE_CANDIDATE_ADDRESS_HISTORY_SUCCESS = "UPDATE_CANDIDATE_ADDRESS_HISTORY_SUCCESS",
  UPDATE_CANDIDATE_ADDRESS_HISTORY_FAILED = "UPDATE_CANDIDATE_ADDRESS_HISTORY_FAILED",
  UPDATE_CANDIDATE_BIRTH_HISTORY = "UPDATE_CANDIDATE_BIRTH_HISTORY",
  UPDATE_CANDIDATE_BIRTH_HISTORY_SUCCESS = "UPDATE_CANDIDATE_BIRTH_HISTORY_SUCCESS",
  UPDATE_CANDIDATE_BIRTH_HISTORY_FAILED = "UPDATE_CANDIDATE_BIRTH_HISTORY_FAILED",
  INITIATE_EDIT_BGC_PAGE = "INITIATE_EDIT_BGC_PAGE",
  INITIATE_EDIT_BGC_PAGE_SUCCESS = "INITIATE_EDIT_BGC_PAGE_SUCCESS",
  INITIATE_EDIT_BGC_PAGE_FAILED = "INITIATE_EDIT_BGC_PAGE_FAILED",
  SUBMIT_BGC_PAGE = "INITIATE_EDIT_BGC_PAGE",
  SUBMIT_BGC_PAGE_SUCCESS = "INITIATE_EDIT_BGC_PAGE_SUCCESS",
  SUBMIT_BGC_PAGE_FAILED = "INITIATE_EDIT_BGC_PAGE_FAILED",
}

export interface UpdateFullBgcStepConfigAction extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_STEP_CONFIG;
  payload: FullBgcStepConfigType;
}

export interface UpdateCandidateDisclosure extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE;
  payload: CandidateBgcDisclosure;
  onSuccess?: Function;
  onError?: Function;
}

export interface UpdateCandidateDisclosureSuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_SUCCESS;
}

export interface UpdateCandidateDisclosureFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_FAILED;
}

export interface WithdrawApplication extends Action {
  type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION;
  payload: string;
  onSuccess?: Function;
  onError?: Function;
}

export interface WithdrawApplicationSuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_SUCCESS;
}

export interface WithdrawApplicationFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_FAILED;
}

export interface UpdateCandidateBackgroundInformation extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION;
  payload: CandidateBgcBackgroundInfo;
  onSuccess?: Function;
  onError?: Function;
}

export interface UpdateCandidateBackgroundInformationSuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_SUCCESS;
}

export interface UpdateCandidateBackgroundInformationFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_FAILED;
}

export interface UpdateCandidateAddressHistory extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY;
  payload: CandidateBgcAddressHistory;
  onSuccess?: Function;
  onError?: Function;
}

export interface UpdateCandidateAddressHistorySuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_SUCCESS;
}

export interface UpdateCandidateAddressHistoryFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_FAILED;
}

export interface UpdateCandidateBirthHistory extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY;
  payload: CandidateBgcBirthInformation;
  onSuccess?: Function;
  onError?: Function;
}

export interface UpdateCandidateBirthHistorySuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_SUCCESS;
}

export interface UpdateCandidateBirthHistoryFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_FAILED;
}

export interface InitiateEditBgcPage extends Action {
  type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE;
  onSuccess?: Function;
  onError?: Function;
}

export interface InitiateEditBgcPageSuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_SUCCESS;
}

export interface InitiateEditBgcPageFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_FAILED;
}

export interface SubmitBgcPage extends Action {
  type: FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE;
  payload: CaaSBgcPageStatusUpdate;
  onSuccess?: Function;
  onError?: Function;
}

export interface SubmitBgcPageSuccess extends Action {
  type: FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_SUCCESS;
}

export interface SubmitBgcPageFailed extends Action {
  type: FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_FAILED;
}

export type FullBgcStepConfigActions =
    UpdateFullBgcStepConfigAction |
    UpdateCandidateDisclosure |
    UpdateCandidateDisclosureSuccess |
    UpdateCandidateDisclosureFailed |
    WithdrawApplication |
    WithdrawApplicationSuccess |
    WithdrawApplicationFailed |
    UpdateCandidateBackgroundInformation |
    UpdateCandidateBackgroundInformationSuccess |
    UpdateCandidateBackgroundInformationFailed |
    UpdateCandidateAddressHistory |
    UpdateCandidateAddressHistorySuccess |
    UpdateCandidateAddressHistoryFailed |
    UpdateCandidateBirthHistory |
    UpdateCandidateBirthHistorySuccess |
    UpdateCandidateBirthHistoryFailed |
    InitiateEditBgcPage |
    InitiateEditBgcPageSuccess |
    InitiateEditBgcPageFailed;