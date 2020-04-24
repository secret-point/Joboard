import App from "../App";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import store from "../../src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("Test App", () => {
  test("should load Page", () => {
    const app = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const loading = app.getByTestId("spinner");
    expect(loading).toBeInTheDocument();

    setTimeout(() => {
      const layout = app.getAllByTestId("layout");
      expect(layout[0]).toBeInTheDocument();
    }, 1000);
  });

  test("should load Page with token", () => {
    const app = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/app/consent/123123"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    setTimeout(() => {
      const layout = app.getAllByTestId("layout");
      expect(layout[0]).toBeInTheDocument();
    }, 1000);
  });
});
