import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Text } from "@amzn/stencil-react-components/text";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_OPPORTUNITIES } from "../../pageRoutes";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import queryString from "query-string";
import { Application, Locale, QueryParamItem } from "../../../utils/types/common";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundCreateApplicationAndSkipScheduleDS, boundCreateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
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
    const qualificationCriteria= jobDetail?.qualificationCriteria || [];

    const isCreateButtonDisabled = scheduleId
        ? jobDetail && scheduleDetail && !isLoading? false : true
        : jobDetail && !isLoading? false : true;

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobId]);

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(()=>{
        jobDetail && addMetricForPageLoad(pageName)
    },[jobDetail])

    const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
        <FlyoutContent
            titleText="User Data Policy"
            onCloseButtonClick={close}
            buttons={[
                <Button onClick={close} variant={ButtonVariant.Primary}>
                    Done
                </Button>
            ]}
        >
            <h2>User Data Policy</h2>
        </FlyoutContent>
    )

    return (
        <Col gridGap="m" padding="n">
            <h1>
                {t("BB-ConsentPage-qualification-criteria-header-text","By applying, you confirm that:")}
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
                    {( { open } ) => (
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
                        if(scheduleId){
                            const payload: CreateApplicationAndSkipScheduleRequestDS ={
                                jobId,
                                scheduleId,
                                dspEnabled:job.results?.dspEnabled,
                            }
                            boundCreateApplicationAndSkipScheduleDS(payload);
                        } else {
                            const payload: CreateApplicationRequestDS ={
                                jobId,
                                dspEnabled:job.results?.dspEnabled,
                            }
                            boundCreateApplicationDS(payload, (application:Application)=>routeToAppPageWithPath(JOB_OPPORTUNITIES, [{paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: application.applicationId}]));
                        }
                    }}
                >
                    {t("BB-ConsentPage-create-application-button", "Create Application")}
                </Button>
            </dl>
        </Col>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ConsentPage);
