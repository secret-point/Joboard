import React from "react";
import { Row } from "@stencil-react/components/layout";
import "./footer.css";
import RendererContainer from "../../containers/renderer";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="footer-controls">
        <Row gridGap={10} alignItems="center" justifyContent="space-between">
          <RendererContainer type="footer" />
        </Row>
      </div>
    </div>
  );
};

export default Footer;
