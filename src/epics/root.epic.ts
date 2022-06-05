import { combineEpics } from "redux-observable";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import {
    CreateApplicationAndSkipScheduleDSEpic,
    CreateApplicationDSEpic,
    GetApplicationEpic,
    GetApplicationSuccessEpic,
    UpdateApplicationDSEpic,
    UpdateWorkflowStepNameEpic
} from "./application.epic";
import { JobEpic } from "./job.epic";
import { GetCandidateInfoEpic } from "./candidate.epic";

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
    GetCandidateInfoEpic
);

export default rootEpic;
