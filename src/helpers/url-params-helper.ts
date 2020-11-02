export default class URLParamsHelper {
  requisitionId: string = "";
  applicationId: string = "";
  page: string = "";
  constructor() {
    const requisitionId = window.sessionStorage.getItem("requisitionId");
    const page = window.sessionStorage.getItem("page");
    const applicationId = window.sessionStorage.getItem("applicationId");
    this.requisitionId = requisitionId || "";
    this.applicationId = applicationId || "";
    this.page = page || "";
  }
}
