import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { ConsentPage } from "./page-list";
import Configuration from "../components/configuration";

const Routes: React.FC = () => {
  return (
    <Router>
      <Redirect exact from="/" to="/app/consent" />
      <Route
        exact
        path="/app/:page/:stepNumber?/:jobId?"
        component={Configuration(ConsentPage)}
      />
    </Router>
  );
};

export default Routes;
