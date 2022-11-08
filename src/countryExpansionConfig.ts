import { CountryCode, DESIRED_WORK_HOURS } from "./utils/enums/common";

export const thankYouPageRedirectTextBanner = {
    US: { translationKey: "BB-ThankYou-fill-wotc-description-text", defaultString: "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire." },
    MX: { translationKey: "BB-ThankYou-redirect-to-ash-text", defaultString: "Before your pre-hire appointment, you will need to complete a series of pre-hire activities." },
    CA: { translationKey: "BB-ThankYou-fill-wotc-description-text", defaultString: "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire." } // TODO: set to correct values once they're available
}

export enum PayRateType {
    hourMin = 'hourMin',
    hourMax = 'hourMax',
    monthMin = 'monthMin',
    monthMax = 'monthMax'
}

export interface countryConfigType {
    payRateType: PayRateType;
    desiredWorkHours: DESIRED_WORK_HOURS;
    nameRegexValidator: string;
    previousLegalNameRegexValidator: string;
}

export const accentedChars = "À-ÖØ-öø-ÿ";  // for Spanish
export const specialChars = `-!${accentedChars}`;  // allow - and ! for the moment
export const digits = "0-9";  // same as \d
export const alphabet = "a-zA-Z";
export const alphanumeric = `${alphabet}${digits}`;  // different with \w, no `_`

export const countryConfig: { [key in CountryCode]: countryConfigType } = {
    [CountryCode.US] : {
        payRateType: PayRateType.hourMax,
        desiredWorkHours: {
            TEN: '10',
            TWENTY: '20',
            THIRTY: '30',
            FORTY: '40'
        },
        nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,39}[${alphabet}${accentedChars}]$`,
        previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,19}\\s[${alphabet}${specialChars},.'-]{1,19}$`,
    },
    [CountryCode.MX] : {
        payRateType: PayRateType.monthMax,
        desiredWorkHours: {
            TEN: '12',
            TWENTY: '24',
            THIRTY: '36',
            FORTY: '48'
        },
        nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,99}[${alphabet}${accentedChars}]$`,
        previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,49}\\s[${alphabet}${specialChars},.'-]{1,49}$`,
    },
    // TODO: set to correct values once they're available
    [CountryCode.CA] : {
        payRateType: PayRateType.hourMax,
        desiredWorkHours: {
            TEN: '10',
            TWENTY: '20',
            THIRTY: '30',
            FORTY: '40'
        },
        nameRegexValidator: `^(?=\\S)[${alphabet}${specialChars} ,.'-]{1,39}[${alphabet}${accentedChars}]$`,
        previousLegalNameRegexValidator: `^(?=\\S)[${alphabet}${specialChars},.'-]{1,19}\\s[${alphabet}${specialChars},.'-]{1,19}$`,
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
    "https://trabaja.amazon.com.mx"
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
