import Loadable from "react-loadable";
import Loader from "../components/Loader";

export const ConsentPage = Loadable({
  loading: Loader,
  loader: () => import("./consent-page")
});