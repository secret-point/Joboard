import { connect } from "react-redux";
import LoaderPlaceholder from "../../components/loader/loader-placeholder";

const mapStateToProps = (state: any) => {
  return {
    loading: state.app.loading
  };
};

export default connect(mapStateToProps, {})(LoaderPlaceholder);
