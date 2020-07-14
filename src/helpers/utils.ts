import isEmpty from "lodash/isEmpty";

export const convertPramsToJson = (params: string) => {
  if (!isEmpty(params)) {
    return JSON.parse(
      '{"' +
        decodeURI(params.substring(1))
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } else {
    return {};
  }
};

export const launchAuthentication = () => {
  let hash = window.location.hash.substr(2).split("/");
  const origin = window.location.origin;
  const state = window.reduxStore.getState();
  let redirectUrl = origin;
  redirectUrl = `${redirectUrl}/?page=${state.app.currentPage.id}&requisitionId=${hash[1]}&applicationId=${hash[2]}`;
  if (hash.length === 4) {
    redirectUrl = `${redirectUrl}&misc=${hash[3]}`;
  }

  let url = `${
    state.app.appConfig.authenticationURL
  }/?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  window.location.assign(url);
};

export const isJson = (obj: string) => {
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }
  return true;
};
