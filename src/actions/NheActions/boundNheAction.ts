import store from "../../store/store";
import { GetNheTimeSlotRequestDs } from "../../utils/types/common";
import { actionGetNheTimeSlotsDs } from "./nheActions";

export const boundGetNheTimeSlotsDs = (payload: GetNheTimeSlotRequestDs) =>
    store.dispatch(actionGetNheTimeSlotsDs(payload));
