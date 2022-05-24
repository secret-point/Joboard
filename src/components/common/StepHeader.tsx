import React from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { Link } from "@amzn/stencil-react-components/link";

interface StepHeaderProps {
    jobTitle: string;
    applicationStep: string;
    stepAction: string;
}
const StepHeader = (props: StepHeaderProps) => {

    const { jobTitle, applicationStep, stepAction } = props;

    return (
        <Col id="stepHeaderContainer" gridGap={5} padding='S300' style={{background: '#edf5f6'}}>
            <Text>{jobTitle}</Text>
            <Col alignItems='flex-end'>
                <Link fontSize='T100'>View progress</Link>
            </Col>
            <Text fontSize='T100'>{stepAction}</Text>
        </Col>
    )
}

export default StepHeader;
