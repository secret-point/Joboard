import React from "react";
import { Col } from "@stencil-react/components/layout";
import "./footer.css";
import RendererContainer from "../../containers/renderer";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="footer-controls">
        <Col gridGap={10} justifyContent="space-between">
          <RendererContainer type="footer" />
        </Col>
      </div>
    </div>
  );
};

export default Footer;
