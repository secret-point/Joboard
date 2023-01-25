import { pushAppCastEvent } from "../../../../src/components/customerTracking/appCast";

declare global {
  interface Window {
    acDataLayer: any;
  }
}

describe("AppCast", () => {
  const jobId = "testJobId";
  const jobSeekerId = "testJobSeekerId";

  beforeEach(() => {
    window.acDataLayer = [];
  });

  describe("pushAppCastEvent", () => {
    it("should add new appCast event to acDataLayer", () => {
      pushAppCastEvent(0, jobId, jobSeekerId);
      window.dispatchEvent(new CustomEvent("appCastReady"));

      expect(window.acDataLayer).toEqual([{
        event: 0,
        jid: jobId,
        jsid: jobSeekerId
      }]);
    });
  });
});
