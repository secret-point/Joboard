import { combineEpics } from "redux-observable";
import {
  CreateApplicationAndSkipScheduleDSEpic,
  CreateApplicationDSEpic,
  GetApplicationEpic,
  GetApplicationListEpic,
  GetApplicationSuccessEpic,
  UpdateApplicationDSEpic,
  UpdateWorkflowStepNameEpic,
  WithdrawMultipleApplicationEpic,
  CalculateInclinedValueEpic,
} from "./application.epic";
import { GetCandidateInfoEpic, UpdateCandidateShiftPreferencesEpic } from "./candidate.epic";
import { JobEpic } from "./job.epic";
import { GetNheTimeSlotsDs, GetNheTimeSlotsThroughNheDs, GetPossibleNhePreferences } from "./nhe.epic";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import { UpdateWotcStatusEpic } from "./wotc.epic";
import { ValidateAmazonLoginIDEpic } from "./thank-you.epic";
import { GetAsssessmentElegibilityEpic } from "./assessment.epic";
import { InitiateEditBgcPageEpic, SubmitBgcPageEpic, UpdateCandidateAddressHistoryEpic, UpdateCandidateBackgroundInformationEpic, UpdateCandidateBgcDisclosureEpic, UpdateCandidateBirthHistoryEpic, WithdrawApplicationBgcEpic } from "./fullBgc.epic";

const rootEpic = combineEpics(
  JobEpic,
  GetApplicationEpic,
  GetScheduleListByJobIdEpic,
  GetScheduleDetailEpic,
  CreateApplicationDSEpic,
  UpdateApplicationDSEpic,
  CreateApplicationAndSkipScheduleDSEpic,
  GetApplicationSuccessEpic,
  UpdateWorkflowStepNameEpic,
  GetCandidateInfoEpic,
  GetNheTimeSlotsDs,
  GetNheTimeSlotsThroughNheDs,
  UpdateWotcStatusEpic,
  ValidateAmazonLoginIDEpic,
  GetPossibleNhePreferences,
  GetApplicationListEpic,
  WithdrawMultipleApplicationEpic,
  GetAsssessmentElegibilityEpic,
  UpdateCandidateShiftPreferencesEpic,
  CalculateInclinedValueEpic,
  InitiateEditBgcPageEpic,
  UpdateCandidateBgcDisclosureEpic,
  WithdrawApplicationBgcEpic,
  UpdateCandidateBackgroundInformationEpic,
  UpdateCandidateAddressHistoryEpic,
  UpdateCandidateBirthHistoryEpic,
  SubmitBgcPageEpic
);

export default rootEpic;
