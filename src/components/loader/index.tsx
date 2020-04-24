import React from "react";
import { Spinner, SpinnerSize } from "@stencil-react/components/spinners";

const Loader: React.FC = () => (
  <Spinner data-testid="spinner" size={SpinnerSize.Medium} />
);

export default Loader;
