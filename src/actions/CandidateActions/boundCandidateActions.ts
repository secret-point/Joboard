import store from "../../store/store";
import {
    actionGetCandidateInfo,
    actionSetCandidatePatchRequest,
    actionUpdateCandidateInfoError
} from "./candidateActions";
import { CandidateInfoErrorState, CandidatePatchRequest } from "../../utils/types/common";

export const boundGetCandidateInfo = () => store.dispatch(actionGetCandidateInfo());

export const boundSetCandidatePatchRequest = (candidate: CandidatePatchRequest) =>
    store.dispatch(actionSetCandidatePatchRequest(candidate));

export const boundUpdateCandidateInfoError = (payload: CandidateInfoErrorState) =>
    store.dispatch(actionUpdateCandidateInfoError(payload));
