import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import { DetailedRadio } from "@amzn/stencil-react-components/dist/submodules/form/detailed-radio";
import { FormWrapper } from "@amzn/stencil-react-components/form";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import {
  SelfIdEthnicBackgroundItemsMap,
  SelfIdGenderRadioItemsMap,
  SelfIdPronounsItemsMap
} from "../../../utils/constants/common";
import { getCountryCode, getDetailedRadioErrorMap, handleSubmitSelfIdEqualOpportunity } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { SelfIdEqualOpportunityStatus } from "../../../utils/types/common";
import DetailedRadioError from "../DetailedRadioError";
import { CountryCode } from "../../../utils/enums/common";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  selfIdentification: SelfIdentificationState;
}

interface EqualOpportunityFormProps {

}

type EqualOpportunityFormMergedProps = MapStateToProps & EqualOpportunityFormProps;

export const EqualOpportunityForm = (props: EqualOpportunityFormMergedProps) => {

  const { candidate, application, selfIdentification } = props;
  const { stepConfig } = selfIdentification;
  const {candidateData} = candidate.results;
  const selfIdentificationInfoData = candidateData?.selfIdentificationInfo;
  const applicationData = application.results;
  const [gender, setGender] = useState();
  const [ethnicity, setEthnicity] = useState();
  const [pronoun, setPronoun] = useState();
  const [isGenderMissing, setIsGenderMissing] = useState(false);
  const [isEthnicityMissing, setIsEthnicityMissing] = useState(false);
  const [isPronounMissing, setIsPronounMissing] = useState(false);
  const pageName = METRIC_NAME.EQUAL_OPPORTUNITY_FORM;
  const countryCode = getCountryCode();
  const { errorMessage, errorMessageTranslationKey } = getDetailedRadioErrorMap(countryCode);

  const handleClickNext = () => {
    boundResetBannerMessage();
    const isPronounValid = getCountryCode() === CountryCode.MX ? !!pronoun : true;
    const isFormValid = !!gender && !!ethnicity && isPronounValid;

    if(isFormValid) {
      const payload: SelfIdEqualOpportunityStatus = {gender, ethnicity, pronoun};
      applicationData && handleSubmitSelfIdEqualOpportunity(applicationData, payload, stepConfig);
    }
    else {
      setIsGenderMissing(!gender);
      setIsEthnicityMissing(!ethnicity);
      setIsPronounMissing(!pronoun);
    }
  };

  useEffect(() => {
    setEthnicity(selfIdentificationInfoData?.ethnicity);
    setGender(selfIdentificationInfoData?.gender);
    setPronoun(selfIdentificationInfoData?.pronoun);
  }, [selfIdentificationInfoData]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    applicationData && candidateData && addMetricForPageLoad(pageName);
  }, [applicationData, candidateData, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const SelfIdPronounsItemList = SelfIdPronounsItemsMap[getCountryCode()];

  return (
    <Col gridGap={15}>
      <Text fontSize="T200">
        {t("BB-SelfId-equal-opportunity-form-statement-text", "Amazon values all forms of diversity and is subject to certain nondiscrimination and affirmative action recordkeeping and reporting requirements which require us to invite candidates and employees to voluntarily self-identify their gender and race/ethnicity. Submission of this information is voluntary and refusal to provide it will not subject you to any adverse treatment. The information obtained will be kept confidential and may only be used in accordance with the provisions of applicable federal laws, executive orders, and regulations, including those which require the information to be summarized and reported to the Federal Government for civil rights enforcement purposes. If you choose not to self-identify your gender or race/ethnicity at this time, the federal government requires us to determine this information for employees by visual survey and /or other available information.")}
      </Text>
      <Col gridGap={15}>
        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-gender-label-text", "What is your gender?")} * </LabelText>
          {
            SelfIdGenderRadioItemsMap[getCountryCode()].map(radioItem => {
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
          isGenderMissing && <DetailedRadioError errorMessage={errorMessage} errorMessageTranslationKey={errorMessageTranslationKey}/>
        }

        {
          SelfIdPronounsItemList?.length > 0 &&
          <FormWrapper columnGap={10}>
            <LabelText>{t("BB-SelfId-equal-opportunity-form-pronoun-label-text", "What is your pronoun?")} * </LabelText>
            {
              SelfIdPronounsItemsMap[getCountryCode()].map(radioItem => {
                const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
                return (
                  <DetailedRadio
                    name="pronoun"
                    value={value}
                    titleText={t(titleTranslationKey, title)}
                    details={details ? t(detailsTranslationKey || "", details) : undefined}
                    key={title}
                    defaultChecked={selfIdentificationInfoData?.pronoun === value}
                    onChange={() => setPronoun(value)}
                  />
                );
              })
            }
          </FormWrapper>
        }

        {
          SelfIdPronounsItemList?.length > 0 && isPronounMissing && <DetailedRadioError errorMessage={errorMessage} errorMessageTranslationKey={errorMessageTranslationKey}/>
        }

        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-ethnicity-label-text", "What is your race/ethnic background?")} * </LabelText>
          {
            SelfIdEthnicBackgroundItemsMap[getCountryCode()].map(radioItem => {
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
        isEthnicityMissing && <DetailedRadioError errorMessage={errorMessage} errorMessageTranslationKey={errorMessageTranslationKey}/>
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
