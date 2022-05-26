import store from "../../store/store";
import {
    CreateApplicationRequestDS,
    GetApplicationRequest
} from "../../utils/apiTypes";
import {
    actionCreateApplicationDS,
    actionGetApplication,
} from "./applicationActions";

export const boundGetApplication = (
    payload: GetApplicationRequest,
) => store.dispatch(actionGetApplication(payload));

export const boundCreateApplicationDS = (
    payload: CreateApplicationRequestDS,
    onSuccess?: Function
) => store.dispatch(actionCreateApplicationDS(payload, onSuccess));
