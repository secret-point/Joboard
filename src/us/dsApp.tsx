import React from "react";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  useLocation,
  Switch,
  Route
} from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import queryString from "query-string";
import CandidateApplicationService from "../services/candidate-application-service";
import { CreateApplicationRequestDS } from "../@types/candidate-application-service-requests";
import moment from "moment";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import { checkIfIsCSRequest, get3rdPartyFromQueryParams } from "../helpers/utils";
import { AppConfig } from "../@types/IPayload";
import store from "../store/store";

interface MapStateToProps {
  appConfig: AppConfig,
  app: any
}

const DragonStoneAppUS = (props: MapStateToProps) => {
  const { appConfig } = props;
  console.log("appConfig", appConfig, store.getState());

  const onClick = () => {
    const isCandidateDashboardEnabled = appConfig.featureList?.CANDIDATE_DASHBOARD?.isAvailable;
    const queryParamsInSession = window.sessionStorage.getItem("query-params");
    const queryParams = queryParamsInSession
      ? JSON.parse(queryParamsInSession)
      : {};
    const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');
    const candidateDashboardUrl = `${appConfig.CSDomain}/app${queryStringFor3rdParty}#/myApplications`;
    window.location.assign(isCandidateDashboardEnabled? candidateDashboardUrl : appConfig.dashboardUrl);
  };

  return (
    <StencilProvider>
      <Router>
        <Switch>
          <Route path="/consent/">
            <ConsentPage />
          </Route>
          <Route path="/">
            <PreConsentPage />
          </Route>
        </Switch>
      </Router>
    </StencilProvider>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUS);
