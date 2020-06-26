import React, { useState, useEffect } from "react";
import {
  MessageBanner,
  MessageBannerType
} from "@stencil-react/components/message-banner";
import ICandidateApplication from "../../@types/ICandidateApplication";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { completeTask } from "../../actions/workflow-actions";

const HOUR_IN_SECONDS = 3600;
const MIN_IN_SECONDS = 60;
const RESERVED_TIME_IN_HOURS = 3;

interface CounterMessageBannerProps {
  application: ICandidateApplication;
}

const CounterMessageBanner: React.FC<CounterMessageBannerProps> = ({
  application
}) => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  let myInterval: any = null;
  let reserveTime: number;

  useEffect(() => {
    if (!isEmpty(application)) {
      const startCountTime: string = application.jobSelected.jobSelectedOn;
      reserveTime =
        moment(startCountTime).unix() +
        HOUR_IN_SECONDS * RESERVED_TIME_IN_HOURS -
        moment().unix();
      setHours(Math.floor(reserveTime / HOUR_IN_SECONDS));
      setMinutes(
        Math.floor((reserveTime - hours * HOUR_IN_SECONDS) / MIN_IN_SECONDS)
      );
    }

    myInterval = setInterval(() => {
      setHours(Math.floor(reserveTime / HOUR_IN_SECONDS));
      setMinutes(
        Math.floor((reserveTime - hours * HOUR_IN_SECONDS) / MIN_IN_SECONDS)
      );
      if (reserveTime < MIN_IN_SECONDS) {
        completeTask(application);
        console.log("timeout");
        clearInterval(myInterval);
      }
    }, MIN_IN_SECONDS * 1000);
  }, [hours, application, minutes]);

  return (
    <MessageBanner type={MessageBannerType.Warning}>
      {`Spot reserved for ${hours} hours and ${minutes} minutes`}
    </MessageBanner>
  );
};

export default CounterMessageBanner;
