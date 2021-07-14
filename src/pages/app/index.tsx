import { connect } from "react-redux";
import Page from "./page";
import find from "lodash/find";
import { onUpdatePageId } from "../../actions/actions";
import { withRouter } from "react-router-dom";
import { checkIfIsLegacy } from "../../helpers/utils";
import queryString from "query-string";

const actions = {
  onUpdatePageId
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { page } = ownProps.match.params;
  const isLegacy = checkIfIsLegacy();
  const urlParams = queryString.parse(window.location.search);
  window.urlParams = isLegacy? ownProps.match.params : {...ownProps.match.params, ...urlParams, requisitionId: null};
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
