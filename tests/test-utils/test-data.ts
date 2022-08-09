import { createHashHistory } from "history";
import { uiState } from "../../src/reducers/ui.reducer";
import { CandidateState } from "../../src/reducers/candidate.reducer";
import { ApplicationState } from "../../src/reducers/application.reducer";
import { Address, Candidate, NheTimeSlotLocation } from "../../src/utils/types/common";
import { ScheduleState } from "../../src/reducers/schedule.reducer";
import { Schedule, ScheduleStateFilters } from "../../src/utils/types/common";
import { BGC_STEPS, DESIRED_WORK_HOURS, INFO_CARD_STEP_STATUS, SCHEDULE_FILTER_TYPE, WORKFLOW_ERROR_CODE } from "../../src/utils/enums/common";
import { BGCState } from "../../src/reducers/bgc.reducer";
import { NheState } from "../../src/reducers/nhe.reducer";
import { AppConfigState } from "../../src/reducers/appConfig.reducer";
import { WorkflowState } from "../../src/reducers/workflow.reducer";

export const TEST_REQUISITION_ID = "test-req-id";
export const TEST_APPLICATION_ID = "test-app-id";
export const TEST_CANDIDATE_ID = "test-candidate-id";
export const TEST_PAGE_ID = "test-page-id";
export const TEST_PAGE_CONFIG_PATH = "test-config-path";
export const TEST_MISC = "test-misc";
export const TEST_STAGE = "";
export const TEST_URL =
  "https://test-me.url.fake/{applicationId}/{requisitionId}";
export const TEST_KEY = "test-key";
export const TEST_STEP_ID = "job-opportunities";
export const TEST_HCR_ID = "test-hcr-id";
export const TEST_SCHEDULE_ID = "test-schedule-id";
export const TEST_CS_DOMAIN = "https://hiring.amazon.com";

export const TEST_CANDIDATE_SF_ID = "CID099157287";

export const TEST_JOB_ID = "JOB-US-0000001234";
export const TEST_JOB2_ID = "JOB-US-0000005678";

export const TEST_CANDIDATE_ADDRESS: Address = {
  addressLine1: "test address line 1",
  addressLine2: "test address line 2",
  city: "Test City",
  state: "California",
  country: "United States",
  zipcode: "94458",
  countryCode: "US"
};

export const TEST_CANDIDATE: Candidate = {
  candidateId: TEST_CANDIDATE_ID,
  candidateSFId: TEST_CANDIDATE_SF_ID,
  firstName: "test-firstname",
  middleName: "test-middlename",
  lastName: "test-lastname",
  nameSuffix: "",
  address: TEST_CANDIDATE_ADDRESS,
  timezone: "(GMT-08:00) Pacific Standard Time (America/Los_Angeles)",
  emailId: "test-hvh@amazon.com",
  language: "English",
  preferredPhoneType: "",
  phoneNumber: "+16729991234",
  phoneCountryCode: "",
  homePhoneNumber: "",
  homePhoneCountryCode: "",
  alternatePhoneNumber: "",
  alternatePhoneCountryCode: "",
  selfIdentificationInfo: {
    highestDegree: "",
    nationalId: "",
    nationalIdType: "",
    citizenship: "",
    document: "",
    driverLicence: "",
    gender: "Male",
    ethnicity: "Asian (not Hispanic or Latino)",
    ethnicitySubGroup: "",
    ethnicityOther: "",
    militarySpouse: "No",
    veteran: "No",
    protectedVeteran:
      "No, I do not believe one or more of the above categories apply to me",
    disability: "NO, I DON'T HAVE A DISABILITY",
    disabilityDate: "2022-07-20T01:12:29.985Z",
    religion: "",
    otherReligion: "",
    sexualOrientation: ""
  },
  employmentInfo: {
    employeeId: "",
    employeeType: "Full Time",
    rehireEligibilityStatus: "",
    rehireLocation: "",
    rehireOverride: "N",
    startDate: "",
    managerLogin: "",
    department: "",
    shiftCode: "",
    agencyName: "None;Adecco"
  },
  additionalBackgroundInfo: {
    hasCriminalRecordWithinSevenYears: false,
    convictionDetails: "",
    hasPreviouslyWorkedAtAmazon: false,
    mostRecentBuildingWorkedAtAmazon: "",
    mostRecentTimePeriodWorkedAtAmazon: "",
    previousLegalNames: [],
    governmentIdType: "United States - Social Security Number",
    idNumber: "*****9599",
    dateOfBirth: "1988-08-02",
    address: TEST_CANDIDATE_ADDRESS,
    isWithoutSSN: false
  },
  metadata: null,
  locale: "en_US",
  isAgencyUser: false,
  isEmailVerified: true,
  isPhoneVerified: true,
  isSFUser: false,
  isAgreeToCommunication: true,
  isDuplicateSSN: false,
  socialSecurityNumber: "uoYHDQffNlHRGrvu77SW/On8LGpJz8lmCWmcK+CJVJM",
  numSSNEdits: 1,
  assessmentsTaken: {
    Tier1_WS: {
      assessmentPackageId: "Tier1_WS",
      assessmentType: "Overall",
      assessmentOrderId: "f7af4d5e-2375-4e02-8256-42589c3143ca",
      assessmentUrl:
        "https://beta.assessments.amazon.jobs/?auth=rkDk3vARs8nyRn-pQZGN6uOn-NXHXGD9zLR7N5q1Gos#/v2/assessment/BB_f7af4d5e-2375-4e02-8256-42589c3143ca",
      assessmentScore: null,
      assessmentExpireDateTime: null,
      assessmentStatus: "Initiated",
      assessmentInitiationDateTime: null,
      assessmentStatusDateTime: "2022-07-26T23:04:13.250Z"
    },
    Tier1_WS_Place_Rank: {
      assessmentPackageId: "Tier1_WS_Place_Rank",
      assessmentType: "Overall",
      assessmentOrderId: "7e04c725-8de2-4242-afc0-f9ae5c09f046",
      assessmentUrl:
        "https://beta.assessments.amazon.jobs/?auth=a-DEajP_7yqu20e1mRhsGF6eT3LVQ5xTW6Q_E-9Rg3g#/assessment/BB_7e04c725-8de2-4242-afc0-f9ae5c09f046",
      assessmentScore: null,
      assessmentExpireDateTime: null,
      assessmentStatus: "Initiated",
      assessmentInitiationDateTime: null,
      assessmentStatusDateTime: "2022-07-15T22:26:38.546Z"
    }
  }
};

