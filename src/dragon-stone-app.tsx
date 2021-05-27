import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  useLocation,
  Switch,
  Route
} from "react-router-dom";
import LandingPage from "./ds/pages/landing-page";
import ConsentPage from "./ds/pages/consent-page";
import queryString from "query-string";
import CandidateApplicationService from "./services/candidate-application-service";
import { CreateApplicationRequestDS } from "./@types/candidate-application-service-requests";
import moment from "moment";
import store from "./store";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";

// the props supported on the <DragonStoneApp/> component
type Props = {};

const DragonStoneApp: React.FunctionComponent<Props> = () => {
  return (
    <StencilProvider>
      <Router>
        <Switch>
          <Route path="/ds/consent/">
            <ConsentPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </StencilProvider>
  );
};

export { DragonStoneApp };
