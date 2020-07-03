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
  let hash = window.location.hash.substr(1);

  const origin = window.location.origin;
  const redirectUrl = `${origin}/#${hash}`;

  const state = window.reduxStore.getState();
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
