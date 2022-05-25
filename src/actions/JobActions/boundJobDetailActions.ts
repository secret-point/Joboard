import store from "../../store/store";
import { GetJobDetailRequest } from "../../utils/apiTypes";
import {
    actionGetJobDetail,
} from "./jobDetailActions";

export const boundGetJobDetail = ( payload: GetJobDetailRequest, ) =>
    store.dispatch(actionGetJobDetail(payload));
