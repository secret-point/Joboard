import { GetJobDetailRequest } from "../../utils/apiTypes";
import { loadingStatusHelper } from "../../utils/helper";
import { Job } from "../../utils/types/common";
import {
    GET_JOB_DETAIL_TYPE,
    GetJobDetailAction,
    GetJobDetailFailedAction,
    GetJobDetailSuccessAction,
} from "./jobDetailActionTypes";

export const actionGetJobDetail = ( payload: GetJobDetailRequest ): GetJobDetailAction => {
    return { type: GET_JOB_DETAIL_TYPE.GET, payload }
};

export const actionGetJobDetailSuccess = ( payload: Job ): GetJobDetailSuccessAction => {
    return { type: GET_JOB_DETAIL_TYPE.SUCCESS, payload, loadingStatus:loadingStatusHelper() }
};

export const actionGetJobDetailFailed = ( payload: any ): GetJobDetailFailedAction => {
    return { type: GET_JOB_DETAIL_TYPE.FAILED, payload }
};
