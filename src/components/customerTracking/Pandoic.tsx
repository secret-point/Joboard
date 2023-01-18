import React from "react";
import { Helmet } from "react-helmet";

// Added 2 new customerTracking places unique to the new URLs to track site traffic and completed applications
export const PandoicTracking = () => {

  return (
    <Helmet>
      <script src="https://tracking.pandoiq.com/8950" async />
    </Helmet>
  );
};

export default PandoicTracking;
