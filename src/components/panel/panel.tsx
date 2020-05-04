import React from "react";
import RendererContainer from "../../containers/renderer";
import { Col } from "@stencil-react/components/layout";
import propertyOf from "lodash/propertyOf";
import ICandidateApplication from "../../@types/ICandidateApplication";

interface IPanelComponent {
  panels: any[];
  data: any;
}

export interface Filter {
  type: string;
  value: string;
}

export interface showOnProps {
  dataKey: string;
  filter: Filter;
}

const PanelComponent: React.FC<IPanelComponent> = ({ panels, data }) => {
  const showPanel = (showOnProps: showOnProps) => {
    const { dataKey, filter } = showOnProps;
    const value = propertyOf(data)(dataKey);
    return value === filter.value;
  };

  return (
    <Col gridGap="s">
      {panels.map((panel, index) => {
        return showPanel(panel.showOn) ? (
          <RendererContainer
            key={index}
            isContentContainsPanel={true}
            panelIndex={index}
            type="content"
          />
        ) : (
          <span key={index} />
        );
      })}
    </Col>
  );
};

export default PanelComponent;
