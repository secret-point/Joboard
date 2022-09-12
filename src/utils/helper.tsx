import React from "react";
import {
    AdditionalBackgroundInfoRequest,
    Address,
    AlertMessage,
    ApiErrorMessage,
    Application,
    BgcStepConfig,
    Candidate,
    CandidateInfoErrorState,
    CandidatePatchRequest,
    DayHoursFilter,
    ErrorMessage,
    FeatureFlagList,
    FormInputItem,
    GetNheTimeSlotRequestDs,
    Job,
    Locale,
    NHETimeSlot,
    NonFcraFormErrorStatus,
    QueryParamItem,
    Range,
    Schedule,
    SchedulePreference,
    ScheduleStateFilters,
    SelfIdentificationConfig,
    SelfIdentificationDisabilityStatus,
    SelfIdentificationInfo,
    SelfIdentificationVeteranStatus,
    SelfIdEqualOpportunityStatus,
    TimeRangeHoursData
} from "./types/common";
import store, { history } from "../store/store";
import Cookies from "js-cookie";
import {
    AdditionalBGCFormConfig,
    CountrySelectOptions,
    HVH_LOCALE,
    IdNumberBgcFormConfig,
    initScheduleStateFilters,
    NameRegexValidator,
    UserIdValidator,
    usNewBBUIPathName,
    ValueToI18nKeyMap
} from "./constants/common";
import range from "lodash/range";
import moment from "moment";
import "moment/locale/es";
import {
    GetScheduleListByJobIdRequest,
    SelectedScheduleForUpdateApplication,
    UpdateApplicationRequestDS
} from "./apiTypes";
import {
    boundGetScheduleListByJobId,
    boundUpdateScheduleFilters
} from "../actions/ScheduleActions/boundScheduleActions";
import {
    BGC_STEPS,
    BGC_VENDOR_TYPE,
    DAYS_OF_WEEK,
    FCRA_DISCLOSURE_TYPE,
    FEATURE_FLAG,
    INFO_CARD_STEP_STATUS,
    QUERY_PARAMETER_NAME,
    SELF_IDENTIFICATION_STEPS,
    UPDATE_APPLICATION_API_TYPE
} from "./enums/common";
import capitalize from "lodash/capitalize";
import { boundGetApplication, boundUpdateApplicationDS } from "../actions/ApplicationActions/boundApplicationActions";
import { PAGE_ROUTES } from "../components/pageRoutes";
import queryString from "query-string";
import { isArray, isBoolean } from "lodash";
import { CS_DOMAIN_LIST } from "../constants";
import { get3rdPartyFromQueryParams, jobIdSanitizer, requisitionIdSanitizer } from "../helpers/utils";
import { onCompleteTaskHelper } from "../actions/WorkflowActions/workflowActions";
import isEmpty from "lodash/isEmpty";
import { boundUpdateStepConfigAction } from "../actions/BGC_Actions/boundBGCActions";
import get from "lodash/get";
import set from "lodash/set";
import pick from "lodash/pick";
import { initScheduleState } from "../reducers/bgc.reducer";
import { boundUpdateCandidateInfoError } from "../actions/CandidateActions/boundCandidateActions";
import { boundGetNheTimeSlotsDs } from "../actions/NheActions/boundNheAction";
import { UpdateApplicationRequest } from "../@types/candidate-application-service-requests";
import { boundUpdateSelfIdStepConfig } from "../actions/SelfIdentitifactionActions/boundSelfIdentificationActions";
import { initSelfIdentificationState } from "../reducers/selfIdentification.reducer";
import { MessageBannerType } from "@amzn/stencil-react-components/message-banner";
import { boundResetBannerMessage, boundSetBannerMessage } from "../actions/UiActions/boundUi";
import { translate, translate as t } from "./translator";
import isNil from "lodash/isNil";
import { METRIC_NAME } from "../constants/adobe-analytics";
import { postAdobeMetrics } from "../actions/AdobeActions/adobeActions";

const {
    BACKGROUND_CHECK,
    CONTINGENT_OFFER,
    JOB_CONFIRMATION,
    NHE,
    REVIEW_SUBMIT,
    SELF_IDENTIFICATION
} = PAGE_ROUTES;

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
};

export const parseSearchParamFromLocationSearch = (): {[key: string]: string} => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParamObject: {[key: string]: string} = {};

    searchParams.forEach((value, key) => {
        searchParamObject[key] = value;
    });

    return searchParamObject;
};

export const getAllQueryParamsFromURL = (): {[key: string]: string} => {
    const urlHashParams = parseSearchParamFromHash(window.location.hash);
    const urlSearchParams = parseSearchParamFromLocationSearch();

    return {
        ...urlHashParams,
        ...urlSearchParams
    };
};

