import { combineEpics } from "redux-observable";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";
import { CreateApplicationDSEpic, GetApplicationEpic } from "./application.epic";
import { GetJobDetailEpic } from "./getJobDetail.epic";

const rootEpic = combineEpics(
    GetJobDetailEpic,
    GetApplicationEpic,
    GetScheduleListByJobIdEpic,
    GetScheduleDetailEpic,
    CreateApplicationDSEpic,
);

export default rootEpic;
