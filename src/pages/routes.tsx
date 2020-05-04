import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ApplicationPage } from "./page-list";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            const urlParams = new URLSearchParams(window.location.search);
            const requisitionId = urlParams.get("requisitionId");
            const page = urlParams.get("page");
            return <Redirect to={`/app/${page}/${requisitionId}`} />;
          }}
        />
        <Route
          exact
          path="/app/:page/:requisitionId"
          component={ApplicationPage}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
