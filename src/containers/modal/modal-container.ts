import { connect } from "react-redux";
import Modal from "../../components/modal";
import { onDismissModal } from "../../actions/actions";
import find from "lodash/find";

const actions = {
  onDismissModal
};

const mapStateToProps = (state: any, ownProps: any) => {
  let modal =
    find(state.app.pageConfig[ownProps.placeholder || "content"].modals || [], {
      id: ownProps.modalId
    }) || {};
  return {
    modal
  };
};

export default connect(mapStateToProps, actions)(Modal);
