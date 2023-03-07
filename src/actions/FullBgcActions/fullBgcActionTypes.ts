import { Action } from "redux";
import { FullBgcStepConfigType } from "../../utils/types/common";

export enum FULL_BGC_ACTION_TYPE {
  UPDATE_STEP_CONFIG = "UPDATE_FULL_BGC_STEP_CONFIG",
}

export interface UpdateFullBgcStepConfigAction extends Action {
  type: FULL_BGC_ACTION_TYPE.UPDATE_STEP_CONFIG;
  payload: FullBgcStepConfigType;
}

export type FullBgcStepConfigActions =
    UpdateFullBgcStepConfigAction;
