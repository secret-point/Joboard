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
          path="/app/:page/:requisitionId/:applicationId?/:childRequisition?"
          component={ApplicationPage}
        />
        <Route
          exact
          path="/:pageId?/:requisitionId?/:applicationId?"
          render={routerProps => {
            const { pageId, requisitionId, applicationId } = routerProps.match
              .params as any;
            let path = `/app/${pageId}/${requisitionId}`;

            if (applicationId) {
              path = path + `/${applicationId}`;
            }
            return <Redirect to={path} />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
