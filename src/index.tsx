import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import "regenerator-runtime/runtime";
import "core-js";
import initialMetricsPublisher from "@amzn/hvh-common-ui-library/lib/metrics";
import DeviceMetrics from "@amzn/hvh-common-ui-library/lib/metrics/device-metrics";
import "./i18n";
import { MainWithSkipLink } from "@amzn/stencil-react-components/a11y";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import { Col } from "@amzn/stencil-react-components/layout";
import { PageContainer } from "@amzn/stencil-react-components/page";
import KatalLogger from "@katal/logger";
import * as KatalMetrics from "@katal/metrics";
import domLoaded from "dom-loaded";
import { isEmpty } from "lodash";
import isNil from "lodash/isNil";
import queryString from "query-string";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Store } from "redux";
import { actionGetInitialAppConfigActionSuccess } from "./actions/AppConfigActions/appConfigActions";
import { onSFLogout } from "./actions/old/application-actions";
import { PAGE_ROUTES } from "./components/pageRoutes";
import DragonStoneAppUS from "./components/us/dsApp";
import { CS_PREPROD_DOMAIN } from "./constants";
import { log, LoggerType } from "./helpers/log-helper";
import { injectCsNavAndFooter, objectToQuerystring, parseQueryParamsArrayToSingleItem } from "./helpers/utils";
import { getInitialData } from "./services";
import StepFunctionService from "./services/step-function-service";
import store from "./store/store";
import { newBBUIPathName } from "./utils/constants/common";
import { initKatalLogger, isNewBBuiPath } from "./utils/helper";
import { AppConfig, Application, FeatureFlagList, IsPageMetricsUpdated } from "./utils/types/common";

const { PRE_CONSENT, RESUME_APPLICATION } = PAGE_ROUTES;

declare global {
  interface Window {
    reduxStore: Store;
    Stage: string;
    appStage: string;
    stepFunctionService: StepFunctionService;
    isCompleteTaskOnLoad: boolean | undefined;
    applicationData: Application | undefined;
    hearBeatTime: string;
    dataLayerArray: any[];
    isPageMetricsUpdated: IsPageMetricsUpdated;
    pageLoadMetricsInterval: any;
    urlParams: any;
    MetricsPublisher: KatalMetrics.Publisher;
    applicationStartTime: number;
    log: KatalLogger;
    loggerUrl: string;
    hasCompleteTask: Function | undefined;
    hasCompleteTaskOnSkipSchedule: Function | undefined;
    hasCompleteTaskOnWorkflowConnect: Function | undefined;
    hasTargetStep: boolean | undefined;
  }
}

