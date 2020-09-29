import React from "react";
import RendererContainer from "../../containers/renderer";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@amzn/stencil-react-components/responsive";

type ImageContainerProps = {
  src: string;
  id: string;
  placeholder: string;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  id,
  placeholder
}) => {
  return (
    <StencilResponsiveConsumer sizes={[VIEWPORT_SIZES.S]}>
      {({ matches }) => (
        <div className={"ui-image-container"}>
          <img
            alt="container"
            className={matches ? "image" : "responsive-image"}
            src={src}
            aria-hidden="true"
            role="presentation"
            tabIndex={-1}
          />
          <div className="ui-image-overlay">
            <div className="ui-image-overlay-content">
              <RendererContainer
                isContentContainsImageContainer={true}
                imageContainerId={id}
                type={placeholder}
              />
            </div>
          </div>
        </div>
      )}
    </StencilResponsiveConsumer>
  );
};

export default ImageContainer;
