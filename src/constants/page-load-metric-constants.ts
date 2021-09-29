import { checkIfIsLegacy } from "../helpers/utils";
import { EVENT, PAGE_TYPE, PAGE_NAME } from "./adobe-analytics";

const candidatePayloadDefault = {
  key: "candidate",
  values: [
    {
      key: "status",
      value: "candidate.loginStatus"
    },
    {
      key: "CID",
      value: "candidate.candidateSFId"
    },
    {
      key: "bbCandidateId",
      value: "candidate.candidateId"
    }
  ]
}

const candidateOnThankYouPayloadDefault = {
  key: "candidate",
  values: [
    {
      key: "status",
      value: "candidate.loginStatus"
    },
    {
      key: "CID",
      value: "candidate.candidateSFId"
    },
    {
      key: "bbCandidateId",
      value: "candidate.candidateId"
    },
    {
      key: "referbyExisting",
      value: "application.jobReferral.hasReferral"
    },
    {
      key: "referrerID",
      value: "application.jobReferral.referralInfo"
    }
  ]
}

const jobPayloadDefault = {
  key: "job",
  values: [
    {
      key: "ID",
      value: "requisitionId"
    },
    {
      key: "title",
      value: "requisition.consentInfo.jobTitle"
    },
    {
      key: "location",
      value: "requisition.consentInfo.locationDescription"
    },
    {
      key: "reqStatus",
      value: "requisition.consentInfo.requisitionStatus"
    },
    {
      key: "reqType",
      value: "requisition.consentInfo.requisitionType"
    }
  ]
};

const applicationPayloadDefault = {
  key: "application",
  values: [
    {
      key: "ID",
      value: "application.applicationId"
    },
    {
      key: "workflow",
      value: "application.workflowStepName"
    }
  ]
};

const shiftPreferencesPayload = {
  key: "job",
  values: [
    {
      key: "roleCount",
      value: "requisition.totalChildRequisitions"
    },
    {
      key: "list",
      value: "requisition.jobTitles"
    }
  ]
};

const applicationIneligibleDefault = {
  key: "application",
  values: [
    {
      key: "ID",
      value: "application.applicationId"
    },
    {
      key: "workflow",
      value: "application.workflowStepName"
    }
  ]
};

const jobRolesPayloadDefault = {
  key: "roles",
  values: [
    {
      key: "list",
      value: "requisition.childRequisitions"
    }
  ]
};

const shiftsPayloadDefault = {
  key: "shifts",
  values: [
    {
      key: "count",
      value: "requisition.availableShifts.total"
    },
    {
      key: "list",
      value: "requisition.availableShifts.shifts"
    }
  ]
};

const dragonstoneJobPayloadDefault = {
  key: "dragonstoneJob",
  values: [
    {
      key: "jobID",
      value: "job.consentInfo.jobId"
    },
    {
      key: "scheduleCount",
      value: "job.availableSchedules.total"
    },
    {
      key: "scheduleList",
      value: "job.availableSchedules.schedules"
    },
    {
      key: "dataSource",
      value: "job.consentInfo.dataSource"
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
          value: "application.jobSelected.childRequisitionId"
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
          value: "application.jobSelected.headCountRequestId"
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
      value: "application.schedule.scheduleId"
    },
    {
      key: "scheduleID",
      value: "application.schedule.scheduleId"
    }
  ]
};

