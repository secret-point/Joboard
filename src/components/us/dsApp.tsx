import React from "react";
import { connect } from "react-redux";
import { BackToTopButton } from '@amzn/stencil-react-components/back-to-top-button';
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PreConsentPage from "./preConsent/PreConsent";
import ConsentPage from "./consent/Consent";
import { AppConfig } from "../../@types/IPayload";
import { PAGE_ROUTES } from "../pageRoutes";
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
import WOTCComponent from "./wotc/WOTC";
import AssessmentConsent from "./assessment/AssessmentConsent";
import AssessmentNotEligible from "./assessment/AssementNotEligible";
import AssessmentFinished from "./assessment/AssessmentFinished";
import CandidateWithdraws from "../common/CandidateWithdraws";
import { BannerMessage } from "../common/BannerMessage";
import { uiState } from "../../reducers/ui.reducer";
import CaliDisclosure from "./caliDisclosure/CaliDisclosure";
import AmazonRejects from "./amazonRejects/AmazonRejects";

interface MapStateToProps {
  appConfig: AppConfig,
  ui: uiState
}

const {
  ALREADY_APPLIED,
  ASSESSMENT_CONSENT,
  ASSESSMENT_FINISHED,
  ASSESSMENT_NOT_ELIGIBLE,
  BACKGROUND_CHECK,
  BACKGROUND_CHECK_FCRA,
  CANDIDATE_WITHDRAWS,
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
  THANK_YOU,
  WOTC,
  CALI_DISCLOSURE,
  AMAZON_REJECTS
} = PAGE_ROUTES;

const DragonStoneAppUS = ( props: MapStateToProps ) => {
  const { appConfig, ui } = props;
  const { bannerMessage } = ui;

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
        {!!bannerMessage && <BannerMessage bannerMessage={bannerMessage}/>}
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
            <Route path={`/${WOTC}`} exact>
              <WOTCComponent/>
            </Route>
            <Route path={`/${SESSION_TIMEOUT}`} exact>
              <SessionTimeout/>
            </Route>
            <Route path={`/${ASSESSMENT_CONSENT}`} exact>
              <AssessmentConsent/>
            </Route>
            <Route path={`/${ASSESSMENT_NOT_ELIGIBLE}`} exact>
              <AssessmentNotEligible/>
            </Route>
            <Route path={`/${ASSESSMENT_FINISHED}`} exact>
              <AssessmentFinished/>
            </Route>
            <Route path={`/${CANDIDATE_WITHDRAWS}`} exact>
              <CandidateWithdraws/>
            </Route>
            <Route path={`/${CALI_DISCLOSURE}`} exact>
              <CaliDisclosure/>
            </Route>
            <Route path={`/${AMAZON_REJECTS}`} exact>
              <AmazonRejects/>
            </Route>
          </Switch>
        </Router>
        <BackToTopButton />
      </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUS);
