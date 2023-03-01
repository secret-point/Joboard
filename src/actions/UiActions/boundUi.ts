import store from "../../store/store";
import {
  actionGetCountryStateConfig,
  actionHideAppLoader,
  actionHidePageLoader,
  actionResetBannerMessage,
  actionSetBannerMessage,
  actionShowAppLoader,
  actionShowPageLoader
} from "./uiActions";
import { AlertMessage } from "../../utils/types/common";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());
export const boundSetBannerMessage = (payload: AlertMessage) => store.dispatch(actionSetBannerMessage(payload));
export const boundResetBannerMessage = () => store.dispatch(actionResetBannerMessage());
export const boundShowAppLoader = () => store.dispatch(actionShowAppLoader());
export const boundHideAppLoader = () => store.dispatch(actionHideAppLoader());
export const boundShowPageLoader = () => store.dispatch(actionShowPageLoader());
export const boundHidePageLoader = () => store.dispatch(actionHidePageLoader());
