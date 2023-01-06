import { log, LoggerType } from "../helpers/log-helper";
import { ProxyApiError } from "../utils/api/types";

export const epicSwitchMapHelper = async (response: any) => {
  if (!response.data || !!response.errorCode || !!response.error || response.errorMessage) {
    log("[Epic] epicSwitchMapHelper: Starting to raise proxy api error", response, LoggerType.ERROR);
    const { errorCode } = response;
    throw createProxyApiEpicError(errorCode, response.error || response.errorMessage);
  }
  return response;
};

export const createProxyApiEpicError = (errorCode: string, errorMessage?: string): ProxyApiError => {
  return { errorCode, errorMessage };
};
