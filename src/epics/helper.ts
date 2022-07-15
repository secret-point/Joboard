import { ProxyApiError } from "../utils/api/types";

export const epicSwitchMapHelper = async (response: any) => {
  if(!response.data || !!response.errorCode || !!response.error || response.errorMessage) {
    const errorCode = response.errorCode;
    throw createProxyApiEpicError(errorCode, response.error || response.errorMessage);
  }
  return response;
}

export const createProxyApiEpicError = (errorCode: string, errorMessage?: string): ProxyApiError => {
  return {errorCode, errorMessage}
};