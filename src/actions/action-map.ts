import { onUpdateChange, onRedirect, onSubmit, onGoToAction } from "./actions";
import {
  onStartApplication,
  onGetApplication,
  onLaunchFCRA,
  continueWithFCRADecline,
  updatePreHireStepsStatus,
  createApplication,
  updateApplication,
  onSelectedShifts
} from "./application-actions";
import {
  onGetRequisitionHeaderInfo,
  onGetNHETimeSlots,
  onGetAllAvailableShifts
} from "./requisition-actions";

const actionMap: any = {
  ON_VALUE_CHANGE: onUpdateChange,
  ON_REDIRECT: onRedirect,
  START_APPLICATION: onStartApplication,
  GET_REQUISITION_HEADER_INFO: onGetRequisitionHeaderInfo,
  SUBMIT_DATA: onSubmit,
  GET_APPLICATION: onGetApplication,
  LAUNCH_FCRA: onLaunchFCRA,
  CONTINUE_WITH_FCRA_DECLINE: continueWithFCRADecline,
  UPDATE_PRE_HIRE_STEPS_STATUS: updatePreHireStepsStatus,
  CREATE_APPLICATION: createApplication,
  UPDATE_APPLICATION: updateApplication,
  GET_NHE_TIME_SLOTS: onGetNHETimeSlots,
  GET_ALL_AVAILABLE_SHIFTS: onGetAllAvailableShifts,
  ON_GO_TO: onGoToAction,
  ON_SHIFT_SELECTION: onSelectedShifts
};

export default actionMap;
