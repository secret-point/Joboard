import React, { useEffect } from "react";
import { Modal } from "@amzn/stencil-react-components/modal";
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
      <Col
        backgroundColor="neutral0"
        padding={{ top: "S400", bottom: "S600", left: "S600" }}
        alignItems="center"
      >
        <Col alignItems="flex-end" width="100%" padding={{ right: "S400" }}>
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
        <Col padding={{ right: "S600" }} width="100%">
          {children}
        </Col>
      </Col>
    </Modal>
  );
};

export default CustomModal;