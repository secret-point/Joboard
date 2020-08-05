import RedirectPage from "../redirect-page";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { routerMiddleware } from "react-router-redux";

describe("Test <RedirectPage/>", () => {
  const history = createMemoryHistory({
    initialEntries: ["/consent/123/123"]
  });
  const mockStore = configureStore([thunk, routerMiddleware(history)]);

  const renderComponent = (path: string) => {
    const initState = {
      app: {
        data: {
          application: {}
        }
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={[path]}>
            <Route path="/:page/:requisitionId/:applicationId?">
              <RedirectPage />
            </Route>
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };
  test("should load with applicationId", () => {
    const app = renderComponent("/consent/123/123");
    expect(app).toBeDefined();
  });

  test("should load without applicationId", () => {
    const app = renderComponent("/consent/123");
    expect(app).toBeDefined();
  });
});
