// import { TIME_UNITS } from "../utils/constants/common";
import { translate as t } from "../../src/utils/translator"; 
import { CONNECTIVE_TEXT, TIME_UNITS } from "../utils/constants/common";

const STRINGS = {
  min: t(
    TIME_UNITS.MINUTES.ABBREVIATION.SINGULAR.translationKey,
    TIME_UNITS.MINUTES.ABBREVIATION.SINGULAR.defaultString
  ),
  mins: t(
    TIME_UNITS.MINUTES.ABBREVIATION.PLURAL.translationKey,
    TIME_UNITS.MINUTES.ABBREVIATION.PLURAL.defaultString
  ),
  hr: t(
    TIME_UNITS.HOURS.ABBREVIATION.SINGULAR.translationKey,
    TIME_UNITS.HOURS.ABBREVIATION.SINGULAR.defaultString
  ),
  hrs: t(
    TIME_UNITS.HOURS.ABBREVIATION.PLURAL.translationKey,
    TIME_UNITS.HOURS.ABBREVIATION.PLURAL.defaultString
  ),
  and: t(CONNECTIVE_TEXT.translationKey, CONNECTIVE_TEXT.defaultString, )
};

// Example: 22.5 ==> 22hrs and 30mins per week
export const getDecimalHoursInHourAndMinutes = (decimalHours: number): string => {
  let minutes = Math.round(Number((decimalHours % 1).toFixed(3)) * 60);
  const is60Mins = minutes === 60 ;

  // This is to account for when the decimals equals to 60 mins
  minutes = is60Mins ? 0 : minutes;

  const hours = Math.floor(decimalHours) + (is60Mins ? 1 : 0) ;
  const { min, mins, hrs, hr, and } = STRINGS;

  const hoursString = hours > 0 ? hours + (hours === 1 ? hr : hrs) : "";
  const prefix = hours > 0 ? ` ${and} ` : "";
  const minutesString =
        minutes > 0 ? prefix + minutes + (minutes === 1 ? min : mins) : "";

  return hoursString + minutesString;
};
