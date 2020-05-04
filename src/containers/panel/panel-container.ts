import { connect } from "react-redux";
import Panel from "../../components/panel";

const actions = {};

const mapStateToProps = (state: any, ownProps: any) => {
  const panels = state.app.pageConfig.content?.panels;
  return {
    panels,
    data: state.app.data.output[state.app.currentPage.id]
  };
};

export default connect(mapStateToProps, actions)(Panel);