const dragonstoneSchedulePayloadDefault = {
  key: "dragonstoneSchedule",
  values: [
    {
      key: "jobID",
      value: "job.consentInfo.jobId"
    },
    {
      key: "scheduleID",
      value: "application.schedule.scheduleId"
    },
    {
      key: "siteCode",
      value: "application.schedule.siteId"
    },
    {
      key: "internalJobCode",
      value: "application.schedule.internalJobCode"
    },
    {
      key: "employeeClass",
      value: "application.schedule.employeeClass"
    },
    {
      key: "employmentType",
      value: "application.schedule.employmentType"
    },
    {
      key: "scheduleType",
      value: "application.schedule.scheduleType"
    },
    {
      key: "agencyName",
      value: "application.schedule.agencyName"
    },
    {
      key: "employmentType",
      value: "application.schedule.employmentType"
    },
    {
      key: "marketingContent",
      value: "application.schedule.marketingContent" // not in DS
    },
    {
      key: "phoneToolTitle",
      value: "application.schedule.phoneToolTitle" // not in DS
    },
    {
      key: "shiftCode",
      value: "application.schedule.standardShiftCode"
    },
    {
      key: "scheduleText",
      value: "application.schedule.scheduleText"
    },
    {
      key: "hoursPerWeek",
      value: "application.schedule.hoursPerWeek"
    },
    {
      key: "basePay",
      value: "application.schedule.basePay"
    },
    {
      key: "scheduleBannerText",
      value: "application.schedule.scheduleBannerText"
    },
    {
      key: "nhoType",
      value: "application.schedule.nhoType"
    },
    {
      key: "trainingDate",
      value: "application.schedule.trainingDate"
    },
    {
      key: "hireDate",
      value: "application.schedule.hireStartDate"
    },
    {
      key: "firstDayOnsite",
      value: "application.schedule.firstDayOnsite"
    },
    {
      key: "priorityRank",
      value: "application.schedule.priorityRank"
    },
    {
      key: "laborOrderCount",
      value: "application.schedule.laborOrderCount"
    },
    {
      key: "laborDemandCount",
      value: "application.schedule.laborDemandCount"
    },
    {
      key: "softMatchCount",
      value: "application.schedule.softMatchCount" // not in DS
    },
    {
      key: "matchCount",
      value: "application.schedule.matchCount" // not in DS
    },
    {
      key: "softMatchCount",
      value: "application.schedule.softMatchCount" // not in DS
    },
    {
      key: "financeWeek",
      value: "application.schedule.financeWeek"
    },
    {
      key: "alpsCode",
      value: "application.schedule.alpsCode"
    },
    {
      key: "departmentCode",
      value: "application.schedule.departmentCode"
    },
    {
      key: "managerLogin",
      value: "application.schedule.managerLogin"
    },
  ]
};

const shiftTypePayloadDefault = {
  key: "shiftType",
  values: [
    {
      key: "oldShiftType",
      value: "application.jobSelected.shiftType"
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
      value: "job.consentInfo.geoClusterId"
    },
    {
      key: "name",
      value: "job.consentInfo.geoClusterName"
    },
    {
      key: "description",
      value: "job.consentInfo.geoClusterDescription"
    },
    {
      key: "country",
      value: "job.consentInfo.country"
    },
    {
      key: "region",
      value: "job.consentInfo.geoClusterRegion"
    },
    {
      key: "zone",
      value: "job.consentInfo.geoClusterZone"
    },
    {
      key: "locationCode",
      value: "job.consentInfo.locationCode"
    },
    {
      key: "loEnable",
      value: "job.consentInfo.loEnable"
    }
  ]
};

const sitePayloadDefault = {
  key: "site",
  values: [
    {
      key: "code",
      value: "application.schedule.siteId"
    },
    {
      key: "locationCode",
      value: "application.schedule.locationCode"
    },
    {
      key: "geoclusterCode",
      value: "application.schedule.geoClusterId"
    },
    {
      key: "businessLine",
      value: "application.schedule.businessLine"
    },
    {
      key: "businessCategory",
      value: "application.schedule.businessCategory"
    },
    {
      key: "address",
      value: "application.schedule.address"
    },
    {
      key: "city",
      value: "application.schedule.city"
    },
    {
      key: "zipCode",
      value: "application.schedule.postalCode"
    },
    {
      key: "agencyName",
      value: "application.schedule.agencyName"
    },
    {
      key: "contingencyTAT",
      value: "application.schedule.businessLine"
    }
  ]
};

