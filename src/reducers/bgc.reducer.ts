import { BgcStepConfig } from "../utils/types/common";
import { BGC_STEP_STATUS, BGC_STEPS } from "../utils/enums/common";
import { BGC_ACTION_TYPE, BGCStepConfigActions } from "../actions/BGC_Actions/bgcActionTypes";

export interface BGCState {
    stepConfig: BgcStepConfig
}

export const initScheduleState: BGCState = {
    stepConfig: {
        completedSteps: [],
        activeStep: BGC_STEPS.FCRA,
        pageStatus: {
            [BGC_STEPS.FCRA]: BGC_STEP_STATUS.ACTIVE,
            [BGC_STEPS.NON_FCRA]: BGC_STEP_STATUS.LOCKED,
            [BGC_STEPS.ADDITIONAL_BGC]: BGC_STEP_STATUS.LOCKED
        }
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
