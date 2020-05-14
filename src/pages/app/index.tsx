import { connect } from "react-redux";
import Page from "./page";
import find from "lodash/find";
import { onUpdatePageId } from "../../actions/actions";
import { withRouter } from "react-router-dom";

const actions = {
  onUpdatePageId
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { page } = ownProps.match.params;
  const pageOrder = find(state.app.pageOrder, { id: page });
  const pageConfig = state.app.pageConfig;
  return {
    urlPageId: pageOrder?.id,
    currentPageId: state.app.currentPage?.id,
    pageOrder: state.app.pageOrder,
    pageConfig
  };
};

export default withRouter(connect(mapStateToProps, actions)(Page));