const nhePayloadDefault = {
  key: "NHE",
  values: [
    {
      key: "count",
      value: "requisition.nheTimeSlots"
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
  value: checkIfIsLegacy()? "defaultAvailableFilter.sortBy" : "defaultAvailableFilterDS.sortBy"
};

export const ADOBE_PAGE_LOAD_METRICS: any = {
  "pre-consent": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
      page: {
        name: PAGE_NAME["pre-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    }
  },
  consent: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "assessment-consent": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
      page: {
        name: PAGE_NAME["assessment-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationPayloadDefault,
      dragonstoneSchedulePayloadDefault,
      dragonstoneJobPayloadDefault,
      geoclusterPayloadDefault,
      sitePayloadDefault,]
  },
  assessment: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-opportunities": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-roles": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-description": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-confirmation" : {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
    ]
  },
  "start-specific-job-video" : {
    eventPayload: {
      event: EVENT.START_JOB_VIDEO,
      countryCode: "us",
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
    ]
  },
  "finish-specific-job-video" : {
    eventPayload: {
      event: EVENT.FINISH_JOB_VIDEO,
      countryCode: "us",
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
    ]
  },
  "contingent-offer": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  bgc: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  fcra: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  nhe: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "review-submit": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "thank-you": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "self-identification": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  wotc: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "supplementary-success": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "amazon-withdraws": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "amazon-rejects": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "assessment-not-eligible": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "candidate-withdraws": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "rehire-not-eligible-seasonal-only": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "rehire-not-eligible": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "can-not-offer-job": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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

  "no-available-shift": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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

  "no-available-shift-self-service": {
    eventPayload: {
      event: EVENT.NO_AVAILABLE_SHIFT_SELF_SERVICE,
      countryCode: "us",
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

  "successful-update-shift-self-service": {
    eventPayload: {
      event: EVENT.SUCCESSFUL_UPDATE_SHIFT_SELF_SERVICE,
      countryCode: "us",
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
  "fail-update-shift-schedule-full-self-service": {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_SCHEDULE_FULL_SELF_SERVICE,
      countryCode: "us",
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
  "fail-update-shift-unknown-error-self-service": {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_UNKNOWN_ERROR_SELF_SERVICE,
      countryCode: "us",
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
  "fail-update-shift-schedule-unsuccessful-reversion-self-service": {
    eventPayload: {
      event: EVENT.FAIL_UPDATE_SHIFT_UNSUCCESSFUL_REVERSION_SELF_SERVICE,
      countryCode: "us",
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
  "successful-cancel-shift-self-service": {
    eventPayload: {
      event: EVENT.SUCCESSFUL_CANCEL_SHIFT_SELF_SERVICE,
      countryCode: "us",
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
  "fail-cancel-shift-self-service": {
    eventPayload: {
      event: EVENT.FAIL_CANCEL_SHIFT_SELF_SERVICE,
      countryCode: "us",
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
  "session-timeout": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "applicationId-null": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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

  "get-all-avaliable-shift-error": {
    eventPayload: {
      event: EVENT.GET_SHIFTS_ERROR,
      countryCode: "us",
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

  "get-all-avaliable-shift-error-self-service": {
    eventPayload: {
      event: EVENT.GET_ALL_AVAILABLE_SHIFT_ERROR_SELF_SERVICE,
      countryCode: "us",
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

  "apply-filter-self-service": {
    eventPayload: {
      event: EVENT.APPLY_FILTER_SELF_SERVICE,
      countryCode: "us",
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
  "apply-sorting-self-service": {
    eventPayload: {
      event: EVENT.APPLY_SORTING_SELF_SERVICE,
      countryCode: "us",
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
  "apply-filter": {
    eventPayload: {
      event: EVENT.JOBS_FILTER,
      countryCode: "us",
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
  "apply-sorting": {
    eventPayload: {
      event: EVENT.JOBS_SORT,
      countryCode: "us",
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
  "start-application": {
    eventPayload: {
      event: EVENT.START_APPLICATION,
      countryCode: "us",
    },
    dataPayload: [jobPayloadDefault, dragonstoneSchedulePayloadDefault]
  },
  "shift-selection": {
    eventPayload: {
      event: EVENT.SHIFT_SELECTED,
      countryCode: "us",
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
  "equal-opportunity-form": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "veteran-status-form": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "disability-form": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "additional-bgc-info": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "non-fcra": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "cali-disclosure": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-preferences-thank-you": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "job-preferences": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  SELECT_JOB_ROLE: {
    eventPayload: {
      event: EVENT.CLICK_ROLE,
      countryCode: "us",
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
  SUBMIT_SHIFT_PREFERENCES: {
    eventPayload: {
      event: EVENT.SELECT_PREFERENCES,
      countryCode: "us",
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
  "start-job-video": {
    eventPayload: {
      event: EVENT.START_JOB_VIDEO,
      countryCode: "us",
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
  "finish-job-video": {
    eventPayload: {
      event: EVENT.FINISH_JOB_VIDEO,
      countryCode: "us",
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
  "nhe-preferences": {
    eventPayload: {
      event: EVENT.NHE_PREFERENCE,
      countryCode: "us",
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
  SUBMIT_NHE_PREFERENCES: {
    eventPayload: {
      event: EVENT.SUBMIT_NHE_PREFERENCES,
      countryCode: "us",
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
  RETURN_TO_NHE: {
    eventPayload: {
      event: EVENT.RETURN_TO_NHE,
      countryCode: "us",
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
  SELECT_NHE: {
    eventPayload: {
      event: EVENT.SELECT_NHE,
      countryCode: "us",
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
  "update-shift": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "no-shift-selected": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "view-shift": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "current-shift": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "cancel-shift-confirmation": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "update-shift-confirmation": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      countryCode: "us",
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
  "skip-schedule":{
    eventPayload: {
      event: EVENT.SKIP_SCHEDULE_SELECTION,
      countryCode: "us",
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
  "thank-you-submit": {
    eventPayload: {
      event: EVENT.THANK_YOU_SUBMIT,
      countryCode: "us",
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
  }
};
