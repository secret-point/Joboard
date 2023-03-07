import store from "../../store/store";
import { actionUpdateFullBgcStepConfigAction } from "./fullBgcActions";
import { FullBgcStepConfigType } from "../../utils/types/common";

export const boundUpdateFullBgcStepConfigAction = ( payload: FullBgcStepConfigType, ) =>
  store.dispatch(actionUpdateFullBgcStepConfigAction(payload));
