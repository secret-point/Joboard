import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { Job } from "../../../utils/types/common";

interface Days365NotRehireEligibleProps {
  jobDetail?: Job
}

const Days365NotRehireEligible = (props: Days365NotRehireEligibleProps ) => {

  const { jobDetail } = props;

  const tileWithJobTitle = t("BB-365-days-not-rehire-eligible-title-text-with-jobTitle", "Thank you for your interest in the {jobTitle} position. Our records indicate you previously worked at Amazon and are not eligible for rehire based upon your previous Amazon employment record. As a result, we are unable to move forward with your candidacy at this time.", {jobTitle: jobDetail?.jobTitle || ""});
  const titleWithoutJobTitle = t("BB-365-days-not-rehire-eligible-title-text-without-jobTitle", "Thank you for your interest in this position. Our records indicate you previously worked at Amazon and are not eligible for rehire based upon your previous Amazon employment record. As a result, we are unable to move forward with your candidacy at this time.")

  return (
    <Col gridGap="S300">
      <Text>
        {
          jobDetail ? tileWithJobTitle : titleWithoutJobTitle
        }
      </Text>
      <Text>
        {t("BB-365-days-not-rehire-eligible-content-text", "Due to the termination reason, you can reapply 90 days after your last day worked at Amazon.")}
      </Text>
    </Col>
  )
}

export default Days365NotRehireEligible;
