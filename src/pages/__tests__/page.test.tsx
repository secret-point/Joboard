import Page from "../app";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { StencilProvider } from "@stencil-react/components/dist/submodules/context";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Test App", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);

  const renderComponent = (pageOrder?: any, currentPageId?: string) => {
    const pageOderData = pageOrder || {};
    const initState = {
      app: {
        pageConfig: {
          content: {},
          header: {},
          footer: {}
        },
        pageOrder: [pageOderData],
        currentPage: {
          id: currentPageId
        }
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/app/consent/123123"]}>
            <Page />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };

  test("should load Page", () => {
    const { getByTestId } = renderComponent();

    const pageComponent = getByTestId("page");
    expect(pageComponent).toBeInTheDocument();
  });

  test("should load Page", () => {
    const { getByTestId } = renderComponent(
      {
        id: "consent",
        orderNumber: 0,
        configPath: "ConsentPage.json"
      },
      "bgc"
    );

    const pageComponent = getByTestId("page");
    expect(pageComponent).toBeInTheDocument();
  });
});
