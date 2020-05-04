import { connect } from "react-redux";
import Content from "../../components/content";
import { withRouter } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

const mapStateToProps = (state: any, ownProps: any) => {
  const isContentContainsSteps = !isEmpty(state.app.pageConfig.content?.steps);
  const isContentContainsPanels = !isEmpty(
    state.app.pageConfig.content?.panels
  );
  const isContentContainsModals = !isEmpty(
    state.app.pageConfig.content?.modals
  );
  return {
    hasResponseError: state.app.hasResponseError,
    errorMessage: state.app.errorMessage,
    isContentContainsSteps,
    isContentContainsPanels,
    isContentContainsModals
  };
};

export default withRouter(connect(mapStateToProps, {})(Content));
