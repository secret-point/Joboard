import { onUpdateChange, onRedirect, onSubmit, onGoToAction } from "./actions";
import {
  onStartApplication,
  onGetApplication,
  onLaunchFCRA,
  continueWithFCRADecline,
  updatePreHireStepsStatus,
  createApplication,
  updateApplication,
  updateNonFcraQuestions,
  updateAdditionalBackgroundInfo,
  updateContingentOffer
} from "./application-actions";
import {
  onGetRequisitionHeaderInfo,
  onGetNHETimeSlots
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
  UPDATE_NON_FCRA_QUESTIONS: updateNonFcraQuestions,
  UPDATE_ADDITIONAL_BG_INFO: updateAdditionalBackgroundInfo,
  UPDATE_CONTINGENT_OFFER: updateContingentOffer,
  GET_NHE_TIME_SLOTS: onGetNHETimeSlots,
  ON_GO_TO: onGoToAction
};

export default actionMap;