export const TEST_CANDIDATE_STATE: CandidateState = {
  formError: {},
  loading: false,
  failed: false,
  results: {
    candidateData: TEST_CANDIDATE
  }
};

export const TEST_APPLICATION: any = {
  applicationId: TEST_APPLICATION_ID,
  jobScheduleSelected: {
    jobId: TEST_JOB_ID,
    scheduleId: TEST_SCHEDULE_ID,
    scheduleDetails: null,
    jobScheduleSelectedTime: "2022-07-28T16:48:29.230756Z"
  }
};

export const TEST_APPLICATION_STATE: ApplicationState = {
  loading: false,
  failed: false,
  results: TEST_APPLICATION
};

// TODO: change it to be type JOB
export const TEST_JOB: any = {
  selectedChildSchedule: {
    scheduleId: TEST_SCHEDULE_ID
  },
  jobDescription: "",
  jobId: TEST_JOB_ID
};

export const TEST_JOB_STATE: any = {
  loading: false,
  failed: false,
  results: TEST_JOB
};

export const TEST_APPLICATION_DATA: any = {
  requisition: {
    availableShifts: {
      shifts: [
        {
          headCountRequestId: TEST_HCR_ID
        }
      ]
    }
  },
  application: {
    applicationId: TEST_APPLICATION_ID
  },
  job: TEST_JOB,
  output: {},
  candidate: {},
  showPreviousNames: "",
  selectedShift: {
    requisitionId: TEST_REQUISITION_ID
  },
  loadingShifts: true,
  shiftsEmptyOnFilter: false,
  shiftPageFactor: 0
};

export const TEST_SCHEDULE: any = {
  scheduleId: TEST_SCHEDULE_ID,
};

export const TEST_SCHEDULE_STATE: ScheduleState = {
  loading: false,
  failed: false,
  filters: {
    sortKey: SCHEDULE_FILTER_TYPE.DEFAULT,
    maxHoursPerWeek:DESIRED_WORK_HOURS.THIRTY,
    daysHoursFilter: []
  },
  results:{
    scheduleList: [],
    scheduleDetail: TEST_SCHEDULE,
  },
};

export const TEST_PAGE: any = {
  id: TEST_PAGE_ID,
  orderNumber: 0,
  configPath: TEST_PAGE_CONFIG_PATH
};

export const TEST_URL_PARAM: any = {
  page: TEST_PAGE_ID,
  requisitionId: TEST_REQUISITION_ID,
  applicationId: TEST_APPLICATION_ID,
  misc: TEST_MISC
};

