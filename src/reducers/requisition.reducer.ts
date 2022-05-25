import { Requisition } from "../utils/commonTypes";
import { GET_REQUISITION_ACTIONS, GET_REQUISITION_TYPE } from "../actions/RequisitionActions/requisitionActionTypes";

export interface RequisitionState {
    loading: boolean;
    results?: Requisition;
    failed?: boolean;
}

export const initRequisitionState: RequisitionState = {
    loading: false,
    failed: false
}


export default function requisitionReducer(
    state: RequisitionState = initRequisitionState,
    action: GET_REQUISITION_ACTIONS
):RequisitionState {
    switch (action.type) {
        case GET_REQUISITION_TYPE.GET:
            return {
                ...state,
                loading: true,
                failed: false
            };
        case GET_REQUISITION_TYPE.SUCCESS:
            return {
                ...state,
                results: {
                    ...action.payload,
                }
            };
        case GET_REQUISITION_TYPE.FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
        default:
            return state;
    }

}