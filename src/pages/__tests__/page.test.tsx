import Page from "../app";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { ApplicationPage } from "../page-list";

describe("Test App", () => {
  const mockStore = configureStore([
    thunk,
    routerMiddleware(createHashHistory())
  ]);

  const renderComponent = (
    pageOrder?: any,
    currentPageId?: string,
    loadFooter?: boolean,
    isPageLoadFromList?: boolean
  ) => {
    const pageOderData = pageOrder || {};
    const footer = loadFooter
      ? {
          components: [
            {
              component: "Text",
              properties: {
                text: "Hello"
              }
            }
          ]
        }
      : {};
    const initState = {
      app: {
        pageConfig: {
          content: {},
          header: {},
          footer: {
            ...footer
          }
        },
        data: {
          output: {
            bgc: {}
          }
        },
        output: {
          bgc: {}
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
            {isPageLoadFromList ? <ApplicationPage /> : <Page />}
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

  test("should load Page with footer", () => {
    const { getByTestId } = renderComponent(
      {
        id: "consent",
        orderNumber: 0,
        configPath: "ConsentPage.json"
      },
      "bgc",
      true
    );

    const pageComponent = getByTestId("page");
    expect(pageComponent).toBeInTheDocument();
  });

  test("should load Page with footer and loading", () => {
    const app = renderComponent(
      {
        id: "consent",
        orderNumber: 0,
        configPath: "ConsentPage.json"
      },
      "bgc",
      true,
      true
    );
    expect(app).toBeDefined();
    const spinner = app.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    setTimeout(() => {
      const pageComponent = app.getByTestId("page");
      expect(pageComponent).toBeInTheDocument();
    }, 1000);
  });
});
