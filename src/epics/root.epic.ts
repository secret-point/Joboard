import { combineEpics } from "redux-observable";
import {
  CalculateInclinedValueEpic,
  CreateApplicationAndSkipScheduleDSEpic,
  CreateApplicationDSEpic,
  GetApplicationEpic,
  GetApplicationListEpic,
  GetApplicationSuccessEpic,
  UpdateApplicationDSEpic,
  UpdateWorkflowStepNameEpic,
  WithdrawMultipleApplicationEpic
} from "./application.epic";
import { GetCandidateInfoEpic, UpdateCandidateShiftPreferencesEpic } from "./candidate.epic";
import { JobEpic } from "./job.epic";
import { GetNheTimeSlotsDs, GetNheTimeSlotsThroughNheDs, GetPossibleNhePreferences } from "./nhe.epic";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import { UpdateWotcStatusEpic } from "./wotc.epic";
import { ValidateAmazonLoginIDEpic } from "./thank-you.epic";
import { GetAsssessmentElegibilityEpic } from "./assessment.epic";

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
  UpdateCandidateShiftPreferencesEpic,
  GetNheTimeSlotsDs,
  GetNheTimeSlotsThroughNheDs,
  UpdateWotcStatusEpic,
  ValidateAmazonLoginIDEpic,
  GetPossibleNhePreferences,
  GetApplicationListEpic,
  WithdrawMultipleApplicationEpic,
  GetAsssessmentElegibilityEpic,
  CalculateInclinedValueEpic
);

export default rootEpic;
