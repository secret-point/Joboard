import { SCHEDULE_DURATION_STRINGS } from "../utils/constants/common";
import { translate as t } from "../../src/utils/translator";
import { Schedule } from "../utils/types/common";
import { getLocalizedDate, get12hrTimeStringLocalized } from "./localization-helpers";
import { log } from "./log-helper";

const {
  PERMANENT_CONTRACT,
  FIXED_TERM_CONTRACT,
  FIXED_TERM_CONTRACT_WITH_END_DATE
} = SCHEDULE_DURATION_STRINGS;

const STRINGS = {
  permanentContract: t(
    PERMANENT_CONTRACT.translationKey, PERMANENT_CONTRACT.defaultString
  ),
  fixedTermContract: t(
    FIXED_TERM_CONTRACT.translationKey, FIXED_TERM_CONTRACT.defaultString
  ),
  fixedTermContractWithEndDateString: t(
    FIXED_TERM_CONTRACT_WITH_END_DATE.translationKey, FIXED_TERM_CONTRACT_WITH_END_DATE.defaultString
  )
};

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
      ? STRINGS.permanentContract
      : `${STRINGS.fixedTermContractWithEndDateString} ${hireEndDate}`;
  } else if (employmentType === "Seasonal") {
    duration = hireEndDate ? null : STRINGS.fixedTermContract;
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
  const hireEndDate = schedule?.hireEndDate && getLocalizedDate(schedule.hireEndDate);
  const scheduleText = schedule?.scheduleText && get12hrTimeStringLocalized(schedule.scheduleText);

  return { ...schedule,
    // if hireStartDate is present this is considered the firstDayOnSite in the UK
    firstDayOnSite: schedule.hireStartDate || schedule.firstDayOnSite,
    duration: duration,
    hireEndDate: hireEndDate,
    scheduleText: scheduleText,
    // The hire end date shoud be displayed only if duration is falsy
    displayHireEndDate: !duration,
    // The employment type is included in the duration for the UK 
    displayEmploymentType: false,
    displayHoursPerWeekDecimal: true
  };
};
  
