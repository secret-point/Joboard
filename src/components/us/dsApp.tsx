import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import { AppConfig } from "../../@types/IPayload";
import { CONSENT, JOB_OPPORTUNITY, PRE_CONSENT } from "../pageRoutes";
import JobOpportunityContainer from "./jobOpportunity";
import { Col } from "@amzn/stencil-react-components/layout";
import AppLoader from "../common/AppLoader";

interface MapStateToProps {
  appConfig: AppConfig,
}

const DragonStoneAppUS = ( props: MapStateToProps ) => {
  const { appConfig } = props;

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
      <Col padding='S300'>
        <AppLoader/>
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
              <JobOpportunityContainer/>
            </Route>
          </Switch>
        </Router>
      </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUS);
