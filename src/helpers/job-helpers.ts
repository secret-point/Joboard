import { translate as t } from "../utils/translator";
import { log } from "./log-helper";

export const PERMANENT_CONTRACT_STRING = t(
  "BB-schedule-card-duration-permanent", "Permanent"
);
export const FIXED_TERM_CONTRACT_STRING = t(
  "BB-schedule-card-duration-fixed-term-contract", "Fixed term contract"
);
export const FIXED_TERM_CONTRACT_WITH_END_DATE_STRING = t(
  "BB-schedule-card-duration-fixed-term-contract-with-end-date", "Fixed term contract until"
);

interface iScheduleDureationFn {
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
}: iScheduleDureationFn) => {
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
