import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { MessageBanner } from "@amzn/stencil-react-components/message-banner";
import { boundResetBannerMessage } from "../../actions/UiActions/boundUi";
import { AlertMessage } from "../../utils/types/common";
import InnerHTML from "dangerously-set-html-content";

interface MapStateToProps {
  bannerMessage: AlertMessage
}

export const BannerMessage = (props: MapStateToProps) => {
    const { bannerMessage } = props;

    return (
        bannerMessage && bannerMessage.visible ?
            <Col>
                <MessageBanner
                    type={bannerMessage.type}
                    isDismissible={bannerMessage.isDismissible || true}
                    onDismissed={boundResetBannerMessage}
                    autoDismissAfter={bannerMessage.dismissTime || 5000}
                    aria-live="assertive"
                >
                    <InnerHTML html={bannerMessage.title} className="bannerMessageTitle"/>
                </MessageBanner>
            </Col> :
            <></>
    )
}

export default BannerMessage;