export const getQueryParamStringFromURLFor3rdParty = (notationOverride?: string): string => {
    const allQueryParams = getAllQueryParamsFromURL();
    let queryString = '';

    // These keys are 3rd Party params we allowed to pass with redirectUrl after login.
    const includedKeyList = ["cmpid", "ccuid", "ccid", "etd", "piq_uuid", "pandocampaignid", "pandocandidateid", "piq_source", "ikey", "akey", "tid"];

    Object.keys(allQueryParams).forEach((key) => {
        if (includedKeyList.includes(key)) {
            queryString += `&${key}=${allQueryParams[key] || ''}`;
        }
    });

    if(notationOverride){
        return `${notationOverride}${queryString.substring(1)}`;
    } else {
        return queryString;
    }
};

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
    boundUpdateScheduleFilters({
        ...initScheduleStateFilters,
        daysHoursFilter: getDaysHoursDefaultFilters()
    });
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

export const getCurrentStepNameFromHash = ()=>{
    return window.location.hash.split('?')[0].replace('#/', '').split('/')[0];
}

export const checkIfIsLegacy = () => {
    const hashParam = window.location.hash.split("?").slice(1).join("&");
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search || hashParam));
    const isLegacy = !queryParams.jobId;
    return isLegacy;
}

export const checkIfIsCSRequest = (override? : boolean) => {
    if(isBoolean(override)){
        return override
    }
    const origin = window.location.origin;
    const isCSRequest = CS_DOMAIN_LIST.includes(origin);
    return isCSRequest;
}

export const handleSubmitJobConfirmation = (applicationDetail: Application, jobDetail: Job, scheduleDetail: Schedule) => {
    if(applicationDetail && scheduleDetail && jobDetail){
        const queryParamItem: QueryParamItem = {
            paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID,
            paramValue: scheduleDetail?.scheduleId
        }
        const selectedSchedule: SelectedScheduleForUpdateApplication = {
            jobId: jobDetail.jobId,
            scheduleId: scheduleDetail.scheduleId,
            scheduleDetails: JSON.stringify(scheduleDetail),
        }
        const dspEnabled = applicationDetail?.dspEnabled;
        const updateApplicationRequest: UpdateApplicationRequestDS = {
            applicationId: applicationDetail.applicationId,
            payload: selectedSchedule,
            type: UPDATE_APPLICATION_API_TYPE.JOB_CONFIRM,
            isCsRequest: checkIfIsCSRequest(),
            dspEnabled
        }
        boundUpdateApplicationDS(updateApplicationRequest, (applicationData: Application)=>{
            onCompleteTaskHelper(applicationData);
            // Stay at the current page but add new urlParams, wait work flow to do the routing
            routeToAppPageWithPath(JOB_CONFIRMATION, [queryParamItem]);
        });
    }
}

export const handleAcceptOffer = ( applicationData: Application ) => {
    boundResetBannerMessage();
    const updateApplicationRequest: UpdateApplicationRequestDS = {
        applicationId: applicationData.applicationId,
        payload: {
            extendedTimeStamp: new Date().toISOString()
        },
        type: UPDATE_APPLICATION_API_TYPE.CONTINGENT_OFFER,
        isCsRequest: checkIfIsCSRequest(),
        dspEnabled: !!applicationData?.dspEnabled
    }
    boundUpdateApplicationDS(updateApplicationRequest, (applicationDetail: Application) => {
        onCompleteTaskHelper(applicationDetail);
    });
}


export const createUpdateApplicationRequest = (application: Application, apiType: UPDATE_APPLICATION_API_TYPE, payload: any): UpdateApplicationRequestDS => {
    const updateApplicationRequest: UpdateApplicationRequestDS = {
        applicationId: application.applicationId,
        payload,
        type: apiType,
        isCsRequest: checkIfIsCSRequest(),
        dspEnabled: !!application?.dspEnabled
    }
    return updateApplicationRequest;
}

export const validateName = (name: string): boolean => {
    return new RegExp(NameRegexValidator).test(name);
}

export const validateUserId = (userId: string): boolean => {
    return new RegExp(UserIdValidator).test(userId);
}

export const handleUInitiateBGCStep = ( applicationData: Application, candidateData: Candidate ) => {
    const isDspEnabled = applicationData?.dspEnabled;
    const applicationAdditionalBgcInfo = applicationData.additionalBackgroundInfo;
    const isNonFcraCompleted = !isEmpty(applicationData?.nonFcraQuestions);
    const isFcraCompleted = !isEmpty(applicationData?.fcraQuestions);
    let isAdditionalBgcCompleted: boolean;
    const { FCRA, NON_FCRA, ADDITIONAL_BGC } = BGC_STEPS;
    const { ACTIVE, COMPLETED, LOCKED } = INFO_CARD_STEP_STATUS;

    if(isDspEnabled) {
        isAdditionalBgcCompleted = isAdditionalBgcInfoValid(candidateData?.additionalBackgroundInfo);
    }
    else {
        isAdditionalBgcCompleted = isAdditionalBgcInfoValid(candidateData?.additionalBackgroundInfo) && isAdditionalBgcInfoValid(applicationAdditionalBgcInfo);
    }

    let stepConfig: BgcStepConfig = { ...initScheduleState.stepConfig }

    if(isFcraCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [FCRA],
            [FCRA]: {
                status: COMPLETED,
                editMode: false
            }
        }
    }
    if(isNonFcraCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [...stepConfig.completedSteps, NON_FCRA],
            [NON_FCRA]: {
                status: COMPLETED,
                editMode: false
            },
            [ADDITIONAL_BGC]: {
                status: ACTIVE,
                editMode: false
            }
        }
    }
    else {
        stepConfig = {
            ...stepConfig,
            [NON_FCRA]: {
                status: isFcraCompleted ? ACTIVE : LOCKED,
                editMode: false
            }
        }
    }

    // Click next of additional background information form will complete task.
    // Prevent user from edit additional background information before isFcraCompleted and isNonFcraCompleted.
    if(isFcraCompleted && isNonFcraCompleted && isAdditionalBgcCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [...stepConfig.completedSteps, ADDITIONAL_BGC],
            [ADDITIONAL_BGC]: {
                status: COMPLETED,
                editMode: false
            }
        }
    }

    const request: BgcStepConfig = stepConfig;

    boundUpdateStepConfigAction(request);
}

