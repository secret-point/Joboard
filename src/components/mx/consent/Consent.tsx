import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  boundCreateApplicationAndSkipScheduleDS,
  boundCreateApplicationDS
} from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { uiState } from "../../../reducers/ui.reducer";
import { CreateApplicationAndSkipScheduleRequestDS, CreateApplicationRequestDS } from "../../../utils/apiTypes";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Application } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import { PAGE_ROUTES } from "../../pageRoutes";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  ui: uiState;
}

interface RenderFlyoutFunctionParams {
  close: () => void;
}

export const Consent = (props: MapStateToProps) => {
  const { job, ui, schedule } = props;
  const { isLoading } = ui;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { scheduleId } = queryParams;
  const { scheduleDetail } = schedule.results;
  const pageName = getPageNameFromPath(pathname);
  const qualificationCriteria = jobDetail?.qualificationCriteria || [];
  const { JOB_OPPORTUNITIES } = PAGE_ROUTES;

  const isCreateButtonDisabled = scheduleId
    ? !(jobDetail && scheduleDetail && !isLoading)
    : !(jobDetail && !isLoading);

  // Load candidate so that we can log candidateId if application already exists error happens
  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    if (jobDetail && ((scheduleId && scheduleDetail) || (!scheduleId))) {
      addMetricForPageLoad(pageName);
    }

  }, [jobDetail, scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-ConsentPage-flyout-user-data-policy-title-text", "User Data Policy")}
      onCloseButtonClick={close}
    >
      <Col gridGap={15}>
        <Text>
          {t("BB-ConsentPage-flyout-mx-user-data-policy-text", "I am aware that all information gathered may be transferred pursuant to the Federal Law on the Protection of Personal Data in the Possession of Private Parties and its regulations, guidelines and other applicable provisions on data privacy, as well as in terms of the Privacy Notice of the Company for Employees and/or Candidates.")}
        </Text>
      </Col>
    </FlyoutContent>
  );

  return (
    <Col gridGap="m" padding="n">
      <h1>
        {t("BB-ConsentPage-qualification-criteria-header-text", "By applying, you confirm that:")}
      </h1>
      <ul>
        {
          qualificationCriteria.map(item => (
            <li key={item}>{item}</li>
          ))
        }
      </ul>
      <Text>
        {t("BB-ConsentPage-whatsapp-consent-text", "I authorize Amazon to contact me via phone, text message or WhatsApp to provide information about my application, selection and hiring process.")}
      </Text>
      <dl>
        <Text textAlign="center" color="gray" fontSize="0.8em">
          {t("BB-ConsentPage-data-policy-header-text", "By applying, you read and agree to the")}
        </Text>
        <WithFlyout renderFlyout={renderFlyout}>
          {({ open }) => (
            <Button
              variant={ButtonVariant.Tertiary}
              style={{
                margin: "0.5em 0",
                width: "100%"
              }}
              onClick={() => open()}
            >
              {t("BB-ConsentPage-user-data-Policy-button", "User Data Policy")}
            </Button>
          )}
        </WithFlyout>
        <DebouncedButton
          variant={ButtonVariant.Primary}
          style={{ width: "100%" }}
          disabled={isCreateButtonDisabled}
          onClick={() => {
            boundResetBannerMessage();
            if (scheduleId) {
              const payload: CreateApplicationAndSkipScheduleRequestDS = {
                jobId,
                dspEnabled: job.results?.dspEnabled,
                scheduleId: scheduleId
              };
              boundCreateApplicationAndSkipScheduleDS(payload);
            } else {
              const payload: CreateApplicationRequestDS = {
                jobId,
                dspEnabled: job.results?.dspEnabled,
              };
              boundCreateApplicationDS(payload, (application: Application) => routeToAppPageWithPath(JOB_OPPORTUNITIES, [{ paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: application.applicationId }]));
            }
          }}
        >
          {t("BB-ConsentPage-create-application-button", "Create Application")}
        </DebouncedButton>
      </dl>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Consent);
