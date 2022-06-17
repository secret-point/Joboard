import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import { FormWrapper } from "@amzn/stencil-react-components/form";
import { DetailedRadio } from "@amzn/stencil-react-components/dist/submodules/form/detailed-radio";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { SelfIdEthnicBackgroundItems, SelfIdGenderRadioItems } from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";

const EqualOpportunityForm = () => {

  return (
    <Col gridGap={15}>
      <Text fontSize="T200">Amazon values all forms of diversity and is subject to certain nondiscrimination and
        affirmative action recordkeeping and reporting requirements which require us to invite candidates and employees
        to voluntarily self-identify their gender and race/ethnicity. Submission of this information is voluntary and
        refusal to provide it will not subject you to any adverse treatment. The information obtained will be kept
        confidential and may only be used in accordance with the provisions of applicable federal laws, executive
        orders, and regulations, including those which require the information to be summarized and reported to the
        Federal Government for civil rights enforcement purposes. If you choose not to self-identify your gender or
        race/ethnicity at this time, the federal government requires us to determine this information for employees by
        visual survey and /or other available information.</Text>
      <Col gridGap={15}>
        <FormWrapper columnGap={10}>
          <LabelText>What is your gender? * </LabelText>
          {
            SelfIdGenderRadioItems.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="gender"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || '', details) : undefined}
                  key={title}
                />
              );
            })
          }
        </FormWrapper>

        <FormWrapper columnGap={10}>
          <LabelText>What is your race/ethnic background? * </LabelText>
          {
            SelfIdEthnicBackgroundItems.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="race/ethnic"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || '', details) : undefined}
                  key={title}
                />
              );
            })
          }
        </FormWrapper>
      </Col>
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary}>
          Next
        </Button>
      </Col>
    </Col>
  )
}

export default EqualOpportunityForm;
