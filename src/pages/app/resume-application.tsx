import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onGetApplication } from "../../actions/application-actions";
import Loader from "../../components/loader/loader-placeholder";
import {
  MessageBanner,
  MessageBannerType
} from "@amzn/stencil-react-components/message-banner";
import { withRouter, match } from "react-router";

interface PageProps {
  onGetApplication: Function;
  hasResponseError: boolean;
  errorMessage: string;
  appConfig: any;
  match: match;
  data: any;
}

class ResumeApplicationPage extends React.Component<PageProps, {}> {
  componentDidMount() {
    window.localStorage.setItem("page", "resume-application");
    const { appConfig, data, match } = this.props;
    this.props.onGetApplication({
      appConfig,
      data,
      urlParams: match.params
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
  onGetApplication
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
  connect(mapStateToProps, actions)(ResumeApplicationPage)
);
