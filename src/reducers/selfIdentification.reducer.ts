import { SelfIdentificationConfig } from "../utils/types/common";
import { INFO_CARD_STEP_STATUS, SELF_IDENTIFICATION_STEPS } from "../utils/enums/common";
import {
  SELF_IDENTIFICATION_ACTION_TYPE,
  SelfIdentificationStepConfigActions
} from "../actions/SelfIdentitifactionActions/selfIdentificationActionTypes";

export interface SelfIdentificationState {
  stepConfig: SelfIdentificationConfig
}

export const initSelfIdentificationState: SelfIdentificationState = {
  stepConfig: {
    completedSteps: [],
    [SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]: {
      status: INFO_CARD_STEP_STATUS.COMPLETED,
      editMode: false
    },
    [SELF_IDENTIFICATION_STEPS.VETERAN_FORM]: {
      status: INFO_CARD_STEP_STATUS.COMPLETED,
      editMode: false
    },
    [SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]: {
      status: INFO_CARD_STEP_STATUS.COMPLETED,
      editMode: false
    },
  }
}

export default function selfIdentificationReducer( state: SelfIdentificationState = initSelfIdentificationState, action: SelfIdentificationStepConfigActions ): SelfIdentificationState {
  switch(action.type) {

    case SELF_IDENTIFICATION_ACTION_TYPE.UPDATE_STEP_CONFIG:
      return {
        ...state,
        stepConfig: action.payload
      }

    default:
      return state;
  }
}
