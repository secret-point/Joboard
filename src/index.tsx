import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.container";
import store from "./store";
import { Provider } from "react-redux";
import { getInitialData } from "./services";

getInitialData()
  .then(data => {
    store.dispatch({
      type: "LOAD_INIT_DATA",
      payload: { ...data }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      window.localStorage.setItem("accessToken", token);
    }

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
