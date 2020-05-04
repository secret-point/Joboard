import { onUpdateChange, onRedirect, onSubmit, hideNavbar } from "./actions";
import {
  onStartApplication,
  onGetApplication,
  onLaunchFRCA,
  continueWithFRCADecline,
  updatePreHireStepsStatus
} from "./application-actions";
import { onGetRequisitionHeaderInfo } from "./requisition-actions";

const actionMap: any = {
  ON_VALUE_CHANGE: onUpdateChange,
  ON_REDIRECT: onRedirect,
  START_APPLICATION: onStartApplication,
  GET_REQUISITION_HEADER_INFO: onGetRequisitionHeaderInfo,
  SUBMIT_DATA: onSubmit,
  GET_APPLICATION: onGetApplication,
  LAUNCH_FRCA: onLaunchFRCA,
  HIDE_NAVBAR: hideNavbar,
  CONTINUE_WITH_FRCA_DECLINE: continueWithFRCADecline,
  UPDATE_PRE_HIRE_STEPS_STATUS: updatePreHireStepsStatus
};

export default actionMap;
