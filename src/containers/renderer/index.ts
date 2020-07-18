import { connect } from "react-redux";
import Renderer from "../../components/renderer";
import { onAction } from "../../actions";
import { withRouter } from "react-router-dom";
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

const actions = {
  onAction
};

const getConfig = (config: any, ownProps: any) => {
  if (ownProps.isContentContainsPanel) {
    return ownProps.panelConfig;
  } else if (ownProps.isContentContainsImageContainer) {
    let imageContainer =
      find(config[ownProps.type]?.imageContainers || [], {
        id: ownProps.imageContainerId
      }) || {};
    return imageContainer;
  } else if (ownProps.isConfigContainsFlyouts) {
    return ownProps.flyOutConfig;
  } else if (ownProps.isContentContainsSteps) {
    return config[ownProps.type]?.steps[ownProps.activeStepIndex];
  } else if (ownProps.isContentContainsModals) {
    return ownProps.modalConfig;
  } else {
    return config[ownProps.type]; //type is Header, Content or Footer
  }
};

const mapStateToProps = (state: any, ownProps: any) => {
  let config = getConfig(state.app.pageConfig, ownProps);

  return {
    ...config,
    data: cloneDeep(state.app.data),
    pageId: state.app?.currentPage?.id,
    currentPage: state.app.currentPage,
    previousPage: state.app.previousPage,
    urlParams: ownProps.match?.params,
    appConfig: state.app.appConfig,
    pageOrder: state.app.pageOrder,
    candidateId: state.app.candidateId,
    hasResponseError: state.app.hasResponseError,
    errorMessage: state.app.errorMessage,
    isContentContainsSteps: ownProps.isContentContainsSteps,
    activeStepIndex: ownProps.activeStepIndex,
    output: state.app.output
  };
};

export default withRouter(connect(mapStateToProps, actions)(Renderer));
