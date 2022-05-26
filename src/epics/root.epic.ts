import { combineEpics } from "redux-observable";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import { CreateApplicationDSEpic, GetApplicationEpic } from "./application.epic";
import { JobEpic } from "./job.epic";

const rootEpic = combineEpics(
    JobEpic,
    GetApplicationEpic,
    GetScheduleListByJobIdEpic,
    GetScheduleDetailEpic,
    CreateApplicationDSEpic,
);

export default rootEpic;
