import { connect } from "react-redux";
import StickyContent from "../../components/sticky-content";
import { withRouter } from "react-router-dom";
import propertyOf from "lodash/propertyOf";

const mapStateToProps = (state: any, ownProps: any) => {
  const properties = propertyOf(state.app)(
    "pageConfig.stickyContent.properties"
  );
  return {
    properties
  };
};

export default withRouter(connect(mapStateToProps, {})(StickyContent));
