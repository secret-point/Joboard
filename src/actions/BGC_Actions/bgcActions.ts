import { BGC_ACTION_TYPE, UpdateStepConfigAction } from "./bgcActionTypes";
import { BgcStepConfig } from "../../utils/types/common";

export const actionUpdateStepConfigAction = (payload: BgcStepConfig): UpdateStepConfigAction => {
    return {
        type: BGC_ACTION_TYPE.UPDATE_STEP_CONFIG,
        payload
    }
}
