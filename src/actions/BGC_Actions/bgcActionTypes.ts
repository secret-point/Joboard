import { Action } from "redux";
import { BgcStepConfigType } from "../../utils/types/common";

export enum BGC_ACTION_TYPE {
    UPDATE_STEP_CONFIG = "UPDATE_STEP_CONFIG"
}

export interface UpdateStepConfigAction extends Action {
    type: BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload: BgcStepConfigType
}

export type BGCStepConfigActions =
    UpdateStepConfigAction;
