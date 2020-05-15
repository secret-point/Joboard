import React from "react";
import RendererContainer from "../../containers/renderer";
import {
  VIEWPORT_SIZES,
  StencilResponsiveConsumer
} from "@stencil-react/components/responsive";

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
          <img className={matches ? "image" : "responsive-image"} src={src} />
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
