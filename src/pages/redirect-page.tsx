import React, { useEffect, useState } from "react";
import { Redirect, withRouter, match } from "react-router-dom";
import { connect } from "react-redux";
import { History } from "history";
import Loader from "../components/loader";
import isEmpty from "lodash/isEmpty";

interface RedirectPageProps {
  appData: any;
  history: History;
  match: match;
}

const RedirectPage: React.FC<RedirectPageProps> = ({ match }) => {
  const [redirectPath, setRedirectPath] = useState<string>("");
  useEffect(() => {
    const { page, requisitionId, applicationId } = match.params as any;
    let path = `/app/${page}/${requisitionId}`;

    if (applicationId) {
      path = path + `/${applicationId}`;
    }
    setRedirectPath(path);
  }, [match]);
  return isEmpty(redirectPath) ? <Loader /> : <Redirect to={redirectPath} />;
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    appData: state.app.data
  };
};

export default withRouter(connect(mapStateToProps, {})(RedirectPage));
