import { connect } from "react-redux";
import StepsContentRenderer from "../../components/steps-content-renderer";
import { onAction } from "../../actions";
import { withRouter } from "react-router-dom";

const actions = {
  onAction
};

const mapStateToProps = (state: any, ownProps: any) => {
  const contentConfig = state.app.pageConfig.content;
  const steps = contentConfig.steps || [];
  return {
    steps,
    data: state.app.data,
    isUpdateActionExecuted: state.app.isUpdateActionExecuted
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(StepsContentRenderer)
);
