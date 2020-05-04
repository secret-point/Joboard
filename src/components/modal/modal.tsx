import React, { useEffect } from "react";
import RendererContainer from "../../containers/renderer";
import {
  ModalButtonBar,
  ModalContainer,
  ModalContent,
  ModalRendererFunction,
  ModalContext
} from "@stencil-react/components/modal";
import { Button } from "@stencil-react/components/button";
import { IconCross } from "@stencil-react/components/icons";
import { Row } from "@stencil-react/components/layout";

interface IModal {
  modalIndex: number;
  show: boolean;
  onModalClose: Function;
}

export interface Filter {
  type: string;
  value: string;
}

export interface showOnProps {
  dataKey: string;
  filter: Filter;
}

const Modal: React.FC<IModal> = ({ show, modalIndex, onModalClose }) => {
  const { pushModal } = React.useContext(ModalContext);

  useEffect(() => {
    if (show) {
      pushModal(myModal);
    }
  }, [show]);

  const onDismiss = (e: React.MouseEvent, resolve: any) => {
    resolve(e);
    onModalClose();
  };

  const myModal: ModalRendererFunction<any, any> = ({ resolve }) => (
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
          modalIndex={modalIndex}
          type="content"
        />
      </ModalContent>
      {/* TODO: We will think how to get this right */}
      {/* <ModalButtonBar>
        <Button onClick={resolve}>Close modal</Button>
      </ModalButtonBar> */}
    </ModalContainer>
  );

  return <span />;
};

export default Modal;
