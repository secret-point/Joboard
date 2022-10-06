import { SelfIdentificationConfig } from "../utils/types/common";
import { INFO_CARD_STEP_STATUS, SELF_IDENTIFICATION_STEPS } from "../utils/enums/common";
import {
  SELF_IDENTIFICATION_ACTION_TYPE,
  SelfIdentificationStepConfigActions
} from "../actions/SelfIdentitifactionActions/selfIdentificationActionTypes";
import { SelfIdentificationConfigStepCountryMap } from "../utils/constants/common";
import { getCountryCode } from "../utils/helper";

export interface SelfIdentificationState {
  stepConfig: SelfIdentificationConfig
}

export const initSelfIdentificationState: SelfIdentificationState = {
  stepConfig: SelfIdentificationConfigStepCountryMap['MX']
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
