import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { CommonColors } from "../../../utils/colors";
import { getCountryCode, getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { PAGE_ROUTES } from "../../pageRoutes";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import ApplicationSteps from "../../common/ApplicationSteps";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import { ApplicationStepListMap } from "../../../utils/constants/common";

interface MapStateToProps {
  job: JobState;
}

export const PreConsent = (props: MapStateToProps) => {

  const { job } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { CONSENT } = PAGE_ROUTES;
  const { matches } = useBreakpoints();

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(pageName);

  }, [jobDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const onGoNextPage = () => {
    boundResetBannerMessage();
    routeToAppPageWithPath(CONSENT);
  };

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-StepHeader-view-progress-flyout-title", "View progress")}
      onCloseButtonClick={close}
      buttons={[
        <Button key="done" onClick={close} variant={ButtonVariant.Primary}>
          {t("BB-StepHeader-view-progress-flyout-close-button", "Done")}
        </Button>
      ]}
      maxWidth="40vw"
    >
      <ApplicationSteps steps={ApplicationStepListMap[getCountryCode()]} />
    </FlyoutContent>
  );

  return (
    <Col gridGap={8} padding={{ top: "S100", bottom: "S400" }}>
      <Col gridGap={20} backgroundColor={CommonColors.Neutral90} padding="S600">
        <Text
          data-testid="text-pre-consent-page-title"
          id="pre-consent-page-title"
          color={CommonColors.White}
          fontSize="T400"
        >
          {t("BB-PreConsentPage-banner-journey-starts", "Your journey to becoming an Amazon Associate starts here.")}
        </Text>
        <WithFlyout renderFlyout={renderFlyout}>
          {({ open }) => (
            <Col>
              <Button
                className={matches.s ? "preview-steps-btn-small" : "preview-steps-btn"}
                variant={ButtonVariant.Secondary}
                onClick={open}
              >
                {t("BB-PreconsentPage-preview-steps-button", "Preview Steps")}
              </Button>
            </Col>
          )}
        </WithFlyout>
        <img
          id="preConsentImg"
          aria-hidden="true"
          role="presentation"
          tabIndex={-1}
          placeholder="header"
          src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/illustration-box.svg"
        />
      </Col>
      <Col alignItems="center" padding={{ top: "S400" }}>
        <Button
          variant={ButtonVariant.Primary}
          style={{ width: "90%", margin: "auto" }}
          onClick={onGoNextPage}
        >
          {t("BB-PreconsentPage-next-Button", "Next")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(PreConsent);