export const verifyBasicInfo =
    (candidate: CandidatePatchRequest, formError: CandidateInfoErrorState, formConfig: FormInputItem[]): {hasError: boolean, formError: CandidateInfoErrorState} => {
        let hasError: boolean = false;

        formConfig
            .forEach(itemConfig => {
                let isValid: boolean;
                const { dataKey, required, regex } = itemConfig;
                const value = get(candidate,itemConfig.dataKey);
                if(itemConfig.id === IdNumberBgcFormConfig.id) {
                    isValid = isSSNValid(candidate, required || false, regex || "");
                }
                else if(itemConfig.dataKey.includes("mostRecentBuildingWorkedAtAmazon") || itemConfig.dataKey.includes("mostRecentTimePeriodWorkedAtAmazon")) {
                    const hasWorkedAtAmazonPreviously = get(candidate, "additionalBackgroundInfo.hasPreviouslyWorkedAtAmazon");
                    if(hasWorkedAtAmazonPreviously === true) {
                        isValid = validateInput(value, required || false, regex || '');
                    }
                    else {
                        isValid = true;
                    }
                }
                else if(itemConfig.dataKey.includes("convictionDetails")) {
                    const hasCriminalRecordWithinSevenYears = get(candidate, "additionalBackgroundInfo.hasCriminalRecordWithinSevenYears");

                    if(hasCriminalRecordWithinSevenYears === true) {
                        isValid = validateInput(value, required || false, regex || '');
                    }
                    else {
                        isValid = true;
                    }
                }
                else if(itemConfig.dataKey.includes("hasCriminalRecordWithinSevenYears") || itemConfig.dataKey.includes("hasPreviouslyWorkedAtAmazon")) {
                    isValid = typeof value === "boolean";
                }
                else {
                    isValid = validateInput(value, required || false, regex || '');
                }

                set(formError, dataKey, !isValid);
                if(!isValid && !hasError) hasError = true;
            });

        return {
            hasError,
            formError
        }
    }


export const isSSNValid = (patchCandidate: CandidatePatchRequest, required: boolean, regex: string): boolean => {

    if(!patchCandidate) {
        return false;
    }

    const states = store.getState();

    const candidate = states.candidate?.results?.candidateData || null;
    const newSSN = get(patchCandidate, "additionalBackgroundInfo.idNumber");
    const noSSN = get(patchCandidate, "additionalBackgroundInfo.isWithoutSSN");
    const oldSNN = get(candidate, IdNumberBgcFormConfig.dataKey);

    if (noSSN === true && newSSN === ''){
        return true;
    }

    if(newSSN && newSSN.includes("***") && newSSN === oldSNN){
        return true;
    }
    else if( newSSN && validateInput(newSSN, required, regex)){
        return true;
    }
    else {
        return false;
    }
}

export const isDOBOverEighteen = (dateOfBirth: string) => {
    if(!dateOfBirth){
        return false;
    }
    const date = new Date(dateOfBirth);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    const now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
    var dob = year * 10000 + month * 100 + day * 1; // Coerces strings to integers

    return now - dob > 180000;
}

export const validateInput = (value: string, required: boolean, regex: string) => {
    if(!required && (!value || value?.length === 0)) return true;

    if(required && (!value || value?.length === 0)) return false;

    return new RegExp(regex).test(value);
}

export const resetUnchangedFieldFromPatch = (parentObject: Object, formConfig: FormInputItem[], patchObject?: Object): Object => {
    if(isEmpty(patchObject)) return {};

    const changedField: string[] = formConfig
        .filter(config => config.edited === true)
        .map(config => {
            if(get(patchObject, config.dataKey) === get(parentObject, config.dataKey)) {
                config.edited = false
            }
            return config;
        })
        .filter(config => config.edited === true)
        .map(config => config.dataKey);

    const newPatchObject: Partial<Object> = pick(patchObject, changedField);

    return newPatchObject as Object;
}

