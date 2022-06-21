import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import { AppConfig } from "../../@types/IPayload";
import {
  ALREADY_APPLIED,
  BACKGROUND_CHECK,
  BACKGROUND_CHECK_FCRA,
  CONSENT,
  CONTINGENT_OFFER,
  JOB_CONFIRMATION,
  JOB_DESCRIPTION,
  JOB_OPPORTUNITIES,
  NHE,
  PRE_CONSENT,
  RESUME_APPLICATION,
  REVIEW_SUBMIT,
  SELF_IDENTIFICATION,
  SESSION_TIMEOUT,
  THANK_YOU
} from "../pageRoutes";
import JobOpportunity from "./jobOpportunity/JobOpportunity";
import { Col } from "@amzn/stencil-react-components/layout";
import AppLoader from "../common/AppLoader";
import JobConfirmation from "./jobOpportunity/JobConfirmation";
import JobDescription from "./jobOpportunity/JobDescription";
import ContingencyOffer from "./contingentOffer/ContingentOffer";
import BackgroundCheck from "./bgc/BackgroundCheck";
import FcraDisclosure from "../common/bgc/FcraDisclosure";
import ResumeApplication from "./resumeApplication/ResumeApplication";
import Nhe from "./nhe/Nhe";
import SelfIdentification from "./selfIdentification/SelfIdentification";
import AlreadyApplied from "./alreadyApplied/AlreadyApplied";
import ReviewSubmit from "./reviewSubmit/ReviewSubmit";
import ThankYou from "./thankYou/ThankYou";
import CounterMessageBanner from "../common/CounterMessageBanner";
import SessionTimeout from "./sessionTimeout/SessionTimeout";

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
        <CounterMessageBanner/>
        <Router>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={PRE_CONSENT}/>}/>
            <Route path={`/${PRE_CONSENT}`} exact>
              <PreConsentPage/>
            </Route>
            <Route path={`/${CONSENT}`} exact>
              <ConsentPage/>
            </Route>
            <Route path={`/${JOB_OPPORTUNITIES}`} exact>
              <JobOpportunity/>
            </Route>
            <Route path={`/${JOB_CONFIRMATION}`} exact>
              <JobConfirmation/>
            </Route>
            <Route path={`/${JOB_DESCRIPTION}`} exact>
              <JobDescription/>
            </Route>
            <Route path={`/${CONTINGENT_OFFER}`} exact>
              <ContingencyOffer/>
            </Route>
            <Route path={`/${BACKGROUND_CHECK}`} exact>
              <BackgroundCheck/>
            </Route>
            <Route path={`/${BACKGROUND_CHECK_FCRA}`} exact>
              <FcraDisclosure/>
            </Route>
            <Route path={`/${RESUME_APPLICATION}`} exact>
              <ResumeApplication/>
            </Route>
            <Route path={`/${NHE}`} exact>
              <Nhe/>
            </Route>
            <Route path={`/${SELF_IDENTIFICATION}`} exact>
              <SelfIdentification/>
            </Route>
            <Route path={`/${ALREADY_APPLIED}`} exact>
              <AlreadyApplied/>
            </Route>
            <Route path={`/${REVIEW_SUBMIT}`} exact>
              <ReviewSubmit/>
            </Route>
            <Route path={`/${THANK_YOU}`} exact>
              <ThankYou/>
            </Route>
            <Route path={`/${SESSION_TIMEOUT}`} exact>
              <SessionTimeout/>
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
