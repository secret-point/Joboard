export interface AppConfig {
    envConfig?: EnvConfig;
    pageOrder?: PageOrder[];
    countryStateConfig?: CountryStateConfig;
}

export interface EnvConfig {
    stage: string;
    authenticationURL: string;
    dashboardUrl: string;
    stepFunctionEndpoint: string;
    ASHChecklistURL: string;
    ASHChecklistURLCS: string;
    defaultDaysHoursFilter: DaysHoursFilter[];
    defaultAvailableFilter: AvailableFilter;
    defaultAvailableFilterDS: AvailableFilter;
    featureList?: any;
    CSDomain: string;
}

export interface DaysHoursFilter {
    day: string;
    isActive: boolean;
    startTime: string;
    endTime: string;
}

export interface AvailableFilter {
    sortBy: string;
    filter: Filter;
    seasonalOnly: boolean;
    locale: string;
    pageFactor: number;
    isCRSJobsDisplayed: boolean;
}

export interface Filter {
    range: Range;
    schedulePreferences: SchedulePreference;
    in: In;
    eq: Eq;
}

export interface SchedulePreference {
    MONDAY: day;
    TUESDAY: day;
    WEDNESDAY: day;
    THURSDAY: day;
    FRIDAY: day;
    SATURDAY: day;
    SUNDAY: day;
}

export interface day {
    startTime: string;
    endTime: string;
}

export interface Range {
    HOURS_PER_WEEK: HOURS_PER_WEEK;
}

export interface HOURS_PER_WEEK {
    maximumValue: number;
    minimumValue: number;
}

export interface In {}

export interface Eq {}

export type CountryStateConfig = State[]

export interface State {
    value: string,
    text: string
}

interface PageOrder {
    orderNumber: number;
    configPath: string;
}
