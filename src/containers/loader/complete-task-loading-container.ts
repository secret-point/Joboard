import { connect } from "react-redux";
import LoaderPlaceholder from "../../components/loader/loader-placeholder";

const mapStateToProps = (state: any) => {
  return {
    loading: state.app.workflowLoading
  };
};

export default connect(mapStateToProps, {})(LoaderPlaceholder);
