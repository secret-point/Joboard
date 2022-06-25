import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { getLocale, onAssessmentStart } from "../../../utils/helper";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { JobState } from "../../../reducers/job.reducer";
import { translate as t } from "../../../utils/translator";
import InnerHTML from 'dangerously-set-html-content';

interface MapStateToProps {
  application: ApplicationState,
  candidate: CandidateState,
  job: JobState,
}

interface AssessmentConsentProps {

}

type AssessmentConsentMergedProps = MapStateToProps & AssessmentConsentProps;

export const AssessmentConsent = (props: AssessmentConsentMergedProps) => {

  const { application, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const applicationData = application.results;
  const jobDetail = job.results;

  useEffect(() => {
    boundGetCandidateInfo();
  },[])

  useEffect(() => {
    applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
  }, [applicationId]);

  useEffect(() => {
    jobDetail && applicationData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData]);

  const diversityAndDisabilityText = t("BB-assessment-consent-diversity-and-disability-accommodation-notice-text", "At Amazon, we celebrate the diversity of our workforce and the diverse ways we work. If you have a disability and require an accommodation during the hiring process, including the assessment, please visit <a href='https://www.amazon.jobs/en/disability/us' target='_blank' rel='noopener noreferrer'> Amazon Accommodation.</a>");
  const assessmentPaceAndSectionHeadingText = t("BB-assessment-consent-accommodation-assessment-pace-and-sections-info-list-header-text", "<b>No part of the assessment is timed</b> – you can work at your own pace. All sections of this assessment:");
  return (
    <Col gridGap={15}>
      <Col gridGap={10}>
        <H4>
          {t("BB-assessment-consent-assessment-heading-text", "Assessment")}
        </H4>
        <Text fontSize="T200">
          {t("BB-assessment-consent-excited-in-candidate-interest-text", "We are so excited in your interest to join Amazon!")}
        </Text>
        <ul>
          <li>
            <Text fontSize="T200">
              {t("BB-assessment-consent-purpose-of-assessment-text", "This assessment will help you understand the associate role and help us get to know you.")}
            </Text>
          </li>
        </ul>
      </Col>
      <Col gridGap={10}>
        <H4>
          {t("BB-assessment-consent-accommodation-heading-text", "Accommodations")}
        </H4>
        <Text fontSize="T200">
          <InnerHTML className="diversityAndDisabilityText" html={diversityAndDisabilityText}/>
        </Text>
        <Text fontSize="T200">
          <InnerHTML html={assessmentPaceAndSectionHeadingText} className="assessmentPaceAndSectionHeadingText"/>
        </Text>
        <ul>
          <li>
            <Text fontSize="T200">
              {t("BB-assessment-consent-accommodation-assessment-pace-and-sections-info-item1-text", "Are optimized for the following screen readers: VoiceOver (Mac) and NVDA (Windows) on Firefox, Chrome, and Edge (Windows).")}
            </Text>
          </li>
          <li>
            <Text fontSize="T200">
              {t("BB-assessment-consent-accommodation-assessment-pace-and-sections-info-item2-text", "Can be accessed via mouse or keyboard.")}
            </Text>
          </li>
        </ul>
        <Col
          padding={{ top: "S300" }}
        >
          <Button
            variant={ButtonVariant.Primary}
            onClick={() => applicationData && onAssessmentStart(applicationData)}
            disabled={!applicationData?.assessment?.assessmentUrl}
          >
            {t("BB-assessment-consent-begin-assessment-button-text", "Begin Assessment")}
          </Button>
        </Col>
      </Col>

    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(AssessmentConsent);