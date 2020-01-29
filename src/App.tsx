import React from "react";
import "./App.css";
import { ConsentPage } from "./pages/page-list";
import { StencilProvider } from '@stencil-react/components/context';


const App: React.FC = () => {
  return (
    <StencilProvider>
      <ConsentPage />
    </StencilProvider>
  );
};

export default App;
