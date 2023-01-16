import { DetailedRadio, InputFooter } from "@amzn/stencil-react-components/form";
import { Col } from "@amzn/stencil-react-components/layout";
import React from "react";
import { localeToLanguageMap, MINIMUM_AVAILABLE_TIME_SLOTS } from "../../../utils/constants/common";
import { formatNheTimeSlotTitle, getCountryCode, renderNheSpokenLanguages, renderNheTimeSlotFullAddress } from "../../../utils/helper";
import { Locale, NHETimeSlot } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";

interface NheCardProps {
  nheTimeSlot: NHETimeSlot;
  handleChange: Function;
}

export const NheTimeSlotCard = (props: NheCardProps) => {

  const { nheTimeSlot, handleChange } = props;

  const availableTimeSlots = nheTimeSlot.availableResources - nheTimeSlot.appointmentsBooked;

  const supportedLanguages = Array.from(renderNheSpokenLanguages(nheTimeSlot), language => {
    return t(...language as [string, string]);
  }).join(", ");

  const countryHasMultipleLanguages = (localeMap: { [key in Locale]: [string, string] }, country: string) => Object.getOwnPropertyNames(localeMap).filter(locale => locale.includes(country)).length > 1;

  return (
    <Col key={nheTimeSlot.timeSlotId}>
      <DetailedRadio
        name="nheTimeSlotCard"
        dataTestId="nheTimeSlotCard"
        titleText={formatNheTimeSlotTitle(nheTimeSlot.dateWithoutFormat)}
        details={(
          <>
            { 
              countryHasMultipleLanguages(localeToLanguageMap, getCountryCode()) && supportedLanguages.length > 0 && <div className="nheSpokenLanguage">{`${t("BB-nhe-spoken-language", "Spoken Language")}: ${supportedLanguages}`}</div>
            }
            <div>{renderNheTimeSlotFullAddress(nheTimeSlot)}</div>
          </>
        )}
        onChange={() => handleChange(nheTimeSlot)}
      />
      {(availableTimeSlots <= MINIMUM_AVAILABLE_TIME_SLOTS) && (
        <InputFooter
          warning
        >
          {t("BB-nhe-few-spots-remaining-text", "Very few spots remaining")}
        </InputFooter>
      )}
    </Col>
  );
};

export default NheTimeSlotCard;
