import React from "react";
import { Spinner, SpinnerSize } from "@amzn/stencil-react-components/spinner";

const Loader: React.FC = () => (
  <Spinner data-testid="spinner" size={SpinnerSize.Medium} />
);

export default Loader;
