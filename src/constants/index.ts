export const IN_PROGRESS = "IN_PROGRESS";
export const PENDING = "PENDING";
export const COMPLETED = "COMPLETED";

export const MAX_MINUTES_FOR_HEARTBEAT = 60;

export const IGNORE_PAGE_TO_STORE_LOCAL: string[] = ["wotc-complete"];

export const CS_PREPROD_DOMAIN = "https://us.preprod.jobsatamazon.hvh.a2z.com";

export const STEPS_NOT_CONNECT_WORKFLOW_SERVICE = [
  "candidate-withdraws",
  "amazon-withdraws",
  "can-not-offer-job",
];

export const APPLICATION_STATE_NOT_CONNECT_WORKFLOW_SERVICE = [
  "CANNOT_OFFER_JOB_TERMINATION",
];

export const APPLICATION_STATE_TO_STEP_NAME: { [key: string]: string }= {
  "CANNOT_OFFER_JOB_TERMINATION": "can-not-offer-job"
};
