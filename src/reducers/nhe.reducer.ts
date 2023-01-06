import { NHETimeSlot } from "../utils/types/common";
import { NHE_ACTION_TYPES, NheTimeSlotsActions } from "../actions/NheActions/nheActionTypes";

export interface NheState {
  loading: boolean;
  results: {
    nheData: NHETimeSlot[];
  };
  failed?: boolean;
}

export const initNheState: NheState = {
  loading: false,
  failed: false,
  results: {
    nheData: []
  }
};

export default function nheReducer( state: NheState = initNheState, action: NheTimeSlotsActions ): NheState {
  switch (action.type) {
    case NHE_ACTION_TYPES.GET_SLOTS_DS:
    case NHE_ACTION_TYPES.GET_SLOTS_THROUGH_NHE_DS:
      return {
        ...state,
        loading: true,
        failed: false
      };

    case NHE_ACTION_TYPES.GET_SLOTS_DS_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        results: {
          nheData: action.payload
        }
      };

    case NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        results: {
          nheData: []
        }
      };

    default:
      return state;
  }

}
