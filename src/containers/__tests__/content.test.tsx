import Content from "../content/content-container";
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

  const renderComponent = (hasError?: boolean) => {
    const error = hasError
      ? {
          hasResponseError: true,
          errorMessage: "Error Message"
        }
      : {};
    const initState = {
      app: {
        pageConfig: {
          content: {
            components: [
              {
                component: "Text",
                properties: {
                  text: "Sample Text"
                }
              }
            ]
          },
          header: {},
          footer: {}
        },
        pageOrder: [
          {
            id: "consent"
          }
        ],
        currentPage: {
          id: "consent"
        },
        ...error
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/app/consent/123123"]}>
            <Content />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };

  test("should load Content", () => {
    const { getByTestId, getByText } = renderComponent();

    const contentComponent = getByTestId("renderer");
    expect(contentComponent).toBeInTheDocument();

    const text = getByText(/Sample Text/);
    expect(text).toBeInTheDocument();
  });

  test("should load with Error", () => {
    const { getByTestId, getByText } = renderComponent(true);

    const contentComponent = getByTestId("renderer");
    expect(contentComponent).toBeInTheDocument();

    const text = getByText(/Sample Text/);
    expect(text).toBeInTheDocument();

    const errorTest = getByText(/Error Message/);
    expect(errorTest).toBeInTheDocument();
  });
});
