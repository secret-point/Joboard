import React from "react";
import { BackToTopButton } from "@amzn/stencil-react-components/back-to-top-button";
import { Col } from "@amzn/stencil-react-components/layout";
import { connect } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AppConfig } from "../../@types/IPayload";
import { uiState } from "../../reducers/ui.reducer";
import { PRE_CONSENT } from "../../utils/constants/common";
import AppLoader from "../common/AppLoader";
import { BannerMessage } from "../common/BannerMessage";
import CounterMessageBanner from "../common/CounterMessageBanner";
import { PAGE_ROUTES } from "../pageRoutes";
import AlreadyApplied from "../us/alreadyApplied/AlreadyApplied";
import ApplicationIdNull from "../us/applicationIdNull/ApplicationIdNull";
import AssessmentConsent from "./assessment/AssessmentConsent";
import AssessmentFinished from "../us/assessment/AssessmentFinished";
import JobConfirmation from "../us/jobOpportunity/JobConfirmation";
import JobDescription from "../us/jobOpportunity/JobDescription";
import NoAvailableShift from "../uk/noAvailableShift/NoAvailableShift";
import NoAvailableTimeSlots from "../us/noAvailableTimeSlots/NoAvailableTimeSlots";
import ResumeApplication from "../us/resumeApplication/ResumeApplication";
import SessionTimeout from "../us/sessionTimeout/SessionTimeout";
import WorkflowFailed from "../us/workflowFailed/WorkflowFailed";
import ShiftPreferences from "../common/jobOpportunity/ShiftPreferences";
import NhePreferences from "../common/nhe/NhePreferences";

// Pages that have been migrated to UK
import AdditionalInformation from "./bgc/BackgroundCheck";
import ConsentPage from "./consent/Consent";
import ContingencyOffer from "./contingentOffer/ContingentOffer";
import ReviewSubmit from "./reviewSubmit/ReviewSubmit";
import PreConsent from "../us/preConsent/PreConsent";
import Assessment from "./assessment/Assessment";
import JobOpportunity from "./jobOpportunity/JobOpportunity";
import Nhe from "./nhe/Nhe";
import ThankYou from "./thankYou/ThankYou";
import GenericError from "./genericError/GenericError";

interface MapStateToProps {
  appConfig: AppConfig;
  ui: uiState;
}

const {
  ALREADY_APPLIED,
  ASSESSMENT_CONSENT,
  ASSESSMENT_FINISHED,
  ASSESSMENT_NOT_ELIGIBLE,
  ASSESSMENT,
  CANDIDATE_WITHDRAWS,
  CONSENT,
  REVIEW_SUBMIT,
  CONTINGENT_OFFER,
  JOB_CONFIRMATION,
  JOB_DESCRIPTION,
  JOB_OPPORTUNITIES,
  NHE,
  RESUME_APPLICATION,
  SESSION_TIMEOUT,
  THANK_YOU,
  AMAZON_REJECTS,
  WORKFLOW_FAILED,
  AMAZON_WITHDRAWS,
  NO_AVAILABLE_TIME_SLOTS,
  NO_AVAILABLE_SHIFT,
  APPLICATIONID_NULL,
  SHIFT_PREFERENCE,
  ADDITIONAL_INFORMATION,
  NHE_PREFERENCES,
  REHIRE_NOT_ELIGIBLE
} = PAGE_ROUTES;

export const DragonStoneAppUK = (props: MapStateToProps) => {
  const { ui } = props;
  const { bannerMessage } = ui;

  return (
    <Col padding="S300" minHeight="40vh">
      <AppLoader />
      <CounterMessageBanner />
      {!!bannerMessage && <BannerMessage bannerMessage={bannerMessage} />}
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={CONSENT} />} />
          <Route exact path={`/${PRE_CONSENT}`}>
            <PreConsent />
          </Route>
          <Route path={`/${CONSENT}`} exact>
            <ConsentPage />
          </Route>
          <Route path={`/${JOB_OPPORTUNITIES}`} exact>
            <JobOpportunity />
          </Route>
          <Route path={`/${JOB_CONFIRMATION}`} exact>
            <JobConfirmation />
          </Route>
          <Route path={`/${JOB_DESCRIPTION}`} exact>
            <JobDescription />
          </Route>
          <Route path={`/${CONTINGENT_OFFER}`} exact>
            <ContingencyOffer />
          </Route>
          <Route path={`/${ADDITIONAL_INFORMATION}`} exact>
            <AdditionalInformation />
          </Route>
          <Route path={`/${RESUME_APPLICATION}`} exact>
            <ResumeApplication />
          </Route>
          <Route path={`/${NHE}`} exact>
            <Nhe />
          </Route>
          <Route path={`/${ALREADY_APPLIED}`} exact>
            <AlreadyApplied />
          </Route>
          <Route path={`/${REVIEW_SUBMIT}`} exact>
            <ReviewSubmit />
          </Route>
          <Route path={`/${THANK_YOU}`} exact>
            <ThankYou />
          </Route>
          <Route path={`/${SESSION_TIMEOUT}`} exact>
            <SessionTimeout />
          </Route>
          <Route path={`/${ASSESSMENT_CONSENT}`} exact>
            <AssessmentConsent />
          </Route>
          <Route path={`/${ASSESSMENT}`} exact>
            <Assessment />
          </Route>
          <Route path={`/${ASSESSMENT_NOT_ELIGIBLE}`} exact>
            <GenericError />
          </Route>
          <Route path={`/${ASSESSMENT_FINISHED}`} exact>
            <AssessmentFinished />
          </Route>
          <Route path={`/${CANDIDATE_WITHDRAWS}`} exact>
            <GenericError />
          </Route>
          <Route path={`/${AMAZON_REJECTS}`} exact>
            <GenericError />
          </Route>
          <Route path={`/${WORKFLOW_FAILED}`} exact>
            <WorkflowFailed />
          </Route>
          <Route path={`/${AMAZON_WITHDRAWS}`} exact>
            <GenericError />
          </Route>
          <Route path={`/${NO_AVAILABLE_TIME_SLOTS}`} exact>
            <NoAvailableTimeSlots />
          </Route>
          <Route path={`/${REHIRE_NOT_ELIGIBLE}`} exact>
            <GenericError />
          </Route>
          <Route path={`/${NO_AVAILABLE_SHIFT}`} exact>
            <NoAvailableShift />
          </Route>
          <Route path={`/${APPLICATIONID_NULL}`} exact>
            <ApplicationIdNull />
          </Route>
          <Route path={`/${SHIFT_PREFERENCE}`} exact>
            <ShiftPreferences />
          </Route>
          <Route path={`/${NHE_PREFERENCES}`} exact>
            <NhePreferences />
          </Route>
          <Route path={`/${TIMEOUT}`} exact>
            <TimeoutPage />
          </Route>
          <Route path={`/${ACCESS_DENIED}`} exact>
            <AccessDenied />
          </Route>
        </Switch>
      </Router>
      <BackToTopButton />
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppUK);
