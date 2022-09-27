import React, { useEffect, useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import InnerHTML from 'dangerously-set-html-content';
import { connect } from "react-redux";
import { useLocation } from "react-router";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { translate as t } from "../../../utils/translator";
import { DetailedCheckbox } from "@amzn/stencil-react-components/form";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { checkAndBoundGetApplication, createUpdateApplicationRequest, getLocale } from "../../../utils/helper";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { Application } from "../../../utils/types/common";
import { CommonColors } from "../../../utils/colors";
import { BGC_VENDOR_TYPE, UPDATE_APPLICATION_API_TYPE } from "../../../utils/enums/common";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import {boundResetBannerMessage} from "../../../actions/UiActions/boundUi";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState,
  job: JobState,
}

export const CaliDisclosure = (props: MapStateToProps) => {
  const { application, schedule, job, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, scheduleId, jobId } = queryParams;
  const applicationData = application.results;
  const jobDetail = job.results;
  const candidateData = candidate.results.candidateData;
  const { scheduleDetail } = schedule.results;

  const hasBGCCaliforniaDisclosureAcknowledged = !!applicationData?.hasBGCCaliforniaDisclosureAcknowledged;

  const [acknowledged, setAcknowledged] = useState(hasBGCCaliforniaDisclosureAcknowledged);

  useEffect(() => {
    boundGetCandidateInfo();
  },[])

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleId]);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);


  useEffect(() => {
    checkAndBoundGetApplication(applicationId);

    setAcknowledged(hasBGCCaliforniaDisclosureAcknowledged);
  }, [applicationId, hasBGCCaliforniaDisclosureAcknowledged]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[])

  const handleGoToNext = () => {
    boundResetBannerMessage();

    if (applicationData) {
      const { CALI_DISCLOSURE } = UPDATE_APPLICATION_API_TYPE;
      const payload = {
        hasBGCCaliforniaDisclosureAcknowledged: acknowledged,
      }
      const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, CALI_DISCLOSURE, payload);
      boundUpdateApplicationDS(request, (applicationData: Application) => {
        onCompleteTaskHelper(applicationData);
      });
    }
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text fontSize="T500">
        {t("BB-cali-disclosure-page-title-text", "California Disclosure Regarding Investigative Consumer Reports")}
      </Text>

      <Text fontSize="T200" color={CommonColors.Neutral90}>
        {t("BB-cali-disclosure-page-in-connection-text", "In connection with my possible employment with Amazon.com, Inc. or its subsidiaries or affiliates (\"Amazon\"), Amazon may procure an investigative consumer report (\"Report\"), also known as a background check, about me from the following consumer reporting agency:")}
      </Text>

      {scheduleDetail?.bgcVendorName === BGC_VENDOR_TYPE.ACCURATE && (
        <>
          <Col color={CommonColors.Neutral90}>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-accurate-name-text", "Accurate Background, LLC (\"Accurate\")")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-accurate-address-line1-text", "7515 Irvine Center Dr.")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-accurate-address-line2-text", "Irvine, CA 92618")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-accurate-phone-text", "1-800-216-8024")}
            </Text>
            <Text fontSize="T200">
              <InnerHTML html={t("BB-cali-disclosure-page-vendor-accurate-url-text", "<a href='https://accuratebackground.com/' target='_blank' rel='noopener noreferrer'>www.accuratebackground.com</a>")}/>
            </Text>
          </Col>

          <Text>
            {t("BB-cali-disclosure-page-vendor-accurate-understand-text", "I understand that:")}
          </Text>

          <ul className="ul-list">
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-accurate-understand-list-item1-text", "To the extent a Report is requested from Accurate, information contained in such Report will be used solely to determine my eligibility for employment.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-accurate-understand-list-item2-text", "Information obtained by Accurate, and included in any Report, may be obtained through a variety of means, including inspection of lawfully available documents and information and/or direct or indirect contact and interviews with former employers, schools, financial institutions, landlords, public agencies, and others such as my neighbors, friends, and associates with whom I am acquainted and who may have such knowledge.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-accurate-understand-list-item3-text", "Investigation(s) to be conducted by Accurate, the results of which may be included in any Report provided to Amazon, may include various types of information about me regarding my character, general reputation, personal characteristics or mode of living, employment and work history, education, driving record, and criminal record, subject to any limitations imposed by applicable federal and state law.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-accurate-understand-list-item4-text", "Per California Civil Code § 1785 et seq. and § 1786 et seq., if any Report is requested by Amazon on me, I may view the file Accurate maintains on me during its regular office hours. I understand that I also may (1) obtain a copy of this file, upon submitting proper identification and paying the copying costs, by certified mail or by appearing at Accurate’s offices in person during its regular office hours after providing reasonable advance notice of my planned appearance; and (2) receive a summary of this file from Accurate over the telephone, at my expense, upon submitting proper identification and a written request to Accurate for telephone disclosure. I understand that Accurate has trained personnel available to explain its file to me, including any coded information, and, if I appear in person at Accurate’s offices, I may be accompanied by one other person so long as that person furnishes proper identification to Accurate.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                <InnerHTML html={t("BB-cali-disclosure-page-vendor-accurate-understand-list-item5-text", "Information about Accurate's privacy practices is available at <a href='https://www.accurate.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>https://www.accurate.com/privacy-policy/</a>.")} />
              </Text>
            </li>
          </ul>
        </>
      )}

      {scheduleDetail?.bgcVendorName === BGC_VENDOR_TYPE.FADV && (
        <>
          <Col color={CommonColors.Neutral90}>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-fadv-name-text", "First Advantage")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-fadv-address-line1-text", "1 Concourse Parkway NE, Suite 200.")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-fadv-address-line2-text", "Atlanta, GA 30328")}
            </Text>
            <Text fontSize="T200">
              {t("BB-cali-disclosure-page-vendor-fadv-phone-text", "1-800-845-6004")}
            </Text>
            <Text fontSize="T200">
              <InnerHTML html={t("BB-cali-disclosure-page-vendor-fadv-url-text", "<a href='https://fadv.com/' target='_blank' rel='noopener noreferrer'>www.fadv.com</a>")}/>
            </Text>
          </Col>

          <Text>
            {t("BB-cali-disclosure-page-vendor-fadv-understand-text", "I understand that:")}
          </Text>

          <ul className="ul-list">
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-fadv-understand-list-item1-text", "To the extent a Report is requested from First Advantage, information contained in such Report will be used solely to determine my eligibility for employment.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-fadv-understand-list-item2-text", "Information obtained by First Advantage, and included in any Report, may be obtained through a variety of means, including inspection of lawfully available documents and information and/or direct or indirect contact and interviews with former employers, schools, financial institutions, landlords, public agencies, and others such as my neighbors, friends, and associates with whom I am acquainted and who may have such knowledge.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-fadv-understand-list-item3-text", "Investigation(s) to be conducted by First Advantage, the results of which may be included in any Report provided to Amazon, may include various types of information about me regarding my character, general reputation, personal characteristics or mode of living, employment and work history, education, driving record, and criminal record, subject to any limitations imposed by applicable federal and state law.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                {t("BB-cali-disclosure-page-vendor-fadv-understand-list-item4-text", "Per California Civil Code § 1785 et seq. and § 1786 et seq., if any Report is requested by Amazon on me, I may view the file First Advantage maintains on me during its regular office hours. I understand that I also may (1) obtain a copy of this file, upon submitting proper identification and paying the copying costs, by certified mail or by appearing at First Advantage’s offices in person during its regular office hours after providing reasonable advance notice of my planned appearance; and (2) receive a summary of this file from First Advantage over the telephone, at my expense, upon submitting proper identification and a written request to First Advantage for telephone disclosure. I understand that First Advantage has trained personnel available to explain its file to me, including any coded information, and, if I appear in person at First Advantage’s offices, I may be accompanied by one other person so long as that person furnishes proper identification to First Advantage.")}
              </Text>
            </li>
            <li>
              <Text fontSize="T200">
                <InnerHTML html={t("BB-cali-disclosure-page-vendor-fadv-understand-list-item5-text", "Information about First Advantage's privacy practices is available at <a href='https://fadv.com/privacy-policy/' target='_blank' rel='noopener noreferrer'>https://fadv.com/privacy-policy/</a>.")} />
              </Text>
            </li>
          </ul>
        </>
      )}

      <DetailedCheckbox
        titleText={t("BB-cali-disclosure-page-certify-checkbox-text", "I certify that I have read this document and that I understand it, and that, pursuant to this CALIFORNIA DISCLOSURE REGARDING INVESTIGATIVE CONSUMER REPORTS, I authorize Amazon to obtain an investigative consumer report about me.")}
        checked={acknowledged}
        onChange={() => setAcknowledged(!acknowledged)}
      />

      {acknowledged && (
        <DebouncedButton
          variant={ButtonVariant.Primary}
          onClick={handleGoToNext}>{t("BB-cali-disclosure-page-next-button-text", "Next")}
        </DebouncedButton>
      )}
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CaliDisclosure);
