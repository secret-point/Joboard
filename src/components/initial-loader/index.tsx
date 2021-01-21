import React, { useEffect } from "react";
import { match } from "react-router";

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
  useEffect(() => {
    if (pageConfig.initialLoad) {
      const payload: any = {
        urlParams: match.params,
        appConfig
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
