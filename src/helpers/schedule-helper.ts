import { Schedule } from "../utils/types/common";
import { getScheduleDuration } from "./job-helpers";
import { getLocalizedDate, get12hrTimeStringLocalized } from "./localization-helpers";

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
  
