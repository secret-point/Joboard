import { Action } from "redux";
import { BgcStepConfig } from "../../utils/types/common";

export enum BGC_ACTION_TYPE {
    UPDATE_STEP_CONFIG = "UPDATE_STEP_CONFIG"
}

export interface UpdateStepConfigAction extends Action {
    type: BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload: BgcStepConfig
}

export type BGCStepConfigActions =
    UpdateStepConfigAction;
