import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { APP_CAST_EVENT_NUMBER } from "../../utils/enums/common";
import { pushAppCastEvent } from "./appCast";

// Added 2 new customerTracking places unique to the new URLs to track site traffic and completed applications
interface ThirdPartyTrackingProps {
  jobId: string;
  appCastEventId: APP_CAST_EVENT_NUMBER;
}
export const ThirdPartyTracking = (props: ThirdPartyTrackingProps) => {
  const { jobId, appCastEventId } = props;

  useEffect(() => {
    pushAppCastEvent(appCastEventId, jobId);
  }, [jobId, appCastEventId]);
  return (
    <Helmet>
      <script src="https://tracking.pandoiq.com/8950" async />
    </Helmet>
  );
};

export default ThirdPartyTracking;
