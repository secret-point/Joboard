import React, { ChangeEvent, useState } from "react";
import { Button, ButtonIconPosition, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { ApplicationState } from "../../../reducers/application.reducer";
import { FullBgcState } from "../../../reducers/fullBgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { FULL_BGC_STEPS } from "../../../utils/enums/common";
import { goToNextFullBgcStep } from "../../../utils/helper";
import { BirthHistoryOtherName, BirthHistoryPersonalInfo, FormInputItem, FullBgcStepConfig } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import {
  BirthHistoryOtherNamesConfigList,
  BirthHistoryGenders,
  BirthHistoryOtherInitialName,
  BirthHistoryInfoItems
} from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";

import { Input, DetailedRadio, InputWrapper } from "@amzn/stencil-react-components/form";
import { PopupDatePicker } from "@amzn/stencil-react-components/date-picker";
import { IconPlus } from "@amzn/stencil-react-components/icons";
interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
}

type BirthHistoryMergedProps = MapStateToProps;

export const BirthHistory = ( props: BirthHistoryMergedProps ) => {
  const { fullBgc } = props;
  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;
  const [otherNames, setOtherNames] = useState<BirthHistoryOtherName[]>([BirthHistoryOtherInitialName]);
  const [personalInfo, setPersonalInfo] = useState<BirthHistoryPersonalInfo>({});
  const handleClickNext = () => {
    goToNextFullBgcStep(stepConfig, FULL_BGC_STEPS.BIRTH_HISTORY, FULL_BGC_STEPS.PROOF_OF_ID1);
  };

  const handleAddOtherName = () => {
    setOtherNames(otherNames => ([...otherNames, { ...BirthHistoryOtherInitialName, id: `Name ${otherNames.length + 1}` } ]) );
  };

  const handleUpdateName = (event: ChangeEvent<HTMLInputElement> | {value: string; name: string; target?: false}, index: number) => {
    const { value, name } = event.target || event;
    setOtherNames((otherNames: BirthHistoryOtherName[]) => {
      otherNames[index] = { ...otherNames[index], [name]: value };
      return otherNames;
    });
  };

  const handleUpdatePersonalInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };
  console.log(otherNames);
  return (
    <Col className="birth-history-container" gridGap={15}>
      <Text fontSize="T200" className="required-asterisk">
        {t("BB-Full-BGC-birth-history-other-names-label", "Have you gone by other names?")}
      </Text>
      {
        BirthHistoryOtherNamesConfigList.map(item => (
          <DetailedRadio
            name="other-name-radio-col"
            key={item.title}
            value={`${item.value}`}
            titleText={t(item.titleTranslationKey, item.title)}
            defaultChecked={item.value}
          />
        ))
      }
      {
        otherNames.map(({ id }, index) => (
          <Col key={id} gridGap={15}>
            <Text fontSize="T200" style={{ fontStyle: "italic" }}>{id}</Text>
            <InputWrapper
              id={`bgc-birth-history-first-name-${index}`}
              labelText={`${t("BB-Full-BGC-birth-history-first-name-label", "First name")}`}
              renderLabel={() => (
                <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                  <Text fontSize="T200" className="required-asterisk">
                    {`${t("BB-Full-BGC-birth-history-first-name-label", "First name")}`}
                  </Text>
                </Row>
              )}
              required
            >
              {inputProps => (
                <Input
                  {...inputProps}
                  name="firstName"
                  onChange={(e) => handleUpdateName(e, index)}
                />
              )}
            </InputWrapper>
            <InputWrapper
              id="bgc-birth-history-last-name"
              labelText={`${t("BB-Full-BGC-birth-history-last-name-label", "Last name")}`}
              renderLabel={() => (
                <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                  <Text fontSize="T200" className="required-asterisk">
                    {`${t("BB-Full-BGC-birth-history-last-name-label", "Last name")}`}
                  </Text>
                </Row>
              )}
              required
            >
              {inputProps => (
                <Input
                  {...inputProps}
                  name="lastName"
                  onChange={(e) => handleUpdateName(e, index)}
                />
              )}
            </InputWrapper>
            <InputWrapper
              id="bgc-birth-history-started-date"
              labelText={t("BB-Full-BGC-birth-history-started-date-with-name-label", "From - date you started using this name")}
              renderLabel={() => (
                <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                  <Text fontSize="T200" className="required-asterisk">
                    {`${t("BB-Full-BGC-birth-history-started-date-with-name-label", "From - date you started using this name")}`}
                  </Text>
                </Row>
              )}
              error={false}
              required
            >
              {inputProps => (
                <PopupDatePicker
                  inputProps={{ ...inputProps, width: "100%" }}
                  onChange={(value) => handleUpdateName({ value, name: "startedDate" }, index)}
                />
              )}
            </InputWrapper>
            <InputWrapper
              id="bgc-birth-history-stopped-date"
              labelText={t("BB-Full-BGC-birth-history-stopped-date-with-name-label", "To - date you stopped using this name")}
              renderLabel={() => (
                <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                  <Text fontSize="T200" className="required-asterisk">
                    {`${t("BB-Full-BGC-birth-history-stopped-date-with-name-label", "To - date you stopped using this name")}`}
                  </Text>
                </Row>
              )}
              error={false}
              required
            >
              {inputProps => (
                <PopupDatePicker
                  name="stoppedDate"
                  inputProps={{ ...inputProps, width: "100%" }}
                  onChange={(value) => handleUpdateName({ value, name: "stoppedDate" }, index)}
                />
              )}
            </InputWrapper>
          </Col>
        ))
      }
      <Button icon={<IconPlus />} iconPosition={ButtonIconPosition.Trailing} variant={ButtonVariant.Tertiary} onClick={handleAddOtherName}>
        {t("BB-Full-BGC-birth-history-add-other-name", "Add other name")}
      </Button>
     
      <Text fontSize="T200" className="required-asterisk">
        {t("BB-Full-BGC-birth-history-gender-label", "What is your gender?")}
      </Text>
      {
        BirthHistoryGenders.map(gender => (
          <DetailedRadio 
            key={gender.title} 
            name="gender-radio-col" 
            value={`${gender.value}`} 
            titleText={t(gender.titleTranslationKey, gender.title)} 
            defaultChecked={gender.value} 
          />
        ))
      }
      {
        BirthHistoryInfoItems.map(({ 
          id,
          name, 
          labelText, 
          labelTranslationKey, 
        }: FormInputItem) => (
          <InputWrapper 
            key={id} 
            id={id}
            labelText={labelText}
            renderLabel={() => (
              <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                <Text fontSize="T200" className="required-asterisk">
                  {`${t(labelTranslationKey as string, labelText)}`}
                </Text>
              </Row>
            )}
          >
            {inputProps => (
              <Input 
                {...inputProps}
                name={name}
                onChange={handleUpdatePersonalInfo}
              />
              
            )}
          </InputWrapper>
        ))
      }
      <DebouncedButton variant={ButtonVariant.Secondary} onClick={handleClickNext}>
        Next
      </DebouncedButton>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(BirthHistory);
