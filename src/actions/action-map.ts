import { onUpdateChange, onRedirect } from "./actions";
import { onStartApplication } from "./application-actions";
import { onGetRequisitionHeaderInfo } from "./requisition-actions";

const actionMap: any = {
  ON_VALUE_CHANGE: onUpdateChange,
  ON_REDIRECT: onRedirect,
  START_APPLICATION: onStartApplication,
  GET_REQUISITION_HEADER_INFO: onGetRequisitionHeaderInfo
};

export default actionMap;
