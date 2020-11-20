import KatalLogger from "@katal/logger";
import URLParamsHelper from "./url-params-helper";

export enum LoggerType {
  ERROR = "error",
  INFO = "info",
  DEBUG = "debug",
  WARN = "warn"
}

export const initLogger = (url?: string, context?: any) => {
  return new KatalLogger({
    url: url,
    logToConsole: process.env.NODE_ENV !== "production",
    recordMetrics: true
  });
};

export const log = (message: string, context: any = {}, type?: LoggerType) => {
  const cid = getCookie("hvhcid");
  let log = window.log;
  if (!log) {
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
  context = {
    cid,
    ...new URLParamsHelper().get(),
    ...context
  };
  const { loggerUrl } = window;
  const log = initLogger(loggerUrl, context);
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
