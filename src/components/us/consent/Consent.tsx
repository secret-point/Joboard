import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Text } from "@amzn/stencil-react-components/text";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_OPPORTUNITY } from "../../pageRoutes";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToLoginCSDS } from "../../../helpers/utils";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import queryString from "query-string";
import { Locale } from "../../../utils/types/common";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobe-actions";
import { boundCreateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { CreateApplicationRequestDS } from "../../../utils/apiTypes";
import { uiState } from "../../../reducers/ui.reducer";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";

interface MapStateToProps {
    job: JobState;
    ui: uiState
}

interface RenderFlyoutFunctionParams {
    close: () => void;
}

const ConsentPage = (props: MapStateToProps) => {
    const { job, ui } = props;
    const isLoading = ui.isLoading;
    const { search, pathname } = useLocation();
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const jobId = queryParams.jobId;
    const jobDetail = job.results;
    const pageName = getPageNameFromPath(pathname);

    useEffect(()=>{
        jobId && boundGetJobDetail({jobId:jobId, locale:Locale.enUS})
    },[])

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
            <h1>By applying, you confirm that:</h1>
            <ul>
                <li>You are at least 18 years old.</li>
                <li>You have at least a high school diploma or equivalent.</li>
                <li>You are willing to submit a pre-employment drug test.</li>
            </ul>
            <dl>
                <Text textAlign="center" color="gray" fontSize="0.8em">By applying, you read and agree to the</Text>
                <WithFlyout renderFlyout={renderFlyout}>
                    {( { open } ) => (
                        <Button
                            variant={ButtonVariant.Tertiary}
                            style={{
                                margin: "0.5em 0",
                                width: "100%"
                            }}
                            onClick={() => open()}>User Data Policy</Button>
                    )}
                </WithFlyout>
                <Button
                    variant={ButtonVariant.Primary}
                    style={{ width: "100%" }}
                    disabled={jobDetail && !isLoading? false : true}
                    onClick={() => {
                        const payload: CreateApplicationRequestDS ={
                            jobId,
                            dspEnabled:job.results?.dspEnabled,
                        }
                        
                        boundCreateApplicationDS(payload, (applicationId:string)=>routeToAppPageWithPath(JOB_OPPORTUNITY, [{paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: applicationId}]));
                    }}
                >
                    Create Application
                </Button>
            </dl>
        </Col>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ConsentPage);
