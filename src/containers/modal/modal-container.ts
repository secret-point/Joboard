import { connect } from "react-redux";
import ModalContent from "../../components/modal";
import { onDismissModal } from "../../actions/actions";

const actions = {
  onDismissModal
};

const mapStateToProps = (state: any, ownProps: any) => {
  const modals = state.app.pageConfig.content?.modals || [];
  return {
    modals,
    data: state.app.currentPageOutput
  };
};

export default connect(mapStateToProps, actions)(ModalContent);
