import store from "../../store/store";
import { GetApplicationRequest } from "../../utils/apiTypes";
import {
    actionGetApplication,
} from "./applicationActions";

export const boundGetApplication = (
    payload: GetApplicationRequest,
) => store.dispatch(actionGetApplication(payload));
