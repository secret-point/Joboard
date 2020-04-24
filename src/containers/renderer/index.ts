import { connect } from "react-redux";
import Renderer from "../../components/renderer";
import { onAction } from "../../actions";
import { validateRequiredData } from "../../helpers/validate";
import { withRouter } from "react-router-dom";

const actions = {
  onAction
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { page } = ownProps.match?.params as any;
  const config = state.app.pageConfig[ownProps.type];
  const isDataValid = validateRequiredData(config, state.app.outputData, page);
  return {
    ...config,
    outputData: state.app.outputData,
    data: state.app.data,
    pageId: page,
    isDataValid,
    currentPage: state.app.currentPage,
    nextPage: state.app.nextPage,
    urlParams: ownProps.match?.params,
    appConfig: state.app.appConfig,
    pageOrder: state.app.pageOrder
  };
};

export default withRouter(connect(mapStateToProps, actions)(Renderer));
