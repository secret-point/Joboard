import { AppCastEventType } from "./types";
import { log, LoggerType } from "../../../helpers/log-helper";

const pushAppCastDataLayer = (event: AppCastEventType) => {
  if (process.env.NODE_ENV === "development") {
    console.log("appCast event", event);
  }

  log("[3Pixels] appCast script load, pushing event", event, LoggerType.INFO);

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

  const script = document.querySelector("#appCastScript");

  if (!script) {
    const appCastScript = document.createElement("script");
    appCastScript.async = true;
    appCastScript.src ="https://click.appcast.io/pixels/wfs-8984.js?ent=387";
    appCastScript.type = "text/javascript";
    appCastScript.id = "appCastScript";

    appCastScript.onload = () => {
      pushAppCastDataLayer(appCastEvent);
    };
    document.body.appendChild(appCastScript);
  } else {
    pushAppCastDataLayer(appCastEvent);
  }
};

