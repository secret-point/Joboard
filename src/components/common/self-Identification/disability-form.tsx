import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import { DetailedRadio, FormWrapper } from "@amzn/stencil-react-components/form";
import { Col } from "@amzn/stencil-react-components/layout";
import { H5, Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import { CommonColors } from "../../../utils/colors";
import { DisabilityList, SelfIdDisabilityRadioItem } from "../../../utils/constants/common";
import {
  handleSubmitSelfIdDisabilityStatus,
  isSelfIdentificationInfoValidBeforeDisability
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { SelfIdentificationDisabilityStatus } from "../../../utils/types/common";
import DetailedRadioError from "../DetailedRadioError";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  selfIdentification: SelfIdentificationState;
}

interface DisabilityFormProps {

}

type DisabilityFormMergedProps = MapStateToProps & DisabilityFormProps;

const DisabilityForm = (props: DisabilityFormMergedProps) => {

  const { candidate, application, selfIdentification } = props;
  const { stepConfig } = selfIdentification;
  const { candidateData } = candidate.results;
  const selfIdentificationInfoData = candidateData?.selfIdentificationInfo;
  const applicationData = application.results;
  const [disability, setDisability] = useState();
  const [isDisabilityMissing, setDisabilityMissing] = useState(false);
  const pageName = METRIC_NAME.DISABILITY_FORM;
  let errorMessage = "Please check the box to proceed.";

  const handleClickNext = () => {
    boundResetBannerMessage();
    const isFormValid = !!disability;

    const isSelfIdValid = isSelfIdentificationInfoValidBeforeDisability(selfIdentificationInfoData);

    if (isFormValid && isSelfIdValid) {
      const payload: SelfIdentificationDisabilityStatus = { disability };
      applicationData && handleSubmitSelfIdDisabilityStatus(applicationData, payload, stepConfig);
    }
    else if (isFormValid && !isSelfIdValid){
      errorMessage = "Please check all required boxes in previous steps to proceed."
    }
    else {
      setDisabilityMissing(!disability);
    }
  }

  useEffect(() => {
    setDisability(selfIdentificationInfoData?.disability);
  }, [selfIdentificationInfoData])

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

  return (
    <Col gridGap={15}>
      <Col gridGap={3} color={CommonColors.Neutral50}>
        <Text fontSize="T200">{t('BB-SelfId-disability-form-name-text', 'Form CC-305')}</Text>
        <Text fontSize="T200">{t('BB-SelfId-disability-form-control-number-text', 'OMB Control Number 1250-0005')}</Text>
        <Text fontSize="T200">{t('BB-SelfId-disability-form-expiration-date-text','Expires 05/31/2023')}</Text>
      </Col>
      <Col gridGap={10}>
        <H5>{t("BB-SelfId-disability-form-why-this-form-header-text", "Why are you asked to complete this form?")}</H5>
        <Text fontSize="T200">
          {t("BB-SelfId-disability-form-why-this-form-content-paragraph1-text", "We are a federal contractor or subcontractor required by law to provide equal employment opportunity to qualified people with disabilities. We are also required to measure our progress toward having at least 7% ofour workforce be individuals with disabilities. To do this, we must ask applicants and employees if they have a disability or have ever had a disability. Because a person may become disabled at any time, we ask all of our employees to update their information at least every five years.")}
        </Text>
        <Text fontSize="T200">
          <InnerHTML html={t("BB-SelfId-disability-form-why-this-form-content-paragraph2-text", "Identifying yourself as an individual with a disability is voluntary, and we hope that you will choose to do so. Your answer will be maintained confidentially and not be seen by selecting officials or anyone else involved in making personnel decisions. Completing the form will not negatively impact you in any way, regardless of whether you have self-identified in the past. For more information about this form or the equal employment obligations of federal contractors under Section 503 of the Rehabilitation Act, visit the U.S. Department of Labor’s Office of Federal Contract Compliance Programs (OFCCP) website at <a href='https://www.dol.gov/agencies/ofccp' target='_blank' rel='noopener noreferrer'>www.dol.gov/ofccp</a>.")} />
        </Text>
      </Col>
      <Col className="disabilityListContainer" gridGap={15}>
        <H5>{t("BB-SelfId-disability-form-how-know-have-disability-header-text", "How do I know if I have a disability?")}</H5>
        <Text fontSize="T200">
          {t("BB-SelfId-disability-form-how-know-have-disability-content-text", "You are considered to have a disability if you have a physical or mental impairment or medical condition that substantially limits a major life activity, or if you have a history or record of such an impairment or medical condition.")}
        </Text>
        <Text>{t("BB-SelfId-disability-form-disability-scope-list-header-text", "Disabilities include, but are not limited to:")}</Text>
        <ul>
          {
            DisabilityList.map(item => (
              <li key={item.title}>{t(item.translationKeyTitle, item.title)}</li>
            ))
          }
        </ul>
      </Col>
      <FormWrapper columnGap={10}>
        <LabelText>{t("BB-SelfId-disability-form-disability-checkbox-label-text", "Please check one of the boxes below")} *</LabelText>
        {
          SelfIdDisabilityRadioItem.map(radioItem => {
            const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
            return (
              <DetailedRadio
                name="disability"
                value={value}
                titleText={t(titleTranslationKey, title)}
                details={details ? t(detailsTranslationKey || "", details) : undefined}
                key={title}
                defaultChecked={selfIdentificationInfoData?.disability === value}
                onChange={() => setDisability(value)}
              />
            );
          })
        }
      </FormWrapper>

      {
        isDisabilityMissing && <DetailedRadioError/>
      }

      <Col gridGap={15}>
        <H5>{t("BB-SelfId-disability-form-disability-public-burden-header-text", "Public burden statement")}</H5>
        <Text fontSize="T200">
          {t("BB-SelfId-disability-form-disability-public-burden-content-text", "According to the Paperwork Reduction Act of 1995 no persons are required to respond to a collection of information unless such collection displays a valid OMB control number. This survey should take about 5 minutes to complete.")}
        </Text>
      </Col>
      <Col padding={{ top: "S300" }}>
        <Button
          variant={ButtonVariant.Primary}
          onClick={handleClickNext}
        >
          {t("BB-SelfId-disability-form-submit-button-text", "Submit")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(DisabilityForm);
