import React from "react";
import { Col } from "@stencil-react/components/layout";
import propertyOf from "lodash/propertyOf";
import RendererContainer from "../../containers/renderer";
import {
  ModalContainer,
  ModalContent,
  ModalRendererFunction,
  ModalContext
} from "@stencil-react/components/modal";
import { Button } from "@stencil-react/components/button";
import { IconCross } from "@stencil-react/components/icons";
import { Row } from "@stencil-react/components/layout";

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
  const { pushModal } = React.useContext(ModalContext);

  const onDismiss = (e: React.MouseEvent, resolve: any) => {
    resolve(e);
  };

  const showModal = () => {
    pushModal(modalRender);
  };

  const onAction = (e: React.MouseEvent, resolve: Function) => {
    if (modal.actionProps.action) {
      onButtonClick(modal.actionProps.action, {
        options: modal.actionProps.options
      });
    }
    resolve(e);
  };

  const modalRender: ModalRendererFunction<any, any> = ({ resolve }) => (
    <ModalContainer
      labelledBy="modal-labelling-example-title"
      describedBy="modal-labelling-example-description"
    >
      <ModalContent>
        <Row justifyContent="flex-end">
          <Button onClick={e => onDismiss(e, resolve)} tertiary>
            <IconCross />
          </Button>
        </Row>
        <RendererContainer
          isContentContainsModals={true}
          modalConfig={modal}
          type="content"
        />
      </ModalContent>
      {modal.actionProps && (
        <Col padding="s">
          <Button
            {...modal.actionProps.buttonProperties}
            onClick={(e: any) => onAction(e, resolve)}
          >
            {modal.actionProps.label}
          </Button>
        </Col>
      )}
    </ModalContainer>
  );

  return (
    <Col gridGap="s">
      <Button {...modal.buttonProperties} onClick={showModal}>
        {modal.label}
      </Button>
    </Col>
  );
};

export default ModalContentComponent;
