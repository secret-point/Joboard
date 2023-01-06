import React, { useEffect } from "react";
import queryString from "query-string";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import IFrame from "../../common/IFrame";
import { useLocation } from "react-router-dom";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { connect } from "react-redux";
import { Locale } from "../../../utils/types/common";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { translate as t } from "../../../utils/translator";
import { JobState } from "../../../reducers/job.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";

interface MapStateToProps {
  application: ApplicationState;
  job: JobState;
  candidate: CandidateState;
  schedule: ScheduleState;
}

const LocaleToWotcLangMapping: Record<Locale, string> = {
  [Locale.enGB]: "en",
  [Locale.enUS]: "en",
  [Locale.esUS]: "es",
  [Locale.esMX]: "es",
};

export const Wotc = (props: MapStateToProps) => {
  const { application, candidate, schedule, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const jobDetail = job.results;
  const candidateData = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const wotcLocalizedUrl = (wotcUrl: string): string => {
    if (!wotcUrl) {
      return "";
    }
    return `${wotcUrl}&lang=${LocaleToWotcLangMapping[getLocale()]}`;
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text fontSize="T500">
        {t("BB-WOTC-page-title-text", "Work opportunity tax credit questionnaire")}
      </Text>

      <Text>
        {t("BB-WOTC-page-description-text", "Amazon IAT testing participates in federal and or state tax credit programs. The information you give will be used to determine the company's eligibility for these programs and will in no way negatively impact any hiring, retention or promotion decisions.")}
      </Text>

      {applicationData?.wotcScreening?.wotcUrl && (
        <IFrame src={wotcLocalizedUrl(applicationData?.wotcScreening?.wotcUrl)} />
      )}
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Wotc);
