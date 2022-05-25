import React from "react";
import { QueryParamItem } from "./types/common";
import { history } from "../store/store";
import { Locale } from "./types/common";
import Cookies from "js-cookie";
import { HVH_LOCALE } from "./constants/common";

export const routeToAppPageWithPath =
    (pathname: string, queryParams?: QueryParamItem[]) => {
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

        history.push({pathname: `/${pathname}`, search: newQueryParam});
    };

export const parseSearchParamFromHash = (hashURL: string): {[key: string]: string } => {
    let url = hashURL.split("#")[1];

    if (!url) return {};

    url = url.split("?")[1];

    if (!url) return {};

    return url.split('&')
        .reduce((result: {[key: string]: string}, param) => {
            let [key, value] = param.split("=");
            result[key] = decodeURIComponent(value);
            return result;
        }, {});
};

export const parseObjectToQueryString = (obj: {[key:string]:any}): string => {
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

    return  locale ? locale as Locale : Locale.enUS;
}
