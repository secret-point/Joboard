import React, { useEffect, useState } from "react";
import { Redirect, withRouter, match } from "react-router-dom";
import { connect } from "react-redux";
import { History } from "history";
import Loader from "../components/loader";
import isEmpty from "lodash/isEmpty";
import { onUpdatePageId } from "../actions/actions";
import { IGNORE_PAGE_TO_STORE_LOCAL } from "../constants";
import { log } from "../helpers/log-helper";
import { checkIfIsLegacy } from "../helpers/utils";
import queryString from "query-string";

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
  const isLegacy = checkIfIsLegacy();
  const urlParams = queryString.parse(window.location.search);
  useEffect(() => {
    const { page, requisitionId, applicationId, jobId } = isLegacy? match.params : {...match.params, ...urlParams, requisitionId: null} as any;
    let path = `/app/${isLegacy? requisitionId : jobId}`;

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
    log(`loading page ${page}`);
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
