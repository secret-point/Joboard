import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { IconArrowRight, IconSize } from "@amzn/stencil-react-components/icons";
import { translate as t } from "../../../utils/translator";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { PAGE_ROUTES } from "../../pageRoutes";

const NhePreferenceCard = () => {
  return (
    <Col
      className="nhePreferenceCard"
      padding="S300"
      gridGap={8}
    >
      <H4>
        {t("BB-nhe-preference-card-title-text", "Don't see an option that works for you?")}
      </H4>
      <Text fontSize="T200">
        {t("BB-nhe-preference-card-content-text", "You can submit your event preferences and we'll contact you when we find a time that works for you.")}
      </Text>
      <Row padding={{ top: "S400" }}>
        <Row
          className="nhePreferenceLink"
          gridGap={8}
          onClick={() => {
            routeToAppPageWithPath(PAGE_ROUTES.NHE_PREFERENCES);
          }}
        >
          <Text fontWeight="medium" fontSize="T200">
            {t("BB-nhe-preference-card-go-to-nhe-preference-link", "Select your pre-hire event preferences")}
          </Text>
          <Row padding={{ top: "S100" }}>
            <IconArrowRight size={IconSize.Medium} fontSize="T100" aria-hidden />
          </Row>
        </Row>
      </Row>
    </Col>
  );
};

export default NhePreferenceCard;