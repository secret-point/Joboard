import { MessageBannerType } from "@amzn/stencil-react-components/message-banner";
import { createHashHistory } from "history";
import { getDesiredWorkHoursByCountryCode } from "../../src/countryExpansionConfig";
import { AppConfigState } from "../../src/reducers/appConfig.reducer";
import { ApplicationState } from "../../src/reducers/application.reducer";
import { BGCState } from "../../src/reducers/bgc.reducer";
import { CandidateState } from "../../src/reducers/candidate.reducer";
import { NheState } from "../../src/reducers/nhe.reducer";
import { ScheduleState } from "../../src/reducers/schedule.reducer";
import { SelfIdentificationState } from "../../src/reducers/selfIdentification.reducer";
import { ThankYouState } from "../../src/reducers/thankYou.reducer";
import { uiState } from "../../src/reducers/ui.reducer";
import { WorkflowState } from "../../src/reducers/workflow.reducer";
import {
  BGC_STEPS,
  BGC_VENDOR_TYPE,
  DAYS_OF_WEEK,
  INFO_CARD_STEP_STATUS,
  SCHEDULE_FILTER_TYPE,
  SELF_IDENTIFICATION_STEPS,
  SHIFT_PATTERN,
  WORKFLOW_ERROR_CODE
} from "../../src/utils/enums/common";
import {
  Address,
  AlertMessage,
  Candidate,
  DayHoursFilter,
  Job,
  NHETimeSlot,
  NheTimeSlotLocation,
  NHETimeSlotUK,
  NHETimeSlotUS,
  PossibleNhePreferenceConfig,
  SavePossibleNhePreferenceRequest,
  Schedule,
  SelfIdentificationInfo,
  ShiftPreferenceData
} from "../../src/utils/types/common";

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

export const TEST_BANNER_MESSAGE: AlertMessage = {
  title: "TEST_TITLE",
  isDismissible: true,
  visible: true,
  type: MessageBannerType.Informational
};

export const TEST_SELF_IDENTIFICATION: SelfIdentificationInfo = {
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
  disability: "NO, I DON’T HAVE A DISABILITY",
  disabilityDate: "2022-07-20T01:12:29.985Z",
  religion: "",
  otherReligion: "",
  sexualOrientation: ""
};

