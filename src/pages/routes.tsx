import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ApplicationPage, Error403Page } from "./page-list";
import RedirectPage from "./redirect-page";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/403" component={Error403Page} />
        <Route
          exact
          path="/app/:page/:requisitionId/:applicationId?/:misc?"
          component={ApplicationPage}
        />
        <Route
          exact
          path="/:page/:requisitionId/:applicationId?"
          component={RedirectPage}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
