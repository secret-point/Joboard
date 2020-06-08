import { connect } from "react-redux";
import App from "./App";

const actions = {};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    showNavbar: state.app.pageConfig?.showNavbar,
    showShiftHoldingMessageBanner:
      state.app.pageConfig?.showShiftHoldingMessageBanner
  };
};

export default connect(mapStateToProps, actions)(App);