import { NHETimeSlot, PossibleNhePreferenceConfig, SavePossibleNhePreferenceRequest } from "../utils/types/common";
import { NHE_ACTION_TYPES, NheTimeSlotsActions } from "../actions/NheActions/nheActionTypes";

export interface NheState {
  loading: boolean;
  results: {
    nheData: NHETimeSlot[];
    possibleNhePreferences: PossibleNhePreferenceConfig;
  };
  nhePreferenceRequest: SavePossibleNhePreferenceRequest;
  failed?: boolean;
}

export const initNheState: NheState = {
  loading: false,
  failed: false,
  results: {
    nheData: [],
    possibleNhePreferences: {
      dates: [],
      timeslots: [],
      cityPass: []
    }
  },
  nhePreferenceRequest: {
    possibleCities: [],
    possibleNHETimeSlots: [],
    possibleNHEDates: []
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
          ...state.results,
          nheData: action.payload,
        }
      };

    case NHE_ACTION_TYPES.GET_SLOTS_DS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        results: {
          ...state.results,
          nheData: []
        }
      };

    case NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        results: {
          nheData: [
            ...state.results.nheData
          ],
          possibleNhePreferences: action.payload
        }
      };

    case NHE_ACTION_TYPES.GET_POSSIBLE_NHE_PREFERENCES_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        results: {
          nheData: [
            ...state.results.nheData
          ],
          possibleNhePreferences: {
            dates: [],
            timeslots: [],
            cityPass: []
          }
        }
      };

    case NHE_ACTION_TYPES.SET_POSSIBLE_NHE_PREFERENCE_REQUEST:
      return {
        ...state,
        nhePreferenceRequest: action.payload
      };

    default:
      return state;
  }

}
