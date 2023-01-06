import { SelfIdentificationConfig } from "../utils/types/common";
import {
  SELF_IDENTIFICATION_ACTION_TYPE,
  SelfIdentificationStepConfigActions
} from "../actions/SelfIdentitifactionActions/selfIdentificationActionTypes";

export interface SelfIdentificationState {
  stepConfig: SelfIdentificationConfig;
}

export const initSelfIdentificationState: SelfIdentificationState = {
  stepConfig: {
    completedSteps: []
  }
};

export default function selfIdentificationReducer( state: SelfIdentificationState = initSelfIdentificationState, action: SelfIdentificationStepConfigActions ): SelfIdentificationState {
  switch (action.type) {

    case SELF_IDENTIFICATION_ACTION_TYPE.UPDATE_STEP_CONFIG:
      return {
        ...state,
        stepConfig: action.payload
      };

    default:
      return state;
  }
}
