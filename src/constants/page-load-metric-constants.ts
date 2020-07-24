import { EVENT, PAGE_TYPE, PAGE_NAME } from "./adobe-analytics";

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
        }
      ]
    },
    {
      key: "day1Date",
      value: "selectedShift.day1Date"
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

const sortPayloadDefault = {
  key: "sortBy",
  value: "defaultAvailableFilter.sortBy"
};

export const ADOBE_PAGE_LOAD_METRICS: any = {
  consent: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [jobPayloadDefault]
  },
  "assessment-consent": {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["assessment-consent"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [jobPayloadDefault, applicationPayloadDefault]
  },
  "job-opportunities": {
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
      shiftsPayloadDefault
    ]
  },
  "job-description": {
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
      shiftsPayloadDefault,
      eventShiftPayload
    ]
  },
  "contingent-offer": {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  bgc: {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  fcra: {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  nhe: {
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
      shiftsPayloadDefault,
      shiftPayloadDefault,
      nhePayloadDefault
    ]
  },
  "review-submit": {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  "thank-you": {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  "self-identification": {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  wotc: {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  "supplementary-success": {
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
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  rejection: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        name: PAGE_NAME["rejection"],
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      shiftsPayloadDefault,
      shiftPayloadDefault
    ]
  },
  "apply-filter": {
    eventPayload: {
      event: EVENT.JOBS_FILTER
    },
    dataPayload: [jobPayloadDefault, applicationIneligibleDefault],
    appConfigPayload: [filterPayloadDefault, sortPayloadDefault]
  },
  "start-application": {
    eventPayload: {
      event: EVENT.START_APPLICATION
    },
    dataPayload: [jobPayloadDefault]
  },
  "shift-selection": {
    eventPayload: {
      event: EVENT.SHIFT_SELECTED
    },
    dataPayload: [
      jobPayloadDefault,
      applicationIneligibleDefault,
      eventShiftPayload
    ]
  }
};
