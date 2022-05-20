import store from "../../store/store";
import { actionGetEnvConfig } from "./appConfigActions";

export const boundGetEnvConfig = () => store.dispatch(actionGetEnvConfig());
