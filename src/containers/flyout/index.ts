import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FlyOut from "../../components/flyout";
import find from "lodash/find";

const actions = {};

const mapStateToProps = (state: any, ownProps: any) => {
  let flyOut =
    find(
      state.app.pageConfig[ownProps.placeholder || "content"].flyOuts || [],
      {
        id: ownProps.flyOutId
      }
    ) || {};

  return {
    flyOut
  };
};

export default withRouter(connect(mapStateToProps, actions)(FlyOut));
