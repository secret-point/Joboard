import React, { useEffect, useState } from "react";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { DetailedRadio, InputWrapper, TextAreaWithRecommendedLength } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { Label, Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import isNil from "lodash/isNil";
import set from "lodash/set";
import { connect } from "react-redux";
import { boundSetCandidatePatchRequest } from "../../../actions/CandidateActions/boundCandidateActions";
import { ApplicationState } from "../../../reducers/application.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { CommonColors } from "../../../utils/colors";
import {
  ConvictionDetailConfig,
  ConvictionInfoRadioConfig,
  CriminalConvictionConfigList
} from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  bgc: BGCState;
  candidate: CandidateState;
}

interface CriminalRecordFormProps {

}

type CriminalRecordFormMergedProps = MapStateToProps & CriminalRecordFormProps;

export const CriminalRecordForm = ( props: CriminalRecordFormMergedProps ) => {

  const { candidate } = props;
  const { candidatePatchRequest, formError } = candidate;
  const { candidateData } = candidate.results;
  const additionalBgc = candidateData?.additionalBackgroundInfo;

  const [hasCriminalRecord, setHasCriminalRecord] = useState(additionalBgc?.hasCriminalRecordWithinSevenYears);

  useEffect(() => {
    setHasCriminalRecord(additionalBgc?.hasCriminalRecordWithinSevenYears);
  }, [additionalBgc]);

  const missingCriminalRecord = get(formError, ConvictionInfoRadioConfig.dataKey) && isNil(hasCriminalRecord);
  const missingConvictionDetails = get(formError, ConvictionDetailConfig.dataKey);

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-BGC-criminal-record-list-previous-conviction-question-text", "Previous Conviction Question")}
      onCloseButtonClick={close}
    >
      <Col width="100%" padding="S300" gridGap={15}>
        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-list-convictions-text", "<strong>Please list only convictions that are a matter of public record.</strong>  Arrests resolved in your favor are not convictions. Similarly, do not include any information relating to a conviction in the juvenile justice system, or a matter considered in or processed through the juvenile justice system, or charges that led to a diversion program or cases that have been dismissed, dismissed under a first offender’s law, sealed, expunged, pardoned, judicially dismissed or otherwise treated as non-convictions by law.  <strong>You are also not required to disclose violations, infractions, petty misdemeanors, or summary offenses.</strong>")} />
        </Text>

        <Text fontSize="T200">
          {t("BB-BGC-criminal-record-used-in-accordance-with-applicable-law-text", "A criminal record will not necessarily bar you from employment, continued employment, or an engagement as an independent contractor with Amazon.  This information will only be used in accordance with applicable law and only for the purpose of determining whether the conviction is related to the job/engagement for which you applied.  Failure to answer this question honestly or to provide the requested additional details of the offense(s) may result in discontinued consideration of your application for employment or for an independent contractor engagement or, if you are already employed by and/or engaged as an independent contractor with Amazon, such failure may result in termination of your employment or engagement.")}
        </Text>

        <Text fontSize="T300" textAlign="center" fontWeight="bold" textDecoration="underline">
          {t("BB-BGC-criminal-record-you-must-review-text", "You must review the state law information below before providing additional information about your criminal history")}
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-california-text", "<strong>California:</strong> Do not include non-felony marijuana-related infractions or misdemeanor convictions that are more than 2 years old.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-san-francisco-text", "<strong>San Francisco, California:</strong> Do not include, offenses that are more than seven (7) years old from the date of sentencing, such that you should not include <strong>any</strong> period of incarceration in the calculation of the seven-year period_.  Do not include offenses that are not misdemeanors or felonies, such as infractions, or convictions related to conduct that has been decriminalized since the conviction date, including but not limited to marijuana offenses.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-colorado-text", "<strong>Colorado:</strong> Do not include information regarding a record of civil or military disobedience, unless the record resulted in a plea of guilty or a conviction by a court of competent jurisdiction.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-massachusetts-text", "<strong>Massachusetts:</strong> Do not provide a copy of your criminal history report.  Do not identify first-time misdemeanor convictions for drunkenness, simple assault, speeding, minor traffic violations, affray or disturbance of the peace. Also do not identify convictions for other misdemeanors where the date of conviction or the end of any period of incarceration was more than 3 years ago, unless there have been subsequent convictions within those 3 years. An applicant for employment with a record expunged pursuant to section 100F, section 100G, section 100H or section 100K of chapter 276 of the General Laws may answer ‘no record’ with respect to an inquiry herein relative to prior arrests, criminal court appearances or convictions. An applicant for employment with a record expunged pursuant to section 100F, section 100G, section 100H or section 100K of chapter 276 of the General Laws may answer 'no record' to an inquiry herein relative to prior arrests, criminal court appearances, juvenile court appearances, adjudications or convictions.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-new-york-text", '<strong>New York:</strong> Do not identify any actions that terminated in your favor pursuant to Criminal Procedure Law ("CPL") §160.50.')} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-ohio-text", "<strong>Ohio:</strong> Do not report any conviction for a misdemeanor drug violation as defined under Ohio Rev. Code 2925.11.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-pennsylvania-text", "<strong>Philadelphia, Pennsylvania:</strong> Do not include any convictions that occurred more than seven (7) years from the date of this inquiry.  <strong>Any period of incarceration should not be included in the calculation of the seven-year period.</strong>")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-virginia-text", "<strong>Virginia:</strong> Do not report a misdemeanor drug possession conviction, as defined under Section 18.2-250.1 of the Code of Virginia.")} />
        </Text>

        <Text fontSize="T200">
          <InnerHTML html={t("BB-BGC-criminal-record-you-must-review-state-washington-text", "<strong>Seattle, Washington:</strong> In addition to the below, you may exclude a criminal conviction that has been the subject of a certificate of rehabilitation or other equivalent procedure based on a finding of the rehabilitation.")} />
        </Text>
      </Col>
    </FlyoutContent>
  );

  return (
    <Col gridGap={15} padding={{ top: "S300" }}>
      <Text>
        {t("BB-BGC-criminal-record-within-seven-years-question-text", "Have you been convicted of misdemeanor or felony or been released from prison or parole from a misdemeanor or felony conviction in last seven (7) years?")}
      </Text>
      {
        CriminalConvictionConfigList.map(item => (
          <DetailedRadio
            name="criminal-conviction-radio-col"
            key={item.title}
            value={`${item.value}`}
            titleText={t(item.titleTranslationKey, item.title)}
            onChange={() => {
              setHasCriminalRecord(item.value);
              const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
              set(newCandidate, item.dataKey, item.value);

              // reset criminal details when selected no
              if (!item.value) {
                set(newCandidate, "additionalBackgroundInfo.convictionDetails", null);
              }

              boundSetCandidatePatchRequest(newCandidate);
            }}
            defaultChecked={item.value === additionalBgc?.hasCriminalRecordWithinSevenYears}
            error={missingCriminalRecord}
          />
        ))
      }
      {missingCriminalRecord && (
        <Row padding="S300" backgroundColor={CommonColors.RED05}>
          <StatusIndicator
            messageText={t(ConvictionInfoRadioConfig.errorMessageTranslationKey || "", ConvictionInfoRadioConfig.errorMessage || "" )}
            status={Status.Negative}
            iconAriaHidden
          />
        </Row>
      )}
      {
        hasCriminalRecord && (
          <Col gridGap={15}>
            <Row>
              <WithFlyout renderFlyout={renderFlyout}>
                {({ open }) => (
                  <Text
                    fontWeight="medium"
                    color={CommonColors.Blue70}
                    style={{ cursor: "pointer" }}
                    onClick={open}
                  >
                    {t("BB-BGC-criminal-record-what-information-to-include-text", "What Information to include")}
                  </Text>
                )}
              </WithFlyout>
            </Row>
            <InputWrapper
              id="text-area-wrl-id-1"
              labelText={t(ConvictionDetailConfig.labelTranslationKey || "", ConvictionDetailConfig.labelText)}
              error={missingConvictionDetails}
              renderLabel={() => (
                <Row
                  alignItems="center"
                  id={"criminal-record-renderLabel"}
                  gridGap={"S300"}
                  dataTestId="formInputItem-renderLabel"
                  width="100%"
                >
                  <Label htmlFor="criminal-record-renderLabel-label" style={{ width: "100%" }}>
                    <Row
                      gridGap={8}
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Text fontWeight="bold">
                        {t(ConvictionDetailConfig.labelTranslationKey || "", ConvictionDetailConfig.labelText)}
                      </Text>
                      {
                        ConvictionDetailConfig.required && (
                          <Row>
                            <Text color="red"> * </Text>
                          </Row>
                        )}
                    </Row>
                  </Label>
                </Row>
              )}
            >
              {textAreaProps => (
                <TextAreaWithRecommendedLength
                  {...textAreaProps}
                  recommendedCharacterCount={500}
                  getRecommendedCharactersText={({ characterCount, recommendedCharacterCount }) =>
                    t("BB-BGC-criminal-record-recommended-character-count-text", `${characterCount} characters entered (max ${recommendedCharacterCount} characters)`, { characterCount, recommendedCharacterCount })
                  }
                  defaultValue={additionalBgc?.convictionDetails || ""}
                  onChange={(e) => {
                    const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
                    const value = e.target.value || "";
                    set(newCandidate, "additionalBackgroundInfo.convictionDetails", value.trim());
                    boundSetCandidatePatchRequest(newCandidate);
                  }}
                  error={missingConvictionDetails}
                />
              )}
            </InputWrapper>
            {
              missingConvictionDetails && (
                <Row padding="S300" backgroundColor={CommonColors.RED05}>
                  <StatusIndicator
                    messageText={t(ConvictionDetailConfig.errorMessageTranslationKey || "", ConvictionDetailConfig.errorMessage || "" )}
                    status={Status.Negative}
                    iconAriaHidden
                  />
                </Row>
              )}
          </Col>
        )}
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(CriminalRecordForm);
