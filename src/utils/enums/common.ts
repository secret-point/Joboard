export enum QUERY_PARAMETER_NAME {
    APPLICATION_ID = 'applicationId',
    JOB_ID = 'jobId',
    SCHEDULE_ID = 'scheduleId',
    REQUISITION_ID = 'requisitionId'
}

export enum APPLICATION_STEPS {
    SELECT_JOB = 'Select Job',
    COMPLETE_REQUIRED_DOCUMENTS = 'Complete required documents',
    SCHEDULE_PRE_HIRE_APPOINTMENT = 'Schedule pre-hire appointment',
    COMPLETE_AN_ASSESSMENT = 'Complete an assessment (~15 min)'
}

export enum SCHEDULE_FILTER_TYPE {
    PAY_RATE = "PAY_RATE",
    HOURS_DESC = "HOURS_DESC",
    HOURS_ASC = "HOURS_ASC",
    DEFAULT = "DEFAULT"
}

export enum DESIRED_WORK_HOURS {
    TEN = "10",
    TWENTY = "20",
    THIRTY = "30",
    FORTY = "40"
}

export enum DAYS_OF_WEEK {
    MONDAY= "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export enum FCRA_DISCLOSURE_TYPE {
    ACCEPT = "Accept",
    DECLINE = "Decline"
}

export enum NON_FCRA_STATES {
    ALL_STATE = "ALL STATES",
    WASHINGTON = "WASHINGTON",
    NEW_YORK = "NEW YORK",
    MINNESOTA = "MINNESOTA",
    CALIFORNIA = "CALIFORNIA"
}

export enum BGC_STEPS {
    FCRA = "FCRA",
    NON_FCRA = "NON_FCRA",
    ADDITIONAL_BGC = "ADDITIONAL_BGC"
}

export enum BGC_STEP_STATUS {
    LOCKED = 'LOCKED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}
