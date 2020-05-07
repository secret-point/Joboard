import { onUpdateChange, onRedirect, onSubmit, hideNavbar } from "./actions";
import {
  onStartApplication,
  onGetApplication,
  onLaunchFRCA,
  continueWithFRCADecline,
  updatePreHireStepsStatus,
  createApplication,
  updateApplication,
  updateNonFcraQuestions,
  updateAdditionalBackgroundInfo
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
  UPDATE_PRE_HIRE_STEPS_STATUS: updatePreHireStepsStatus,
  CREATE_APPLICATION: createApplication,
  UPDATE_APPLICATION: updateApplication,
  UPDATE_NON_FCRA_QUESTIONS: updateNonFcraQuestions,
  UPDATE_ADDITIONAL_BG_INFO: updateAdditionalBackgroundInfo
};

export default actionMap;
