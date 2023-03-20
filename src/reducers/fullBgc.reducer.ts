import { FullBgcStepConfig } from "../utils/types/common";
import { FULL_BGC_STEPS, INFO_CARD_STEP_STATUS } from "../utils/enums/common";
import { FULL_BGC_ACTION_TYPE, FullBgcStepConfigActions } from "../actions/FullBgcActions/fullBgcActionTypes";

export interface FullBgcState {
  stepConfig: FullBgcStepConfig;
}

export const initFullBgcState: FullBgcState = {
  stepConfig: {
    completedSteps: [],
    [FULL_BGC_STEPS.CONSENT]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    },
    [FULL_BGC_STEPS.BACKGROUND_INFO]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [FULL_BGC_STEPS.ADDRESS_HISTORY]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [FULL_BGC_STEPS.BIRTH_HISTORY]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [FULL_BGC_STEPS.PROOF_OF_ID1]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [FULL_BGC_STEPS.PROOF_OF_ID2]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [FULL_BGC_STEPS.PROOF_OF_ADDRESS]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
  }
};

const getInitFullBgcState = () => {
  return initFullBgcState;
};

export default function fullBgcReducer(
  state = getInitFullBgcState(),
  action: FullBgcStepConfigActions
): FullBgcState {
  switch (action.type) {

    case FULL_BGC_ACTION_TYPE.UPDATE_STEP_CONFIG:
      return {
        ...state,
        stepConfig: action.payload
      };

    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_SUCCESS:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_DISCLOSURE_FAILED:
    case FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION:
    case FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_SUCCESS:
    case FULL_BGC_ACTION_TYPE.WITHDRAW_APPLICATION_FAILED:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_SUCCESS:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BACKGROUND_INFORMATION_FAILED:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_SUCCESS:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_ADDRESS_HISTORY_FAILED:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_SUCCESS:
    case FULL_BGC_ACTION_TYPE.UPDATE_CANDIDATE_BIRTH_HISTORY_FAILED:
    case FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE:
    case FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_SUCCESS:
    case FULL_BGC_ACTION_TYPE.INITIATE_EDIT_BGC_PAGE_FAILED:
    case FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE:
    case FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_SUCCESS:
    case FULL_BGC_ACTION_TYPE.SUBMIT_BGC_PAGE_FAILED:
    default:
      return state;
  }
}
