import React, { ChangeEvent, useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4 } from "@amzn/stencil-react-components/text";
import CriminalRecordForm from "./CriminalRecordForm";
import PreviousLegalNameForm from "./PreviousLegalNameForm";
import { AdditionalBGCFormConfig } from "../../../utils/constants/common";
import { FormInputItem } from "../../../utils/types/common";
import FormInputText from "../FormInputText";
import DatePicker from "../formDatePicker/DatePicker";
import FormInputSelect from "../FormInputSelect";
import PreviousWorkedAtAmazonForm from "./PreviousWorkedAtAmazonForm";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import {
    boundSetCandidatePatchRequest,
    boundUpdateCandidateInfoError
} from "../../../actions/CandidateActions/boundCandidateActions";
import { handleSubmitAdditionalBgc } from "../../../utils/helper";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface AdditionalBGCInfoProps {

}

type AdditionalBGCInfoMergedProps = MapStateToProps & AdditionalBGCInfoProps;

const AdditionalBGCInfo = (props: AdditionalBGCInfoMergedProps) => {

    const { candidate, application, bgc } = props;
    const { candidateData, candidatePatchRequest, formError } = candidate;
    const { stepConfig } = bgc;
    const applicationData = application.results;
    const additionalBgc = candidateData?.additionalBackgroundInfo;

    useEffect(() => {
        boundSetCandidatePatchRequest({additionalBackgroundInfo: additionalBgc});

        return () => {
            boundSetCandidatePatchRequest({});
            boundUpdateCandidateInfoError({});
        }
    }, [])

    const renderFormItem = ( formItem: FormInputItem ) => {
        const hasError = get(formError, formItem.dataKey) || false;
        formItem.hasError = hasError;

        switch(formItem.type) {
            case 'text':
                return <FormInputText
                    inputItem={formItem}
                    defaultValue={get(candidateData, formItem.dataKey) || ''}
                    handleChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e,  formItem)}
                />;
            case 'datePicker':
                return <DatePicker
                    inputItem={formItem}
                    defaultValue={get(candidateData, formItem.dataKey) || ''}
                    handleChange={(value: string) => handleDatePickerInput(value, formItem)}
                />

            case 'select':
                return <FormInputSelect
                    inputItem={formItem}
                    defaultValue={get(candidateData, formItem.dataKey) || ''}
                    handleChange={(value: string) => handleSelectChange(value, formItem)}
                />

            default:
                return <></>;
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, formItem: FormInputItem) => {
        formItem.edited = true;
        const value = event.target.value;
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, formItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleDatePickerInput = (value: string, datePickerItem: FormInputItem) => {
        datePickerItem.edited = true;
        const newCandidate  = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, datePickerItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleSelectChange = (value: string, selectItem: FormInputItem) => {
        selectItem.edited = true;
        const newCandidate  = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, selectItem.dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleClickNext = () => {
        if(candidatePatchRequest && candidateData && applicationData) {
            handleSubmitAdditionalBgc(candidateData, applicationData, candidatePatchRequest, formError, stepConfig);
        }
    }

    return (
        <Col>
            <H4>Additional Background Information</H4>
            <CriminalRecordForm/>
            <PreviousLegalNameForm/>
            {
                AdditionalBGCFormConfig.map(config => {
                    return (
                        <Col key={config.labelText} gridGap={15}>
                            {
                                renderFormItem(config)
                            }
                        </Col>
                    )
                })
            }
            <PreviousWorkedAtAmazonForm/>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                >
                    Next
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(AdditionalBGCInfo);
