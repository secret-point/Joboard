import React, { useState, useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Spinner } from "@amzn/stencil-react-components/spinner";
import { Col } from "@amzn/stencil-react-components/layout";

interface IFrameProps {
  src: string;
  title?: string;
}

const IFrame: React.FC<IFrameProps> = ({ src, title }) => {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isEmpty(src)) {
      setLoading(false);
    }
    console.log(src);
  }, [src]);

  return loading ? (
    <Col alignItems="center">
      <Spinner />
    </Col>
  ) : (
    <iframe
      ref={iframeRef}
      className="iframe"
      src={src}
      title={title}
    />
  );
};

export default IFrame;