export const handleSubmitNonFcraBGC =
    ( applicationData: Application, ackEsign: string, noticeEsign: string, requestedCopyOfBGC: boolean, stepConfig: BgcStepConfig, bgcVendorType: BGC_VENDOR_TYPE ) => {
        if(applicationData) {
            const updateApplicationPayload = {
                nonFcraQuestions: {
                    nonFcraAcknowledgementEsign: {
                        signature: ackEsign.trim(),
                    },
                    nonFcraStateNoticeEsign: {
                        signature: noticeEsign.trim(),
                    },
                    requestedCopyOfBackgroundCheck: requestedCopyOfBGC,
                    bgcVendorType
                }
            }

            const updateApplicationRequest = createUpdateApplicationRequest(applicationData, UPDATE_APPLICATION_API_TYPE.NON_FCRA_BGC, updateApplicationPayload);
            boundUpdateApplicationDS(updateApplicationRequest, () => {
                handleUpdateNonFCRABGCStep(stepConfig);
            })
        }
    }

export const handleUpdateNonFCRABGCStep = (stepConfig: BgcStepConfig) => {
    const { completedSteps } = stepConfig;
    const request: BgcStepConfig = {
        ...stepConfig,
        completedSteps: [...completedSteps, BGC_STEPS.NON_FCRA],
        [BGC_STEPS.NON_FCRA]: {
            status: INFO_CARD_STEP_STATUS.COMPLETED,
            editMode: false
        },
        [BGC_STEPS.ADDITIONAL_BGC]: {
            status: INFO_CARD_STEP_STATUS.ACTIVE,
            editMode: false
        }
    }
    boundUpdateStepConfigAction(request);
}

export const validateNonFcraSignatures = ( applicationData: Application, nonFcraAckEsign: string, nonFcraNoticeEsign: string ): NonFcraFormErrorStatus => {
    let errorStatus: NonFcraFormErrorStatus = {
        hasError: false,
        ackESignHasError: false,
        noticeESignHasError: false
    }

    const fcraQuestions = applicationData?.fcraQuestions;
    const bgcDisclosureEsign = fcraQuestions?.bgcDisclosureEsign.signature;

    if(!validateName(nonFcraAckEsign)) {
        errorStatus = {
            ...errorStatus,
            hasError: true,
            ackESignHasError: true
        }
    }

    if(!validateName(nonFcraNoticeEsign)) {
        errorStatus = {
            ...errorStatus,
            hasError: true,
            noticeESignHasError: true
        }
    }

    //first check if there two signature are equal
    if(nonFcraNoticeEsign !== nonFcraAckEsign) {
        errorStatus = {
            ...errorStatus,
            hasError: true,
            noticeESignHasError: true
        }
    }

    if((!!bgcDisclosureEsign && bgcDisclosureEsign !== nonFcraAckEsign) || (!!bgcDisclosureEsign && bgcDisclosureEsign !== nonFcraNoticeEsign)) {
        errorStatus = {
            ...errorStatus,
            hasError: true,
            noticeESignHasError: true,
            ackESignHasError: true
        }
    }

    return errorStatus
}

export const bgcShouldDisplayContinue = (stepConfig: BgcStepConfig): boolean => {
    const { FCRA, NON_FCRA, ADDITIONAL_BGC } = BGC_STEPS;
    const { COMPLETED } = INFO_CARD_STEP_STATUS;
    const fcraStatus = stepConfig[FCRA];
    const nonFcraStatus = stepConfig[NON_FCRA];
    const addBgcStatus = stepConfig[ADDITIONAL_BGC];

    return fcraStatus.status === COMPLETED && !fcraStatus.editMode &&
        nonFcraStatus.status === COMPLETED && !nonFcraStatus.editMode &&
        addBgcStatus.status === COMPLETED && !addBgcStatus.editMode
}

export const handleSubmitFcraBGC = ( applicationData: Application, stepConfig: BgcStepConfig, eSignature: string, fcraResponse?: FCRA_DISCLOSURE_TYPE ) => {
    const updateApplicationPayload = {
        fcraQuestions: {
            bgcDisclosureEsign: {
                signature: eSignature
            },
            bgcDisclosure: fcraResponse
        }
    }

    const { FCRA_BGC } = UPDATE_APPLICATION_API_TYPE;

    const updateApplicationRequest = createUpdateApplicationRequest(applicationData, FCRA_BGC, updateApplicationPayload);
    boundUpdateApplicationDS(updateApplicationRequest, () => {
        handleUpdateFcraBGCStep(stepConfig);
        routeToAppPageWithPath(BACKGROUND_CHECK);
    })
}

export const handleWithdrawFcraBGC = ( applicationData: Application, fcraResponse?: FCRA_DISCLOSURE_TYPE ) => {
    const updateApplicationPayload = {
        fcraQuestions: {
            bgcDisclosureEsign: {},
            bgcDisclosure: fcraResponse
        }
    };

    const { FCRA_BGC } = UPDATE_APPLICATION_API_TYPE;

    const updateApplicationRequest = createUpdateApplicationRequest(applicationData, FCRA_BGC, updateApplicationPayload);
    boundUpdateApplicationDS(updateApplicationRequest, () => {
        onCompleteTaskHelper(applicationData);
    });
};

