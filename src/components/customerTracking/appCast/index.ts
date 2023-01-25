import { AppCastEventType } from "./types";
import { log, LoggerType } from "../../../helpers/log-helper";

const pushAppCastDataLayer = (event: AppCastEventType) => {
  if (process.env.NODE_ENV === "development") {
    console.log("appCast event", event);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.acDataLayer = window.acDataLayer || [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.acDataLayer.push(event);
};

export const pushAppCastEvent = (event: number, jobId: string, jobSeekerId?: string): void => {
  const appCastEvent: AppCastEventType = {
    event,
    jid: jobId
  };

  if (jobSeekerId) {
    appCastEvent.jsid = jobSeekerId;
  }
  log("[3Pixels] appCast script load, pushing event", appCastEvent, LoggerType.INFO);
  console.log("[3Pixels] appCast script load, pushing event", appCastEvent, LoggerType.INFO);
  
  pushAppCastDataLayer(appCastEvent);
};
