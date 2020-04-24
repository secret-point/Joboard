import { connect } from "react-redux";
import Content from "../../components/content";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    hasResponseError: state.app.hasResponseError,
    errorMessage: state.app.errorMessage
  };
};

export default withRouter(connect(mapStateToProps, {})(Content));
