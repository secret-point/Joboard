import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { CandidateState } from "../../../reducers/candidate.reducer";

interface MapStateToProps {
  candidate: CandidateState
}

const ThankYou = (props: MapStateToProps) => {
  const { candidate } = props;
  const { candidateData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text>
        Thank you
      </Text>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ThankYou);
