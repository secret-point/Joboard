import React, { useEffect, useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { MessageBanner, MessageBannerType } from "@amzn/stencil-react-components/message-banner";
import moment from "moment";
import { connect } from "react-redux";
import { ApplicationState } from "../../reducers/application.reducer";
import { routeToAppPageWithPath, showCounterBanner } from "../../utils/helper";
import { translate as t } from "../../utils/translator";
import { PAGE_ROUTES } from "../pageRoutes";
import scheduleDetails from "./jobOpportunity/ScheduleDetails";

const HOUR_IN_SECONDS = 3600;
const MIN_IN_SECONDS = 60;
const RESERVED_TIME_IN_HOURS = 3;

interface MapStateToProps {
  application: ApplicationState;
}

let myInterval: any = null;
let reserveTime: number;

export const CounterMessageBanner = (props: MapStateToProps) => {
  const { application } = props;

  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const applicationData = application.results;
  const { SESSION_TIMEOUT } = PAGE_ROUTES;

  useEffect(() => {
    showCounterBanner() && initiateCounter();
  }, [hours, applicationData, minutes]);

  const initiateCounter = () => {
    if (applicationData && (applicationData.jobSelected || applicationData.jobScheduleSelected)) {
      const startCountTime: string = applicationData.jobSelected?.jobSelectedOn || applicationData.jobScheduleSelected?.jobScheduleSelectedTime;

      reserveTime = moment(startCountTime).unix() + HOUR_IN_SECONDS * RESERVED_TIME_IN_HOURS - moment().unix();
      setHours(Math.floor(reserveTime / HOUR_IN_SECONDS));
      setMinutes(Math.floor((reserveTime - hours * HOUR_IN_SECONDS) / MIN_IN_SECONDS));

      if (reserveTime < MIN_IN_SECONDS) {
        routeToAppPageWithPath(SESSION_TIMEOUT);
      }

      if (reserveTime > MIN_IN_SECONDS) {
        myInterval = setInterval(() => {
          setHours(Math.floor(reserveTime / HOUR_IN_SECONDS));
          setMinutes(Math.floor((reserveTime - hours * HOUR_IN_SECONDS) / MIN_IN_SECONDS));

          if (reserveTime < MIN_IN_SECONDS) {
            clearInterval(myInterval);
          }

        }, MIN_IN_SECONDS * 1000);
      }
    }
  };

  const showBanner = applicationData && showCounterBanner() && !applicationData.shiftPreference && scheduleDetails;

  return (
    <>
      {
        // we don't show this counter in shift preference flow: https://sim.amazon.com/issues/Kondo_QA_Issue-67
        showBanner && (
          <Col id="counter-message-banner" padding={{ top: "S300", bottom: "S300" }}>
            <MessageBanner
              type={MessageBannerType.Warning}
              aria-live="assertive"
              iconAltText="warn"
            >
              {t("BB-counter-message-banner-text", `We are holding a spot for you for the next ${hours} hours and ${minutes} minutes to complete the remaining steps.`, {
                hours,
                minutes
              })}
            </MessageBanner>
          </Col>
        )}
    </>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CounterMessageBanner);
