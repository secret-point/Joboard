export enum EVENT {
  PAGE_LOAD = "page load",
  START_APPLICATION = "start application",
  START_ASSESSMENT = "assessment start",
  JOBS_FILTER = "jobs filter",
  JOBS_SORT = "jobs sort",
  SHIFT_SELECTED = "selected shift",
  GET_SHIFTS_ERROR = "shift display error",
  GET_SHIFTS_ERROR_SELF_SERVICE = "shift display error on self service page",
  CLICK_ROLE = "click role",
  SELECT_PREFERENCES = "select preferences",
  START_JOB_VIDEO = "start job video",
  FINISH_JOB_VIDEO = "finish job video",
  SUBMIT_NHE_PREFERENCES = "submit nhe preferences",
  RETURN_TO_NHE = "return to nhe",
  SELECT_NHE = "select NHE",
  NHE_PREFERENCE = "nhe preferences",
  GET_ALL_AVAILABLE_SHIFT_ERROR_SELF_SERVICE = "get all available shift error on self service page",
  NO_AVAILABLE_SHIFT_SELF_SERVICE = "no available shift on self service page",
  APPLY_FILTER_SELF_SERVICE = "apply filter on self service page",
  APPLY_SORTING_SELF_SERVICE = "apply sorting on self service page",
  SUCCESSFUL_UPDATE_SHIFT_SELF_SERVICE = "successfully update shift on self service page",
  SUCCESSFUL_CANCEL_SHIFT_SELF_SERVICE = "successfully cancel shift on self service page",
  Fail_UPDATE_SHIFT_SELF_SERVICE = "fail to update shift on self service page",
  Fail_CANCEL_SHIFT_SELF_SERVICE = "fail to cancel shift on self service page"
}

export enum PAGE_TYPE {
  APPLICATION = "application"
}

export const PAGE_NAME: any = {
  "pre-consent": "BB - welcome",
  "applicationId-null": "error - application id is undefined",
  consent: "job landing",
  "assessment-consent": "BB - pre-assessment",
  assessment: "BB - assessment",
  "job-opportunities": "view jobs",
  "job-description": "job description",
  "job-roles": "job roles",
  "contingent-offer": "BB-contingent offer",
  bgc: "background check",
  fcra: "BGC: FCRA disclosure",
  nhe: "pre-hire appointment",
  "review-submit": "review and submit",
  "thank-you": "thank you / prehire activities",
  "self-identification": "voluntary self-identification",
  wotc: "BB - WOTC",
  "supplementary-success": "supplementary forms thank you",

  "amazon-withdraws": "amazon-withdraws",
  "amazon-rejects": "amazon-rejects",
  "assessment-not-eligible": "assessment-not-eligible",
  "can-not-offer-job": "candidate-decline-FCRA",
  "candidate-withdraws": "candidate-withdraws",
  "rehire-not-eligible-seasonal-only": "rehire-not-eligible-seasonal-only",
  "rehire-not-eligible": "rehire-not-eligible",

  "no-available-shift": "no-shifts-available",
  "session-timeout": "session-timeout",

  "equal-opportunity-form": "self ID: equal opportunity",
  "veteran-status-form": "self ID: veteran status",
  "disability-form": "self ID: disability disclosure",

  "additional-bgc-info": "BGC: additional bgc info",
  "non-fcra": "BGC: non-fcra",
  "cali-disclosure": "BGC: california disclosure",
  "job-preferences-thank-you": "shift preference submitted",
  "job-preferences": "shift preference",
  "nhe-preferences": "nhe preferences"
};

export const PAGE_TITLE: Set<string> = new Set(
  [
    "already-applied",
    "applicationId-null",
    "pre-consent",
    "amazon-rejects",
    "amazon-withdraws",
    "assessment-consent",
    "assessment-not-eligible",
    "assessment",
    "bgc",
    "cali-disclosure",
    "can-not-offer-job",
    "candidate-withdraws",
    "consent",
    "contingent-offer",
    "fcra",
    "job-confirmation",
    "job-opportunities",
    "job-description",
    "job-roles",
    "nhe",
    "no-available-shift",
    "rehire-not-eligible-seasonal-only",
    "rehire-not-eligible",
    "review-submit",
    "self-identification",
    "session-timeout",
    "supplementary-success",
    "thank-you",
    "workflow-failed",
    "wotc",
    "job-preferences-thank-you",
    "job-preferences",
    "nhe-preferences"
  ],
);

export enum EVENT_NAMES {
  SUBMIT_NHE_PREFERENCES = "SUBMIT_NHE_PREFERENCES",
  SELECT_JOB_ROLE = "SELECT_JOB_ROLE",
  SELECT_NHE = "SELECT_NHE",
  SUBMIT_SHIFT_PREFERENCES = "SUBMIT_SHIFT_PREFERENCES"
}
