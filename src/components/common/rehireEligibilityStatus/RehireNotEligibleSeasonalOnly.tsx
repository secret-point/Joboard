import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { Job } from "../../../utils/types/common";

interface RehireNotEligibleSeasonalOnlyProps {
  jobDetail?: Job
}

const RehireNotEligibleSeasonalOnly = (props: RehireNotEligibleSeasonalOnlyProps) => {

  const { jobDetail } = props;

  const titleWithJobTitle = t("BB-rehire-not-eligible-seasonal-only-title-text-with-jobTitle", "Thank you for your interest in the {jobTitle} position. Our records indicate that you previously worked at Amazon.  At this time, you are eligible for rehire as a Seasonal Amazon Associate or third-party agency employee based upon your employment record. As a result, we are unable to move forward with your candidacy for this job. If you have any questions regarding rehire eligibility, contact the site HR Team.", {jobTitle: jobDetail?.jobTitle || ""});
  const titleWithoutJobTitle = t("BB-rehire-not-eligible-seasonal-only-title-text-without-jobTitle", "Thank you for your interest in this position. Our records indicate that you previously worked at Amazon.  At this time, you are eligible for rehire as a Seasonal Amazon Associate or third-party agency employee based upon your employment record. As a result, we are unable to move forward with your candidacy for this job. If you have any questions regarding rehire eligibility, contact the site HR Team.");

  return (
    <Col gridGap="S300">
      <Text>
        {
          jobDetail?.jobTitle ? titleWithJobTitle : titleWithoutJobTitle
        }
      </Text>
      <Text>
        {t("BB-rehire-not-eligible-seasonal-only-content-text", "Please visit our Seasonal Page to explore seasonal opportunities in your area.")}
      </Text>
    </Col>
  )
}

export default RehireNotEligibleSeasonalOnly;
