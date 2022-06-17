import { BgcStepConfig } from "../utils/types/common";
import { BGC_STEPS, INFO_CARD_STEP_STATUS } from "../utils/enums/common";
import { BGC_ACTION_TYPE, BGCStepConfigActions } from "../actions/BGC_Actions/bgcActionTypes";

export interface BGCState {
    stepConfig: BgcStepConfig
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
}

export default function bgcReducer( state: BGCState = initScheduleState, action: BGCStepConfigActions ): BGCState {
    switch(action.type) {

        case BGC_ACTION_TYPE.UPDATE_STEP_CONFIG:
            return {
                ...state,
                stepConfig: action.payload
            }

        default:
            return state;
    }
}
