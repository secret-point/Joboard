import { connect } from "react-redux";
import Footer from "../../components/footer";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(Footer));
