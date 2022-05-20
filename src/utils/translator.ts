import i18next, { StringMap, TOptions } from "i18next";

/**
 * Get translated strings.
 * @param stringId
 * @param defaultString
 */
export const translate = (stringId: string, defaultString: string, options?: TOptions<StringMap> | string) => {
  //You can pass an array of keys to lookup.
  //The last one in the list will end up being the default value being displayed if no keys are found.
  // const locale = getLocale({});
  const locale = 'en-US';
  const keyString  = i18next.exists([locale + '.appStrings.' + stringId]) ? locale + '.appStrings.' + stringId : locale.substring(0, 2) + '.appStrings.' + stringId;
  console.log("keyString", keyString);

  
  const translation = i18next.isInitialized
      ? i18next.t([keyString, defaultString], options)
      : defaultString;
  console.log(i18next.isInitialized, i18next.t([keyString, defaultString], options))
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
  //You can pass an array of keys to lookup.
  //The last one in the list will end up being the default value being displayed if no keys are found.
  // const locale = getLocale({});
  const locale = 'en-US';
  const keyString  = i18next.exists([locale + '.appStrings.' + stringId]) ? locale + '.appStrings.' + stringId : locale.substring(0, 2) + '.appStrings.' + stringId;
  const translation = i18next.isInitialized
    ? i18next.t([keyString, defaultString], formatArgs)
    : defaultString;
  return translation;
};
