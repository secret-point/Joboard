import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";

const NotRehireEligible = () => {
  return (
    <Col gridGap="S300">
      <Text>
        {t("BB-not-rehire-eligible-title-text", "Thank you for your recent job application to Amazon. After careful consideration, we will not be moving forward with your job application.")}
      </Text>
      <Text>
        {t("BB-not-rehire-eligible-content-text", "We value your time and wish you the best of luck in the future.")}
      </Text>
    </Col>
  );
};

export default NotRehireEligible;
