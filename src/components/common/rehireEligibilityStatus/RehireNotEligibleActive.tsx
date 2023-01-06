import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";

const RehireNotEligibleActive = () => {
  return (
    <Col gridGap="S300">
      <Text>
        {t("BB-rehire-not-eligible-active-title-text", "We appreciate your recent job application! Unfortunately, you are not eligible for this particular position since you are already employed by Amazon.")}
      </Text>
      <Text>
        {t("BB-rehire-not-eligible-active-text-open-opportunities-list-title", "The good news? There are plenty of open opportunities that you can browse and apply for online. Here are a few of the ways you can explore your future career growth:")}
      </Text>
      <ul>
        <li>
          <Text>
            {t("BB-rehire-not-eligible-active-text-open-opportunities-list-item-one", "For Agency or Seasonal conversions, visit amazon.com/conversions (http://amazon.com/conversions)")}
          </Text>
        </li>
        <li>
          <Text>
            {t("BB-rehire-not-eligible-active-text-open-opportunities-list-item-two", "To request shift or location changes, reach out to your onsite team")}
          </Text>
        </li>
      </ul>
      <Text>
        {t("BB-rehire-not-eligible-active-content-text-one", "Your local HR team or the Employee Resource Center (ERC) are the best resource for any questions. You can reach the ERC team 24/7 at 1-888-892-7180 (tel:18888927180).")}
      </Text>
      <Text>
        {t("BB-rehire-not-eligible-active-content-text-two", "Thanks for being a part of the amazing team at Amazon! We are continually striving to provide you with the best possible employee resources, benefits, pay and flexible schedules — all supporting our efforts to become Earth’s Greatest Employer!",)}
      </Text>
    </Col>
  );
};

export default RehireNotEligibleActive;
