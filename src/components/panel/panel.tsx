import React from "react";
import RendererContainer from "../../containers/renderer";
import { Col } from "@stencil-react/components/layout";
import { Card } from "@stencil-react/components/card";
import ComponentMap from "../component-map";

interface IPanelComponent {
  panel: any;
}

const PanelComponent: React.FC<IPanelComponent> = ({ panel }) => {
  const Panel = ComponentMap[panel.type] || Card;

  return (
    <Panel {...panel.properties} id={panel.id}>
      <RendererContainer
        isContentContainsPanel={true}
        panelId={panel.id}
        type={panel.placeholder || "content"}
        Render={ComponentMap[panel.renderType] || Col}
        renderProps={panel.renderProps || {}}
        panelConfig={panel}
      />
    </Panel>
  );
};

export default PanelComponent;
