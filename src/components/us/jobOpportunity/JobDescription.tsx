import React from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import InnerHTML from 'dangerously-set-html-content';
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";

interface MapStateToProps {
    job: JobState,
}

const JobDescription = (props: MapStateToProps) => {

    const { job } = props;

    return (
        <Col>
            <Row id="jobImageContainer" width="100%" padding='S300'>
                <img src={job.results?.image}/>
            </Row>
            <InnerHTML className="jobDescription" html={job.results?.jobDescription || ''}/>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobDescription);
