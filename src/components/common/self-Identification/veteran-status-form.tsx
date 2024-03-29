import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { LabelText } from "@amzn/stencil-react-components/dist/submodules/employee-banner/AdditionalInfo";
import { DetailedRadio } from "@amzn/stencil-react-components/dist/submodules/form/detailed-radio";
import { FormWrapper } from "@amzn/stencil-react-components/form";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import {
  ProtectedVeteranDefinitionList,
  SelfIdMilitarySpouseRadioItem,
  SelfIdProtectedVeteranRadioItem,
  SelfIdVeteranStatusRadioItem
} from "../../../utils/constants/common";
import { handleSubmitSelfIdVeteranStatus } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { SelfIdentificationVeteranStatus } from "../../../utils/types/common";
import DetailedRadioError from "../DetailedRadioError";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  selfIdentification: SelfIdentificationState;
}

type VeteranStatusFormMergedProps = MapStateToProps;

const VeteranStatusForm = (props: VeteranStatusFormMergedProps) => {

  const { candidate, application, selfIdentification } = props;
  const { stepConfig } = selfIdentification;
  const { candidateData } = candidate.results;
  const selfIdentificationInfoData = candidateData?.selfIdentificationInfo;
  const applicationData = application.results;
  const [militarySpouse, setMilitarySpouse] = useState();
  const [protectedVeteran, setProtectedVeteran] = useState();
  const [veteran, setVeteran] = useState();
  const [isMilitarySpouseMissing, setIsMilitarySpouseMissing] = useState(false);
  const [isProtectedVeteranMissing, setIsProtectedVeteranMissing] = useState(false);
  const [isVeteranMissingMissing, setIsVeteranMissingMissing] = useState(false);
  const pageName = METRIC_NAME.VETERAN_STATUS_FORM;

  const handleCLickNext = () => {
    boundResetBannerMessage();
    const isFormValid = !!militarySpouse && !!protectedVeteran && !!veteran;

    if (isFormValid) {
      const payload: SelfIdentificationVeteranStatus = { militarySpouse, protectedVeteran, veteran };
      applicationData && handleSubmitSelfIdVeteranStatus(applicationData, payload, stepConfig);
    } else {
      setIsVeteranMissingMissing(!veteran);
      setIsProtectedVeteranMissing(!protectedVeteran);
      setIsMilitarySpouseMissing(!militarySpouse);
    }
  };

  useEffect(() => {
    setProtectedVeteran(selfIdentificationInfoData?.protectedVeteran);
    setVeteran(selfIdentificationInfoData?.veteran);
    setMilitarySpouse(selfIdentificationInfoData?.militarySpouse);
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

  const protectedVeteranStatement: string = t("BB-SelfId-equal-opportunity-form-protected-veteran-statement-text", "Amazon is a Federal Government contractor subject to the Vietnam Era Veterans\' Readjustment Assistance Act of 1974, as amended by the Jobs for Veterans Act of 2002, <a href='https://www.govinfo.gov/content/pkg/USCODE-2018-title38/html/USCODE-2018-title38-partIII-chap42-sec4212.htm' target='_blank' rel='noopener noreferrer'> 38 U.S.C.4212 </a> (VEVRAA), which requires Government contractors to take affirmative action to employ and advance in employment (1) disabled veterans; (2) recently separated veterans; (3) active duty wartime or campaign badge veterans; and (4) Armed Forces service medal veterans. The following invitation to self-identify your protected veteran status is made pursuant to Section 4212. Disclosure of this information is completely voluntary and refusing to provide it will not subject you to any adverse treatment.");
  const protectedVeteranStatementListTitle: string = t("BB-SelfId-equal-opportunity-form-protected-veteran-definition-list-title-text", "<b>A protected veteran</b> is any of the following:");

  return (
    <Col gridGap={15}>
      <Col gridGap={15}>
        <Text>
          {t("BB-SelfId-veteran-status-form-statement-paragraph1-text", "At Amazon, thousands of veterans and military spouses are driving innovation and raising the bar on customer experience. On a daily basis, those with military backgrounds are able to apply their knowledge, skills, andleadership abilities in a wide variety of careers – influencing change across the globe. For these reasons, we are actively pursuing the hiring of veterans and military spouses.")}
        </Text>
        <Text>
          {t("BB-SelfId-veteran-status-form-statement-paragraph2-text", "To help us track our progress and to provide you with information on programs developed for veterans and military spouses at Amazon, we encourage you to disclose your status as a veteran (a currently serving or former member of the U.S. Armed Forces) or a military spouse, below. Providing this information is completely voluntary and refusing to provide it will not subject you to any adverse treatment.")}
        </Text>
      </Col>

      <Col gridGap={15}>
        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-veteran-status-label-text", "Are you a veteran?")} * </LabelText>
          {
            SelfIdVeteranStatusRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="veteranStatus"
                  key={titleTranslationKey}
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
                  defaultChecked={selfIdentificationInfoData?.veteran === value}
                  onChange={() => setVeteran(value)}
                />
              );
            })
          }
        </FormWrapper>

        {
          isVeteranMissingMissing && <DetailedRadioError />
        }

        <FormWrapper columnGap={10}>
          <LabelText>{t("BB-SelfId-equal-opportunity-form-military-spouse-label-text", "Are you a military spouse?")} * </LabelText>
          {
            SelfIdMilitarySpouseRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="militarySpouse"
                  key={titleTranslationKey}
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
                  defaultChecked={selfIdentificationInfoData?.militarySpouse === value}
                  onChange={() => setMilitarySpouse(value)}
                />
              );
            })
          }
        </FormWrapper>

        {
          isMilitarySpouseMissing && <DetailedRadioError />
        }

        <Col gridGap={5} className="protectedVetContainer">
          <Text>
            <InnerHTML className="protectedVeteranStatement" html={protectedVeteranStatement} />
          </Text>
          <Text>
            <InnerHTML className="protectedVeteranStatementListTitle" html={protectedVeteranStatementListTitle} />
          </Text>
          <ol>
            {
              ProtectedVeteranDefinitionList.map(item => {
                const title = t(item.titleTranslationKey, item.title);
                return (
                  <li key={item.titleTranslationKey}>
                    <InnerHTML className="protectedVeteranStatementListItem" html={title} />
                  </li>
                );
              })
            }
          </ol>
        </Col>

        <FormWrapper columnGap={10}>
          <LabelText>
            {t("BB-SelfId-equal-opportunity-form-protected-veteran-select-label-text", "If you believe you belong to any of the categories of protected veterans please indicate by checking the appropriate box below.")} *
          </LabelText>
          {
            SelfIdProtectedVeteranRadioItem.map(radioItem => {
              const { value, title, titleTranslationKey, detailsTranslationKey, details } = radioItem;
              return (
                <DetailedRadio
                  name="protectedVeteran"
                  key={titleTranslationKey}
                  value={value}
                  titleText={t(titleTranslationKey, title)}
                  details={details ? t(detailsTranslationKey || "", details) : undefined}
                  defaultChecked={selfIdentificationInfoData?.protectedVeteran === value}
                  onChange={() => setProtectedVeteran(value)}
                />
              );
            })
          }
        </FormWrapper>

        {
          isProtectedVeteranMissing && <DetailedRadioError />
        }

      </Col>
      <Col padding={{ top: "S300" }}>
        <Button
          variant={ButtonVariant.Primary}
          onClick={handleCLickNext}
        >
          {t("BB-SelfId-equal-opportunity-form-protected-veteran-next-button-text", "Next")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(VeteranStatusForm);
