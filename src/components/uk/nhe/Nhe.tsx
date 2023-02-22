import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Label, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
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
import { ApplicationStepList } from "../../../utils/constants/common";
import {
  checkAndBoundGetApplication,
  getDefaultUkNheApptTimeFromMap,
  getLocale,
  getUKNHEAppointmentTimeMap,
  getUKNHEAppointmentTitleList,
  getUKNHEMaxSlotLength,
  handleConfirmUKNHESelection,
  initiateScheduleDetailOnPageLoad
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { GetNheTimeSlotRequestThroughNheDS, NHETimeSlotUK, ScheduleUK } from "../../../utils/types/common";
import StepHeader from "../../common/StepHeader";
import DebouncedButton from "../../common/DebouncedButton";
import { Select } from "@amzn/stencil-react-components/form";
import { Popover } from "@amzn/stencil-react-components/popover";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetNheTimeSlotsThroughNheDs } from "../../../actions/NheActions/boundNheAction";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import moment from "moment";
import NhePreferenceCard from "../../common/nhe/NhePreferenceCard";
import { NHE_SLOTS_TO_DISPLAY_NHE_PREFERENCES } from "../../../utils/enums/common";
import { PAGE_ROUTES } from "../../pageRoutes";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
  nhe: NheState;
}

export const Nhe = ( props: MapStateToProps ) => {
  const { job, application, schedule, candidate, nhe } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const scheduleDetail = schedule.results.scheduleDetail as ScheduleUK;
  const candidateData = candidate.results?.candidateData;
  const nheData = nhe.results.nheData as NHETimeSlotUK[];
  const showNhePreferenceCard = nheData.length <= NHE_SLOTS_TO_DISPLAY_NHE_PREFERENCES;
  const appointmentDateList = getUKNHEAppointmentTitleList(nheData);
  const appointmentTimeMap = getUKNHEAppointmentTimeMap(nheData);

  const [selectedNheDate, setSelectedNheDate] = useState<string>("");
  const [selectedNheTime, setSelectedNheTime] = useState<string>("");
  const maxNheSlotLength = nheData.length > 0 ? getUKNHEMaxSlotLength(nheData, scheduleId) : 0;

  const displayFirstName = candidateData?.preferredFirstName || candidateData?.firstName || "";
  const displayLastName = candidateData?.lastName || "";

  useEffect(() => {
    // Refresh and add scheduleId in the url from the jobSelected if it doesn't exist from the query param
    if (!scheduleId && applicationData) {
      initiateScheduleDetailOnPageLoad(applicationData, PAGE_ROUTES.NHE);
    }
  }, [applicationData]);

  useEffect(() => {
    const defaultAptTime = getDefaultUkNheApptTimeFromMap(appointmentTimeMap, appointmentDateList[0]);
    setSelectedNheDate(appointmentDateList[0]);
    setSelectedNheTime(defaultAptTime[0]);
  }, [nheData]);

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
    if (scheduleDetail) {
      const request: GetNheTimeSlotRequestThroughNheDS = {
        siteId: scheduleDetail?.siteId,
        startDate: new Date().toISOString().split("T")[0],
        locale: getLocale(),
        endDate: moment(scheduleDetail?.hireStartDate, "YYYY-MM-DD")
          .subtract(scheduleDetail?.contingencyTat, "days")
          .format("YYYY-MM-DD")
      };

      // We don't redirect to no Nhe found when there is no NHE
      boundGetNheTimeSlotsThroughNheDs(request, false);
    }
  }, [scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const handleConfirmSelection = () => {
    boundResetBannerMessage();
    const selectedNhe: NHETimeSlotUK = nheData.filter(nhe => nhe.title === selectedNheDate && nhe.startTime === selectedNheTime)[0];

    if (applicationData && selectedNhe) {
      log("Handing handleConfirmNHESelection: ", {
        application: applicationData,
        selectedNhe: selectedNhe
      });
      handleConfirmUKNHESelection(applicationData, selectedNhe as NHETimeSlotUK);
    }
  };

  return (
    <Col className="pageContainerWithMarginTop" margin={{ top: "S300" }}>
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={ApplicationStepList[2]} />
      <Col padding={{ top: "S400" }} gridGap={20}>
        <Col gridGap={10}>
          <H4>
            {t("BB-nhe-page-header-text", "Schedule pre-hire appointment")}
          </H4>
          <Text fontSize="T200">
            {t("BB-kondo-nhe-page-title-text", `You are almost there, ${displayFirstName} ${displayLastName}! Select your preferred date and time to schedule a pre-hire appointment where we check your work authorisation documents.`)}
          </Text>
        </Col>
        <Row>
          <Popover
            triggerText={t("BB-Kondo-pre-hire-appointment-description-popover-title", "Pre-hire appointment is a virtual event")}
            shouldCloseOnFocusLeave={false}
          >
            {({ close }) => (
              <Col gridGap="S500" alignItems="flex-start">
                <Text>
                  {t("BB-Kondo-pre-hire-appointment-description-popover-content", "Pre - hire appointment will be held over video conference. Once you choose a date and time to connect with us, we will email you appointment details and link. If you have any questions or technical issues, please contact us.")}
                </Text>
                <Button onClick={close} variant={ButtonVariant.Tertiary}>
                  {t("BB-Kondo-pre-hire-appointment-description-popover-close-button", "Close")}
                </Button>
              </Col>
            )}
          </Popover>
        </Row>
        {nheData?.length > 0 && (
          <Col>
            <Col gridGap="S400">
              <Col gridGap={12}>
                <Label htmlFor="nheDateSelect" id="nheDateLabel">
                  {t("BB-Kondo-nhe-appointment-input-date-label", "Choose appointment date")} *
                </Label>
                <Select
                  id="nheDateSelect"
                  onChange={(option) => {
                    setSelectedNheDate(option);
                    setSelectedNheTime(getDefaultUkNheApptTimeFromMap(appointmentTimeMap, option)[0]);
                  }}
                  options={appointmentDateList}
                  defaultValue={appointmentDateList[0]}
                  value={selectedNheDate}
                />
              </Col>

              <Col gridGap={12}>
                <Label htmlFor="nheTimeSelect" id="nheTimeLabel">
                  {t("BB-Kondo-nhe-appointment-time-input-label", "Choose appointment time")} *
                </Label>
                <Select
                  id="nheTimeSelect"
                  onChange={(option) => {
                    setSelectedNheTime(option);
                  }}
                  options={appointmentTimeMap.get(selectedNheDate) || []}
                  defaultValue={getDefaultUkNheApptTimeFromMap(appointmentTimeMap, selectedNheDate)[0]}
                  value={selectedNheTime}
                />
              </Col>

              {
                !!maxNheSlotLength && (
                  <Text fontSize="T100">
                    {t("BB-kondo-nhe-nhe-slot-duration-notice", `All appointments slots are displayed in UK local time. Each appointment is up to ${maxNheSlotLength} minutes long.`, { maxNheSlotLength })}
                  </Text>
                )
              }

            </Col>
            <Col className="nhe-sticky-button" padding={{ top: "S300" }}>
              <DebouncedButton
                variant={ButtonVariant.Primary}
                onClick={() => {
                  handleConfirmSelection();
                }}
                debounceTime={1000}
              >
                {t("BB-kondo-nhe-page-confirm-selection-button-text", "Confirm Selection")}
              </DebouncedButton>
            </Col>
          </Col>
        )}
        {
          showNhePreferenceCard && <NhePreferenceCard />
        }
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(Nhe);
