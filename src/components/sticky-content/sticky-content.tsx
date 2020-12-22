import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";

import RendererContainer from "../../containers/renderer";

export type IStickyContentContentProps = {
  hasResponseError: boolean;
  errorMessage?: string;
  properties: any;
};

const StickyContent: React.FC<IStickyContentContentProps> = ({
  properties
}) => {
  return (
    <Col
      className={`sticky-content ${properties?.position}`}
      gridGap="m"
      padding="1.5rem"
    >
      <RendererContainer type="stickyContent" />
    </Col>
  );
};

export default StickyContent;
