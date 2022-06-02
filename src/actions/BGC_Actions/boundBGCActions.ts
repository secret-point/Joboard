import store from "../../store/store";
import { actionUpdateStepConfigAction } from "./bgcActions";
import { BgcStepConfig } from "../../utils/types/common";

export const boundUpdateStepConfigAction = ( payload: BgcStepConfig, ) =>
    store.dispatch(actionUpdateStepConfigAction(payload));
