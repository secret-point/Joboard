import React from "react";
import Routes from "./pages/routes";
import { StencilProvider } from "@stencil-react/components/context";
import "./styles/login.css";

const App: React.FC = () => {
  return (
    <StencilProvider>
      <Routes />
    </StencilProvider>
  );
};

export default App;
