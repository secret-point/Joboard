import { push } from "react-router-redux";
import PageService from "../services/page-service";
import find from "lodash/find";

export const UPDATE_VALUE_CHANGE = "UPDATE_VALUE_CHANGE";
export const ON_REDIRECT = "ON_REDIRECT";
export const ON_UPDATE_PAGE_ID = "ON_UPDATE_PAGE_ID";

type IOnChangeProps = {
  keyName: string;
  value: string;
  pageId: string;
};

export const onUpdateChange = ({ keyName, value, pageId }: IOnChangeProps) => (
  dispatch: Function
) => {
  dispatch({
    type: UPDATE_VALUE_CHANGE,
    payload: {
      keyName,
      value,
      pageId
    }
  });
};

export const onRedirect = (payload: any) => async (dispatch: Function) => {
  dispatch(push(`/app${payload.redirectPath}`));
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
