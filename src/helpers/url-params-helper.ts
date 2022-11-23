import store from "../store/store";

export default class URLParamsHelper {
  requisitionId = "";
  applicationId = "";
  candidateId = "";
  page = "";
  jobId = "";
  location = "";
  referrer = "";
  constructor() {
    const requisitionId = window.sessionStorage.getItem("requisitionId");
    const jobId = window.sessionStorage.getItem("jobId");
    const page = window.localStorage.getItem("page");
    const applicationId = window.sessionStorage.getItem("applicationId");

    const state = store.getState();

    this.requisitionId = requisitionId || "";
    this.jobId = state.job?.results?.jobId || jobId || "";
    this.applicationId = state.application?.results?.applicationId || applicationId || "";
    this.candidateId = state.candidate?.results?.candidateData?.candidateId || state.application?.results?.candidateId || "";
    this.page = page || "";
    this.location = window.location.href || "";
    this.referrer = window.document.referrer || "";
  }

  get() {
    return {
      requisitionId: this.requisitionId,
      jobId: this.jobId,
      applicationId: this.applicationId,
      candidateId: this.candidateId,
      page: this.page,
      location: this.location,
      referrer: this.referrer,
    };
  }
}
