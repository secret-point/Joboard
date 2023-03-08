import { EVENT, METRIC_NAME, PAGE_NAME, PAGE_TYPE } from "./adobe-analytics";

const candidatePayloadDefault = {
  key: "candidate",
  values: [
    {
      key: "status",
      value: "candidate.results.candidateData.loginStatus"
    },
    {
      key: "CID",
      value: "candidate.results.candidateData.candidateSFId"
    },
    {
      key: "bbCandidateId",
      value: "candidate.results.candidateData.candidateId"
    }
  ]
};

const candidateOnThankYouPayloadDefault = {
  key: "candidate",
  values: [
    {
      key: "status",
      value: "candidate.results.candidateData.loginStatus"
    },
    {
      key: "CID",
      value: "candidate.results.candidateData.candidateSFId"
    },
    {
      key: "bbCandidateId",
      value: "candidate.results.candidateData.candidateId"
    },
    {
      key: "referbyExisting",
      value: "application.results.jobReferral.hasReferral"
    },
    {
      key: "referrerID",
      value: "application.results.jobReferral.referralInfo"
    }
  ]
};

const jobPayloadDefault = {
  key: "job",
  values: [
    {
      key: "ID",
      value: "requisition.results.requisitionId"
    },
    {
      key: "title",
      value: "requisition.results.consentInfo.jobTitle"
    },
    {
      key: "location",
      value: "requisition.results.consentInfo.locationDescription"
    },
    {
      key: "reqStatus",
      value: "requisition.results.consentInfo.requisitionStatus"
    },
    {
      key: "reqType",
      value: "requisition.results.consentInfo.requisitionType"
    },
    {
      key: "source",
      value: "job.results.dataSource"
    }
  ]
};

const applicationPayloadDefault = {
  key: "application",
  values: [
    {
      key: "ID",
      value: "application.results.applicationId"
    },
    {
      key: "workflow",
      value: "application.results.workflowStepName"
    }
  ]
};

const shiftPreferencesPayload = {
  key: "job",
  values: [
    {
      key: "roleCount",
      value: "requisition.results.totalChildRequisitions"
    },
    {
      key: "list",
      value: "requisition.results.jobTitles"
    }
  ]
};

const applicationIneligibleDefault = {
  key: "application",
  values: [
    {
      key: "ID",
      value: "application.results.applicationId"
    },
    {
      key: "workflow",
      value: "requisition.results.workflowStepName"
    }
  ]
};

const jobRolesPayloadDefault = {
  key: "roles",
  values: [
    {
      key: "list",
      value: "requisition.results.childRequisitions"
    }
  ]
};

const shiftsPayloadDefault = {
  key: "shifts",
  values: [
    {
      key: "count",
      value: "requisition.results.availableShifts.total"
    },
    {
      key: "list",
      value: "requisition.results.availableShifts.shifts"
    }
  ]
};

const dragonstoneJobPayloadDefault = {
  key: "dragonstoneJob",
  values: [
    {
      key: "jobID",
      value: "job.results.jobId"
    },
    {
      key: "scheduleCount",
      value: "job.availableSchedules.total"
    },
    {
      key: "scheduleList",
      value: "schedule.results.scheduleList"
    }
  ]
};

const shiftsErrorEvent = {
  key: "shifts",
  values: [
    {
      key: "errorMessage",
      value: ""
    }
  ]
};

const schedulesErrorEvent = {
  key: "schedules",
  values: [
    {
      key: "errorMessage",
      value: ""
    }
  ]
};

const eventShiftPayload = {
  key: "shift",
  values: [
    {
      key: "job",
      values: [
        {
          key: "ID",
          value: "selectedShift.requisitionId"
        },
        {
          key: "location",
          value: "selectedShift.locationDescription"
        }
      ]
    },
    {
      key: "HCR",
      values: [
        {
          key: "ID",
          value: "selectedShift.headCountRequestId"
        },
        {
          key: "type",
          value: "selectedShift.jobType"
        },
        {
          key: "class",
          value: "selectedShift.jobClass"
        }
      ]
    },
    {
      key: "day1Date",
      value: "selectedShift.day1Date"
    },
    {
      key: "day1Week",
      value: "selectedShift.weekNumber"
    },
    {
      key: "altCode",
      value: "selectedShift.altShiftCode"
    },
    {
      key: "code",
      value: "selectedShift.shiftCode"
    }
  ]
};

