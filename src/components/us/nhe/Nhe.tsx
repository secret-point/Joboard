import React, { useEffect, useState } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { log } from "../../../helpers/log-helper";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { NheState } from "../../../reducers/nhe.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepList, localeToLanguageMap } from "../../../utils/constants/common";
import {
  checkAndBoundGetApplication,
  fetchNheTimeSlotDs,
  getLocale,
  handleConfirmNHESelection,
  nheGroupByLanguage
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { NHETimeSlot } from "../../../utils/types/common";
import NheTimeSlotCard from "../../common/nhe/NheTimeSlotCard";
import StepHeader from "../../common/StepHeader";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
  nhe: NheState;
}

interface JobOpportunityProps {

}

type JobOpportunityMergedProps = MapStateToProps & JobOpportunityProps;

export const Nhe = ( props: JobOpportunityMergedProps ) => {
  const { job, application, schedule, candidate, nhe } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const candidateData = candidate.results?.candidateData;
  const { nheData } = nhe.results;
  const nheGroups = nheGroupByLanguage(nheData);
  const nheGroupsCurrentLanguageCount = nheGroups.get("current")?.length || 0;
  const nheGroupsOtherLanguageCount = nheGroups.get("other")?.length || 0;
  const [selectedNhe, setSelectedNhe] = useState<NHETimeSlot>();

  useEffect(() => {
    applicationId && checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleDetail &&jobDetail && applicationData && nheData.length && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, scheduleDetail, nheData, pageName]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  useEffect(() => {
    // only use call NHE through requisition service, others call nhe service directly
    scheduleDetail && fetchNheTimeSlotDs(scheduleDetail, applicationId, false);
  }, [scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const handleConfirmSelection = () => {
    boundResetBannerMessage();

    if (applicationData && selectedNhe) {
      log("Handing handleConfirmNHESelection: ", {
        application: applicationData,
        selectedNhe: selectedNhe
      });
      handleConfirmNHESelection(applicationData, selectedNhe);
    }
  };

  const displayFirstName = candidateData?.preferredFirstName || candidateData?.firstName || "";
  const displayLastName = candidateData?.lastName || "";

  return (
    <Col id="jobOpportunityContainer">
      {
        // TODO need to align how each application workflow is related to app steps
      }
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={ApplicationStepList[2]} />
      <Col padding={{ top: "S400" }} gridGap={20}>
        <Col gridGap={10}>
          <H4>
            {t("BB-nhe-page-header-text", "Schedule pre-hire appointment")}
          </H4>
          <Text fontSize="T200">
            {t("BB-nhe-page-title-text", `You are almost there, ${displayFirstName} ${displayLastName}! We need you to come for a badge photo, complete work authorization and a drug test, if applicable.`, { firstname: displayFirstName, lastname: displayLastName })}
          </Text>
        </Col>
        <Col padding={{ top: "S400" }} gridGap={15}>
          {
            nheGroupsCurrentLanguageCount > 0 && nheGroupsOtherLanguageCount > 0 && (
              <H4 className="nheGroupingHeader">
                {`${t(`BB-nhe-time-slots-available-in-language-${nheGroupsCurrentLanguageCount === 1 ? "singular" : "plural"}`, `${nheGroupsCurrentLanguageCount} time slot${nheGroupsCurrentLanguageCount === 1 ? "" : "s"} available in ${t(...localeToLanguageMap[getLocale()])}`, { numberOfAppointments: nheGroupsCurrentLanguageCount, currentLanguage: t(...localeToLanguageMap[getLocale()]) })}`}
              </H4>
            )
          }
          {
            nheGroups.get("current")?.map(nheItem => (
              <NheTimeSlotCard
                nheTimeSlot={nheItem} key={nheItem.timeSlotId}
                handleChange={(nheSlotTime: NHETimeSlot) => setSelectedNhe(nheSlotTime)}
              />
            ))
          }
          {
            nheGroupsCurrentLanguageCount > 0 && nheGroupsOtherLanguageCount > 0 && (
              <H4 className="nheGroupingHeader">
                {`${t(`BB-nhe-time-slots-in-other-languages-${nheGroupsOtherLanguageCount === 1 ? "singular" : "plural"}`, `${nheGroupsOtherLanguageCount} time slot${nheGroupsOtherLanguageCount === 1 ? "" : "s"} available in other languages`, { numberOfAppointments: nheGroupsOtherLanguageCount })}`}
              </H4>
            )
          }
          {
            nheGroups.get("other")?.map(nheItem => (
              <NheTimeSlotCard
                nheTimeSlot={nheItem} key={nheItem.timeSlotId}
                handleChange={(nheSlotTime: NHETimeSlot) => setSelectedNhe(nheSlotTime)}
              />
            ))
          }
        </Col>
        { selectedNhe && (
          <Col className="nhe-sticky-button">
            <DebouncedButton
              variant={ButtonVariant.Primary}
              onClick={() => {
                handleConfirmSelection();
              }}
              debounceTime={1000}
            >
              {t("BB-nhe-page-confirm-selection-button-text", "Confirm Selection")}
            </DebouncedButton>
          </Col>
        ) }
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(Nhe);
