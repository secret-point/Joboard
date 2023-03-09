import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../helpers/utils";
import { ApplicationState } from "../../reducers/application.reducer";
import { FullBgcState } from "../../reducers/fullBgc.reducer";
import { CandidateState } from "../../reducers/candidate.reducer";
import { JobState } from "../../reducers/job.reducer";
import { ScheduleState } from "../../reducers/schedule.reducer";
import {
  FULL_BGC_STEPS
} from "../../utils/enums/common";
import {
  fullBgcShouldDisplayContinue, getLocale
} from "../../utils/helper";
import { translate as t } from "../../utils/translator";
import { FullBgcStepConfig } from "../../utils/types/common";
import AddressHistory from "./common/AddressHistory";
import BackgroundCheckConsent from "./common/BackgroundCheckConsent";
import BackgroundInformation from "./common/BackgroundInformation";
import BirthHistory from "./common/BirthHistory";
import Documentation from "./common/Documentation";
import InfoStepCard from "../common/InfoStepCard";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
  candidate: CandidateState;
}

type BackgroundCheckMergedProps = MapStateToProps;

export const BackgroundCheck = ( props: BackgroundCheckMergedProps ) => {
  const { job, application, schedule, fullBgc, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    scheduleId && scheduleId !== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const handleContinue = () => {
    if (applicationData && scheduleDetail) {
      // TODO: API integration
    }
  };

  return (
    <Col className="bgcContainer" gridGap={15}>
      <Col gridGap={15}>
        <H4>Provide background check information</H4>
        <Text fontSize="T200">
          Please provide authorization and information needed for a background check.
        </Text>
      </Col>

      <InfoStepCard
        title="Background check consent"
        expandedContent={<BackgroundCheckConsent />}
        stepName={FULL_BGC_STEPS.CONSENT}
        infoCardStepStatus={stepConfig[FULL_BGC_STEPS.CONSENT]}
        stepIndex={1}
        maxStepNumber={5}
      />

      <InfoStepCard
        title="Background information"
        expandedContent={<BackgroundInformation />}
        stepName={FULL_BGC_STEPS.BACKGROUND_INFO}
        infoCardStepStatus={stepConfig[FULL_BGC_STEPS.BACKGROUND_INFO]}
        stepIndex={2}
        maxStepNumber={5}
      />

      <InfoStepCard
        title="Address history"
        expandedContent={<AddressHistory />}
        stepName={FULL_BGC_STEPS.ADDRESS_HISTORY}
        infoCardStepStatus={stepConfig[FULL_BGC_STEPS.ADDRESS_HISTORY]}
        stepIndex={3}
        maxStepNumber={5}
      />

      <InfoStepCard
        title="Birth history"
        expandedContent={<BirthHistory />}
        stepName={FULL_BGC_STEPS.BIRTH_HISTORY}
        infoCardStepStatus={stepConfig[FULL_BGC_STEPS.BIRTH_HISTORY]}
        stepIndex={4}
        maxStepNumber={5}
      />

      <InfoStepCard
        title="Documentation"
        expandedContent={<Documentation />}
        stepName={FULL_BGC_STEPS.DOCUMENTATION}
        infoCardStepStatus={stepConfig[FULL_BGC_STEPS.DOCUMENTATION]}
        stepIndex={5}
        maxStepNumber={5}
      />

      <Col padding={{ top: "S300" }}>
        {
          fullBgcShouldDisplayContinue(stepConfig) && (
            <Button
              variant={ButtonVariant.Primary}
              onClick={handleContinue}
            >
              {t("BB-BGC-page-continue-button", "Continue")}
            </Button>
          )}
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(BackgroundCheck);
