export enum EVENT {
  PAGE_LOAD = "page load",
  START_APPLICATION = "start application",
  START_ASSESSMENT = "assessment start",
  JOBS_FILTER = "jobs filter",
  JOBS_SORT = "jobs sort",
  SHIFT_SELECTED = "selected shift",
  GET_SHIFTS_ERROR = "shift display error"
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

export const PAGE_TITLE: any = {
  "already-applied": "Already applied",
  "pre-consent": "Welcome",
  "amazon-rejects": "Sorry",
  "amazon-withdraws": "Sorry",
  "assessment-consent": "Pre-assessment",
  "assessment-not-eligible": "Not moving forward",
  assessment: "Assessment",
  bgc: "Background check",
  "cali-disclosure": "California disclosure",
  "can-not-offer-job": "Sorry",
  "candidate-withdraws": "Sorry",
  consent: "Start application",
  "contingent-offer": "Contingent offer",
  fcra: "FCRA disclosure",
  "job-confirmation": "Job confirmation",
  "job-opportunities": "Job opportunities",
  "job-description": "Job description",
  "job-roles": "Job roles",
  nhe: "Pre-hire appointment",
  "no-available-shift": "All shifts filled",
  "rehire-not-eligible-seasonal-only": "Rehire not eligible",
  "rehire-not-eligible": "Rehire not eligible",
  "review-submit": "Review and submit",
  "self-identification": "Voluntary self-identification",
  "session-timeout": "Session timeout",
  "supplementary-success": "Supplementary success",
  "thank-you": "Pre-hire activities",
  "workflow-failed": "Application error",
  wotc: "Work Opportunity Tax Credit"
};
