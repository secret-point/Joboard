import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import { AppConfig } from "../../@types/IPayload";
import store from "../../store/store";
import { CONSENT, JOB_OPPORTUNITY, PRE_CONSENT } from "../pageRoutes";
import JobOpportunity from "./jobOpportunity/JobOpportunity";

interface MapStateToProps {
  appConfig: AppConfig
}

const DragonStoneAppUS = (props: MapStateToProps) => {
  const { appConfig } = props;
  console.log("appConfig", appConfig, store.getState());

  // Will review and refacoter this logic later
  // const onClick = () => {
  //   const isCandidateDashboardEnabled = appConfig.featureList?.CANDIDATE_DASHBOARD?.isAvailable;
  //   const queryParamsInSession = window.sessionStorage.getItem("query-params");
  //   const queryParams = queryParamsInSession
  //     ? JSON.parse(queryParamsInSession)
  //     : {};
  //   const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');
  //   const candidateDashboardUrl = `${appConfig.CSDomain}/app${queryStringFor3rdParty}#/myApplications`;
  //   window.location.assign(isCandidateDashboardEnabled? candidateDashboardUrl : appConfig.dashboardUrl);
  // };

  return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={PRE_CONSENT}/>}/>
          <Route path={`/${PRE_CONSENT}`} exact>
            <PreConsentPage/>
          </Route>
          <Route path={`/${CONSENT}`} exact>
            <ConsentPage/>
          </Route>
          <Route path={`/${JOB_OPPORTUNITY}`} exact>
            <JobOpportunity/>
          </Route>
        </Switch>
      </Router>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUS);
