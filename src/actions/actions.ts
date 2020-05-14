import IPayload, { UrlParam } from "./../@types/IPayload";
import { push } from "react-router-redux";
import PageService from "../services/page-service";
import find from "lodash/find";

export const UPDATE_VALUE_CHANGE = "UPDATE_VALUE_CHANGE";
export const ON_REDIRECT = "ON_REDIRECT";
export const ON_UPDATE_PAGE_ID = "ON_UPDATE_PAGE_ID";
export const ON_SET_LOADING = "ON_SET_LOADING";

type IOnChangeProps = {
  keyName: string;
  value: string;
  pageId: string;
};

export const onUpdateChange = (payload: IPayload) => (dispatch: Function) => {
  const {
    keyName,
    value,
    pageId,
    isContentContainsSteps,
    activeStepIndex
  } = payload;
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName,
      value,
      pageId,
      isContentContainsSteps,
      activeStepIndex
    }
  });
};

export const onRedirect = (payload: any) => async (dispatch: Function) => {
  dispatch(push(`/app${payload.redirectPath}`));
};

export const goTo = (path: string, urlParams?: UrlParam) => (
  dispatch: Function
) => {
  if (urlParams) {
    const { requisitionId, applicationId } = urlParams;
    path = `/app/${path}/${requisitionId}/${applicationId}`;
    dispatch(push(path));
  } else {
    dispatch(push(path));
  }
};

export const onGoToAction = (payload: IPayload) => (dispatch: Function) => {
  const { requisitionId, applicationId } = payload.urlParams;
  const { goTo } = payload.options;
  const path = `/app/${goTo}/${requisitionId}/${applicationId}`;
  dispatch(push(path));
};

export const onSubmit = (payload: any) => async (dispatch: Function) => {
  console.log(payload);
};

export const onUpdatePageId = (payload: any) => async (dispatch: Function) => {
  const pageOrder = find(payload.pageOrder || [], {
    id: payload.updatedPageId
  });
  if (pageOrder) {
    const pageConfig = await new PageService().getPageConfig(
      pageOrder.configPath
    );

    dispatch({
      type: ON_UPDATE_PAGE_ID,
      payload: {
        updatedPageId: payload.updatedPageId,
        page: pageConfig
      }
    });
  }
};

export const onDismissModal = (dataKey: string) => (dispatch: Function) => {
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName: dataKey,
      value: undefined
    }
  });
};

/**
 * toggle the loading on the screen.
 * @param dispatch Function action dispatch
 */
export const setLoading = (value: boolean) => (dispatch: Function) => {
  dispatch({
    type: ON_SET_LOADING,
    payload: value
  });
};
