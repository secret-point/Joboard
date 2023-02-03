import { combineEpics } from "redux-observable";
import {
  CreateApplicationAndSkipScheduleDSEpic,
  CreateApplicationDSEpic,
  GetApplicationEpic,
  GetApplicationListEpic,
  GetApplicationSuccessEpic,
  UpdateApplicationDSEpic,
  UpdateWorkflowStepNameEpic,
  WithdrawMultipleApplicationEpic
} from "./application.epic";
import { GetCandidateInfoEpic } from "./candidate.epic";
import { JobEpic } from "./job.epic";
import { GetNheTimeSlotsDs, GetNheTimeSlotsThroughNheDs, GetPossibleNhePreferences } from "./nhe.epic";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import { UpdateWotcStatusEpic } from "./wotc.epic";
import { ValidateAmazonLoginIDEpic } from "./thank-you.epic";

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
  WithdrawMultipleApplicationEpic
);

export default rootEpic;
