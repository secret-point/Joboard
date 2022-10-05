import { WORKFLOW_ACTIONS, WORKFLOW_REQUEST } from "../actions/WorkflowActions/workflowActionTypes";
import { WORKFLOW_ERROR_CODE } from "../utils/enums/common";


export interface WorkflowState {
    loading: boolean;
    failed: boolean;
    workflowErrorCode: WORKFLOW_ERROR_CODE;
}

export const initJobState: WorkflowState = {
    loading: false,
    failed: false,
    workflowErrorCode: WORKFLOW_ERROR_CODE.NOT_REHIRE_ELIGIBLE
}

export default function workflowReducer( state: WorkflowState = initJobState, action: WORKFLOW_ACTIONS ): WorkflowState {
    switch (action.type) {
        case WORKFLOW_REQUEST.INIT:
        case WORKFLOW_REQUEST.START:
            return {
                ...state,
                loading: true,
                failed: false
            };
            case WORKFLOW_REQUEST.END:
            return {
                ...state,
                loading: false,
                failed: false
            };

        case WORKFLOW_REQUEST.SET_WORKFLOW_ERROR_CODE:
            return {
                ...state,
                workflowErrorCode: action.payload
            }
        default:
            return state;
    }

}
