export enum EVENT {
  PAGE_LOAD = "page load",
  START_APPLICATION = "start application",
  START_ASSESSMENT = "assessment start",
  JOBS_FILTER = "jobs filter",
  JOBS_SORT = "jobs sort",
  SHIFT_SELECTED = "selected shift"
}

export enum PAGE_TYPE {
  APPLICATION = "application"
}

export const PAGE_NAME: any = {
  "pre-consent": "BB - welcome",
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
  "cali-disclosure": "BGC: california disclosure"
};
