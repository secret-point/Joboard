import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import CandidateApplicationService from "../../services/candidate-application-service";
import { CreateApplicationRequestDS } from "../../@types/candidate-application-service-requests";
import store from "../../store";
import { Col, View } from "@amzn/stencil-react-components/layout";
import { DsPageHeader } from "../components/DsPageHeader";
import { PageContainer } from "@amzn/stencil-react-components/page";
import { MainWithSkipLink } from "@amzn/stencil-react-components/a11y";
import { Button } from "@amzn/stencil-react-components/button";
import FlyOut from "../../components/flyout";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Text } from "@amzn/stencil-react-components/text";
import { Header } from "../../components/header";

// the props supported on the <DragonStoneApp/> component
type Props = {};

// the URL query parameters
type QueryParams = {
  jobId: string;
  scheduleId?: string;
};
const ConsentPage: React.FunctionComponent<Props> = () => {
  const selectAppId = (state: any) => state.app.applicationId;
  const applicationId = useSelector(selectAppId);

  const location = useLocation<QueryParams>();
  const { jobId, scheduleId } = queryString.parse(
    location.search
  ) as QueryParams;

  /* TODO: Move to a separate file */
  const createApplication = async () => {
    let service = new CandidateApplicationService();
    const request: CreateApplicationRequestDS = {
      jobId,
      scheduleId
    };
    const newId = await service.createApplicationDS(request);
    store.dispatch({
      type: "createApplication",
      payload: { applicationId: newId }
    });
  };

  /* TODO: Maybe use flyout widget + fill out this flyout with right content */
  const renderFlyout = (props: { close: () => void }) => (
    <FlyoutContent>
      <h2>User Data Policy</h2>
      <Button width="100%" onClick={props.close}>Done</Button>
    </FlyoutContent>
  )

  return (
    <Col gridGap="m" padding="n">
      <DsPageHeader />

        <PageContainer
          data-testid="layout"
          paddingTop="0"
          paddingBottom="0"
          paddingHorizontal="0"
        >
          <MainWithSkipLink>
          <h1>By applying, you confirm that:</h1>
          <ul>
            <li>You are at least 18 years old.</li>
            <li>You have at least a high school diploma or equivalent.</li>
            <li>You are willing to submit a pre-employment drug test.</li>
          </ul>
          <dl>
            <Text textAlign="center" color="gray" fontSize="0.8em">By applying, you read and agree to the</Text>
            <WithFlyout renderFlyout={renderFlyout}>
              {(params) => (
                <Button tertiary margin="0.5em 0" width="100%" onClick={params.openFlyout}>User Data Policy</Button>
              )}
            </WithFlyout>
            <Button primary width="100%" onClick={createApplication}>Create Application</Button>
            <h2 style={ { textAlign: "center", marginTop: "5em", color: "green" } }>
              {applicationId
                ? `Application Created! ${applicationId}!`
                : ""}
            </h2>
          </dl>
        </MainWithSkipLink>
      </PageContainer>
    </Col>

  );
};

export default ConsentPage;
