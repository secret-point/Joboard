import { SelfIdentificationConfig } from "../../utils/types/common";
import store from "../../store/store";
import { actionUpdateSelfIdStepConfig } from "./selfIdentificationActions";

export const boundUpdateSelfIdStepConfig = (payload: SelfIdentificationConfig) =>
  store.dispatch(actionUpdateSelfIdStepConfig(payload));
