import { Action } from "redux";
import { GetNheTimeSlotRequestDs, NHETimeSlot } from "../../utils/types/common";

export enum NHE_ACTION_TYPES {
    GET_SLOTS_DS = "GET_AVAILABLE_TIME_SLOTS_DS",
    GET_SLOTS_DS_SUCCESS = "GET_AVAILABLE_TIME_SLOTS_DS_SUCCESS",
    GET_SLOTS_DS_FAILED = "GET_AVAILABLE_TIME_SLOTS_DS_FAILED"
}

export interface GetNheTimeSlotsDsAction extends Action {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS;
    payload: GetNheTimeSlotRequestDs;
}

export interface GetNheTimeSlotsDsSuccessAction extends Action {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS_SUCCESS;
    payload: NHETimeSlot[]
}

export interface GetNheTimeSlotsDsFailedAction extends Action {
    type: NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED;
    payload: any;
}

export type NheTimeSlotsActions =
    GetNheTimeSlotsDsAction |
    GetNheTimeSlotsDsSuccessAction |
    GetNheTimeSlotsDsFailedAction ; 
