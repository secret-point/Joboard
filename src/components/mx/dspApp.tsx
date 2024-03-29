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
import FcraDisclosure from "../common/bgc/FcraDisclosure";
import CounterMessageBanner from "../common/CounterMessageBanner";
import { PAGE_ROUTES } from "../pageRoutes";
import AlreadyApplied from "../us/alreadyApplied/AlreadyApplied";
import AmazonRejects from "../us/amazonRejects/AmazonRejects";
import AmazonWithdraws from "../us/amazonWithdraws/AmazonWithdraws";
import ApplicationIdNull from "../us/applicationIdNull/ApplicationIdNull";
import AssessmentConsent from "../us/assessment/AssessmentConsent";
import AssessmentFinished from "../us/assessment/AssessmentFinished";
import AssessmentNotEligible from "../us/assessment/AssessmentNotEligible";
import CaliDisclosure from "../us/caliDisclosure/CaliDisclosure";
import CandidateWithdraws from "../us/candidateWithdraws/CandidateWithdraws";
import CanNotOfferJob from "../us/canNotOfferJob/CanNotOfferJob";
import JobConfirmation from "../common/jobOpportunity/JobConfirmation";
import JobDescription from "../us/jobOpportunity/JobDescription";
import JobOpportunity from "../us/jobOpportunity/JobOpportunity";
import Nhe from "../us/nhe/Nhe";
import NoAvailableShift from "../us/noAvailableShift/NoAvailableShift";
import NoAvailableTimeSlots from "../us/noAvailableTimeSlots/NoAvailableTimeSlots";
import RehireEligibilityStatus from "../us/rehireEligibilityStatus/RehireEligibilityStatus";
import ResumeApplication from "../us/resumeApplication/ResumeApplication";
import SessionTimeout from "../us/sessionTimeout/SessionTimeout";
import SupplementarySuccess from "../us/supplementarySuccess/SupplementarySuccess";
import ThankYou from "../us/thankYou/ThankYou";
import WorkflowFailed from "../us/workflowFailed/WorkflowFailed";
import Wotc from "../us/wotc/Wotc";
import WotcComplete from "../us/wotc/WotcComplete";
import DuplicateWindowError from "../common/DuplicateWindowError";

// Pages that have been migrated to MX
import BackgroundCheck from "./bgc/BackgroundCheck";
import ConsentPage from "./consent/Consent";
import ContingencyOffer from "./contingentOffer/ContingentOffer";
import ReviewSubmit from "./reviewSubmit/ReviewSubmit";
import SelfIdentification from "./selfIdentification/SelfIdentification";
import { getQueryFromSearchAndHash } from "../../utils/helper";
import TimeoutPage from "../us/timeout/Timeout";
import AccessDenied from "../us/AccessDenied/AccessDenied";

interface MapStateToProps {
  appConfig: AppConfig;
  ui: uiState;
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
  REVIEW_SUBMIT,
  CONTINGENT_OFFER,
  JOB_CONFIRMATION,
  JOB_DESCRIPTION,
  JOB_OPPORTUNITIES,
  NHE,
  RESUME_APPLICATION,
  SELF_IDENTIFICATION,
  SESSION_TIMEOUT,
  THANK_YOU,
  WOTC,
  WOTC_COMPLETE,
  CALI_DISCLOSURE,
  AMAZON_REJECTS,
  WORKFLOW_FAILED,
  AMAZON_WITHDRAWS,
  NO_AVAILABLE_TIME_SLOTS,
  CAN_NOT_OFFER_JOB,
  SUPPLEMENTARY_SUCCESS,
  REHIRE_ELIGIBILITY_STATUS,
  NO_AVAILABLE_SHIFT,
  APPLICATIONID_NULL,
  TIMEOUT,
  ACCESS_DENIED
} = PAGE_ROUTES;

export const DragonStoneAppMX = ( props: MapStateToProps ) => {
  const { ui } = props;
  const { bannerMessage } = ui;

  return (
    <Col padding="S300" minHeight="40vh">
      <AppLoader />
      <DuplicateWindowError />
      <CounterMessageBanner />
      {!!bannerMessage && <BannerMessage bannerMessage={bannerMessage} />}
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={CONSENT} />} />
          <Route exact path={`/${PRE_CONSENT}`} render={() => (
            <Redirect to={{
              pathname: CONSENT,
              search: getQueryFromSearchAndHash()
            }}
            />
          )}
          />
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
          <Route path={`/${BACKGROUND_CHECK}`} exact>
            <BackgroundCheck />
          </Route>
          <Route path={`/${BACKGROUND_CHECK_FCRA}`} exact>
            <FcraDisclosure />
          </Route>
          <Route path={`/${RESUME_APPLICATION}`} exact>
            <ResumeApplication />
          </Route>
          <Route path={`/${NHE}`} exact>
            <Nhe />
          </Route>
          <Route path={`/${SELF_IDENTIFICATION}`} exact>
            <SelfIdentification />
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
          <Route path={`/${WOTC}`} exact>
            <Wotc />
          </Route>
          <Route path={`/${WOTC_COMPLETE}`} exact>
            <WotcComplete />
          </Route>
          <Route path={`/${SESSION_TIMEOUT}`} exact>
            <SessionTimeout />
          </Route>
          <Route path={`/${ASSESSMENT_CONSENT}`} exact>
            <AssessmentConsent />
          </Route>
          <Route path={`/${ASSESSMENT_NOT_ELIGIBLE}`} exact>
            <AssessmentNotEligible />
          </Route>
          <Route path={`/${ASSESSMENT_FINISHED}`} exact>
            <AssessmentFinished />
          </Route>
          <Route path={`/${CANDIDATE_WITHDRAWS}`} exact>
            <CandidateWithdraws />
          </Route>
          <Route path={`/${CALI_DISCLOSURE}`} exact>
            <CaliDisclosure />
          </Route>
          <Route path={`/${AMAZON_REJECTS}`} exact>
            <AmazonRejects />
          </Route>
          <Route path={`/${WORKFLOW_FAILED}`} exact>
            <WorkflowFailed />
          </Route>
          <Route path={`/${AMAZON_WITHDRAWS}`} exact>
            <AmazonWithdraws />
          </Route>
          <Route path={`/${NO_AVAILABLE_TIME_SLOTS}`} exact>
            <NoAvailableTimeSlots />
          </Route>
          <Route path={`/${CAN_NOT_OFFER_JOB}`} exact>
            <CanNotOfferJob />
          </Route>
          <Route path={`/${SUPPLEMENTARY_SUCCESS}`} exact>
            <SupplementarySuccess />
          </Route>
          <Route path={`/${REHIRE_ELIGIBILITY_STATUS}`} exact>
            <RehireEligibilityStatus />
          </Route>
          <Route path={`/${NO_AVAILABLE_SHIFT}`} exact>
            <NoAvailableShift />
          </Route>
          <Route path={`/${APPLICATIONID_NULL}`} exact>
            <ApplicationIdNull />
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

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(DragonStoneAppMX);
