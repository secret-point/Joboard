import {
  onUpdateChange,
  onRedirect,
  onSubmit,
  onGoToAction,
  onResetIsUpdateActionExecuted,
  onGoBack,
  onGoToDashboard,
  onCompleteTask,
  onFilterChange
} from "./actions";
import {
  onStartApplication,
  onGetApplication,
  onLaunchFCRA,
  continueWithFCRADecline,
  createApplication,
  updateApplication,
  onSelectedShifts,
  onUpdateShiftSelection,
  onGetCandidate,
  onTerminateApplication,
  onUpdateWotcStatus
} from "./application-actions";
import {
  onGetRequisitionHeaderInfo,
  onGetNHETimeSlots,
  onGetAllAvailableShifts,
  onGetChildRequisitions,
  onGetJobDescription,
  onGoToDescription,
  onApplySortSelection,
  onApplyFilter,
  onResetFilters
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
  CREATE_APPLICATION: createApplication,
  UPDATE_APPLICATION: updateApplication,
  GET_NHE_TIME_SLOTS: onGetNHETimeSlots,
  GET_CHILD_REQUISITIONS: onGetChildRequisitions,
  GET_ALL_AVAILABLE_SHIFTS: onGetAllAvailableShifts,
  ON_GO_TO: onGoToAction,
  ON_GO_BACK: onGoBack,
  GO_TO_JOB_DESCRIPTION: onGoToDescription,
  ON_SHIFT_SELECTION: onSelectedShifts,
  RESET_IS_UPDATE_ACTION_EXECUTED: onResetIsUpdateActionExecuted,
  GET_JOB_DESCRIPTION: onGetJobDescription,
  UPDATE_SHIFT_SELECTION: onUpdateShiftSelection,
  ON_GET_CANDIDATE: onGetCandidate,
  ON_APPLY_SORTING: onApplySortSelection,
  GO_TO_DASHBOARD: onGoToDashboard,
  TERMINATE_APPLICATION: onTerminateApplication,
  COMPLETE_TASK: onCompleteTask,
  UPDATE_WOTC_STATUS: onUpdateWotcStatus,
  ON_APPLY_FILTER: onApplyFilter,
  RESET_FILTERS: onResetFilters,
  ON_FILTER_CHANGE: onFilterChange
};

export default actionMap;
