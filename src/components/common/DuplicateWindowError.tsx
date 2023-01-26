import React from "react";
import { connect } from "react-redux";
import { translate as t } from "../../utils/translator";
import { WorkflowState } from "../../reducers/workflow.reducer";
import { WORKFLOW_ERROR_CODE } from "../../utils/enums/common";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Modal, ModalContent } from "@amzn/stencil-react-components/modal";
import DebouncedButton from "./DebouncedButton";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { redirectToDashboard } from "../../helpers/utils";
import { Col } from "@amzn/stencil-react-components/layout";

interface MapStateToProps {
  workflow: WorkflowState;
}

const handleGoToDashboard = () => {
  redirectToDashboard();
};

const handleRefreshPage = () => {
  location.reload();
};

export const DuplicateWindowError = (props: MapStateToProps) => {
  const workflowErrorCode = props?.workflow?.workflowErrorCode;
  const isOpen = workflowErrorCode === WORKFLOW_ERROR_CODE.DUPLICATE_WINDOW;
  return (
    <Modal aria-labelledby="duplicate-window-modal-title" isOpen={isOpen} shouldCloseOnClickOutside={false} close={() => {}}>
      <ModalContent
        titleText=""
        buttons={[
          <DebouncedButton
            dataTestId="go-to-dashboard-button"
            key="go-to-dashboard-modal-button"
            variant={ButtonVariant.Secondary}
            onClick={handleGoToDashboard}
          >
            {t("BB-duplicate-window-error-return-to-dashboard-text", "Return to dashboard")}
          </DebouncedButton>,
          <DebouncedButton
            dataTestId="refresh-page-button"
            key="refresh-page-button"
            variant={ButtonVariant.Primary}
            onClick={handleRefreshPage}
          >
            {t("BB-duplicate-window-error-continue-application-text", "Continue application")}
          </DebouncedButton>,
        ]}
      >
        <Col gridGap="S400">
          <H4 id="duplicate-window-modal-title">{t("BB-duplicate-window-error-title", "You're currently working on this application on a different window.")}</H4>
          <Text>
            {t("BB-duplicate-window-error-body", "Do you want to continue your application here?")}
          </Text>
        </Col>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DuplicateWindowError);