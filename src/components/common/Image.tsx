import { isEmpty } from "lodash";
import React from "react";
import { Text } from "@amzn/stencil-react-components/text";

interface ImageProps {
  src?: string;
  overlayText?: string;
  isContainsOverlay?: boolean;
  imgStyles?: any;
  id?: string;
};

const Image = (props: ImageProps) => {
  const { src, isContainsOverlay, imgStyles, overlayText = "", id } = props;

  return (
    <div id={id} data-testid="image" className="image-container">
      {!isEmpty(src) && (
        <img
          data-testid={`image-${id}`}
          src={src}
          {...imgStyles}
          alt={`image-${id}`}
          aria-hidden="true"
          role="presentation"
          tabIndex={-1}
        />
      )}
      {!isEmpty(src) && isContainsOverlay && (
        <div className="overlay">
          <div className="content">
            <Text>{overlayText}</Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
