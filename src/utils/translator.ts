import i18next, { StringMap, TOptions } from "i18next";
import { getFeatureFlagValue, getLocale } from "./helper";
import { FEATURE_FLAG } from "./enums/common";

/**
 * Get translated strings.
 * @param stringId
 * @param defaultString
 */
export const translate = (stringId: string, defaultString: string, options?: TOptions<StringMap> | string) => {

  // Check if MLS feature flag is enabled otherwise return defaultString
  const isMlsEnabled = getFeatureFlagValue(FEATURE_FLAG.MLS);

  if (!isMlsEnabled) {
    return defaultString;
  }

  // You can pass an array of keys to lookup.
  // The last one in the list will end up being the default value being displayed if no keys are found.
  // const locale = getLocale({});
  const locale = getLocale();
  const keyString = i18next.exists([locale + ".appStrings." + stringId]) ? locale + ".appStrings." + stringId : locale.substring(0, 2) + ".appStrings." + stringId;

  const translation = i18next.isInitialized
    ? i18next.t([keyString, defaultString], options)
    : defaultString;

  return translation;
};

/**
 * Get translated strings with format.
 * @param stringId
 * @param defaultString
 */
export const translateWithFormat = (
  stringId: string,
  defaultString: string,
  formatArgs: any = {}
) => {
  // You can pass an array of keys to lookup.
  // The last one in the list will end up being the default value being displayed if no keys are found.
  // const locale = getLocale({});
  const locale = "en-US";
  const keyString = i18next.exists([locale + ".appStrings." + stringId]) ? locale + ".appStrings." + stringId : locale.substring(0, 2) + ".appStrings." + stringId;
  const translation = i18next.isInitialized
    ? i18next.t([keyString, defaultString], formatArgs)
    : defaultString;
  return translation;
};

// Some use case needs useTranslation to call t function, this function help find string key in such scenario
export const mapI18nStringKey = (stringId: string) => {
  const locale = getLocale();
  return i18next.exists([locale + ".appStrings." + stringId]) ? locale + ".appStrings." + stringId : locale.substring(0, 2) + ".appStrings." + stringId;
};