const shiftPayloadDefault = {
  key: "shift",
  values: [
    {
      key: "job",
      values: [
        {
          key: "ID",
          value: "application.results.jobSelected.childRequisitionId"
        },
        {
          key: "location",
          value: "application.shift.locationDescription"
        }
      ]
    },
    {
      key: "HCR",
      values: [
        {
          key: "ID",
          value: "application.results.jobSelected.headCountRequestId"
        },
        {
          key: "type",
          value: "application.shift.jobType"
        },
        {
          key: "class",
          value: "application.shift.jobClass"
        }
      ]
    },
    {
      key: "code",
      value: "application.shift.shiftCode"
    },
    {
      key: "altCode",
      value: "application.shift.altShiftCode"
    },
    {
      key: "day1Date",
      value: "application.shift.day1Date"
    },
    {
      key: "day1Week",
      value: "application.shift.weekNumber"
    },
  ]
};

const eventSchedulePayload = {
  key: "dragonstoneSchedule",
  values: [
    {
      key: "jobID",
      value: "job.results.jobId"
    },
    {
      key: "scheduleID",
      value: "schedule.results.scheduleDetail.scheduleId"
    }
  ]
};

const dragonstoneSchedulePayloadDefault = {
  key: "dragonstoneSchedule",
  values: [
    {
      key: "jobID",
      value: "job.results.jobId"
    },
    {
      key: "scheduleID",
      value: "schedule.results.scheduleDetail.scheduleId"
    },
    {
      key: "siteCode",
      value: "schedule.results.scheduleDetail.metricSiteId"
    },
    {
      key: "internalJobCode",
      value: "schedule.results.scheduleDetail.internalJobCode"
    },
    {
      key: "employeeClass",
      value: "schedule.results.scheduleDetail.employeeClass"
    },
    {
      key: "employmentType",
      value: "schedule.results.scheduleDetail.employmentType"
    },
    {
      key: "scheduleType",
      value: "schedule.results.scheduleDetail.scheduleType"
    },
    {
      key: "agencyName",
      value: "schedule.results.scheduleDetail.agencyName"
    },
    {
      key: "employmentType",
      value: "schedule.results.scheduleDetail.employmentType"
    },
    {
      key: "marketingContent",
      value: "schedule.results.scheduleDetail.marketingContent" // not in DS
    },
    {
      key: "phoneToolTitle",
      value: "schedule.results.scheduleDetail.phoneToolTitle" // not in DS
    },
    {
      key: "shiftCode",
      value: "schedule.results.scheduleDetail.standardShiftCode"
    },
    {
      key: "scheduleText",
      value: "schedule.results.scheduleDetail.scheduleText"
    },
    {
      key: "hoursPerWeek",
      value: "schedule.results.scheduleDetail.hoursPerWeek"
    },
    {
      key: "basePay",
      value: "schedule.results.scheduleDetail.basePay"
    },
    {
      key: "scheduleBannerText",
      value: "schedule.results.scheduleDetail.scheduleBannerText"
    },
    {
      key: "nhoType",
      value: "schedule.results.scheduleDetail.nhoType"
    },
    {
      key: "trainingDate",
      value: "schedule.results.scheduleDetail.trainingDate"
    },
    {
      key: "hireDate",
      value: "schedule.results.scheduleDetail.hireStartDate"
    },
    {
      key: "firstDayOnsite",
      value: "schedule.results.scheduleDetail.firstDayOnsite"
    },
    {
      key: "priorityRank",
      value: "schedule.results.scheduleDetail.priorityRank"
    },
    {
      key: "laborOrderCount",
      value: "schedule.results.scheduleDetail.laborOrderCount"
    },
    {
      key: "laborDemandCount",
      value: "schedule.results.scheduleDetail.laborDemandCount"
    },
    {
      key: "softMatchCount",
      value: "schedule.results.scheduleDetail.softMatchCount" // not in DS
    },
    {
      key: "matchCount",
      value: "schedule.results.scheduleDetail.matchCount" // not in DS
    },
    {
      key: "softMatchCount",
      value: "schedule.results.scheduleDetail.softMatchCount" // not in DS
    },
    {
      key: "financeWeek",
      value: "schedule.results.scheduleDetail.financeWeek"
    },
    {
      key: "alpsCode",
      value: "schedule.results.scheduleDetail.alpsCode"
    },
    {
      key: "departmentCode",
      value: "schedule.results.scheduleDetail.departmentCode"
    },
    {
      key: "managerLogin",
      value: "schedule.results.scheduleDetail.managerLogin"
    },
  ]
};

