import store from "../../store/store";
import { actionGetCountryStateConfig } from "./uiActions";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());