export const TEST_BACKGROUND_INFO = {
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

export const TEST_JOB2: Job = {
  bypassAssessment: false,
  availableSchedules: { schedules: [] },
  language: "eng",
  dataSource: "",
  requisitionType: "",
  jobIdNumber: "001",
  jobTitle: "Test Title",
  jobType: "salaried",
  employmentType: "full",
  fullAddress: "",
  country: "US",
  city: "Seattle",
  postalCode: "",
  totalPayRateMin: 15,
  totalPayRateMax: 35,
  currencyCode: "USD",
  tagLine: "",
  letterOfIntent: "",
  image: "",
  jobPreviewVideo: "",
  limitedTimeOffer: "",
  featuredJob: false,
  bonusJob: false,
  jobQualification: "",
  careerPortalURL: "",
  blackbirdPortalURL: "",
  postingStatus: "",
  qualificationCriteria: [""],
  assessmentType: "",
  jobDescription: "",
  jobId: TEST_JOB_ID
};

export const TEST_CANDIDATE_STATE: CandidateState = {
  formError: {},
  loading: false,
  failed: false,
  results: {
    candidateData: TEST_CANDIDATE
  }
};

export const NHE_TIMESLOT_LOCATION: NheTimeSlotLocation = {
  streetAddress: "Onsite - Recruiting Office at Amazon Distribution Center, 3230 International Place",
  city: "Dupont",
  state: "WA",
  country: "US",
  postalCode: "98327"
};

export const NHE_TIMESLOT: NHETimeSlotUS = {
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
  spokenLanguageAlternatives: ["en-US", "es-US"],
};

export const TIME_SLOT_UK: NHETimeSlotUK = {
  nheDirect: true,
  title: "Friday, Jan 20th 2023",
  details: "09:00 - 09:10 Europe/London\nJohn lane, Test city, UK, UK, WD171GA",
  address: {
    addressLine1: "John lane",
    addressLine2: "",
    city: "Test city",
    state: "UK",
    country: "UK",
    zipCode: "WD171GA"
  },
  venueId: "V-UK-0000400",
  venueName: "TestVenue",
  timeSlotLengthInMinutes: 10,
  timeSlotId: "VTS-UK-0067328",
  timeZone: "Europe/London",
  date: "20/01/2023",
  startTimestamp: 1674205200000,
  endTimestamp: 1674205800000,
  startTime: "09:00",
  endTime: "09:10"
};
export const TEST_APPLICATION: any = {
  applicationId: TEST_APPLICATION_ID,
  jobScheduleSelected: {
    jobId: TEST_JOB_ID,
    scheduleId: TEST_SCHEDULE_ID,
    scheduleDetails: null,
    jobScheduleSelectedTime: "2022-07-28T16:48:29.230756Z"
  },
  nheAppointment: NHE_TIMESLOT
};

export const TEST_SHIFT_PREFERENCE: ShiftPreferenceData = {
  jobRoles: [
  ],
  locations: undefined,
  hoursPerWeek: [
    {
      maximumValue: 35,
      minimumValue: 25
    },
    {
      maximumValue: 24,
      minimumValue: 15
    }
  ],
  daysOfWeek: [
    DAYS_OF_WEEK.WEDNESDAY,
    DAYS_OF_WEEK.SUNDAY,
    DAYS_OF_WEEK.THURSDAY
  ],
  shiftTimeIntervals: undefined,
  candidateTimezone: "(GMT+00:00) Greenwich Mean Time (Europe/London)",
  preferenceSelectedOn: "2023-02-01T23:54:33.928Z",
  earliestStartDate: "08/02/2023",
  shiftTimePattern: SHIFT_PATTERN.DAYS,
  hoursPerWeekStrList: [
    "25 - 35",
    "15 - 24"
  ]
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

export const TEST_SCHEDULE: Schedule = {
  basePayL10N: "",
  distanceL10N: "",
  financeWeekStartDate: "",
  financeWeekStartDateL10N: "",
  geoClusterId: "",
  geoClusterName: "",
  hireEndDate: "",
  laborDemandAvailableCount: 0,
  priorityRank: 0,
  scheduleTypeL10N: "",
  surgePay: 0,
  scheduleId: TEST_SCHEDULE_ID,
  jobId: TEST_JOB_ID,
  dataSource: "Dragonstone",
  language: "English",
  externalJobTitle: "Amazon Grocery Shopper",
  basePay: 6,
  totalPayRate: 8.9,
  currencyCode: "USD",
  scheduleText: "Thu, Fri, Sat, Sun 9:00 AM - 1:00 PM",
  hoursPerWeek: 16,
  firstDayOnSite: "2022-10-29",
  scheduleBannerText: "Additional 5$ bonus schedule and 9$ Surge pay",
  scheduleType: "PART_TIME",
  employmentType: "Regular",
  tagLine: "In-store shopping for customer grocery orders.",
  image: "https://m.media-amazon.com/images/G/01/HVHJobDetails/I_Grocery_Shopper._CB1198675309_.svg",
  jobPreviewVideo: "https://m.media-amazon.com/images/G/01/HVHJobDetails/V_Grocery_Shopper._CB1198675309_.mp4",
  address: "38811 Cherry Street",
  city: "Newark",
  state: "CA",
  postalCode: "94560",
  iconUrl: "https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/IconLogo.png",
  bgcVendorName: BGC_VENDOR_TYPE.FADV,
  signOnBonus: 5,
  briefJobDescription: "briefJobDescription briefJobDescription",
  jobDescription: "jobDescription jobDescription",
  siteId: "SITE-OAK5",
  hireStartDate: "2022-11-04",
  contingencyTat: 0,
  signOnBonusL10N: "$5.00",
  firstDayOnSiteL10N: "2022-10-29",
  totalPayRateL10N: "$8.90",
  employmentTypeL10N: "Regular",
  requiredLanguage: ["en-US", "es-US"],
  parsedTrainingDate: "01-01-2023",
  monthlyBasePay: 1000,
  monthlyBasePayL10N: null
};

export const TEST_SCHEDULE_STATE: ScheduleState = {
  loading: false,
  failed: false,
  filters: {
    sortKey: SCHEDULE_FILTER_TYPE.DEFAULT,
    maxHoursPerWeek: getDesiredWorkHoursByCountryCode().RANGE3,
    daysHoursFilter: []
  },
  results: {
    scheduleList: [],
    scheduleDetail: TEST_SCHEDULE,
  },
};

export const TEST_THANK_YOU_STATE: ThankYouState = {
  referralFormInputConfig: {
    hasError: false,
    labelText: "Please provide your referrer login ID (lower case letters only)",
    labelTranslationKey: "BB-ThankYou-referral-login-label-text",
    errorMessage: "Please provide your referrer login ID.",
    errorMessageTranslationKey: "BB-ThankYou-referral-login-empty-error-text",
    required: true,
    name: "referralInfo",
    id: "referral-employee-name",
    dataKey: "jobReferral.referralInfo",
    type: "text"
  }
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

// util functions
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

export const TestSavePossibleNheDateRequest: SavePossibleNhePreferenceRequest = {
  possibleCities: [
    {
      label: "Templeton bridge",
      value: "Templeton bridge",
      checked: false
    },
    {
      label: "Test city",
      value: "Test city",
      checked: false
    }
  ],
  possibleNHEDates: [
    {
      label: "Wednesday, Jan 25th 2023",
      value: "Wednesday, Jan 25th 2023",
      checked: false
    }
  ],
  possibleNHETimeSlots: [
    {
      label: "6:00 AM - 10:00 AM",
      value: {
        from: "6:00 AM",
        to: "10:00 AM"
      },
      checked: false
    },
    {
      label: "10:00 AM - 2:00 PM",
      value: {
        from: "10:00 AM",
        to: "2:00 PM"
      },
      checked: false
    },
    {
      label: "2:00 PM - 6:00 PM",
      value: {
        from: "2:00 PM",
        to: "6:00 PM"
      },
      checked: false
    },
    {
      label: "6:00 PM - 10:00 PM",
      value: {
        from: "6:00 PM",
        to: "10:00 PM"
      },
      checked: false
    }
  ]
};

export const TestPossibleNheDates: PossibleNhePreferenceConfig = {
  cityPass: [
    {
      label: "Templeton bridge",
      value: "Templeton bridge",
      checked: true
    },
    {
      label: "Test city",
      value: "Test city",
      checked: false
    }
  ],
  dates: [
    {
      label: "Wednesday, Jan 25th 2023",
      value: "Wednesday, Jan 25th 2023",
      checked: false
    }
  ],
  timeslots: [
    {
      label: "6:00 AM - 10:00 AM",
      value: {
        from: "6:00 AM",
        to: "10:00 AM"
      },
      checked: false
    },
    {
      label: "10:00 AM - 2:00 PM",
      value: {
        from: "10:00 AM",
        to: "2:00 PM"
      },
      checked: false
    },
    {
      label: "2:00 PM - 6:00 PM",
      value: {
        from: "2:00 PM",
        to: "6:00 PM"
      },
      checked: false
    },
    {
      label: "6:00 PM - 10:00 PM",
      value: {
        from: "6:00 PM",
        to: "10:00 PM"
      },
      checked: false
    }
  ]
};

export const TEST_NHE_STATE: NheState = {
  loading: false,
  failed: false,
  results: {
    nheData: [
      NHE_TIMESLOT
    ],
    possibleNhePreferences: TestPossibleNheDates
  },
  nhePreferenceRequest: TestSavePossibleNheDateRequest
};
export const TEST_NHE_DATA_UK: NHETimeSlotUK[] = [
  {
    nheDirect: true,
    title: "Friday, Jan 20th 2023",
    details: "09:00 - 09:10 Europe/London\nJohn lane, Test city, UK, UK, WD171GA",
    address: {
      addressLine1: "John lane",
      addressLine2: "",
      city: "Test city",
      state: "UK",
      country: "UK",
      zipCode: "WD171GA"
    },
    venueId: "V-UK-0000400",
    venueName: "TestVenue",
    timeSlotLengthInMinutes: 10,
    timeSlotId: "VTS-UK-0067328",
    timeZone: "Europe/London",
    date: "20/01/2023",
    startTimestamp: 1674205200000,
    endTimestamp: 1674205800000,
    startTime: "09:00",
    endTime: "09:10"
  },
  {
    nheDirect: true,
    title: "Friday, Jan 20th 2023",
    details: "10:00 - 10:10 Europe/London\nJohn lane, Test city, UK, UK, WD171GA",
    address: {
      addressLine1: "John lane",
      addressLine2: "",
      city: "Test city",
      state: "UK",
      country: "UK",
      zipCode: "WD171GA"
    },
    venueId: "V-UK-0000400",
    venueName: "TestVenue",
    timeSlotLengthInMinutes: 180,
    timeSlotId: "VTS-UK-0067329",
    timeZone: "Europe/London",
    date: "20/01/2023",
    startTimestamp: 1674208800000,
    endTimestamp: 1674209400000,
    startTime: "10:00",
    endTime: "10:10"
  },
  {
    nheDirect: true,
    title: "Saturday, Jan 21st 2023",
    details: "09:00 - 09:10 Europe/London\nJohn lane, Test city, UK, UK, WD171GA",
    address: {
      addressLine1: "John lane",
      addressLine2: "",
      city: "Test city",
      state: "UK",
      country: "UK",
      zipCode: "WD171GA"
    },
    venueId: "V-UK-0000400",
    venueName: "TestVenue",
    timeSlotLengthInMinutes: 108,
    timeSlotId: "VTS-UK-0067330",
    timeZone: "Europe/London",
    date: "21/01/2023",
    startTimestamp: 1674291600000,
    endTimestamp: 1674292200000,
    startTime: "09:00",
    endTime: "09:10"
  },
  {
    nheDirect: true,
    title: "Saturday, Jan 21st 2023",
    details: "10:00 - 10:10 Europe/London\nJohn lane, Test city, UK, UK, WD171GA",
    address: {
      addressLine1: "John lane",
      addressLine2: "",
      city: "Test city",
      state: "UK",
      country: "UK",
      zipCode: "WD171GA"
    },
    venueId: "V-UK-0000400",
    venueName: "TestVenue",
    timeSlotLengthInMinutes: 10,
    timeSlotId: "VTS-UK-0067331",
    timeZone: "Europe/London",
    date: "21/01/2023",
    startTimestamp: 1674295200000,
    endTimestamp: 1674295800000,
    startTime: "10:00",
    endTime: "10:10"
  }
];
export const TEST_SELF_IDENTIFICATION_STATE: SelfIdentificationState = {
  stepConfig: {
    completedSteps: [],
    [SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: true
    },
    [SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    },
    [SELF_IDENTIFICATION_STEPS.VETERAN_FORM]: {
      status: INFO_CARD_STEP_STATUS.ACTIVE,
      editMode: false
    }
  },
};

export const TEST_NHE_TIME_SLOT: NHETimeSlot = {
  timeSlotId: "VTS-0034139",
  startTime: "10:30",
  endTime: "11:00",
  location: NHE_TIMESLOT_LOCATION,
  timezone: "America/Chicago",
  availableResources: 75,
  appointmentsBooked: 24,
  recruitingEventId: "",
  timeRange: "10:30 AM - 11:00 AM",
  date: "Thursday, Aug 11",
  dateWithoutFormat: "11/08/2022",
  childRequisitionId: "",
  nheSource: "Centralization",
  spokenLanguageAlternatives: ["en-US", "es-US"],
};

export const TEST_DAYS_HOURS_FILTER: DayHoursFilter[] = [
  {
    day: DAYS_OF_WEEK.MONDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Monday"
  },
  {
    day: DAYS_OF_WEEK.TUESDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Tuesday"
  },
  {
    day: DAYS_OF_WEEK.WEDNESDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Wednesday"
  },
  {
    day: DAYS_OF_WEEK.THURSDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Thursday"
  },
  {
    day: DAYS_OF_WEEK.FRIDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Friday"
  },
  {
    day: DAYS_OF_WEEK.SATURDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Saturday"
  },
  {
    day: DAYS_OF_WEEK.SUNDAY,
    isActive: true,
    startTime: "00:00",
    endTime: "23:59",
    dayTranslationKey: "BB-DayName-Sunday"
  }
];
export const TEST_ASSESSMENT_STATE = {
  loading: false,
  failed: false,
  results: {
    assessmentElegibility: false
  }
};