const shiftTypePayloadDefault = {
  key: "shiftType",
  values: [
    {
      key: "oldShiftType",
      value: "application.results.jobSelected.shiftType"
    },
    {
      key: "newShiftType",
      value: "selectedShift.shiftType"
    }
  ]
};

const geoclusterPayloadDefault = {
  key: "geocluster",
  values: [
    {
      key: "ID",
      value: "job.results.geoClusterId"
    },
    {
      key: "name",
      value: "job.results.geoClusterName"
    },
    {
      key: "description",
      value: "job.results.geoClusterDescription"
    },
    {
      key: "country",
      value: "job.results.country"
    },
    {
      key: "region",
      value: "job.results.geoClusterRegion"
    },
    {
      key: "zone",
      value: "job.results.geoClusterZone"
    },
    {
      key: "locationCode",
      value: "job.results.locationCode"
    },
    {
      key: "loEnable",
      value: "job.results.loEnable"
    }
  ]
};

const sitePayloadDefault = {
  key: "site",
  values: [
    {
      key: "code",
      value: "schedule.results.scheduleDetail.metricSiteId"
    },
    {
      key: "locationCode",
      value: "schedule.results.scheduleDetail.locationCode"
    },
    {
      key: "geoclusterCode",
      value: "schedule.results.scheduleDetail.geoClusterId"
    },
    {
      key: "businessLine",
      value: "schedule.results.scheduleDetail.businessLine"
    },
    {
      key: "businessCategory",
      value: "schedule.results.scheduleDetail.businessCategory"
    },
    {
      key: "address",
      value: "schedule.results.scheduleDetail.address"
    },
    {
      key: "city",
      value: "schedule.results.scheduleDetail.city"
    },
    {
      key: "zipCode",
      value: "schedule.results.scheduleDetail.postalCode"
    },
    {
      key: "agencyName",
      value: "schedule.results.scheduleDetail.agencyName"
    },
    {
      key: "contingencyTAT",
      value: "schedule.results.scheduleDetail.businessLine"
    }
  ]
};

const nhePayloadDefault = {
  key: "NHE",
  values: [
    {
      key: "count",
      value: "nhe.results.nheData"
    }
  ]
};

const filterPayloadDefault = {
  key: "filter",
  values: [
    {
      key: "hoursPerWeek",
      value: "defaultAvailableFilter.filter.range.HOURS_PER_WEEK.maximumValue"
    },
    {
      key: "monStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.MONDAY.startTime"
    },
    {
      key: "monEnd",
      value: "defaultAvailableFilter.filter.schedulePreferences.MONDAY.endTime"
    },
    {
      key: "tuesStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.TUESDAY.startTime"
    },
    {
      key: "tuesEnd",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.THURSDAY.endTime"
    },
    {
      key: "wedStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.WEDNESDAY.startTime"
    },
    {
      key: "wedEnd",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.WEDNESDAY.endTime"
    },
    {
      key: "thuStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.THURSDAY.startTime"
    },
    {
      key: "thuEnd",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.THURSDAY.endTime"
    },
    {
      key: "friStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.FRIDAY.startTime"
    },
    {
      key: "friEnd",
      value: "defaultAvailableFilter.filter.schedulePreferences.FRIDAY.endTime"
    },
    {
      key: "satStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.SATURDAY.startTime"
    },
    {
      key: "satEnd",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.SATURDAY.endTime"
    },
    {
      key: "sunStart",
      value:
        "defaultAvailableFilter.filter.schedulePreferences.SUNDAY.startTime"
    },
    {
      key: "sunEnd",
      value: "defaultAvailableFilter.filter.schedulePreferences.SUNDAY.endTime"
    }
  ]
};

const cancellationRescheduleReasonPayloadDefault = {
  key: "cancellationReschedule",
  values: [
    {
      key: "reason",
      value: "cancellationRescheduleReason"
    }
  ]
};

const sortPayloadDefault = {
  key: "sortBy",
  value: "defaultAvailableFilter.sortBy"
};

