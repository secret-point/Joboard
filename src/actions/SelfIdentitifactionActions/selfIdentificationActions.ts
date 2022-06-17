import { SELF_IDENTIFICATION_ACTION_TYPE, UpdateSelfIdStepConfigAction } from "./selfIdentificationActionTypes";
import { SelfIdentificationConfig } from "../../utils/types/common";

export const actionUpdateSelfIdStepConfig = (payload: SelfIdentificationConfig): UpdateSelfIdStepConfigAction => {
  return {
    type: SELF_IDENTIFICATION_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload
  }
}
