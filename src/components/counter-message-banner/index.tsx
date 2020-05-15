import React, { useState, useEffect } from "react";
import {
  MessageBanner,
  MessageBannerType
} from "@stencil-react/components/message-banner";

function CounterMessageBanner() {
  const countDownMinutes: any =
    window.localStorage.getItem("countDownMinutes") || 59;
  const countDownHours: any =
    window.localStorage.getItem("countDownHours") || 2;
  const [minutes, setMinutes] = useState(parseInt(countDownMinutes));
  const [hours, setHours] = useState(parseInt(countDownHours));
  let myInterval: any = null;

  useEffect(() => {
    tick();
  }, [minutes, hours]);

  const tick = () => {
    myInterval = setTimeout(() => {
      if (minutes > 0) {
        setMinutes(minutes - 1);
      }
      if (minutes === 0) {
        if (hours === 0) {
          clearTimeout(myInterval);
        } else {
          setHours(hours - 1);
          setMinutes(59);
        }
      }
      window.localStorage.setItem("countDownMinutes", minutes.toString());
      window.localStorage.setItem("countDownHours", hours.toString());
    }, 60000);
  };

  return (
    <MessageBanner type={MessageBannerType.Warning}>
      {`We are holding a spot for you for the next ${hours} hours and ${minutes} minutes to
      complete the remaining steps.`}
    </MessageBanner>
  );
}

export default CounterMessageBanner;
