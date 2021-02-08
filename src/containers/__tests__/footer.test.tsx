import Footer from "../footer/footer-container";
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
          header: {},
          footer: {
            components: [
              {
                component: "Text",
                properties: {
                  text: "Sample Text"
                }
              }
            ]
          }
        },
        pageOrder: [pageOderData],
        currentPage: {
          id: currentPageId
        },
        data: {
          output: {
            consent: {}
          }
        },
        output: {
          consent: {}
        }
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/app/consent/123123"]}>
            <Footer />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };

  test("should load Page", () => {
    const { getByTestId, getByText } = renderComponent();

    const footerComponent = getByTestId("renderer");
    expect(footerComponent).toBeInTheDocument();

    const text = getByText(/Sample Text/);
    expect(text).toBeInTheDocument();
  });
});
