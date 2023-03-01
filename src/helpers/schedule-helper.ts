import { Schedule } from "../utils/types/common";
import { getLocalizedDate, get12hrTimeStringLocalized } from "./localization-helpers";
import { log } from "./log-helper";
import { translate as t } from "../utils/translator";

export const PERMANENT_CONTRACT_STRING = t(
  "BB-schedule-card-duration-permanent", "Permanent"
);
export const FIXED_TERM_CONTRACT_STRING = t(
  "BB-schedule-card-duration-fixed-term-contract", "Fixed term contract"
);
export const FIXED_TERM_CONTRACT_WITH_END_DATE_STRING = t(
  "BB-schedule-card-duration-fixed-term-contract-with-end-date", "Fixed term contract until"
);

interface iScheduleDurationFn {
  employmentType: string;
  hireEndDate: string | null;
  scheduleId: string;
  applicationId?: string;
}

export const getScheduleDuration = ({
  employmentType,
  hireEndDate,
  scheduleId,
  applicationId
}: iScheduleDurationFn) => {
  let duration: null | string = null;

  if (employmentType === "Regular") {
    duration = !hireEndDate
      ? PERMANENT_CONTRACT_STRING
      : `${FIXED_TERM_CONTRACT_WITH_END_DATE_STRING} ${hireEndDate}`;
  } else if (employmentType === "Seasonal") {
    duration = hireEndDate ? null : FIXED_TERM_CONTRACT_STRING;
  }
  log(
    `The duration for schedule ${scheduleId}  ${
      applicationId ? `and applicationId ${applicationId}` : ""
    } is set to ${duration}`
  );

  return duration;
};

export const getScheduleInUKFormat = (schedule: Schedule) => {

  const duration = getScheduleDuration(schedule);
  const hireEndDate= schedule?.hireEndDate && getLocalizedDate(schedule.hireEndDate);
  const scheduleText= schedule?.scheduleText && get12hrTimeStringLocalized(schedule.scheduleText);

  return { ...schedule,
    // if hireStartDate is present this is considered the firstDayOnSite in the UK
    firstDayOnSite: schedule.hireStartDate || schedule.firstDayOnSite,
    duration: duration,
    hireEndDate: hireEndDate,
    scheduleText: scheduleText,
    // The hire end date shoud be displayed only if duration is falsy
    displayHireEndDate: !duration,
    // The employment type is included in the duration for the UK 
    displayEmploymentType: false
  };
};
  
