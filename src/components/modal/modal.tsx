import React, { useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import RendererContainer from "../../containers/renderer";
import { Modal, ModalContent } from "@amzn/stencil-react-components/modal";
import { Button } from "@amzn/stencil-react-components/button";
import { IconCross } from "@amzn/stencil-react-components/icons";
import { Row } from "@amzn/stencil-react-components/layout";

interface IModalContentComponent {
  modal: any;
  data: any;
  onDismissModal: Function;
  onButtonClick: Function;
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
  modal,
  onButtonClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const onDismiss = (e: React.MouseEvent, resolve: any) => {
    resolve(e);
  };

  const onAction = (e: React.MouseEvent, resolve: Function) => {
    if (modal.actionProps.action) {
      onButtonClick(modal.actionProps.action, {
        options: modal.actionProps.options
      });
    }
    resolve(e);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  return (
    <Col gridGap="s">
      <Button {...modal.buttonProperties} onClick={showModal}>
        {modal.label}
      </Button>
      <Modal aria-labelledby="custom-modal-title" isOpen={isOpen} close={close}>
        <ModalContent>
          <Row justifyContent="flex-end">
            <Button onClick={e => onDismiss(e, close)} tertiary>
              <IconCross />
            </Button>
          </Row>
          <RendererContainer
            isContentContainsModals={true}
            modalConfig={modal}
            type="content"
          />
          {modal.actionProps && (
            <Col padding="s">
              <Button
                {...modal.actionProps.buttonProperties}
                onClick={(e: any) => onAction(e, close)}
              >
                {modal.actionProps.label}
              </Button>
            </Col>
          )}
        </ModalContent>
      </Modal>
    </Col>
  );
};

export default ModalContentComponent;
