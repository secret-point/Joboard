import React, { useState, useEffect } from "react";
import {
  MessageBanner,
  MessageBannerType
} from "@stencil-react/components/message-banner";

function CounterMessageBanner() {
  const [minutes, setMinutes] = useState(59);
  const [hours, setHours] = useState(2);
  let myInterval: any = null;

  useEffect(() => {
    tick();
  }, [minutes, hours]);

  const tick = () => {
    myInterval = setInterval(() => {
      console.log(minutes);
      console.log(hours);
      if (minutes > 0) {
        setMinutes(minutes - 1);
      }
      if (minutes === 0) {
        if (hours === 0) {
          clearInterval(myInterval);
        } else {
          setHours(hours - 1);
          setMinutes(59);
        }
      }
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
