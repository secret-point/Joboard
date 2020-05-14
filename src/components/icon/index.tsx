import React from "react";
import Icons from "./icon-map";

type IconProps = {
  icon: string;
};

const Icon: React.FC<IconProps> = ({ icon }) => {
  const StencilIcon = Icons[icon];
  return StencilIcon ? <StencilIcon /> : <span />;
};

export default Icon;
