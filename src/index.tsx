import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.container";
import store from "./store";
import { Provider } from "react-redux";
import { getInitialData } from "./services";
import { Store } from "redux";
import StepFunctionService from "./services/step-function-service";
import ICandidateApplication from "./@types/ICandidateApplication";
import "regenerator-runtime/runtime";
import "core-js";
import * as KatalMetrics from "@katal/metrics";
import initialMetricsPublisher from "@amzn/hvh-common-ui-library/lib/metrics";
import DeviceMetrics from "@amzn/hvh-common-ui-library/lib/metrics/device-metrics";
import domLoaded from "dom-loaded";
import queryString from "query-string";
import isNil from "lodash/isNil";
import { isEmpty } from "lodash";
import { objectToQuerystring } from "./helpers/utils";

declare global {
  interface Window {
    reduxStore: Store;
    Stage: string;
    stepFunctionService: StepFunctionService;
    isCompleteTaskOnLoad: boolean | undefined;
    applicationData: ICandidateApplication | undefined;
    hearBeatTime: string;
    dataLayerArray: any[];
    isPageMetricsUpdated: boolean;
    pageLoadMetricsInterval: any;
    urlParams: any;
    MetricsPublisher: KatalMetrics.Publisher;
    applicationStartTime: number;
  }
}

getInitialData()
  .then((data: any) => {
    store.dispatch({
      type: "LOAD_INIT_DATA",
      payload: { ...data }
    });
    if (window.location.hash.includes("?token=")) {
      const tokenString = window.location.hash.split("?token=");
      window.localStorage.setItem("accessToken", tokenString[1]);
    }
    const queryParams = queryString.parse(window.location.search);
    const requisitionId = queryParams["requisitionId"];
    const agency: any = queryParams["agency"];
    const page = queryParams["page"];
    const applicationId = queryParams["applicationId"];
    const misc = queryParams["misc"];
    const token = queryParams["token"] as any;
    if (!isNil(requisitionId) && !isNil(page)) {
      // disabled preserve url query params.
      // const urlParams = { ...queryParams };
      // delete urlParams.token;
      // delete urlParams.page;

      // const queryString = objectToQuerystring(urlParams);

      // appHashUrl = !isEmpty(queryString)
      //   ? `${queryString}${appHashUrl}`
      //   : appHashUrl;
      let appHashUrl = `/#/${page}/${requisitionId}`;
      appHashUrl = !isNil(applicationId)
        ? `${appHashUrl}/${applicationId}`
        : appHashUrl;
      appHashUrl = !isNil(misc)
        ? `${appHashUrl}/${applicationId}/${misc}`
        : appHashUrl;
      window.location.assign(appHashUrl);
    }

    if (!isNil(token)) {
      window.localStorage.setItem("accessToken", token);
    }

    if (!isNil(agency)) {
      window.sessionStorage.setItem("agency", (agency === 1).toString());
    }

    if (!isEmpty(queryParams)) {
      delete queryParams.token;
      const keys = Object.keys(queryParams);
      window.sessionStorage.setItem(
        "query-params",
        JSON.stringify(queryParams)
      );
      keys.forEach(key => {
        window.sessionStorage.setItem(key, queryParams[key] as any);
      });
    }

    window.reduxStore = store;
    if (data[0]) {
      domLoaded.then(() => {
        const initializationMetric = new KatalMetrics.Metric.Initialization().withMonitor();
        const initializationMetricsPublisher = initialMetricsPublisher(
          data[0].stage,
          "HVHCandidateApplication"
        ).newChildActionPublisherForInitialization();
        initializationMetricsPublisher.publish(initializationMetric);
        window.MetricsPublisher = initializationMetricsPublisher;
        new DeviceMetrics(initializationMetricsPublisher).publish();
        window.applicationStartTime = Date.now();
      });
    }
    const Main = () => (
      <Provider store={store}>
        <App />
      </Provider>
    );
    ReactDOM.render(<Main />, document.getElementById("root"));
  })
  .catch(ex => {
    console.log(ex);
    ReactDOM.render(
      <div>Error loading config</div>,
      document.getElementById("root")
    );
  });
