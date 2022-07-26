import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Col } from "@amzn/stencil-react-components/layout";
import { boundHideAppLoader, boundShowAppLoader } from "../../actions/UiActions/boundUi";

interface IFrameProps {
  src: string;
  title?: string;
}

const IFrame: React.FC<IFrameProps> = ({ src, title }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    boundShowAppLoader();
    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", () => {
        boundHideAppLoader();
      });
    }
  }, [iframeRef.current]);

  return (
    <Col id="wotcIframeContainer">
      {
        !isEmpty(src) &&
        <iframe
          ref={iframeRef}
          className="iframe"
          src={src}
          title={title}
          id="wotcIframe"
        />
      }
    </Col>
  );
};

export default IFrame;
