import Loadable from "react-loadable";
import Loader from "../components/loader";

export const ApplicationPage = Loadable({
  loading: Loader,
  loader: () => import("./app")
});

export const ResumeApplicationPage = Loadable({
  loading: Loader,
  loader: () => import("./app/resume-application")
});

export const CreateApplicationPage = Loadable({
  loading: Loader,
  loader: () => import("./app/create-application")
});

export const Error403Page = Loadable({
  loading: Loader,
  loader: () => import("./app/error-403")
});

export const TimeoutPage = Loadable({
  loading: Loader,
  loader: () => import("./app/timeout")
});
