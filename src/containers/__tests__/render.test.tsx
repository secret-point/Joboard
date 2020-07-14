import Renderer from "../renderer";
import React from "react";
import { render, fireEvent, screen, getByText } from "@testing-library/react";
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

  const renderComponent = (component?: any) => {
    const components = component ? [component] : [];
    const initState = {
      app: {
        data: {
          application: {
            id: "1"
          }
        },
        pageConfig: {
          content: {
            components: components
          },
          header: {},
          footer: {}
        },
        pageOrder: [],
        currentPage: {
          id: "consent"
        },
        nextPage: {
          id: "bgc"
        }
      }
    };

    const store = mockStore(initState);
    return render(
      <Provider store={store}>
        <StencilProvider>
          <MemoryRouter initialEntries={["/app/consent/123123"]}>
            <Renderer type="content" />
          </MemoryRouter>
        </StencilProvider>
      </Provider>
    );
  };

  test("should load renderer", () => {
    const { getByTestId } = renderComponent();

    const rendererComponent = getByTestId("renderer");
    expect(rendererComponent).toBeInTheDocument();
  });

  test("should load renderer with component", () => {
    const { getByTestId, getByText } = renderComponent({
      component: "Text",
      properties: {
        text: "Sample Text"
      }
    });

    const rendererComponent = getByTestId("renderer");
    expect(rendererComponent).toBeInTheDocument();

    const text = getByText(/Sample Text/);
    expect(text).toBeInTheDocument();
  });

  test("should load renderer with non component", () => {
    const { getByTestId } = renderComponent({
      component: "Text1",
      properties: {
        text: "Sample Text"
      }
    });

    const rendererComponent = getByTestId("renderer");
    expect(rendererComponent).toBeInTheDocument();
  });

  test("should load renderer with checkbox", () => {
    const { getByTestId } = renderComponent({
      component: "Checkbox",
      properties: {
        action: "ON_VALUE_CHANGE",
        id: "CheckBox",
        dataKey: "checkbox.data.key"
      }
    });

    const rendererComponent = getByTestId("renderer");
    expect(rendererComponent).toBeInTheDocument();

    const CheckBoxComponent = getByTestId("CheckBox");
    expect(CheckBoxComponent).toBeInTheDocument();

    // fireEvent.click(screen.getByTestId("CheckBox"));

    // expect((screen.getByTestId("CheckBox") as HTMLInputElement).checked).toBe(
    //   true
    // );
  });

  test("should load renderer with checkbox", () => {
    const { getByTestId, getAllByTestId } = renderComponent({
      component: "Checkbox",
      properties: {
        id: "CheckBox",
        dataKey: "checkbox.data.key"
      }
    });

    const rendererComponent = getAllByTestId("renderer")[0];
    expect(rendererComponent).toBeInTheDocument();

    const CheckBoxComponent = getAllByTestId("CheckBox")[0];
    expect(CheckBoxComponent).toBeInTheDocument();

    // fireEvent.click(screen.getAllByTestId("CheckBox")[0]);

    // console.log(screen.getAllByTestId("CheckBox")[0] as HTMLInputElement);
    // expect(
    //   (screen.getAllByTestId("CheckBox")[0] as HTMLInputElement).checked
    // ).toBe(true);
  });

  test("should load renderer with button", () => {
    const { getByTestId, getByText } = renderComponent({
      component: "Button",
      properties: {
        label: "Sample Button",
        fill: true,
        action: "on button clicked",
        enableOnValidation: true
      }
    });

    const rendererComponent = getByTestId("renderer");
    expect(rendererComponent).toBeInTheDocument();

    const buttonComponent = getByText("Sample Button");
    expect(buttonComponent).toBeInTheDocument();

    fireEvent.click(screen.getByText("Sample Button"));

    expect((getByText("Sample Button") as HTMLButtonElement).innerHTML).toEqual(
      "Sample Button"
    );
  });
});
