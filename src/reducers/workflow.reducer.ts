import { WORKFLOW_ACTIONS, WORKFLOW_REQUEST } from "../actions/WorkflowActions/workflowActionTypes";


export interface WorkflowState {
    loading: boolean;
    failed: boolean;
}

export const initJobState: WorkflowState = {
    loading: false,
    failed: false
}

export default function workflowReducer( state: WorkflowState = initJobState, action: WORKFLOW_ACTIONS ):WorkflowState {
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
        default:
            return state;
    }

}
