import { combineEpics } from "redux-observable";
import { GetApplicationEpic } from "./getApplication.epic";
import { getJobDetailEpic } from "./getJobDetail.epic";
import { GetScheduleDetailEpic, GetScheduleListByJobIdEpic } from "./schedule.epic";

const rootEpic = combineEpics(
    getJobDetailEpic,
    GetApplicationEpic,
    GetScheduleListByJobIdEpic,
    GetScheduleDetailEpic
);

export default rootEpic;
