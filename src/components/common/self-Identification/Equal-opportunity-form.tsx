import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import { FormWrapper } from "@amzn/stencil-react-components/form";
import { DetailedRadio } from "@amzn/stencil-react-components/dist/submodules/form/detailed-radio";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { SelfIdEthnicBackgroundItems, SelfIdGenderRadioItems } from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import { handleSubmitSelfIdEqualOpportunity } from "../../../utils/helper";
import { SelfIdEqualOpportunityStatus } from "../../../utils/types/common";
import { CommonColors } from "../../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { connect } from "react-redux";

interface MapStateToProps {
  application: ApplicationState,
  candidate: CandidateState,
  selfIdentification: SelfIdentificationState
}

interface EqualOpportunityFormProps {

}

type EqualOpportunityFormMergedProps = MapStateToProps & EqualOpportunityFormProps;

const EqualOpportunityForm = (props: EqualOpportunityFormMergedProps) => {

  const { candidate, application, selfIdentification } = props;
  const { stepConfig } = selfIdentification;
  const candidateData = candidate.results.candidateData;
  const selfIdentificationInfoData = candidateData?.selfIdentificationInfo;
  const applicationData = application.results;
  const [gender, setGender] = useState();
  const [ethnicity, setEthnicity] = useState();
  const [isGenderMissing, setIsGenderMissing] = useState(false);
  const [isEthnicityMissing, setIsEthnicityMissing] = useState(false);

  const handleClickNext = () => {
    const isFormValid = !!gender && !!ethnicity;

    if(isFormValid) {
      const payload: SelfIdEqualOpportunityStatus = {gender, ethnicity};
      applicationData && handleSubmitSelfIdEqualOpportunity(applicationData, payload, stepConfig);
    }
    else {
      setIsGenderMissing(!gender);
      setIsEthnicityMissing(!ethnicity);
    }
  }

  useEffect(() => {
    setEthnicity(selfIdentificationInfoData?.ethnicity);
    setGender(selfIdentificationInfoData?.gender);
  }, [selfIdentificationInfoData])

  return (
    <Col gridGap={15}>
      <Text fontSize="T200">
        {t("BB-SelfId-equal-opportunity-form-statement-text", "Amazon values all forms of diversity and is subject to certain nondiscrimination and affirmative action recordkeeping and reporting requirements which require us to invite candidates and employees to voluntarily self-identify their gender and race/ethnicity. Submission of this information is voluntary and refusal to provide it will not subject you to any adverse treatment. The information obtained will be kept confidential and may only be used in accordance with the provisions of applicable federal laws, executive orders, and regulations, including those which require the information to be summarized and reported to the Federal Government for civil rights enforcement purposes. If you choose not to self-identify your gender or race/ethnicity at this time, the federal government requires us to determine this information for employees by visual survey and /or other available information.")}
      </Text>
      <Col gridGap={15}>
        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-gender-label-text", "What is your gender?")} * </LabelText>
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
                  defaultChecked={selfIdentificationInfoData?.gender === value}
                  onChange={() => setGender(value)}
                />
              );
            })
          }
        </FormWrapper>

        {
          isGenderMissing &&
          <Row padding="S300" backgroundColor={CommonColors.RED05}>
            <StatusIndicator
              messageText={"Please check the box to proceed."}
              status={Status.Negative}
              iconAriaHidden={true}
            />
          </Row>
        }

        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-ethnicity-label-text", "What is your race/ethnic background?")} * </LabelText>
          {
            SelfIdEthnicBackgroundItems.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="ethnicity"
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || '', details) : undefined}
                  key={title}
                  defaultChecked={selfIdentificationInfoData?.ethnicity === value}
                  onChange={() => setEthnicity(value)}
                />
              );
            })
          }
        </FormWrapper>
      </Col>
      {
        isEthnicityMissing &&
        <Row padding="S300" backgroundColor={CommonColors.RED05}>
          <StatusIndicator
            messageText={"Please check the box to proceed."}
            status={Status.Negative}
            iconAriaHidden={true}
          />
        </Row>
      }
      <Col padding={{ top: "S300" }}>
        <Button
          variant={ButtonVariant.Primary}
          onClick={handleClickNext}
        >
          {t("BB-SelfId-equal-opportunity-form-ethinicity-next-button-text", "Next")}
        </Button>
      </Col>
    </Col>
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(EqualOpportunityForm);
