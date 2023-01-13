import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { IconArrowRight, IconSize } from "@amzn/stencil-react-components/icons";
import { translate as t } from "../../../utils/translator";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { PAGE_ROUTES } from "../../pageRoutes";

const ShiftPreferenceCard = () => {
  return (
    <Col
      className="schedulePreferenceCard"
      padding="S300"
      gridGap={8}
    >
      <H4>
        {t("BB-ShiftPreferenceCard-title-text", "Don't see a shift that works for you?")}
      </H4>
      <Text fontSize="T200">
        {t("BB-ShiftPreferenceCard-content-text", "You can submit your shift preferences and we'll contact you when we find a shift that works for you.")}
      </Text>
      <Row padding={{ top: "S400" }}>
        <Row
          className="shiftPreferenceLink"
          gridGap={5}
          onClick={() => {
            routeToAppPageWithPath(PAGE_ROUTES.SHIFT_PREFERENCE);
          }}
        >
          <Text fontWeight="medium" fontSize="T200">
            {t("BB-JobOpportunity-Go-To-shift-preference-Link", "Select your shift preferences")}
          </Text>
          <IconArrowRight size={IconSize.Medium} fontSize="T100" aria-hidden />
        </Row>
      </Row>
    </Col>
  );
};

export default ShiftPreferenceCard;