import Loadable from "react-loadable";
import Loader from "../components/loader";

export const ApplicationPage = Loadable({
  loading: Loader,
  loader: () => import("./app")
});
