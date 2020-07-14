import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.container";
import store from "./store";
import { Provider } from "react-redux";
import { getInitialData } from "./services";
import { Store } from "redux";
import StepFunctionService from "./services/step-function-service";
import isNull from "lodash/isNull";
import ICandidateApplication from "./@types/ICandidateApplication";

declare global {
  interface Window {
    reduxStore: Store;
    Stage: string;
    stepFunctionService: StepFunctionService;
    isCompleteTaskOnLoad: boolean | undefined;
    applicationData: ICandidateApplication | undefined;
    hearBeatTime: string;
  }
}

getInitialData()
  .then(data => {
    store.dispatch({
      type: "LOAD_INIT_DATA",
      payload: { ...data }
    });
    if (window.location.hash.includes("?token=")) {
      const tokenString = window.location.hash.split("?token=");
      window.localStorage.setItem("accessToken", tokenString[1]);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const requisitionId = urlParams.get("requisitionId");
    const agency: any = urlParams.get("agency");
    const page = urlParams.get("page");
    const applicationId = urlParams.get("applicationId");
    const misc = urlParams.get("misc");
    const token = urlParams.get("token");
    if (!isNull(requisitionId) && !isNull(page)) {
      let url = `/#/${page}/${requisitionId}`;
      url = !isNull(applicationId) ? `${url}/${applicationId}` : url;
      url = !isNull(misc) ? `${url}/${applicationId}/${misc}` : url;
      window.location.assign(url);
    }

    if (!isNull(token)) {
      window.localStorage.setItem("accessToken", token);
    }

    if (!isNull(agency)) {
      window.sessionStorage.setItem("agency", (agency === 1).toString());
    }

    window.reduxStore = store;
    const Main = () => (
      <Provider store={store}>
        <App />
      </Provider>
    );
    ReactDOM.render(<Main />, document.getElementById("root"));
  })
  .catch(ex => {
    console.log(ex);
    ReactDOM.render(
      <div>Error loading config</div>,
      document.getElementById("root")
    );
  });
