import { connect } from "react-redux";
import CounterMessageBanner from "../../components/counter-message-banner";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    application: state.app.data.application
  };
};

export default connect(mapStateToProps, {})(CounterMessageBanner);