export const TEST_APP_CONFIG: any = {
  stage: TEST_STAGE,
  authenticationURL: TEST_URL,
  dashboardUrl: TEST_URL,
  stepFunctionEndpoint: TEST_URL,
  ASHChecklistURL: TEST_URL,
  ASHChecklistURLCS: TEST_URL,
  defaultDaysHoursFilter: [],
  defaultAvailableFilter: {
    filter: {
      range: {
        HOURS_PER_WEEK: {
          maximumValue: 30
        }
      }
    }
  },
  defaultAvailableFilterDS: {
    filter: {
      range: {
        HOURS_PER_WEEK: {
          maximumValue: 30
        }
      }
    }
  },
  CSDomain: TEST_CS_DOMAIN,
  featureList: {
    PREVENT_DUPLICATE_SSN: {
      isAvailable: true
    },
    SUPPRESS_QUESTIONS_IF_REHIRE_ELIGIBLE: {
      isAvailable: true
    },
    STENCIL_COLOR_OVERRIDE: {
      isAvailable: true
    },
    CS_AUTH: {
      isAvailable: true
    },
    UNIFIED_DOMAIN: {
      isAvailable: true
    },
    PREFERRED_NAME: {
      isAvailable: true
    },
    SELF_ID_PLACEMENT: {
      isAvailable: true
    },
    CANDIDATE_DASHBOARD: {
      isAvailable: true
    },
    HOOK: {
      isAvailable: true
    },
    NO_SSN_CHECKBOX: {
      isAvailable: true
    },
    MLS: {
      isAvailable: true,
      options: {
        message: "Multi-language sopport feature flag"
      }
    }
  }
};

export const TEST_APP_CONFIG_STATE: AppConfigState = {
  loading: false,
  failed: false,
  results: TEST_APP_CONFIG
};

export const TEST_PAYLOAD: any = {
  output: {},
  data: TEST_APPLICATION_DATA,
  currentPage: TEST_PAGE,
  nextPage: TEST_PAGE,
  previousPage: TEST_PAGE,
  urlParams: TEST_URL_PARAM,
  appConfig: TEST_APP_CONFIG,
  pageOrder: [],
  keyName: TEST_KEY,
  candidateId: TEST_CANDIDATE_ID,
  updatedPageId: TEST_PAGE_ID,
  options: {},
  value: {},
  pageId: TEST_PAGE_ID,
  stepId: TEST_STEP_ID,
  stepsLength: 1,
  selectedShift: {
    headCountRequestId: TEST_HCR_ID
  },
  selectedRequisitionId: "",
  history: createHashHistory(),
  activeStepIndex: 0,
  isContentContainsSteps: false
};

export const EXCEPTION_MESSAGE = "EXCEPTION_MESSAGE";

export const TEST_REDUX_STORE: any = {
  app: {
    data: {
      requisition: {
        requisitionId: TEST_REQUISITION_ID
      },
      application: {
        applicationId: TEST_APPLICATION_ID,
        parentRequisitionId: TEST_REQUISITION_ID
      }
    },
    appConfig: {
      CSDomain: "https://hiring.amazon.com"
    }
  }
};

export const TEST_WORKFLOW_DATA: any = {
  stepName: TEST_STEP_ID
};

export const TEST_WORKFLOW_STATE: WorkflowState = {
  loading: false,
  failed: false,
  workflowErrorCode: WORKFLOW_ERROR_CODE.ACTIVE
};

//util functions
export const hasAction = (actions: any[], actionToCheck: string) => {
  let result = false;
  actions.forEach(element => {
    if (element.type === actionToCheck) {
      result = true;
    }
  });
  return result;
};

export const TestInitUiState: uiState = {
  isLoading: false
};

export const TEST_ASSESSMENT_URL = "https://assessment-url.test.amazon.com/";

export const TEST_BGC_STATE: BGCState = {
  stepConfig: {
    completedSteps: [],
    [BGC_STEPS.ADDITIONAL_BGC]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: true
    },
    [BGC_STEPS.FCRA]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    },
    [BGC_STEPS.NON_FCRA]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    }
  }
};

export const NHE_TIMESLOT_LOCATION: NheTimeSlotLocation = {
  streetAddress: "Onsite - Recruiting Office at Amazon Distribution Center, 3230 International Place",
  city: "Dupont",
  state: "WA",
  country: "US",
  postalCode: "98327"
};

export const TEST_NHE_STATE: NheState = {
  loading: false,
  failed: false,
  results: {
    nheData: [
      {
        timeSlotId: "VTS-1643678",
        startTime: "13:30",
        endTime: "14:00",
        location: NHE_TIMESLOT_LOCATION,
        timezone: "America/Los_Angeles",
        availableResources: 33,
        appointmentsBooked: 2,
        recruitingEventId: "",
        timeRange: "01:30 PM - 02:00 PM",
        date: "Thursday, Aug 04",
        dateWithoutFormat: "04/08/2022",
        childRequisitionId: "",
        nheSource: "Centralization",
      }
    ]
  }
};
