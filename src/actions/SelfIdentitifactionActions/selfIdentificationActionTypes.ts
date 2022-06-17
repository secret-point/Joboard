import { Action } from "redux";
import { SelfIdentificationConfig } from "../../utils/types/common";

export enum SELF_IDENTIFICATION_ACTION_TYPE {
  UPDATE_STEP_CONFIG = "UPDATE_SELF_IDENTIFICATION_STEP_CONFIG"
}

export interface UpdateSelfIdStepConfigAction extends Action {
  type: SELF_IDENTIFICATION_ACTION_TYPE.UPDATE_STEP_CONFIG,
  payload: SelfIdentificationConfig
}

export type SelfIdentificationStepConfigActions =
  UpdateSelfIdStepConfigAction;
