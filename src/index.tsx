import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.container";
import store from "./store";
import { Provider } from "react-redux";
import { getInitialData } from "./services";
import { Store } from "redux";

declare global {
  interface Window {
    reduxStore: Store;
    Stage: string;
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

    window.reduxStore = store;
    const Main = () => (
      <Provider store={store}>
        <App />
      </Provider>
    );
    ReactDOM.render(<Main />, document.getElementById("root"));
  })
  .catch(ex => {
    ReactDOM.render(
      <div>Error loading config</div>,
      document.getElementById("root")
    );
  });
