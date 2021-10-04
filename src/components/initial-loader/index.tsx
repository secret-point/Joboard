import React, { useEffect } from "react";
import { match } from "react-router";
import { checkIfIsLegacy, parseQueryParamsArrayToSingleItem } from "../../helpers/utils";
import queryString from "query-string";

type InitialLoadProps = {
  pageConfig: any;
  match: match;
  onInitialLoadActions: Function;
  appConfig: any;
  data: any;
};

const InitialLoad: React.FC<InitialLoadProps> = ({
  pageConfig,
  match,
  onInitialLoadActions,
  appConfig,
  data
}) => {
  const isLegacy = checkIfIsLegacy();
  const urlParams = parseQueryParamsArrayToSingleItem(queryString.parse(window.location.search));
  useEffect(() => {
    if (pageConfig.initialLoad) {
      const payload: any = {
        urlParams: isLegacy? match.params : {...match.params, ...urlParams, requisitionId: null},
        appConfig,
        data: {}
      };
      if (pageConfig.initialLoad.isDataRequired) {
        payload.data = data;
      }
      onInitialLoadActions(pageConfig.initialLoad, payload);
    }
  }, [pageConfig, match, onInitialLoadActions, appConfig]);

  return <span />;
};

export default InitialLoad;
