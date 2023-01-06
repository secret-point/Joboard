import { BGC_ACTION_TYPE, UpdateStepConfigAction } from "./bgcActionTypes";
import { BgcStepConfigType } from "../../utils/types/common";

export const actionUpdateStepConfigAction = (payload: BgcStepConfigType): UpdateStepConfigAction => {
  return {
    type: BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload
  };
};
