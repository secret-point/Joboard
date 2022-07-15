import store from "../../store/store";
import { UpdateWotcStatusRequest } from "../../utils/types/common";
import { actionUpdateWotcStatus } from "./wotcActions";

export const boundUpdateWotcStatus = (
  payload: UpdateWotcStatusRequest,
  onSuccess?: Function
) => store.dispatch(actionUpdateWotcStatus(payload, onSuccess));
