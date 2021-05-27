import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
import KatalLogger from "@katal/logger";
import { initLogger } from "./helpers/log-helper";
import "./i18n";
import { DragonStoneApp } from "./dragon-stone-app";
import { log } from "./helpers/log-helper";

const DRAGONSTONE_PATH_PREFIX = "/ds/";
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
    log: KatalLogger;
    loggerUrl: string;
  }
}

getInitialData()
  .then((data: any) => {
    store.dispatch({
      type: "LOAD_INIT_DATA",
      payload: { ...data }
    });

    const isDragonStone = window.location.pathname.startsWith(
      DRAGONSTONE_PATH_PREFIX
    );

    const queryParams = queryString.parse(window.location.search);
    const requisitionId = queryParams["requisitionId"];
    const agency: any = queryParams["agency"];
    const page = queryParams["page"];
    const applicationId = queryParams["applicationId"];
    const misc = queryParams["misc"];
    const token = queryParams["token"] as any;

    if (!isDragonStone && !isNil(requisitionId) && !isNil(page)) {
      const urlParams = { ...queryParams };
      delete urlParams.token;
      delete urlParams.page;

      const requestQueryString = objectToQuerystring(urlParams);

      let appHashUrl = `#/${page}/${requisitionId}`;
      appHashUrl = !isEmpty(requestQueryString)
        ? `${requestQueryString}${appHashUrl}`
        : appHashUrl;
      appHashUrl = !isNil(applicationId)
        ? `${appHashUrl}/${applicationId}`
        : appHashUrl;
      appHashUrl = !isNil(misc)
        ? `${appHashUrl}/${applicationId}/${misc}`
        : appHashUrl;

      log(`appHashUrl="${appHashUrl}"`);
      window.location.assign(appHashUrl);
    }

    if (!isNil(token)) {
      /* TODO: Use react location lib for this */
      window.localStorage.setItem("accessToken", token);
      const urlParams = { ...queryParams };
      delete urlParams.token;
      const requestQueryString = objectToQuerystring(urlParams);

      window.history.replaceState({}, document.title, window.location.origin + window.location.pathname + requestQueryString);
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

        window.loggerUrl = data[0].loggerUrl;
        window.log = initLogger(data[0].loggerUrl, queryParams);
        window.log.addErrorListener();

        window.log.info("Application load with config");
      });
    }
    const Main = () => (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/ds/">
              <DragonStoneApp />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
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
