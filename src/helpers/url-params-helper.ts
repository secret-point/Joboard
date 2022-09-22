import store from "../store/store";

export default class URLParamsHelper {
  requisitionId = "";
  applicationId = "";
  page = "";
  jobId = "";
  location = "";
  constructor() {
    const requisitionId = window.sessionStorage.getItem("requisitionId");
    const jobId = window.sessionStorage.getItem("jobId");
    const page = window.localStorage.getItem("page");
    const applicationId = window.sessionStorage.getItem("applicationId");

    const state = store.getState();

    this.requisitionId = requisitionId || "";
    this.jobId = state.job?.results?.jobId || jobId || "";
    this.applicationId = state.application?.results?.applicationId || applicationId || "";
    this.page = page || "";
    this.location = window.location.href || "";
  }

  get() {
    return {
      requisitionId: this.requisitionId,
      jobId: this.jobId,
      applicationId: this.applicationId,
      page: this.page,
      location: this.location,
    };
  }
}
