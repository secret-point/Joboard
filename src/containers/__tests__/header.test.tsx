import Header from "../header/header-container";
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

  const renderComponent = (pageOrder?: any, currentPageId?: string) => {
    const pageOderData = pageOrder || {};
    const initState = {
      app: {
        pageConfig: {
          content: {},
          header: {
            components: [
              {
                component: "PageHeader",
                properties: {
                  id: "sample",
                  jobIdLabel: "Job Id",
                  action: "get_requisition"
                }
              }
            ]
          },
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
            <Header />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };

  test("should load Page", () => {
    const { getByTestId } = renderComponent();

    const headerComponent = getByTestId("renderer");
    expect(headerComponent).toBeInTheDocument();
  });
});
