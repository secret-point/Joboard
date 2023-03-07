/* eslint-disable react/jsx-wrap-multilines */
import { StencilProvider } from "@amzn/stencil-react-components/dist/submodules/context";
import { Col } from "@amzn/stencil-react-components/layout";
import { PageContainer } from "@amzn/stencil-react-components/page";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store/store";
import BackgroundCheck from "./BackgroundCheck";

const Main = () => (
  <Provider store={store}>
    <Router>
      <StencilProvider>
        <Col gridGap="m" padding="n">
          <PageContainer
            data-testid="layout"
            paddingTop="0"
            paddingBottom="S300"
            paddingHorizontal="0"
            width="80%"
          >
            <BackgroundCheck />;
          </PageContainer>
        </Col>
      </StencilProvider>
    </Router>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById("root"));
