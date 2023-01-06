import { BgcStepConfig, BgcMXStepConfig } from "../utils/types/common";
import { BGC_STEPS, INFO_CARD_STEP_STATUS } from "../utils/enums/common";
import { BGC_ACTION_TYPE, BGCStepConfigActions } from "../actions/BGC_Actions/bgcActionTypes";
import { CountryCode } from "../utils/enums/common";

export interface BGCState {
  stepConfig: BgcStepConfig | BgcMXStepConfig;
}

export const initScheduleState: BGCState = {
  stepConfig: {
    completedSteps: [],
    [BGC_STEPS.FCRA]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    },
    [BGC_STEPS.NON_FCRA]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
    [BGC_STEPS.ADDITIONAL_BGC]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
  }
};

export const initScheduleMXState: BGCState = {
  stepConfig: {
    completedSteps: [],
    [BGC_STEPS.NON_FCRA]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    },
    [BGC_STEPS.ADDITIONAL_BGC]: {
      status: INFO_CARD_STEP_STATUS.LOCKED,
      editMode: false
    },
  }
};

const getInitScheduleState = () => {
  const countryCode = "{{Country}}" as CountryCode;

  switch (countryCode) {
    case CountryCode.MX:
      return initScheduleMXState;
    default:
      return initScheduleState;
  }
};

export default function bgcReducer(
  state = getInitScheduleState(),
  action: BGCStepConfigActions
): BGCState {
  switch (action.type) {

    case BGC_ACTION_TYPE.UPDATE_STEP_CONFIG:
      return {
        ...state,
        stepConfig: action.payload
      };

    default:
      return state;
  }
}