export const handleUpdateFcraBGCStep = (stepConfig: BgcStepConfig) => {
    const { completedSteps } = stepConfig;
    const request: BgcStepConfig = {
        ...stepConfig,
        completedSteps: [...completedSteps, BGC_STEPS.FCRA],
        [BGC_STEPS.FCRA]: {
            status: INFO_CARD_STEP_STATUS.COMPLETED,
            editMode: false
        },
        [BGC_STEPS.NON_FCRA]: {
            status: INFO_CARD_STEP_STATUS.ACTIVE,
            editMode: false
        }
    }

    boundUpdateStepConfigAction(request);
}

export const handleSubmitAdditionalBgc =
    ( candidateData: Candidate, applicationData: Application, candidatePatchRequest: CandidatePatchRequest, formError: CandidateInfoErrorState, stepConfig: BgcStepConfig ) => {
        const { ADDITIONAL_BGC } = UPDATE_APPLICATION_API_TYPE;

        if(candidatePatchRequest.additionalBackgroundInfo?.address) {
            const countryName = candidatePatchRequest.additionalBackgroundInfo.address?.country || "";
            candidatePatchRequest.additionalBackgroundInfo.address.countryCode = getCountryCodeByCountryName(countryName);
        }

        const patch: CandidatePatchRequest = { ...candidatePatchRequest };
        const verifyInfo = verifyBasicInfo(patch, formError, AdditionalBGCFormConfig);
        boundUpdateCandidateInfoError(verifyInfo.formError);
        const dob = get(candidatePatchRequest, "additionalBackgroundInfo.dateOfBirth");
        const isOver18 = isDOBOverEighteen(dob);
        if(!verifyInfo.hasError && isOver18) {
            //Bound update additional info all
            const payload = {
                candidate: candidatePatchRequest.additionalBackgroundInfo
            }
            const request: UpdateApplicationRequestDS =
                createUpdateApplicationRequest(applicationData, ADDITIONAL_BGC, payload);
            boundUpdateApplicationDS(request, (applicationData: Application) => {
                onCompleteTaskHelper(applicationData);
                handleUpdateAdditionalBGCStep(stepConfig);
            })
        }
    }

export const handleUpdateAdditionalBGCStep = (stepConfig: BgcStepConfig) => {
    const { completedSteps } = stepConfig;
    const request: BgcStepConfig = {
        ...stepConfig,
        completedSteps: [...completedSteps, BGC_STEPS.FCRA, BGC_STEPS.ADDITIONAL_BGC],
        [BGC_STEPS.NON_FCRA]: {
            status: INFO_CARD_STEP_STATUS.COMPLETED,
            editMode: false
        }
    }

    boundUpdateStepConfigAction(request);
}

export const loadingStatusHelper = () =>{
    const states = store.getState();
    const loadingStates = states ? [states.candidate, states.job, states.appConfig, states.application, states.schedule, states.workflow, states.nhe] : [];
    let loadingCount = 0;

    loadingStates.forEach(loading=>{
        if(loading.loading === true){
            loadingCount++
        }
    })
    return loadingCount > 1;
}

export const fetchNheTimeSlotDs = (schedule: Schedule) => {
    let siteId = schedule.siteId;
    if(siteId.startsWith("SITE-")){
        siteId = siteId.replace("SITE-", "");
    }
    const request: GetNheTimeSlotRequestDs = {
        requisitionServiceScheduleDetails: {
            scheduleId: schedule.scheduleId,
            locationCode: siteId,
            hireStartDate: schedule.hireStartDate,
            contingencyTurnAroundDays: schedule.contingencyTat
        }
    }

    boundGetNheTimeSlotsDs(request);
}

export const renderNheTimeSlotFullAddress = ( nheTimeSlot: NHETimeSlot ): string => {
    const timeRange = nheTimeSlot.timeRange || '';
    const state = nheTimeSlot.location.state || '';
    const city = nheTimeSlot.location.city || '';
    const address = nheTimeSlot.location.streetAddress || '';
    const postalCode = nheTimeSlot.location.postalCode || '';

    const stateAndPostal = `${state ? `${state}${postalCode ? ` ${postalCode}` : ''}` : `${postalCode}`}`;

    return `${timeRange} ${address}${city && address && `, `}${city}${stateAndPostal && (city || address) && `, `}${stateAndPostal}`;
}

export const getPageName = () => {
    const hash = window.location.hash || '';
    return hash.split('?')[0]?.split('/')[1] || '';
}

export const  handleConfirmNHESelection = (applicationData: Application, nheTimeSlot: NHETimeSlot) => {
    const payload = {
        nheAppointment: nheTimeSlot
    }
    const { NHE } = UPDATE_APPLICATION_API_TYPE;

    if (applicationData) {
        const request: UpdateApplicationRequest = createUpdateApplicationRequest(applicationData, NHE, payload);
        boundUpdateApplicationDS(request, (applicationData: Application)=>{
            onCompleteTaskHelper(applicationData);
        });
        postAdobeMetrics({name: METRIC_NAME.SELECT_NHE, values: {
            NHE: {
                apptID: nheTimeSlot.timeSlotId,
                date: nheTimeSlot.dateWithoutFormat,
                hours: nheTimeSlot.timeRange
            }
          }
        });
    }
}

