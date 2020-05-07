import React from "react";
import { Spinner, SpinnerSize } from "@stencil-react/components/spinners";

interface ILoaderPlaceholderProps {
  loading: boolean;
}

/**
 * Loader Placeholder.
 * Components to on loading.
 * @param loading boolean loading.
 */
const LoaderPlaceholder: React.FC<ILoaderPlaceholderProps> = ({ loading }) => {
  return loading ? (
    <div className="loading-background">
      <div className="loading-wrapper">
        <Spinner data-testid="spinner" size={SpinnerSize.Medium} />
      </div>
    </div>
  ) : (
    <span data-testid="no-spinner" />
  );
};

export default LoaderPlaceholder;
