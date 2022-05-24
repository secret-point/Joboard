import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import { get3rdPartyFromQueryParams } from "../../helpers/utils";
import { AppConfig } from "../../@types/IPayload";
import store from "../../store/store";
import { CONSENT, JOB_OPPORTUNITY, PRE_CONSENT } from "../pageRoutes";
import JobOpportunity from "./jobOpportunity/JobOpportunity";

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
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={PRE_CONSENT}/>} />
          <Route path={`/${PRE_CONSENT}`} exact  component={() => <PreConsentPage/>}/>
          <Route path={`/${CONSENT}`} exact component={() => <ConsentPage/>}/>
          <Route path={`/${JOB_OPPORTUNITY}`} exact component={() => <JobOpportunity/>}/>
        </Switch>
      </Router>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUS);
