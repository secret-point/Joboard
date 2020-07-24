export enum EVENT {
  PAGE_LOAD = "page load",
  START_APPLICATION = "start application",
  START_ASSESSMENT = "assessment start",
  JOBS_FILTER = "jobs filter",
  JOBS_SORT = "jobs sort",
  SHIFT_SELECTED = "shift selected"
}

export enum PAGE_TYPE {
  APPLICATION = "application"
}

export const PAGE_NAME: any = {
  consent: "job landing",
  "assessment-consent": "assessment start",
  "job-opportunities": "view jobs",
  "job-description": "job description",
  "contingent-offer": "BB-contingent offer",
  bgc: "background check",
  fcra: "FCRA disclosure",
  nhe: "pre-hire appointment",
  "review-submit": "review and submit",
  "thank-you": "thank you / prehire activities",
  "self-identification": "voluntary self-identification",
  wotc: "BB - WOTC",
  "supplementary-success": "supplementary forms thank you",
  rejection: "BB - ineligible" //ineligible: "BB - ineligible"
};
