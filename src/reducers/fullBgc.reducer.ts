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
    [FULL_BGC_STEPS.DOCUMENTATION]: {
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

    default:
      return state;
  }
}
