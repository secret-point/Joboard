import { combineEpics } from "redux-observable";
import {
    CreateApplicationAndSkipScheduleDSEpic,
    CreateApplicationDSEpic,
    GetApplicationEpic,
    GetApplicationSuccessEpic,
    UpdateApplicationDSEpic,
    UpdateWorkflowStepNameEpic
} from "./application.epic";
import { GetCandidateInfoEpic } from "./candidate.epic";
import { JobEpic } from "./job.epic";
import { GetNheTimeSlotsDs, GetNheTimeSlotsThroughNheDs } from "./nhe.epic";
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
    ValidateAmazonLoginIDEpic
);

export default rootEpic;
