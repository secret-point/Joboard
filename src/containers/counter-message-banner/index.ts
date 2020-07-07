import { onUpdatePageId } from "./../../actions/actions";
import { connect } from "react-redux";
import CounterMessageBanner from "../../components/counter-message-banner";

const actions = {
  onUpdatePageId
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    application: state.app.data.application
  };
};

export default connect(mapStateToProps, actions)(CounterMessageBanner);
