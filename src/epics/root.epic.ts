import { combineEpics } from "redux-observable";
import { GetApplicationEpic } from "./getApplication.epic";
import { getJobDetailEpic } from "./getJobDetail.epic";

const rootEpic = combineEpics(
    getJobDetailEpic,
    GetApplicationEpic,
);

export default rootEpic;
