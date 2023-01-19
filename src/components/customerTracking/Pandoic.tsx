import React from "react";
import { Helmet } from "react-helmet";

// Added 2 new customerTracking places unique to the new URLs to track site traffic and completed applications
export const ThirdPartyTracking = () => {

  return (
    <Helmet>
      <script src="https://tracking.pandoiq.com/8950" async />
      <script type="text/javascript" src="https://click.appcast.io/pixels/wfs-8984.js?ent=387" />
    </Helmet>
  );
};

export default ThirdPartyTracking;