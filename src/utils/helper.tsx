import React from "react";
import {
    Application,
    DayHoursFilter,
    Locale,
    QueryParamItem,
    Range,
    Schedule,
    SchedulePreference,
    TimeRangeHoursData
} from "./types/common";
import { history } from "../store/store";
import Cookies from "js-cookie";
import { HVH_LOCALE } from "./constants/common";
import range from "lodash/range";
import moment from "moment";
import { initScheduleStateFilters, ScheduleStateFilters } from "../reducers/schedule.reducer";
import { GetScheduleListByJobIdRequest } from "./apiTypes";
import {
    boundGetScheduleListByJobId,
    boundUpdateScheduleFilters
} from "../actions/ScheduleActions/boundScheduleActions";
import { DAYS_OF_WEEK } from "./enums/common";
import capitalize from 'lodash/capitalize';

export const routeToAppPageWithPath =
    ( pathname: string, queryParams?: QueryParamItem[] ) => {
        //get current query params and append new query parameters
        //If new parameter has same value as existing one, it will update its value
        let newQueryParam: string = '';
        let currentQueryParams = parseSearchParamFromHash(window.location.hash);

        //Allow to receive an array of query parameters at once
        queryParams && queryParams.forEach(queryParam => {
            const { paramValue, paramName } = queryParam;
            if(!!paramName && !!paramValue) {
                currentQueryParams = {
                    ...currentQueryParams,
                    [paramName]: paramValue
                }
            }
        })

        newQueryParam = parseObjectToQueryString(currentQueryParams);

        history.push({ pathname: `/${pathname}`, search: newQueryParam });
    };

export const parseSearchParamFromHash = ( hashURL: string ): { [key: string]: string } => {
    let url = hashURL.split("#")[1];

    if(!url) return {};

    url = url.split("?")[1];

    if(!url) return {};

    return url.split('&')
        .reduce(( result: { [key: string]: string }, param ) => {
            let [key, value] = param.split("=");
            result[key] = decodeURIComponent(value);
            return result;
        }, {});
};

export const parseObjectToQueryString = ( obj: { [key: string]: any } ): string => {
    let str = [];

    for(let p in obj)
        if(obj.hasOwnProperty(p)) {
            let value;
            value = typeof obj[p] === 'object' ? JSON.stringify(obj[p]) : obj[p];
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value));
        }

    return str.join("&");
}

export const getLocale = (): Locale => {
    const locale: string = Cookies.get(HVH_LOCALE) || '';

    return locale ? locale as Locale : Locale.enUS;
}

export const renderScheduleFullAddress = ( schedule: Schedule ): string => {
    const state = schedule.state || '';
    const city = schedule.city || '';
    const address = schedule.address || '';
    const postalCode = schedule.postalCode || '';

    const stateAndPostal = `${state ? `${state}${postalCode ? ` ${postalCode}` : ''}` : `${postalCode}`}`;

    return `${address}${city && address && `, `}${city}${stateAndPostal && (city || address) && `, `}${stateAndPostal}`;
}

export const populateTimeRangeHourData = ( startTime: string, isThisEndTime?: boolean ): TimeRangeHoursData[] => {
    const hoursData: TimeRangeHoursData[] = [];
    const startPos = isThisEndTime ? parseInt(startTime) + 1 : 0;

    range(startPos, 24, 60 / 60).map(( i ) => {
        const dateTime = moment("1990-01-01T00:00:00.000Z").utc().add("h", i);
        hoursData.push({
            time: dateTime.format("hh:mm A"),
            hours: i,
        });
    });

    if(isThisEndTime) {
        hoursData.push({
            time: "11:59 PM",
            hours: -1,
        });
    }

    return hoursData;
};

export const mapScheduleStateFilterToApiSchedulePreference = ( daysHoursFilters: DayHoursFilter[] ): SchedulePreference => {
    const filterPreference: SchedulePreference = {};

    daysHoursFilters
        .filter(filter => filter.isActive)
        .forEach(filter => {
            filterPreference[filter.day] = {
                startTime: filter.startTime,
                endTime: filter.endTime
            }
        });

    return filterPreference;
}

export const handleApplyScheduleFilters = ( scheduleFilters: ScheduleStateFilters ) => {
    const queryParams = parseSearchParamFromHash(window.location.hash);
    const { applicationId, jobId } = queryParams;
    const schedulePreferences: SchedulePreference = mapScheduleStateFilterToApiSchedulePreference(scheduleFilters.daysHoursFilter) || {};
    const range: Range = {
        HOURS_PER_WEEK: {
            maximumValue: parseInt(scheduleFilters.maxHoursPerWeek.toString()),
            minimumValue: 0
        }
    }
    const request: GetScheduleListByJobIdRequest = {
        jobId,
        applicationId,
        locale: getLocale(),
        filter: {
            filter: {
                range,
                schedulePreferences,
                eq: {},
                in: {},
            },
            locale: getLocale(),
            pageFactor: 1,
            isCRSJobsDisplayed: true,
            seasonalOnly: false,
            sortBy: scheduleFilters.sortKey.toString()
        }
    }
    boundGetScheduleListByJobId(request);
}

export const handleResetScheduleFilters = () => {
    boundUpdateScheduleFilters(initScheduleStateFilters);
    const queryParams = parseSearchParamFromHash(window.location.hash);
    const { applicationId, jobId } = queryParams;
    const request: GetScheduleListByJobIdRequest = {
        jobId,
        applicationId,
        locale: getLocale()
    }
    boundGetScheduleListByJobId(request);
}

export const getDaysHoursDefaultFilters = (): DayHoursFilter[]  => {
    const result: DayHoursFilter[] = [];
    Object.values(DAYS_OF_WEEK).forEach(day => {
        const dayHoursFilter: DayHoursFilter = {
            day,
            isActive: true,
            startTime: "00:00",
            endTime: "23:59",
            dayTranslationKey: `BB-DayName-${capitalize(day.toString())}`
        }
        result.push(dayHoursFilter);
    });

    return result;
}

export const sanitizeApplicationData = (applicationData: Application) => {
    const workflowStepName = applicationData?.workflowStepName as any;
    if(workflowStepName){
        const sanitizedWorkflowStepName =  workflowStepName.replaceAll("\"", "");
        applicationData.workflowStepName = sanitizedWorkflowStepName;
    }
    return applicationData
}
