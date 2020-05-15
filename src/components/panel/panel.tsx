import React from "react";
import RendererContainer from "../../containers/renderer";
import { Col, Row, View } from "@stencil-react/components/layout";
import { Card } from "@stencil-react/components/card";
import { Text } from "@stencil-react/components/text";
import { Button } from "@stencil-react/components/button";
import Icon from "../icon";
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
      />
    </Panel>
  );
};

export default PanelComponent;
