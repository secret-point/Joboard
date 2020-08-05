import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { TimeoutPage } from "../page-list";
import Timeout from "../app/timeout";

describe("Test <RedirectPage/>", () => {
  const history = createMemoryHistory({
    initialEntries: ["/consent/123/123"]
  });
  const mockStore = configureStore([thunk, routerMiddleware(history)]);

  const renderComponent = (isPageLoadFromList: boolean) => {
    const initState = {
      app: {
        data: {
          application: {}
        },
        appConfig: {
          dashboardUrl: "http://sampleurl"
        }
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/403"]}>
            <Route path="/403">
              {isPageLoadFromList ? <TimeoutPage /> : <Timeout />}
            </Route>
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };
  test("should load with timeout page", () => {
    const app = renderComponent(true);
    expect(app).toBeDefined();
    const spinner = app.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    setTimeout(() => {
      const pageComponent = app.getByTestId("page");
      expect(pageComponent).toBeInTheDocument();
    }, 1000);
  });

  test("should load with timeout page with out loading", () => {
    jest.spyOn(window.location, "assign").mockImplementation(l => {
      expect(l).toEqual("http://sampleurl");
    });
    const app = renderComponent(false);
    expect(app).toBeDefined();

    const pageComponent = app.getByTestId("page");
    expect(pageComponent).toBeInTheDocument();

    const dashboardButton = app.getByTestId("dashboard-button");
    fireEvent.click(dashboardButton);
    expect(dashboardButton).toBeInTheDocument();
  });
});
