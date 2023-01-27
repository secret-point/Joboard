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
    it("should add new appCast event to acDataLayer - inject new appCast script", () => {
      document.body.innerHTML = "<div>Body</div>";
      pushAppCastEvent(0, jobId, jobSeekerId);

      expect(document.body.innerHTML).toEqual("" +
        "<div>Body</div><script src=\"https://click.appcast.io/pixels/wfs-8984.js?ent=387\" type=\"text/javascript\" id=\"appCastScript\"></script>");
      // simulate script load event
      document.getElementById("appCastScript")?.dispatchEvent(new CustomEvent("load"));

      expect(window.acDataLayer).toEqual([{
        event: 0,
        jid: jobId,
        jsid: jobSeekerId
      }]);
    });

    it("should add new appCast event to acDataLayer - without injecting new appCast script", () => {
      document.body.innerHTML = "<div>Body</div><script src=\"https://click.appcast.io/pixels/wfs-8984.js?ent=387\" type=\"text/javascript\" id=\"appCastScript\"></script>";
      pushAppCastEvent(0, jobId, jobSeekerId);

      expect(document.body.innerHTML).toEqual("" +
        "<div>Body</div><script src=\"https://click.appcast.io/pixels/wfs-8984.js?ent=387\" type=\"text/javascript\" id=\"appCastScript\"></script>");

      // it should fire the event without onLoad event
      expect(window.acDataLayer).toEqual([{
        event: 0,
        jid: jobId,
        jsid: jobSeekerId
      }]);
    });
  });
});