export const handleSubmitSelfIdEqualOpportunity =
  (applicationData: Application, equalOpportunityStatus: SelfIdEqualOpportunityStatus, stepConfig: SelfIdentificationConfig) => {
      const payload = {
          selfIdentificationInfo: equalOpportunityStatus
      };

      const { EQUAL_OPPORTUNITY_FORM } = UPDATE_APPLICATION_API_TYPE;
      const { EQUAL_OPPORTUNITY, VETERAN_FORM } = SELF_IDENTIFICATION_STEPS;

      const request: UpdateApplicationRequest = createUpdateApplicationRequest(applicationData, EQUAL_OPPORTUNITY_FORM, payload);
      boundUpdateApplicationDS(request, () => {
          handleUpdateSelfIdStep(stepConfig, EQUAL_OPPORTUNITY, VETERAN_FORM);
      });
  };

export const handleSubmitSelfIdDisabilityStatus =
  (applicationData: Application, disabilityStatus: SelfIdentificationDisabilityStatus, stepConfig: SelfIdentificationConfig) => {
      const payload = {
          selfIdentificationInfo: disabilityStatus
      };

      const { DISABILITY_FORM } = UPDATE_APPLICATION_API_TYPE;

      const request: UpdateApplicationRequest = createUpdateApplicationRequest(applicationData, DISABILITY_FORM, payload);
      boundUpdateApplicationDS(request, (applicationResponse: Application) => {
          onCompleteTaskHelper(applicationResponse);
          handleUpdateSelfIdStep(stepConfig, SELF_IDENTIFICATION_STEPS.DISABILITY_FORM);
      });
  };

export const handleSubmitSelfIdVeteranStatus =
  (applicationData: Application, veteranStatus: SelfIdentificationVeteranStatus, stepConfig: SelfIdentificationConfig) => {
      const payload = { selfIdentificationInfo: veteranStatus };

      const { VETERAN_STATUS_FORM } = UPDATE_APPLICATION_API_TYPE;
      const { DISABILITY_FORM, VETERAN_FORM } = SELF_IDENTIFICATION_STEPS;

      const request: UpdateApplicationRequest = createUpdateApplicationRequest(applicationData, VETERAN_STATUS_FORM, payload);
      boundUpdateApplicationDS(request, () => {
          handleUpdateSelfIdStep(stepConfig, VETERAN_FORM, DISABILITY_FORM);
      });
  };

export const handleUpdateSelfIdStep =
  (stepConfig: SelfIdentificationConfig, currentStep: SELF_IDENTIFICATION_STEPS, nextStep?: SELF_IDENTIFICATION_STEPS) => {
      const { completedSteps } = stepConfig;
      const request: SelfIdentificationConfig = {
          ...stepConfig,
          completedSteps: [...completedSteps, currentStep],
          [currentStep]: {
              status: INFO_CARD_STEP_STATUS.COMPLETED,
              editMode: false
          }
      };

      if (nextStep) {
          request[nextStep] = {
              status: INFO_CARD_STEP_STATUS.ACTIVE,
              editMode: false
          };
      }

      boundUpdateSelfIdStepConfig(request);
  };

export const handleInitiateSelfIdentificationStep = ( selfIdentificationInfo: SelfIdentificationInfo ) => {
    const { gender, ethnicity, protectedVeteran, veteran, disability, militarySpouse} = selfIdentificationInfo;

    const isEqualOpportunityCompleted = !!gender && !!ethnicity;
    const isDisabilityCompleted = !!disability;
    const isVeteranCompleted = !!protectedVeteran && !!veteran && !!militarySpouse;

    const { EQUAL_OPPORTUNITY, VETERAN_FORM, DISABILITY_FORM } = SELF_IDENTIFICATION_STEPS;
    const { ACTIVE, COMPLETED } = INFO_CARD_STEP_STATUS;

    let stepConfig: SelfIdentificationConfig = { ...initSelfIdentificationState.stepConfig}

    if(isEqualOpportunityCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [EQUAL_OPPORTUNITY],
            [EQUAL_OPPORTUNITY]: {
                status: COMPLETED,
                editMode: false
            }
        }
    }
    if(isVeteranCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [...stepConfig.completedSteps, VETERAN_FORM],
            [VETERAN_FORM]: {
                status: COMPLETED,
                editMode: false
            },
            [DISABILITY_FORM]: {
                status: ACTIVE,
                editMode: false
            }
        }
    }
    else {
        stepConfig = {
            ...stepConfig,
            [VETERAN_FORM]: {
                status: ACTIVE,
                editMode: false
            }
        }
    }

    if(isDisabilityCompleted) {
        stepConfig = {
            ...stepConfig,
            completedSteps: [...stepConfig.completedSteps, DISABILITY_FORM],
            [DISABILITY_FORM]: {
                status: COMPLETED,
                editMode: false
            }
        }
    }

    const request: SelfIdentificationConfig = stepConfig;

    boundUpdateSelfIdStepConfig(request);
}

