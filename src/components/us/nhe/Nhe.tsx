import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { H4, Text } from "@amzn/stencil-react-components/text";
import {
    getPageNameFromPath,
    parseQueryParamsArrayToSingleItem,
    resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { useLocation } from "react-router";
import queryString from "query-string";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { checkAndBoundGetApplication, fetchNheTimeSlotDs, getLocale, handleConfirmNHESelection } from "../../../utils/helper";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepList } from "../../../utils/constants/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { NheState } from "../../../reducers/nhe.reducer";
import NheTimeSlotCard from "../../common/nhe/NheTimeSlotCard";
import { NHETimeSlot } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";
import {boundResetBannerMessage} from "../../../actions/UiActions/boundUi";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    candidate: CandidateState,
    nhe: NheState
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
    const scheduleDetail = schedule.results.scheduleDetail;
    const candidateData = candidate.results?.candidateData;
    const nheData = nhe.results.nheData;
    const [selectedNhe, setSelectedNhe] = useState<NHETimeSlot>();

    useEffect(() => {
        applicationId && checkAndBoundGetApplication(applicationId);
    }, [applicationId]);

    useEffect(() => {
        scheduleDetail &&jobDetail && applicationData && nheData.length && addMetricForPageLoad(pageName);

    }, [jobDetail, applicationData, scheduleDetail, nheData, pageName]);

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobDetail, jobId]);

    useEffect(() => {
        scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleDetail, scheduleId]);

    useEffect(() => {
        scheduleDetail && fetchNheTimeSlotDs(scheduleDetail);
    }, [scheduleDetail]);

    useEffect(() => {
        return () => {
            //reset this so as it can emit new pageload event after being unmounted.
            resetIsPageMetricsUpdated(pageName);
        }
    },[pageName])

    const handleConfirmSelection = () => {
        boundResetBannerMessage();

        if (applicationData && selectedNhe) {
            handleConfirmNHESelection(applicationData, selectedNhe);
        }
    };

    const displayFirstName = candidateData?.preferredFirstName || candidateData?.firstName || '';
    const displayLastName = candidateData?.lastName || '';

    return (
        <Col id='jobOpportunityContainer'>
            {
                //TODO need to align how each application workflow is related to app steps
            }
            <StepHeader jobTitle={jobDetail?.jobTitle || ''} step={ApplicationStepList[2]}/>
            <Col padding={{top: 'S400'}} gridGap={20}>
                <Col gridGap={10}>
                    <H4>
                        {t("BB-nhe-page-header-text","Schedule pre-hire appointment")}
                    </H4>
                    <Text fontSize='T200'>
                        {t("BB-nhe-page-title-text", `You are almost there, ${displayFirstName} ${displayLastName}! We need you to come for a badge photo, complete work authorization and a drug test, if applicable.`, {firstname: displayFirstName, lastname: displayLastName})}
                    </Text>
                </Col>
                <Col padding={{top: 'S400'}} gridGap={15}>
                    {
                        nheData.map(nheItem => (
                          <NheTimeSlotCard
                            nheTimeSlot={nheItem} key={nheItem.timeSlotId}
                            handleChange={(nheSlotTIme: NHETimeSlot) => setSelectedNhe(nheSlotTIme)}
                          />
                        ))
                    }
                </Col>
                { selectedNhe && <Col style={{position: "sticky", bottom: "20px"}}>
                    <Button
                      variant={ButtonVariant.Primary}
                      onClick={handleConfirmSelection}
                    >
                        {t("BB-nhe-page-confirm-selection-button-text", "Confirm Selection")}
                    </Button>
                </Col> }
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(Nhe);
