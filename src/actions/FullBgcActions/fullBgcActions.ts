import { FULL_BGC_ACTION_TYPE, UpdateFullBgcStepConfigAction } from "./fullBgcActionTypes";
import { FullBgcStepConfigType } from "../../utils/types/common";

export const actionUpdateFullBgcStepConfigAction = (payload: FullBgcStepConfigType): UpdateFullBgcStepConfigAction => {
  return {
    type: FULL_BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
    payload
  };
};
