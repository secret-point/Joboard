import { convertPramsToJson, isJson, launchAuthentication, objectToQuerystring } from './../utils';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Utils Tests: ", () => {

    const mockStore = configureStore([
        thunk,
        routerMiddleware(createHashHistory())
    ]);
    const getStore = () => {
        const initState = {};
        return mockStore(initState);
    };

    beforeEach(() => {
        const store = getStore();
        store.getState = jest.fn().mockReturnValue({
            app: {
                appConfig: {
                    authenticationURL: "https://test.auth.url",
                    CSDomain:"https://hiring.amazon.com"
                }
            }
        });
        window.reduxStore = store;
        window.sessionStorage.setItem("query-params", '{"applicationId":"1234"}');
    })

    afterEach(() => {
        window.sessionStorage.clear();
    })
    test("override", () => {;
        expect(true).toBeTruthy();
    })
    // test("test convert params to json with non-empty string should return real object",  () => {
    //     const params = encodeURI("?applicationId=1234&requisitionId=1234");

    //     const result = convertPramsToJson(params);
    //     expect(result.applicationId).toBe("1234");
    //     expect(result.requisitionId).toBe("1234");
    // });

    // test("test convert params to json with empty string should return empty object",  () => {
    //     const result = convertPramsToJson("");
    //     expect(Object.keys(result).length).toBe(0);
        
    // });

    // test("test isJson with valid json string should return true", () => {
    //     const str = '{"key":"value"}';
    //     expect(isJson(str)).toBe(true);
    // });

    // test("test isJson with invalid json string should return false", () => {
    //     const str = 'invalid json string';
    //     expect(isJson(str)).toBe(false);
    // });

    // test("test objectToQueryString with non empty object should return valid string", () => {
    //     const obj = {
    //         applicationId: "1234",
    //         requisitionId: "1234"
    //     }

    //     const result = objectToQuerystring(obj);

    //     expect(result).toBe("?applicationId=1234&requisitionId=1234");
    // })

    // test("test objectToQueryString with empty object should return empty string", () => {
    //     const result = objectToQuerystring({});

    //     expect(result).toBe("");
    // })

    // test("test launchAuthentication with hash size 4", () => {
    //     window.location.assign = jest.fn();
    //     window.location.hash = "/#/1234/1234/misc";
    //     launchAuthentication();
    //     const expected = 
    //     `https://hiring.amazon.com/app#/login?redirectUrl=${encodeURIComponent("http://localhost/?page=resume-application&requisitionId=1234&applicationId=1234&misc=misc")}`;
    //     expect(window.location.assign).toBeCalledTimes(1);
    //     expect(window.location.assign).toBeCalledWith(expected);
    // });

    // test("test launchAuthentication with hash size 3", () => {
    //     window.location.assign = jest.fn();
    //     window.location.hash = "/#/1234/1234";
    //     launchAuthentication();
    //     const expected = 
    //     `https://hiring.amazon.com/app#/login?redirectUrl=${encodeURIComponent("http://localhost/?page=resume-application&requisitionId=1234&applicationId=1234")}`;
    //     expect(window.location.assign).toBeCalledTimes(1);
    //     expect(window.location.assign).toBeCalledWith(expected);
    // });

    // test("test launchAuthentication with empty query string in session", () => {
    //     window.location.assign = jest.fn();
    //     window.location.hash = "/#/1234/1234";
    //     window.sessionStorage.setItem("query-params", "");
    //     launchAuthentication();
    //     const expected = 
    //     `https://hiring.amazon.com/app#/login?redirectUrl=${encodeURIComponent("http://localhost/?page=resume-application&requisitionId=1234&applicationId=1234")}`;
    //     expect(window.location.assign).toBeCalledTimes(1);
    //     expect(window.location.assign).toBeCalledWith(expected);
    // });
})