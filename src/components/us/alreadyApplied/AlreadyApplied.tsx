import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { redirectToDashboard } from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
  candidate: CandidateState
}

const AlreadyApplied = (props: MapStateToProps) => {
  const { candidate } = props;
  const { candidateData } = candidate.results;
  const firstName = candidateData?.firstName;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text>
        {firstName ? `${firstName}, `: ''}
        {t("BB-already-applied", "You have already started and / or completed an application for this job.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-already-applied-description", "Return to the dashboard resume your application or view application and new hire appointment details, and your next steps.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-already-applied-button-text", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyApplied);
