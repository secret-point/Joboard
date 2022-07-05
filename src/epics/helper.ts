import { ProxyApiError } from "../utils/api/types";

export const epicSwitchMapHelper = async (response: any) => {
  if(!response.data || !!response.error || !!response.errorCode) {
    const errorCode = response.errorCode || "INTERNAL_SERVER_ERROR"
    throw createProxyApiEpicError(errorCode);
  }
  return response;
}

export const createProxyApiEpicError = (errorCode: string): ProxyApiError => {
  return {errorCode}
};