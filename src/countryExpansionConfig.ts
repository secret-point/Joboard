import { CountryCode, DESIRED_WORK_HOURS, SCHEDULE_FILTER_TYPE } from "./utils/enums/common";
import { ScheduleSortBy } from "./utils/types/common";

export const thankYouPageRedirectTextBanner = {
  US: { translationKey: "BB-ThankYou-fill-wotc-description-text", defaultString: "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire." },
  MX: { translationKey: "BB-ThankYou-redirect-to-ash-text", defaultString: "Before your pre-hire appointment, you will need to complete a series of pre-hire activities." },
  CA: { translationKey: "BB-ThankYou-fill-wotc-description-text", defaultString: "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire." }, // TODO: set to correct values once they're available
  UK: { translationKey: "BB-ThankYou-fill-wotc-description-text", defaultString: "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire." },
};

export enum PayRateType {
  hourMin = "hourMin",
  hourMax = "hourMax",
  monthMin = "monthMin",
  monthMax = "monthMax"
}

export interface countryConfigType {
  payRateType: PayRateType;
  desiredWorkHours: DESIRED_WORK_HOURS;
  nameRegexValidator: string;
  previousLegalNameRegexValidator: string;
  addressRegexValidator: string;
  renderScheduleCardBanner: (currencyCode: string, signOnBonus: number, signOnBonusL10N: string) => string;
}

export const accentedChars = "À-ÖØ-öø-ÿ"; // for Spanish
export const specialChars = `-!${accentedChars}`; // allow - and ! for the moment
export const digits = "0-9"; // same as \d
export const alphabet = "a-zA-Z";
export const alphanumeric = `${alphabet}${digits}`; // different with \w, no `_`

export const countryConfig: { [key in CountryCode]: countryConfigType } = {
  [CountryCode.US]: {
    payRateType: PayRateType.hourMax,
    desiredWorkHours: {
      RANGE1: "10",
      RANGE2: "20",
      RANGE3: "30",
      RANGE4: "40"
    },
    nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,39}[${alphabet}${accentedChars}]$`,
    previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,19}\\s[${alphabet}${specialChars},.'-]{1,19}$`,
    addressRegexValidator: `^(?=\\S)[${alphanumeric}${specialChars} ]{1,}[${alphanumeric}${accentedChars}]$`,
    renderScheduleCardBanner: (currencyCode: string, signOnBonus: number, signOnBonusL10N: string) => {
      return signOnBonusL10N || `${currencyCode}${signOnBonus}`;
    },
  },
  [CountryCode.MX]: {
    payRateType: PayRateType.monthMax,
    desiredWorkHours: {
      RANGE0: "24",
      RANGE1: "30",
      RANGE2: "36",
      RANGE3: "42",
      RANGE4: "48"
    },
    nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,99}[${alphabet}${accentedChars}]$`,
    previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,49}\\s[${alphabet}${specialChars},.'-]{1,49}$`,
    addressRegexValidator: `^(?=\\S)[${alphanumeric}${specialChars},. ]{1,}[${alphanumeric}${accentedChars},.]$`,
    renderScheduleCardBanner: (currencyCode: string, signOnBonus: number, signOnBonusL10N: string) => {
      return `${currencyCode}${signOnBonusL10N}`;
    },
  },
  // TODO: set to correct values once they're available
  [CountryCode.CA]: {
    payRateType: PayRateType.hourMax,
    desiredWorkHours: {
      RANGE1: "10",
      RANGE2: "20",
      RANGE3: "30",
      RANGE4: "40"
    },
    nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,39}[${alphabet}${accentedChars}]$`,
    previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,19}\\s[${alphabet}${specialChars},.'-]{1,19}$`,
    addressRegexValidator: `^(?=\\S)[${alphanumeric}${specialChars} ]{1,}[${alphanumeric}${accentedChars}]$`,
    renderScheduleCardBanner: (currencyCode: string, signOnBonus: number, signOnBonusL10N: string) => {
      return signOnBonusL10N || `${currencyCode}${signOnBonus}`;
    },
  },
  [CountryCode.UK]: {
    payRateType: PayRateType.hourMax,
    desiredWorkHours: {
      RANGE1: "10",
      RANGE2: "20",
      RANGE3: "30",
      RANGE4: "40"
    },
    nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,39}[${alphabet}${accentedChars}]$`,
    previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,19}\\s[${alphabet}${specialChars},.'-]{1,19}$`,
    addressRegexValidator: `^(?=\\S)[${alphanumeric}${specialChars} ]{1,}[${alphanumeric}${accentedChars}]$`,
    renderScheduleCardBanner: (currencyCode: string, signOnBonus: number, signOnBonusL10N: string) => {
      return signOnBonusL10N || `${currencyCode}${signOnBonus}`;
    },
  },
};

export const CS_DOMAIN_LIST = [
  // US
  "https://beta-us.devo.jobsatamazon.hvh.a2z.com",
  "https://gamma-us.devo.jobsatamazon.hvh.a2z.com",
  "https://us.preprod.jobsatamazon.hvh.a2z.com",
  "https://hiring.amazon.com",

  // MX
  "https://beta-mx.devo.jobsatamazon.hvh.a2z.com",
  "https://gamma-mx.devo.jobsatamazon.hvh.a2z.com",
  "https://mx.preprod.jobsatamazon.hvh.a2z.com",
  "https://trabaja.amazon.com.mx",

  // UK
  "https://beta.devo.jobsatamazon.hvh.a2z.com",
  "https://gamma.devo.jobsatamazon.hvh.a2z.com",
  "https://uk.preprod.jobsatamazon.hvh.a2z.com",
  "https://www.jobsatamazon.co.uk"
];

export const getCountryCode = (): CountryCode => {
  return "{{Country}}" as CountryCode || CountryCode.US;
};

export const getCountryConfig = (countryCode: CountryCode) => {
  return countryConfig[countryCode] || countryConfig[CountryCode.US];
};

export const getDesiredWorkHoursByCountryCode = (countryCodeOverride?: CountryCode) => {
  return getCountryConfig(countryCodeOverride || getCountryCode()).desiredWorkHours;
};

export const getScheduleSortList = () => {
  const ScheduleSortList: ScheduleSortBy[] = [
    {
      title: "Pay rate - Highest to Lowest",
      value: SCHEDULE_FILTER_TYPE.PAY_RATE,
      translationKey: "BB-JobOpportunity-sort-schedule-by-pay-rate-high-to-least"
    },
    {
      title: "Hours - Most to Least",
      value: SCHEDULE_FILTER_TYPE.HOURS_DESC,
      translationKey: "BB-JobOpportunity-sort-schedule-by-hours-most-to-least"
    },
    {
      title: "Hours - Least to Most",
      value: SCHEDULE_FILTER_TYPE.HOURS_ASC,
      translationKey: "BB-JobOpportunity-sort-schedule-by-hours-least-to-most"
    }
  ];

  switch (getCountryCode()) {
    case CountryCode.UK:
      ScheduleSortList.unshift({
        title: "Featured",
        value: SCHEDULE_FILTER_TYPE.FEATURED,
        translationKey: "BB-JobOpportunity-sort-schedule-by-featured"
      });
      break;
  
    default:
      break;
  }

  return ScheduleSortList;
};