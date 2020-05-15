import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Panel from "../../components/panel";
import find from "lodash/find";

const actions = {};

const mapStateToProps = (state: any, ownProps: any) => {
  let panel =
    find(state.app.pageConfig[ownProps.placeholder || "content"].panels || [], {
      id: ownProps.panelId
    }) || {};
  return {
    panel
  };
};

export default withRouter(connect(mapStateToProps, actions)(Panel));
