import store from "../../store/store";
import { GetJobDetailRequest } from "../../utils/apiTypes";
import {
  actionGetJobDetail,
} from "./jobDetailActions";

export const boundGetJobDetail = ( payload: GetJobDetailRequest, onSuccess?: Function, onError?: Function) =>
  store.dispatch(actionGetJobDetail(payload, onSuccess, onError));
