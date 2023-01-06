import store from "../../store/store";
import { actionUpdateStepConfigAction } from "./bgcActions";
import { BgcStepConfigType } from "../../utils/types/common";

export const boundUpdateStepConfigAction = ( payload: BgcStepConfigType, ) =>
  store.dispatch(actionUpdateStepConfigAction(payload));
