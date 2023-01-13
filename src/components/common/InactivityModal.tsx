import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@amzn/stencil-react-components/modal";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { IconCross, IconSize } from "@amzn/stencil-react-components/icons";
import { CommonColors } from "../../utils/colors";

interface InactivityModalProps {
  millisecondsToTimeout?: number;
  children: React.ReactNode;
}
const InactivityModal = (props: InactivityModalProps) => {

  const { children, millisecondsToTimeout } = props;
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<any>();

  useEffect(() => {
    inactivityTime();

    return () => {
      clearTimer();
    };
  }, []);
  const inactivityTime = function () {
    if (!timer.current) {
      setTimer();
    }
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onkeydown = resetTimer;
  };

  const resetTimer = () => {
    clearTimer();
    setTimer();
  };

  const setTimer = () => {
    timer.current = setTimeout(showTimeoutModal, millisecondsToTimeout || 10000);
  };

  const clearTimer = () => {
    timer.current && clearTimeout(timer.current);
  };

  const showTimeoutModal = () => {
    setIsOpen(true);
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <Col
        backgroundColor="neutral0"
        padding={{ top: "S400", bottom: "S600", left: "S600" }}
        alignItems="center"
      >
        <Col alignItems="flex-end" width="100%" padding={{ right: "S400" }}>
          <Row
            onClick={() => {
              setIsOpen(false);
              clearTimer();
            }}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.keyCode === 32) {
                setIsOpen(false);
                clearTimer();
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

export default InactivityModal;