getInitialData()
  .then((data: any) => {
    const appConfig: AppConfig = {
      envConfig: data[0],
      pageOrder: data[1]?.pageOrder,
      countryStateConfig: data[2]
    };
    appConfig.envConfig && initKatalLogger(appConfig.envConfig);

    store.dispatch(actionGetInitialAppConfigActionSuccess(appConfig));

    const featureList: FeatureFlagList = data[0]?.featureList;
    const CSDomain = data[0]?.CSDomain;
    const currentOrigin = window.location.origin;
    if (currentOrigin !== CSDomain && featureList?.UNIFIED_DOMAIN?.isAvailable && process.env.NODE_ENV === "production") {
      const csApplicationURL = window.location.href.replace(currentOrigin, `${CSDomain}/application`);
      window.location.href = csApplicationURL;
      return;
    }
    const hashParam = window.location.hash.split("?").slice(1).join("&");
    const urlParams = window.location.search.length > 0
      ? `${window.location.search}&${hashParam}`
      : `?${hashParam}`;
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(urlParams));
    if (queryParams["iframe"]) {
      const newURL = window.location.href.replace("&iframe=true", "");
      window.parent.window.location.href = newURL;
      return;
    }

    // Inject CS Nav and footer when is in CS domain
    if (currentOrigin === CSDomain || "http://localhost:3000") {
      injectCsNavAndFooter(CSDomain);
    } else if (currentOrigin === CS_PREPROD_DOMAIN) {
      injectCsNavAndFooter(CS_PREPROD_DOMAIN);
    }

    /** ******** Disable back button for HVHBB-Backlog-3812 ***********
     * This manipulates the browser history to disable the back button because
     * it can create unexpected results. It would be better to carefully manage
     * the browser state throughout but that is out of scope for now.
     */

    /* Rewrite the history with state `back: true` so the onpopstate event listener
        below will know whether to push another duplicate to the stack to avoid actually
        going back */
    window.history.pushState({ back: true }, window.document.title, window.location.href);
    window.history.pushState({ back: false }, window.document.title, window.location.href);

    /* This looks for the back state and pushes a page duplicate onto the history stack
      so that hitting back will simply run this again each time */
    window.onpopstate = (event: PopStateEvent) => {
      /* Make sure back is still disabled if some other source changes the URL */
      window.history.pushState({ back: true }, window.document.title, window.location.href);
      window.history.pushState({ back: false }, window.document.title, window.location.href);
      if (event.state?.back) {
        window.history.pushState({ back: false }, window.document.title, window.location.href);
      }
    };
    /** ***************************************************************/

    const { requisitionId } = queryParams;
    // TODO know how to deal with requisitionId without JOB as prefix ( Legacy system )
    if (requisitionId?.indexOf("JOB") === 0) {
      /* jobId passed as requisitionId; forward */
      delete queryParams["requisitionId"];
      queryParams["jobId"] = requisitionId;
    }
    const { agency }: any = queryParams;
    const { page } = queryParams;
    const { applicationId } = queryParams;
    const token = queryParams["token"] as any;
    const newUrlParams = { ...queryParams };

    delete newUrlParams.token;
    delete newUrlParams.page;

    const requestQueryString = objectToQuerystring(newUrlParams);

    const isNewBBFlow = isNewBBuiPath(page, newBBUIPathName.US);
    // Only build new BB UI path if the entry point is different to new BB UI
    // When a valid pageName is passed as query params. on new BB UI, we will go to that page.

    if (!isNewBBFlow) {
      let appHashUrl = "";

      log("[Legacy] Calling legacy old BB UI", { page, applicationId, queryParams }, LoggerType.WARN);

      if (!isNil(page)) {
        appHashUrl = `${page}`;
        log(`[Legacy] Calling legacy old BB UI page: ${page}`, queryParams, LoggerType.WARN);
      } else {
        if (!isNil(applicationId)) {
          appHashUrl = `${RESUME_APPLICATION}`;
        } else {
          appHashUrl = `${PRE_CONSENT}`;
        }
      }

      appHashUrl = !isEmpty(requestQueryString)
        ? `${appHashUrl}${requestQueryString}`
        : appHashUrl;

      const redirectUrl = `${newBBUIPathName.US}${requestQueryString}#/${appHashUrl}`;
      log(`[Legacy] Redirecting to new BB UI url: ${redirectUrl}`, { redirectUrl, appHashUrl, queryParams }, LoggerType.WARN);

      window.location.assign(redirectUrl);
      return;
    }

    if (!isNil(token)) {
      window.localStorage.setItem("accessToken", token);
      const newUrlWithoutToken = decodeURIComponent(window.location.href)
        .replace(`?token=${token}`, "")
        .replace(`&token=${token}`, "");

      window.history.replaceState(
        {},
        document.title,
        newUrlWithoutToken
      );
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
    // Inject temp solusion for removing accessToken when CS logout and continue logout on SF
    if (page === "sflogout") {
      onSFLogout();
    }
    if (data[0]) {
      domLoaded.then(() => {
        const initializationMetric = new KatalMetrics.Metric.Initialization().withMonitor();
        const initializationMetricsPublisher = initialMetricsPublisher(
          data[0].appStage,
          "HVHCandidateApplication"
        ).newChildActionPublisherForInitialization();
        initializationMetricsPublisher.publish(initializationMetric);
        window.MetricsPublisher = initializationMetricsPublisher;
        new DeviceMetrics(initializationMetricsPublisher).publish();
        window.applicationStartTime = Date.now();

        // safety check, should skip if already initialized
        initKatalLogger(data[0]);
        window.log.info("Application load with config");
      });
    }
    const Main = () => (
      <Provider store={store}>
        <Router>
          <StencilProvider>
            <Col gridGap="m" padding="n">
              <PageContainer
                data-testid="layout"
                paddingTop="0"
                paddingBottom="S300"
                paddingHorizontal="0"
                width="80%"
              >
                <MainWithSkipLink>
                  <Switch>
                    <Route path={newBBUIPathName.US}>
                      <DragonStoneAppUS />
                    </Route>
                    <Route path="/" render={() => (
                      <Redirect to={{
                        pathname: newBBUIPathName.US,
                        search: !isEmpty(queryParams) ? queryString.stringify(queryParams) : ""
                      }}
                      />
                    )}
                    />
                  </Switch>
                </MainWithSkipLink>
              </PageContainer>
            </Col>
          </StencilProvider>
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
