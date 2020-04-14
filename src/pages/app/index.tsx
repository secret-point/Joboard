import { connect } from "react-redux";
import ConsentPage from "./page";
import find from "lodash/find";
import {
  onUpdatePageId
} from "../../actions/actions";

const actions = {
  onUpdatePageId
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { page, jobId } = ownProps.match.params;
  const pageConfig = find(state.app.pages, { id: page });
  if (pageConfig) {
    return {
      header: pageConfig.header,
      urlPageId: pageConfig.id,
      match: ownProps.match,
      history: ownProps.history,
      currentPageId: state.app.currentPage?.id,
      jobId
    };
  }
};

export default connect(mapStateToProps, actions)(ConsentPage);
