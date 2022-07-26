import store from "../../store/store";
import {
  actionGetCountryStateConfig,
  actionHideAppLoader,
  actionResetBannerMessage,
  actionSetBannerMessage,
  actionShowAppLoader
} from "./uiActions";
import { AlertMessage } from "../../utils/types/common";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());
export const boundSetBannerMessage = (payload: AlertMessage) => store.dispatch(actionSetBannerMessage(payload));
export const boundResetBannerMessage = () => store.dispatch(actionResetBannerMessage());
export const boundShowAppLoader = () => store.dispatch(actionShowAppLoader());
export const boundHideAppLoader = () => store.dispatch(actionHideAppLoader());

