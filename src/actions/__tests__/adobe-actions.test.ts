import { getDataForMetrics } from './../../helpers/adobe-helper';
import { TEST_REDUX_STORE, EXCEPTION_MESSAGE } from './../../../tests/test-data';
import * as actions from "../adobe-actions"
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import cloneDeep from "lodash/cloneDeep";


describe("Test for Adobe Actions", () => {
    let getStore: Function;
    let state = {};

    beforeEach(() => {
        const mockStore = configureStore([
          thunk,
          routerMiddleware(createHashHistory())
        ]);
        getStore = () => {
          const initState = {};
      
          return mockStore(initState);
        };
        state = cloneDeep(TEST_REDUX_STORE);
        window.sessionStorage.clear();
        window.isPageMetricsUpdated = false;
    });
    const mockSessionStorageReturn = (value: string | null) => {
        if (value === null) return;
        window.sessionStorage.setItem("cmpid", value);
    };
    const mockAdobeHelper = (empty?: boolean, throwException?: boolean) => {
        const mockModule = require("../../helpers/adobe-helper");
        mockModule.getDataForMetrics = jest.fn(() => {
            if (throwException) {
                throw new Error(EXCEPTION_MESSAGE)
            }
            return empty ? {} : {key: "value"}
        });
    }

    test("Test sendDataLayerAdobeAnalytics with campId", async () => {
        mockSessionStorageReturn("test-value");
        actions.sendDataLayerAdobeAnalytics({});

    });

    test("Test sendDataLayerAdobeAnalytics without campId", async () => {
        mockSessionStorageReturn(null);
        actions.sendDataLayerAdobeAnalytics({});

    });

    test("Test addMetricForPageLoad", async () => {
        const store = getStore();
        mockSessionStorageReturn("test-value");
        mockAdobeHelper();
        window.reduxStore = store;
        jest.spyOn(store, "getState").mockReturnValue(state);

        actions.addMetricForPageLoad();
        expect(getDataForMetrics).toBeCalledTimes(1);
        expect(window.isPageMetricsUpdated).toBe(true);
    });

    test("Test addMetricForPageLoad with empty data in store", async () => {
        const store = getStore();
        mockSessionStorageReturn("test-value");
        mockAdobeHelper();
        window.reduxStore = store;
        state.app.data.requisition = null;
        jest.spyOn(store, "getState").mockReturnValue(state);

        actions.addMetricForPageLoad();
        expect(getDataForMetrics).toBeCalledTimes(0);
        expect(window.isPageMetricsUpdated).toBe(false);
    });

    test("Test addMetricForPageLoad with empty data layer should not send data", async () => {
        const store = getStore();
        mockSessionStorageReturn("test-value");
        mockAdobeHelper(true, false);
        window.reduxStore = store;
        jest.spyOn(store, "getState").mockReturnValue(state);

        actions.addMetricForPageLoad();
        expect(getDataForMetrics).toBeCalledTimes(1);
        expect(window.isPageMetricsUpdated).toBe(true);
    });

    test("Test addMetricForPageLoad with exception", async () => {
        const store = getStore();
        mockSessionStorageReturn("test-value");
        mockAdobeHelper(false, true);
        window.reduxStore = store;
        jest.spyOn(store, "getState").mockReturnValue(state);

        actions.addMetricForPageLoad();
        expect(getDataForMetrics).toBeCalledTimes(1);
        expect(window.isPageMetricsUpdated).toBe(false);
    });
});