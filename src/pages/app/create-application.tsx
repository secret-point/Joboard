import React, { Component } from "react";
import { connect } from "react-redux";
import { createApplication } from "../../actions/application-actions";
import Loader from "../../components/loader/loader-placeholder";
import {
  MessageBanner,
  MessageBannerType
} from "@amzn/stencil-react-components/message-banner";
import { withRouter, match } from "react-router";
import { log } from "../../helpers/log-helper";
import { checkIfIsLegacy } from "../../helpers/utils";
import queryString from "query-string";

interface PageProps {
  createApplication: Function;
  hasResponseError: boolean;
  errorMessage: string;
  appConfig: any;
  match: match;
  data: any;
}

class CreateApplicationPage extends Component<PageProps, {}> {
  componentDidMount() {
    const { appConfig, data, match } = this.props;
    const isLegacy = checkIfIsLegacy();
    const urlParams = queryString.parse(window.location.search);
    log("CreateApplicationPage", this.props);
    this.props.createApplication({
      appConfig,
      data,
      urlParams: isLegacy? match.params : {...match.params, ...urlParams, requisitionId: null},
    });
  }

  render() {
    return this.props.hasResponseError ? (
      <MessageBanner type={MessageBannerType.Error}>
        {this.props.errorMessage}
      </MessageBanner>
    ) : (
      <Loader loading={true} />
    );
  }
}

const actions = {
  createApplication
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    hasResponseError: state.app.hasResponseError,
    errorMessage: state.app.errorMessage,
    appConfig: state.app.appConfig,
    data: state.app.data
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(CreateApplicationPage)
);
