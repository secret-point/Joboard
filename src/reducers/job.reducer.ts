import { Job } from "../utils/types/common";
import { GET_JOB_DETAIL_TYPE, JOB_DETAIL_ACTIONS } from "../actions/JobActions/jobDetailActionTypes";

export interface JobState {
    loading: boolean;
    results?: Job;
    failed?: boolean;
}

export const initJobState: JobState = {
    loading: false,
    failed: false
}

export default function jobReducer( state: JobState = initJobState, action: JOB_DETAIL_ACTIONS ):JobState {
    switch (action.type) {
        case GET_JOB_DETAIL_TYPE.GET:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_JOB_DETAIL_TYPE.SUCCESS:
            return {
                ...state,
                loading: false,
                failed: false,
                results: {
                    ...action.payload,
                }
            };
        case GET_JOB_DETAIL_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        default:
            return state;
    }

}