export const SelfShouldDisplayContinue = (stepConfig: SelfIdentificationConfig): boolean => {
    const { DISABILITY_FORM, VETERAN_FORM, EQUAL_OPPORTUNITY } = SELF_IDENTIFICATION_STEPS;
    const { COMPLETED } = INFO_CARD_STEP_STATUS;
    const equalOpportunity = stepConfig[EQUAL_OPPORTUNITY];
    const veteran = stepConfig[VETERAN_FORM];
    const disability = stepConfig[DISABILITY_FORM];

    return equalOpportunity.status === COMPLETED && !equalOpportunity.editMode &&
      veteran.status === COMPLETED && !veteran.editMode &&
      disability.status === COMPLETED && !disability.editMode
}

export interface DateFormatOption {
    displayFormat?: string;
    defaultDateFormat?: string;
    locale?: Locale;
};

export const capitalizeAndReformat = (str: string): string => {
    return str ? str.replace(/(^\w|\s\w)/g, (c) => c.toUpperCase()).replace(/º/, "") : "";
};

export const formatDate = (dateStr?: string, option: DateFormatOption = {}) => {
    return capitalizeAndReformat(moment(dateStr, option.defaultDateFormat).locale(option.locale || getLocale()).format(
        option.displayFormat || "Do MMM YYYY"
    ));
};

export const formatNheTimeSlotTitle = (date: string) => {
    const res = formatDate(date, {
      defaultDateFormat: "DD/MM/yyyy",
      displayFormat: "dddd, MMM Do YYYY",
    });

    return capitalizeAndReformat(res);
};

export const goToCandidateDashboard = () => {
    const state = store.getState();

    if (state) {
        const appConfig = state.appConfig;
        const envConfig = appConfig?.results?.envConfig;

        const isCandidateDashboardEnabled = envConfig?.featureList?.CANDIDATE_DASHBOARD?.isAvailable;
        const queryParamsInSession = window.sessionStorage.getItem("query-params");
        const queryParams = queryParamsInSession ? JSON.parse(queryParamsInSession) : {};

        const CSDomain = envConfig?.CSDomain;
        const dashboardUrl = envConfig?.dashboardUrl || '';

        const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams, "?");
        const candidateDashboardUrl = `${CSDomain}/app${queryStringFor3rdParty}#/myApplications`;

        window.location.assign(isCandidateDashboardEnabled ? candidateDashboardUrl : dashboardUrl);
    }
};

export const redirectToASHChecklist = (applicationId: string, jobId: string, requisitionId: string) => {
    const state = store.getState();

    const appConfig = state.appConfig;
    const envConfig = appConfig?.results?.envConfig;

    if (envConfig) {
        const isLegacy = checkIfIsLegacy();
        const isCSRequest = checkIfIsCSRequest();

        const ASHUrl = isCSRequest? envConfig?.ASHChecklistURLCS : envConfig?.ASHChecklistURL;
        const ASHChecklistURL = ASHUrl.replace(
            "{applicationId}",
            applicationId
        ).replace("{requisitionId}", (isLegacy? requisitionId : jobId) as string);
        window.location.assign(ASHChecklistURL);
    }
  };

export const showCounterBanner = (): boolean => {
    const hash = window.location.hash;
    return hash.includes(CONTINGENT_OFFER) || hash.includes(BACKGROUND_CHECK) || hash.includes(NHE) || hash.includes(SELF_IDENTIFICATION) ||
      hash.includes(REVIEW_SUBMIT);
}

export const processAssessmentUrl = (assessmentUrl: string, applicationId: string, jobId: string): string => {
    if (!assessmentUrl) {
        return assessmentUrl;
    }
    // add redirect and locale query params to the url before redirecting to HOOK
    const url = new URL(assessmentUrl);
    url.searchParams.append("locale", getLocale());
    url.searchParams.append("redirect", `applicationId=${applicationId}&jobId=${jobId}${getQueryParamStringFromURLFor3rdParty()}`);
    return url.toString();
};

export const onAssessmentStart =  (assessmentUrl: string, applicationData: Application, jobDetail: Job) => {
    const assessmentRedirectUrl = processAssessmentUrl(assessmentUrl, applicationData.applicationId, jobDetail.jobId);
    if (assessmentRedirectUrl) {
        postAdobeMetrics({name: METRIC_NAME.ASSESSMENT_START});
        window.location.assign(assessmentRedirectUrl);
    }
}

export const setEpicApiCallErrorMessage = (errorMessage: ApiErrorMessage, isDismissible?: boolean) => {
    if (errorMessage) {
        const message = translate(errorMessage.translationKey, errorMessage.value);

        const alertMessage: AlertMessage = {
            type: MessageBannerType.Error,
            title: message,
            visible: true,
            isDismissible,
        }

        //Show Banner when error is due to unauthorized, we may extend logic to show error banner in future.
        boundSetBannerMessage(alertMessage);
    }
}

export const isI18nSelectOption = (option: any) => {
    return typeof option === 'object' && option.translationKey && option.value && option.showValue;
}

