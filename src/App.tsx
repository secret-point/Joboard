import React from "react";
import {
  PageContainer,
  PageHeader,
  PageHeaderButton
} from "@amzn/stencil-react-components/page";
import { BackToTopButton } from "@amzn/stencil-react-components/back-to-top-button";
import { Col } from "@amzn/stencil-react-components/layout";
import "./styles/App.css";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import { MainWithSkipLink } from "@amzn/stencil-react-components/a11y";
import Routes from "./pages/routes";
import LoaderContainer from "./containers/loader/loader-container";
import CompleteTaskLoaderContainer from "./containers/loader/complete-task-loading-container";
import ContentMessageBanner from "./containers/counter-message-banner";
import "@amzn/hvh-candidate-application-ui-components/lib/css/styles.css";
import defaultTheme from '@amzn/stencil-react-theme-default';
import { Colors } from "./constants/stencilThemeOverride";
import store from "./store";
import { checkIfIsCSRequest, get3rdPartyFromQueryParams } from "./helpers/utils";
import { AppConfig } from "./@types/IPayload";

interface IApp {
  showNavbar: boolean;
  showShiftHoldingMessageBanner: boolean;
  appConfig: AppConfig;
}

const App: React.FC<IApp> = ({
  showNavbar,
  showShiftHoldingMessageBanner,
  appConfig,
}) => {
  const onClick = () => {
    const isCandidateDashboardEnabled = appConfig.featureList?.CANDIDATE_DASHBOARD?.isAvailable;
    const queryParamsInSession = window.sessionStorage.getItem("query-params");
    const queryParams = queryParamsInSession
      ? JSON.parse(queryParamsInSession)
      : {};
    const queryStringFor3rdParty = get3rdPartyFromQueryParams(queryParams,'?');
    const candidateDashboardUrl = `${appConfig.CSDomain}/app${queryStringFor3rdParty}#/myApplications`;
    window.location.assign(isCandidateDashboardEnabled? candidateDashboardUrl : appConfig.dashboardUrl);
  };

  const stencilThemeColorOverride = appConfig.featureList?.STENCIL_COLOR_OVERRIDE?.isAvailable ? Colors : {};

  return (
    <StencilProvider
      theme={{
        ...defaultTheme,
        color: {
          ...defaultTheme.color,
          ...stencilThemeColorOverride,
        }
    }}>
      <LoaderContainer />
      <CompleteTaskLoaderContainer />
      {showNavbar && !checkIfIsCSRequest() && (
        <PageHeader hasShadow data-testid="navbar">
          <PageHeaderButton
            data-testid="home-button"
            title="Home"
            onClick={onClick}
            hasHover={false}
            paddingHorizontal={0}
          >
            <span className="navbar-logo">
              <img
                data-testid="logo-image"
                src="https://static.amazon.jobs/assets/icons/jobs_logo-5f4dd79a8e72aeaabe6aa3acae80962cd16317cff83e3a29c2f5dd5f30d33b31.svg"
                aria-hidden="true"
                role="presentation"
                tabIndex={-1}
              />
            </span>
          </PageHeaderButton>
        </PageHeader>
      )}
      <PageContainer
        data-testid="layout"
        paddingTop="0"
        paddingBottom="0"
        paddingHorizontal="0"
        style={{marginTop: 16}}
      >
        <MainWithSkipLink>
          {showShiftHoldingMessageBanner && <ContentMessageBanner />}
          <Col gridGap="m">
            <Routes />
          </Col>
          <BackToTopButton bottom="75px" right="5vw" />
        </MainWithSkipLink>
      </PageContainer>
    </StencilProvider>
  );
};

export default App;
