import React from "react";
import { QueryParamItem } from "./types/common";
import { history } from "../store/store";

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