export const isNewBBuiPath = (pathName: string): boolean => {
    const href = window.location.href;
    const hashPath = window.location.hash.split('?')[0];
    const pageName = hashPath ? hashPath.replace("#/", "") : '';

    if(!pathName){
        pathName = pageName || '';
    }

    return Object.values(PAGE_ROUTES).includes(pathName as PAGE_ROUTES) && href.includes(usNewBBUIPathName) && href.includes(`#/${pathName}`);
}

export const isAddressValid = (address?: Address): boolean => {
    //Will use mandatory field of address in BB UI to check if address is empty or not

    if(!address) {
        return false;
    }

    const { addressLine1, city, country, state, zipcode, countryCode } = address;
    const isCompleteAddress = !!addressLine1 && !!city && !!country && !!state && !!zipcode && !!countryCode;

    return isCompleteAddress;
}

export const isAdditionalBgcInfoValid = (additionBgc?: AdditionalBackgroundInfoRequest): boolean => {
    if(!additionBgc) {
        return false;
    }

    const { dateOfBirth, governmentIdType, address, hasCriminalRecordWithinSevenYears, hasPreviouslyWorkedAtAmazon, idNumber, } = additionBgc;
    const addressValid = isAddressValid(address);
    return addressValid && !isNil(dateOfBirth) && !isNil(governmentIdType) && !isNil(hasCriminalRecordWithinSevenYears) && !isNil(hasPreviouslyWorkedAtAmazon) && !isNil(idNumber);
}

export const isSelfIdentificationInfoValid = (selfIdInfo?: SelfIdentificationInfo): boolean => {
    if(!selfIdInfo) {
        return false;
    }

    const { disability, ethnicity, gender, militarySpouse, protectedVeteran, veteran } = selfIdInfo;

    return !!disability && !!ethnicity && !!gender && !!militarySpouse && !!protectedVeteran && !!veteran;
}

//This wil be used to check if first two steps are filled correctly before submitting in step 3
export const isSelfIdentificationInfoValidBeforeDisability = (selfIdInfo?: SelfIdentificationInfo): boolean => {
    if(!selfIdInfo) {
        return false;
    }

    const { ethnicity, gender, militarySpouse, protectedVeteran, veteran } = selfIdInfo;

    return  !!ethnicity && !!gender && !!militarySpouse && !!protectedVeteran && !!veteran;
}

export const checkAndBoundGetApplication = (applicationId: string) => {
    if (applicationId){
        boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    } else {
        routeToAppPageWithPath(PAGE_ROUTES.APPLICATIONID_NULL);
    }
};

export const getFeatureFlagValue = (featureFlag: FEATURE_FLAG): boolean => {
    const state = store.getState();
    const envConfig = state.appConfig.results?.envConfig;
    const featureFlagList: FeatureFlagList | undefined = envConfig?.featureList;

    if(featureFlagList){
        return featureFlagList[featureFlag]?.isAvailable || false;
    }

    return false;
}

export const reverseMappingTranslate = (value: string | undefined) => {
    if (!value) {
        return "";
    }

    const key = ValueToI18nKeyMap[value];

    if (!key) {
        console.warn('No key/translation found for value: ', value);
        return "";
    }

    return t(key, value);
};

export const getCountryCodeByCountryName = (countryName: string): string => {
    const country = CountrySelectOptions.filter(country => country.value === countryName);
    return country.length ? country[0].countryCode : "";
}

export const AWAIT_TIMEOUT = "AWAIT_TIMEOUT";

// await a promise with timeout(ms), throws timeout error if not suppressTimeoutError
export const awaitWithTimeout = async (promise: Promise<any>, timeout: number, suppressTimeoutError?: boolean): Promise<any> => {
    let timer: ReturnType<typeof setTimeout>;

    return Promise.race([
        promise,
        new Promise(
            (_, reject) => timer = setTimeout(() => reject(AWAIT_TIMEOUT), timeout)
        )
    ]).catch(err => {
        if (err === AWAIT_TIMEOUT) {
            console.warn(`Promise await timeout: ${timeout} ms`);
            if (!suppressTimeoutError) {
                throw new Error(AWAIT_TIMEOUT);
            }
        } else {
            // other errors, rethrow to let client to handle
            throw err;
        }
    }).finally(
        () => clearTimeout(timer)
    );
};

export const showErrorMessage = (errorMessage: ErrorMessage, isDismissible?: boolean) => {
    const message = translate(errorMessage.translationKey, errorMessage.value);

    const alertMessage: AlertMessage = {
        type: MessageBannerType.Error,
        title: message,
        visible: true,
        isDismissible,
    }

    boundSetBannerMessage(alertMessage);
};

export const parseQueryParamsArrayToSingleItem = (queryParams: any) => {
    const parsedQueryParams = {...queryParams};
    Object.keys(parsedQueryParams).forEach((key: string) => {
        let item = parsedQueryParams[key];
        if( isArray(item) && item.length > 0){
            parsedQueryParams[key] = item[0];
        }
        if (key === "jobId"){
            parsedQueryParams[key] = jobIdSanitizer(parsedQueryParams[key]);
        } else if(key === "requisitionId"){
            parsedQueryParams[key] = requisitionIdSanitizer(parsedQueryParams[key]);
        }
    });
    return parsedQueryParams;
}
