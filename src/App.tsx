import React from "react";
import {
  PageContainer,
  PageHeader,
  PageHeaderButton,
  BackToTopButton
} from "@stencil-react/components/page";
import { Col } from "@stencil-react/components/layout";
import "./styles/App.css";
import { StencilProvider } from "@stencil-react/components/dist/submodules/context";
import { MainWithSkipLink } from "@stencil-react/components/a11y";
import Routes from "./pages/routes";
import "@amzn/hvh-candidate-application-ui-components/lib/css/styles.css";

const App: React.FC = () => {
  return (
    <StencilProvider>
      <PageHeader>
        <PageHeaderButton
          title="Placeholder of logo"
          hasHover={false}
          paddingHorizontal={0}
        >
          <span className="navbar-logo">
            <img
              src="https://static.amazon.jobs/assets/icons/jobs_logo-5f4dd79a8e72aeaabe6aa3acae80962cd16317cff83e3a29c2f5dd5f30d33b31.svg"
              alt="Amazon Jobs"
            />
          </span>
        </PageHeaderButton>
      </PageHeader>
      <PageContainer data-testid="layout" paddingTop="0" paddingHorizontal="0">
        <MainWithSkipLink>
          <Col gridGap="m">
            <Routes />
          </Col>
          <BackToTopButton />
        </MainWithSkipLink>
      </PageContainer>
    </StencilProvider>
  );
};

export default App;
