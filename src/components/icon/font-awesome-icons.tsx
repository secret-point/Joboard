import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const withFontAwesomeIcon = (icon: any) => {
  return class extends React.PureComponent {
    render() {
      return <FontAwesomeIcon icon={icon} />;
    }
  };
};

export default withFontAwesomeIcon;
