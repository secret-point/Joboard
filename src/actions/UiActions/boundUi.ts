import store from "../../store/store";
import { actionGetCountryStateConfig, actionResetBannerMessage, actionSetBannerMessage } from "./uiActions";
import { AlertMessage } from "../../utils/types/common";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());
export const boundSetBannerMessage = (payload: AlertMessage) => store.dispatch(actionSetBannerMessage(payload));
export const boundResetBannerMessage = () => store.dispatch(actionResetBannerMessage());

