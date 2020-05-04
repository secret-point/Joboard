import React from "react";
import { Col } from "@stencil-react/components/layout";
import propertyOf from "lodash/propertyOf";
import ICandidateApplication from "../../@types/ICandidateApplication";
import Modal from "./modal";

interface IModalContentComponent {
  modals: any[];
  data: any;
  onDismissModal: Function;
}

export interface Filter {
  type: string;
  value: string;
}

export interface showOnProps {
  dataKey: string;
  filter: Filter;
}

const ModalContentComponent: React.FC<IModalContentComponent> = ({
  modals,
  data,
  onDismissModal
}) => {
  const showPanel = (showOnProps: showOnProps) => {
    const { dataKey, filter } = showOnProps;
    const value = propertyOf(data)(dataKey);
    return value === filter.value;
  };

  const onModalClose = (dataKey: string) => {
    onDismissModal(dataKey);
  };

  return (
    <Col gridGap="s">
      {modals.map((modal, index) => {
        return showPanel(modal.showOn) ? (
          <Modal
            key={index}
            modalIndex={index}
            show={true}
            onModalClose={() => onModalClose(modal.showOn.dataKey)}
          />
        ) : (
          <span key={index} />
        );
      })}
    </Col>
  );
};

export default ModalContentComponent;
