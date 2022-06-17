import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { FormWrapper } from "@amzn/stencil-react-components/form";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import {
  SelfIdMilitarySpouseRadioItem,
  SelfIdProtectedVeteranRadioItem,
  SelfIdVeteranStatusRadioItem
} from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";
import { DetailedRadio } from "@amzn/stencil-react-components/dist/submodules/form/detailed-radio";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";

const VeteranStatusForm = () => {
  return (
    <Col gridGap={15}>
      <Col gridGap={15}>
        <Text>
          At Amazon, thousands of veterans and military spouses are driving innovation and raising the bar on customer
          experience. On a daily basis, those with military backgrounds are able to apply their knowledge, skills, and
          leadership abilities in a wide variety of careers – influencing change across the globe. For these reasons, we
          are actively pursuing the hiring of veterans and military spouses.
        </Text>
        <Text>
          To help us track our progress and to provide you with information on programs developed for veterans and
          military spouses at Amazon, we encourage you to disclose your status as a veteran (a currently serving or
          former member of the U.S. Armed Forces) or a military spouse, below. Providing this information is completely
          voluntary and refusing to provide it will not subject you to any adverse treatment.
        </Text>
      </Col>

      <Col gridGap={15}>
        <FormWrapper columnGap={10}>
          <LabelText>What is your gender? * </LabelText>
          {
            SelfIdVeteranStatusRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="veteranStatus"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
                />
              );
            })
          }
        </FormWrapper>

        <FormWrapper columnGap={10}>
          <LabelText>What is your gender? * </LabelText>
          {
            SelfIdMilitarySpouseRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="militarySpouse"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
                />
              );
            })
          }
        </FormWrapper>

        <Col gridGap={5} className="protectedVetContainer">
          <Text>
            Amazon is a Federal Government contractor subject to the Vietnam Era Veterans' Readjustment Assistance Act
            of 1974, as amended by the Jobs for Veterans Act of 2002, <a
            href="https://www.govinfo.gov/content/pkg/USCODE-2018-title38/html/USCODE-2018-title38-partIII-chap42-sec4212.htm"
            target="_blank" rel="noopener noreferrer"> 38 U.S.C.4212 </a> (VEVRAA), which requires Government contractors to take affirmative action to employ and advance in
            employment (1) disabled veterans; (2) recently separated veterans; (3) active duty wartime or campaign badge
            veterans; and (4) Armed Forces service medal veterans. The following invitation to self-identify your
            protected veteran status is made pursuant to Section 4212. Disclosure of this information is completely
            voluntary and refusing to provide it will not subject you to any adverse treatment.
          </Text>
          <Text><b>A protected veteran</b> is any of the following:</Text>
          <ol>
            <li>
              <b>Disabled Veteran</b>: a veteran of the U.S. military, ground, naval or air service who is entitled to
              compensation (or who but for the receipt of military retired pay would be entitled to compensation) under
              laws administered by the Secretary of Veterans Affairs; or a person who was discharged or released from
              active duty because of a service-connected disability.
            </li>
            <li>
              <b>Recently Separated Veteran</b>: any veteran during the three-year period beginning on the date of such
              veteran's discharge or release from active duty in the U.S. military, ground, naval, or air service.
            </li>
            <li>
              <b>Active Duty Wartime or Campaign Badge Veteran</b>: a veteran who served on active duty in the U.S.
              military, ground, naval or air service during a war, or in a campaign or expedition for which a campaign
              badge has been authorized under the laws administered by the Department of Defense.

            </li>
            <li>
              <b>Armed Forces Service Medal Veteran</b>: a veteran who, while serving on active duty in the U.S.
              military, ground, naval or air service, participated in a United States military operation for which an
              Armed Forces service medal was awarded pursuant to <a
              href="https://www.federalregister.gov/documents/1996/01/18/96-622/establishing-the-armed-forces-service-medal)"
              target="_blank" rel="noopener noreferrer">Executive Order</a>.
            </li>
          </ol>
        </Col>

        <FormWrapper columnGap={10}>
          <LabelText>What is your gender? * </LabelText>
          {
            SelfIdProtectedVeteranRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="protectedVeteran"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
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
  );
};

export default VeteranStatusForm;
