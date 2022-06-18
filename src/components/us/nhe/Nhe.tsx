import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { useLocation } from "react-router";
import queryString from "query-string";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { fetchNheTimeSlotDs, getLocale, handleConfirmNHESelection } from "../../../utils/helper";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepList } from "../../../utils/constants/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { NheState } from "../../../reducers/nhe.reducer";
import NheTimeSlotCard from "../../common/nhe/NheTimeSlotCard";
import { NHETimeSlot } from "../../../utils/types/common";

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

const Nhe = ( props: JobOpportunityMergedProps ) => {
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
        applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    }, [applicationId]);

    useEffect(() => {
        jobDetail && applicationData && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData]);

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

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

    useEffect(() => {
        scheduleDetail && fetchNheTimeSlotDs(scheduleDetail);
    }, [scheduleDetail]);

    const handleConfirmSelection = () => {
        if (applicationData && selectedNhe) {
            handleConfirmNHESelection(applicationData, selectedNhe);
        }
    }

    return (
        <Col id='jobOpportunityContainer'>
            {
                //TODO need to align how each application workflow is related to app steps
            }
            <StepHeader jobTitle={jobDetail?.jobTitle || ''} step={ApplicationStepList[2]}/>
            <Col padding={{top: 'S400'}} gridGap={20}>
                <Col gridGap={10}>
                    <H4>Schedule pre-hire appointment</H4>
                    <Text fontSize='T200'>
                        {`You are almost there, ${candidateData?.firstName || ''} ${candidateData?.lastName || ''}! We need you to come for a badge photo, complete work authorization and a drug test, if applicable.`}
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
                <Col>
                    <Button
                      variant={ButtonVariant.Primary}
                      onClick={handleConfirmSelection}
                    >
                        Confirm Selection
                    </Button>
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(Nhe);
