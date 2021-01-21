import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InitialLoader from "../../components/initial-loader";
import { onInitialLoadActions } from "../../actions";

const actions = {
  onInitialLoadActions
};

const mapStateToProps = (state: any, ownProps: any) => ({
  pageConfig: state.app.pageConfig,
  appConfig: state.app.appConfig,
  data: state.app.data
});

export default withRouter(connect(mapStateToProps, actions)(InitialLoader));
