import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { PAGE_ROUTES } from "../../pageRoutes";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import queryString from "query-string";
import { Application } from "../../../utils/types/common";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
    boundCreateApplicationAndSkipScheduleDS,
    boundCreateApplicationDS
} from "../../../actions/ApplicationActions/boundApplicationActions";
import { CreateApplicationAndSkipScheduleRequestDS, CreateApplicationRequestDS } from "../../../utils/apiTypes";
import { uiState } from "../../../reducers/ui.reducer";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { translate as t } from "../../../utils/translator";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { ScheduleState } from "../../../reducers/schedule.reducer";

interface MapStateToProps {
    job: JobState;
    schedule: ScheduleState;
    ui: uiState;
}

interface RenderFlyoutFunctionParams {
    close: () => void;
}

const ConsentPage = (props: MapStateToProps) => {
    const { job, ui, schedule } = props;
    const isLoading = ui.isLoading;
    const { search, pathname } = useLocation();
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const jobId = queryParams.jobId;
    const jobDetail = job.results;
    const scheduleId = queryParams.scheduleId;
    const scheduleDetail = schedule.results.scheduleDetail;
    const pageName = getPageNameFromPath(pathname);
    const qualificationCriteria = jobDetail?.qualificationCriteria || [];
    const { JOB_OPPORTUNITIES } = PAGE_ROUTES;

    const isCreateButtonDisabled = scheduleId
        ? jobDetail && scheduleDetail && !isLoading ? false : true
        : jobDetail && !isLoading ? false : true;

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobDetail, jobId]);

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(() => {
        jobDetail && addMetricForPageLoad(pageName)
    }, [jobDetail, pageName])

    const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
        <FlyoutContent
            titleText={t("BB-ConsentPage-flyout-user-data-policy-title-text", "User Data Policy")}
            onCloseButtonClick={close}
        >
            <Col gridGap={15}>
                <Text>
                    <InnerHTML html={t("BB-ConsentPage-flyout-user-data-policy-paragraph1-text", "Amazon is committed to a diverse and inclusive workplace. Amazon is an equal opportunity employer and does not discriminate on the basis of race, national origin, gender, gender identity, sexual orientation, protected veteran status, disability, age, or other legally protected status. For individuals with disabilities who would like to request an accommodation, please visit <a href='https://www.amazon.jobs/en/disability/us' target='_blank' rel='noopener noreferrer'>https://www.amazon.jobs/en/disability/us</a>")} />
                </Text>
                <Text fontSize="T100">
                    <InnerHTML html={t("BB-ConsentPage-flyout-user-data-policy-paragraph2-text", "Amazon takes your personal data protection seriously and will only process your personal data in accordance with the law. In particular, we do not share your personal data with any third party without your prior consent, unless compelled by law to do so. Unless you express otherwise, the hiring Amazon company will store your personal data in the electronic database maintained by Amazon.com in the USA or one of its affiliates. For full information on how Amazon stores and processes your personal data, please click here <a href='http://www.amazon.jobs/' target='_blank' rel='noopener noreferrer'>http://www.amazon.jobs/</a>")} />
                </Text>
                <Text fontSize="T100">
                    {t("BB-ConsentPage-flyout-user-data-policy-paragraph3-text", "In addition to the role you applied for today, we may have other positions that require the same or similar job functions. These roles may be full-time, reduced-time, part-time, seasonal, and/or temporary positions that are available at this location or other nearby Amazon locations. You are under no obligation to accept any role with Amazon or our partners, however, by completing your application you agree to be considered for same level, hourly roles within a 30 mile radius of your application site. This includes sharing your applicant information with our partners (staffing agencies) that hire for both our regular and temporary associate needs.")}
                </Text>
                <Text fontSize="T100">
                    {t("BB-ConsentPage-flyout-user-data-policy-by-applying-text", "By applying, you:")}
                </Text>
                <ul className="ul-list">
                    <li>
                        <Text fontSize="T100">
                            {t("BB-ConsentPage-flyout-user-data-policy-by-applying-acknowledging-item1-text", "are acknowledging that you have read the job description for the position you are applying for and that you understand the basic requirements needed to perform the job;")}
                        </Text>
                    </li>
                    <li>
                        <Text fontSize="T100">
                            {t("BB-ConsentPage-flyout-user-data-policy-by-applying-acknowledging-item2-text", "consent to the processing, analyzing and assessment of your personal data by Amazon, salesforce.com or any other third party for the purposes of your application and for any other legitimate purposes of Amazon. For the avoidance of doubt, the \"processing\" of your personal data will include but not restricted to collecting, receiving, recording, organizing, collating, storing, updating, altering, using, disseminating, distributing, merging, linking, blocking, degrading, erasing or destroying of your personal data;")}
                        </Text>
                    </li>
                    <li>
                        <Text fontSize="T100">
                            {t("BB-ConsentPage-flyout-user-data-policy-by-applying-acknowledging-item3-text", "consent to Amazon retaining your personal data after the application process, in order to assist it with the effective monitoring of its job application processes and to your personal data being stored in an electronic database in the USA.")}
                        </Text>
                    </li>
                </ul>
            </Col>
        </FlyoutContent>
    )

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
                <Button
                    variant={ButtonVariant.Primary}
                    style={{ width: "100%" }}
                    disabled={isCreateButtonDisabled}
                    onClick={() => {
                        if (scheduleId) {
                            const payload: CreateApplicationAndSkipScheduleRequestDS = {
                                jobId,
                                scheduleId,
                                dspEnabled: job.results?.dspEnabled,
                            }
                            boundCreateApplicationAndSkipScheduleDS(payload);
                        } else {
                            const payload: CreateApplicationRequestDS = {
                                jobId,
                                dspEnabled: job.results?.dspEnabled,
                            }
                            boundCreateApplicationDS(payload, (application: Application) => routeToAppPageWithPath(JOB_OPPORTUNITIES, [{ paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: application.applicationId }]));
                        }
                    }}
                >
                    {t("BB-ConsentPage-create-application-button", "Create Application")}
                </Button>
            </dl>
        </Col>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return state;
};

export default connect(mapStateToProps)(ConsentPage);