export const ADOBE_PAGE_LOAD_METRICS: any = {
  [METRIC_NAME.PRE_CONSENT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["pre-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    }
  },
  [METRIC_NAME.CONSENT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
    ]
  },
  [METRIC_NAME.ASSESSMENT_CONSENT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["assessment-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      applicationPayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      candidatePayloadDefault
    ]
  },
  [METRIC_NAME.ASSESSMENT_START]: {
    eventPayload: {
      event: EVENT.START_ASSESSMENT,
      page: {
        name: PAGE_NAME["assessment-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      applicationPayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      candidatePayloadDefault
    ]
  },
  [METRIC_NAME.ASSESSMENT_FINISHED]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["assessment-finished"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      applicationPayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      candidatePayloadDefault
    ]
  },
  [METRIC_NAME.ASSESSMENT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["assessment"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_OPPORTUNITIES]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-opportunities"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftsPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_ROLES]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-roles"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      jobRolesPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_DESCRIPTION]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-description"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      eventSchedulePayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_CONFIRMATION]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      candidatePayloadDefault,
      dragonstoneJobPayloadDefault
    ]
  },
  [METRIC_NAME.START_SPECIFIC_JOB_VIDEO]: {
    eventPayload: {
      event: EVENT.START_JOB_VIDEO,
      page: {
        name: PAGE_NAME["job-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      candidatePayloadDefault,
      dragonstoneJobPayloadDefault
    ]
  },
  [METRIC_NAME.FINISH_SPECIFIC_JOB_VIDEO]: {
    eventPayload: {
      event: EVENT.FINISH_JOB_VIDEO,
      page: {
        name: PAGE_NAME["job-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      candidatePayloadDefault,
      dragonstoneJobPayloadDefault
    ]
  },
  [METRIC_NAME.CONTINGENT_OFFER]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["contingent-offer"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.BGC]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["bgc"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NO_SSN_CONTINUE]: {
    eventPayload: {
      event: EVENT.NO_SSN_CONTINUE,
      page: {
        name: PAGE_NAME["bgc"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NO_SSN_CANCEL]: {
    eventPayload: {
      event: EVENT.NO_SSN_CANCEL,
      page: {
        name: PAGE_NAME["bgc"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.FCRA]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["fcra"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NHE]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["nhe"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      nhePayloadDefault
    ]
  },
  [METRIC_NAME.REVIEW_SUBMIT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["review-submit"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.THANK_YOU]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["thank-you"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SELF_IDENTIFICATION]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["self-identification"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.WOTC]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["wotc"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SUPPLEMENTARY_SUCCESS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["supplementary-success"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.AMAZON_WITHDRAWS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["amazon-withdraws"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.AMAZON_REJECTS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["amazon-rejects"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.ASSESSMENT_NOT_ELIGIBLE]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["assessment-not-eligible"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.CANDIDATE_WITHDRAWS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["candidate-withdraws"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.REHIRE_NOT_ELIGIBLE_SEASONAL_ONLY]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["rehire-not-eligible-seasonal-only"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.REHIRE_NOT_ELIGIBLE]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["rehire-not-eligible"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.REHIRE_NOT_ELIGIBLE_365_DAYS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["rehire-not-eligible-365-days"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.REHIRE_NOT_ELIGIBLE_ACTIVE]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["rehire-not-eligible-active"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.CAN_NOT_OFFER_JOB]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["can-not-offer-job"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NO_AVAILABLE_SHIFT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["no-available-shift"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NO_AVAILABLE_SHIFT_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.NO_AVAILABLE_SHIFT_SELF_SERVICE,
      page: {
        name: PAGE_NAME["update-shift"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
    ]
  },
  [METRIC_NAME.SUCCESSFUL_UPDATE_SHIFT_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.SUCCESSFUL_UPDATE_SHIFT_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      cancellationRescheduleReasonPayloadDefault
    ]
  },
  [METRIC_NAME.FAIL_UPDATE_SHIFT_SCHEDULE_FULL_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_SCHEDULE_FULL_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.FAIL_UPDATE_SHIFT_UNKNOWN_ERROR_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_UNKNOWN_ERROR_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.FAIL_UPDATE_SHIFT_SCHEDULE_UNSUCCESSFUL_REVERSION_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_UNSUCCESSFUL_REVERSION_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SUCCESSFUL_CANCEL_SHIFT_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.SUCCESSFUL_CANCEL_SHIFT_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      cancellationRescheduleReasonPayloadDefault
    ]
  },
  [METRIC_NAME.FAIL_CANCEL_SHIFT_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.FAIL_CANCEL_SHIFT_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      shiftTypePayloadDefault
    ]
  },
  [METRIC_NAME.SESSION_TIMEOUT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["session-timeout"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.APPLICATION_ID_NULL]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["applicationId-null"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.GET_ALL_AVALIABLE_SHIFT_ERROR]: {
    eventPayload: {
      event: EVENT.GET_SHIFTS_ERROR,
    },
    dataPayload: [
      applicationPayloadDefault,
      jobPayloadDefault,
      shiftsErrorEvent,
      schedulesErrorEvent,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.GET_ALL_AVALIABLE_SHIFT_ERROR_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.GET_ALL_AVAILABLE_SHIFT_ERROR_SELF_SERVICE,
    },
    dataPayload: [
      applicationPayloadDefault,
      jobPayloadDefault,
      shiftsErrorEvent,
      schedulesErrorEvent,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.APPLY_FILTER_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.APPLY_FILTER_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ],
    appConfigPayload: [filterPayloadDefault]
  },
  [METRIC_NAME.APPLY_SORTING_SELF_SERVICE]: {
    eventPayload: {
      event: EVENT.APPLY_SORTING_SELF_SERVICE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ],
    appConfigPayload: [sortPayloadDefault]
  },
  [METRIC_NAME.APPLY_FILTER]: {
    eventPayload: {
      event: EVENT.JOBS_FILTER,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ],
    appConfigPayload: [filterPayloadDefault]
  },
  [METRIC_NAME.APPLY_SORTING]: {
    eventPayload: {
      event: EVENT.JOBS_SORT,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ],
    appConfigPayload: [sortPayloadDefault]
  },
  [METRIC_NAME.START_APPLICATION]: {
    eventPayload: {
      event: EVENT.START_APPLICATION,
    },
    dataPayload: [jobPayloadDefault, dragonstoneSchedulePayloadDefault]
  },
  [METRIC_NAME.SHIFT_SELECTION]: {
    eventPayload: {
      event: EVENT.SHIFT_SELECTED,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      eventSchedulePayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.EQUAL_OPPORTUNITY_FORM]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["equal-opportunity-form"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.VETERAN_STATUS_FORM]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["veteran-status-form"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.DISABILITY_FORM]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["disability-form"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.ADDITIONAL_BGC_INFO]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["additional-bgc-info"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NON_FCRA]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["non-fcra"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.CALI_DISCLOSURE]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["cali-disclosure"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_PREFERENCES_THANK_YOU]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-preferences-thank-you"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.JOB_PREFERENCES]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["job-preferences"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPreferencesPayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SELECT_JOB_ROLE]: {
    eventPayload: {
      event: EVENT.CLICK_ROLE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPreferencesPayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SUBMIT_SHIFT_PREFERENCES]: {
    eventPayload: {
      event: EVENT.SELECT_PREFERENCES,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPreferencesPayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.START_JOB_VIDEO]: {
    eventPayload: {
      event: EVENT.START_JOB_VIDEO,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPreferencesPayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.FINISH_JOB_VIDEO]: {
    eventPayload: {
      event: EVENT.FINISH_JOB_VIDEO,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPreferencesPayload,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.NHE_PREFERENCES]: {
    eventPayload: {
      event: EVENT.NHE_PREFERENCE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SUBMIT_NHE_PREFERENCES]: {
    eventPayload: {
      event: EVENT.SUBMIT_NHE_PREFERENCES,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.RETURN_TO_NHE]: {
    eventPayload: {
      event: EVENT.RETURN_TO_NHE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.SELECT_NHE]: {
    eventPayload: {
      event: EVENT.SELECT_NHE,
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.UPDATE_SHIFT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["update-shift"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      shiftTypePayloadDefault
    ]
  },
  [METRIC_NAME.NO_SHIFT_SELECTED]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["no-shift-selected"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.VIEW_SHIFT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["view-shift"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.CURRENT_SHIFT]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["current-shift"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      shiftTypePayloadDefault
    ]
  },
  [METRIC_NAME.CANCEL_SHIFT_CONFIRMATION]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["cancel-shift-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
      shiftTypePayloadDefault
    ]
  },
  [METRIC_NAME.UPDATE_SHIFT_CONFIRMATION]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["update-shift-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      eventSchedulePayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault
    ]
  },
  [METRIC_NAME.SKIP_SCHEDULE]: {
    eventPayload: {
      event: EVENT.SKIP_SCHEDULE_SELECTION,
      page: {
        name: PAGE_NAME["update-shift-confirmation"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      eventShiftPayload,
      eventSchedulePayload,
      shiftTypePayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault
    ]
  },
  [METRIC_NAME.THANK_YOU_SUBMIT]: {
    eventPayload: {
      event: EVENT.THANK_YOU_SUBMIT,
      page: {
        name: PAGE_NAME["thank-you"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidateOnThankYouPayloadDefault,
    ]
  },
  [METRIC_NAME.NO_AVAILABLE_TIME_SLOTS]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["no-nhe-appointments"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  },
  [METRIC_NAME.ALREADY_APPLIED]: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["already-applied"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      shiftPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,
      candidatePayloadDefault,
    ]
  }
};
