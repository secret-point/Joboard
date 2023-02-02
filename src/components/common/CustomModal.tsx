import React, { useEffect } from "react";
import { Modal, ModalContent } from "@amzn/stencil-react-components/modal";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { IconCross, IconSize } from "@amzn/stencil-react-components/icons";
import { CommonColors } from "../../utils/colors";

interface CustomModalProps {
  shouldOpen: boolean;
  children: React.ReactNode;
  setShouldOpen: Function;
}
const CustomModal = (props: CustomModalProps) => {

  const { children, shouldOpen, setShouldOpen } = props;

  useEffect(() => {

  }, [shouldOpen]);

  return (
    <Modal isOpen={shouldOpen} close={close}>
      <ModalContent maxWidth="50vw" titleText="">
        <Col
          backgroundColor="neutral0"
          width="100%"
        >
          <Col alignItems="flex-end" width="100%">
            <Row
              onClick={() => {
                setShouldOpen(false);
              }}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.keyCode === 32) {
                  setShouldOpen(false);
                }
              }}
            >
              <IconCross
                title="Close Modal"
                size={IconSize.Large}
                color={CommonColors.Blue70}
              />
            </Row>
          </Col>
          <Col width="100%">
            {children}
          </Col>
        </Col>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;