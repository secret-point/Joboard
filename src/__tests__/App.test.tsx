import App from "../App.container";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Test App", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);

  const renderComponent = (
    extraPageProps?: any,
    hasError?: boolean,
    loading?: boolean
  ) => {
    const error = hasError
      ? {
          hasResponseError: true,
          errorMessage: "Error Message"
        }
      : {};
    const initState = {
      app: {
        data: {
          application: {}
        },
        pageConfig: {
          ...extraPageProps
        },
        pageOrder: [
          {
            id: "consent"
          }
        ],
        currentPage: {
          id: "consent"
        },
        appConfig: {
          dashboardUrl: "http://sampleurl"
        },
        loading,
        ...error
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/consent/123123"]}>
            <App />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };
  test("should load Page", () => {
    const app = renderComponent({}, false, true);
    const loading = app.getByTestId("spinner");
    expect(loading).toBeInTheDocument();

    setTimeout(() => {
      const layout = app.getAllByTestId("layout");
      expect(layout[0]).toBeInTheDocument();
    }, 1000);
  });

  test("should load Page with token", () => {
    const app = renderComponent();

    setTimeout(() => {
      const layout = app.getAllByTestId("layout");
      expect(layout[0]).toBeInTheDocument();
    }, 1000);
  });

  test("should load Page with navBar", () => {
    jest.spyOn(window.location, "assign").mockImplementation(l => {
      expect(l).toEqual("http://sampleurl");
    });
    const app = renderComponent({
      showNavbar: true
    });
    const homeButton = app.getByTestId("home-button");
    const logoImage = app.getByTestId("logo-image");
    fireEvent.click(logoImage);
    expect(homeButton).toBeInTheDocument();
  });

  test("should load Page with showShiftHoldingMessageBanner", () => {
    const app = renderComponent({
      showShiftHoldingMessageBanner: true
    });

    setTimeout(() => {
      const layout = app.getAllByTestId("layout");
      expect(layout[0]).toBeInTheDocument();
    }, 1000);
  });
});
