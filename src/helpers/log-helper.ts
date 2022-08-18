import KatalLogger from "@katal/logger";
import URLParamsHelper from "./url-params-helper";

export enum LoggerType {
  ERROR = "error",
  INFO = "info",
  DEBUG = "debug",
  WARN = "warn"
}

export const initLogger = (url: string, appStage: string, context?: any) => {
  return new KatalLogger({
    url: url,
    // log to console for non-production environments
    logToConsole: process.env.NODE_ENV !== "production" || appStage !== "prod",
    recordMetrics: true
  });
};

const getLogger = (context: any = {}): KatalLogger | undefined => {
  let log = window.log;

  if (!log) {
    // try to re-init the logger if it was not available
    const { loggerUrl, appStage } = window;

    if (loggerUrl && appStage) {
      log = initLogger(loggerUrl, appStage, context);
      window.log = log;
    }
  }

  return log;
};

export const log = (message: string, context: any = {}, type?: LoggerType) => {
  const cid = getCookie("hvhcid");
  const log = getLogger(context);
  if (!log) {
    // can't get it from window.log and can't re-init it, just return
    return;
  }
  context = {
    cid,
    ...new URLParamsHelper().get(),
    ...context
  };
  switch (type) {
    case LoggerType.DEBUG:
      log.debug(message, context);
      break;
    case LoggerType.INFO:
      log.info(message, context);
      break;
    case LoggerType.ERROR:
      log.error(message, context);
      break;
    case LoggerType.WARN:
      log.warn(message, context);
      break;
    default:
      log.info(message, context);
      break;
  }
};

export const logError = (
  message: string,
  error: Error,
  context: any = {},
  type?: LoggerType
) => {
  const cid = getCookie("hvhcid");
  const log = getLogger(context);
  if (!log) {
    // can't get it from window.log and can't re-init it, just return
    return;
  }
  context = {
    cid,
    ...new URLParamsHelper().get(),
    ...context
  };
  log.error(message, error, context);
};

const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
