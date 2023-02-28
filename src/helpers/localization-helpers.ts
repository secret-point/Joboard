import moment from "moment";
import { DEFAULT_INPUT_DATE_FORMAT, DEFAULT_INPUT_TIME_FORMAT, LOCALE_CONFIG } from "../utils/constants/common";
import { getLocale } from "../utils/helper";
import { Locale } from "../utils/types/common";
import { log } from "./log-helper";

const DATE = "date";
const TIME = "time";

export const getLocalizedDateFormat = (locale: Locale) =>
  LOCALE_CONFIG[locale]?.DATE_FORMAT || LOCALE_CONFIG.DEFAULT.DATE_FORMAT;

export const getLocalizedTimeFormat = (locale: Locale) =>
  LOCALE_CONFIG[locale]?.TIME_FORMAT || LOCALE_CONFIG.DEFAULT.TIME_FORMAT;

const localizeDateOrTimeString = (
  input: string,
  type: typeof TIME | typeof DATE,
  inputFormat: moment.MomentFormatSpecification,
) => {
  const locale = getLocale();
  const outputFormat = type === TIME ? getLocalizedTimeFormat(locale) : LOCALE_CONFIG[locale]?.DATE_FORMAT;
  const output = moment(input, inputFormat);

  if (output.isValid()) {
    // setting up the locale that the output should return into
    output.locale(locale);

    return output.format(outputFormat);
  }

  log(
    `Invalid ${type} string, returning the original string instead:`,
    input
  );
  return input;
};

export const getLocalizedDate = (
  date: string,
  inputFormat: moment.MomentFormatSpecification = DEFAULT_INPUT_DATE_FORMAT
) => localizeDateOrTimeString(date, DATE, inputFormat);

export const getLocalizedTime = (
  time: string,
  inputFormat: moment.MomentFormatSpecification = DEFAULT_INPUT_TIME_FORMAT
) => localizeDateOrTimeString(time, TIME, inputFormat);

/**
 * It parses any string containing a time subtring(s) and localizes it into the right format according to the locale.
 * For example for en-GB: "Mon, Tues 10:00 am - 05:00PM" yields "Mon, Tues 10:00 - 17:00"
 */
export const get12hrTimeStringLocalized = (text: string) => {
  // Replaces any time string like "10:00am" or "05:00 PM" (From a "digit" until an "m" letter, case insensitive) with the rigth time format
  return text.replace(
    /([0-2][0-9]):[0-5][0-9](\s)?(am|pm|AM|PM)/gi,
    timeString => getLocalizedTime(timeString)
  );
};

export const getLocalizedTimezone = (locale: Locale) =>
  LOCALE_CONFIG[locale]?.TIME_ZONE || LOCALE_CONFIG.DEFAULT.TIME_ZONE;