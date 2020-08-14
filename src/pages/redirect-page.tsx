import React, { useEffect, useState } from "react";
import { Redirect, withRouter, match } from "react-router-dom";
import { connect } from "react-redux";
import { History } from "history";
import Loader from "../components/loader";
import isEmpty from "lodash/isEmpty";
import { onUpdatePageId } from "../actions/actions";
import { IGNORE_PAGE_TO_STORE_LOCAL } from "../constants";

interface RedirectPageProps {
  appData: any;
  history: History;
  match: match;
  onUpdatePageId: Function;
}

const RedirectPage: React.FC<RedirectPageProps> = ({
  match,
  onUpdatePageId
}) => {
  const [redirectPath, setRedirectPath] = useState<string>("");
  useEffect(() => {
    const { page, requisitionId, applicationId } = match.params as any;
    let path = `/app/${requisitionId}`;

    if (applicationId) {
      path = path + `/${applicationId}`;
    }
    const previousPage = window.localStorage.getItem("page");
    if (!previousPage || IGNORE_PAGE_TO_STORE_LOCAL.includes(page)) {
      onUpdatePageId(page);
    }

    if (!IGNORE_PAGE_TO_STORE_LOCAL.includes(page)) {
      window.localStorage.setItem("page", page);
    }
    setTimeout(() => {
      setRedirectPath(path);
    }, 200);
  }, [match, onUpdatePageId]);
  return isEmpty(redirectPath) ? <Loader /> : <Redirect to={redirectPath} />;
};

const actions = {
  onUpdatePageId
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    appData: state.app.data
  };
};

export default withRouter(connect(mapStateToProps, actions)(RedirectPage));
