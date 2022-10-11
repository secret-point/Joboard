import {reloadAppPageWithSchedule} from "../../../src/utils/helper";
import  { history } from "../../../src/store/store";
import {Application, JobScheduleSelected} from "../../../src/utils/types/common";

jest.mock('../../../src/store/store',()=>({
  history:[],
}));

describe("Utils Tests: ", () => {
  beforeEach(()=>{
      (history as any as []).length = 0;
  });
  describe("reloadAppPageWithSchedule",()=>{

    test("routes to an error page when there is no scheduleId attached to the application or in the url",()=>{
      const application:Partial<Application> = {};
      reloadAppPageWithSchedule(application as any,{});
      expect(history).toEqual([{
        "pathname": "/applicationId-null",
        "search": ""
      }]);
    });

    test("reloads the current page, adding in the scheduleId from the application to the url",()=>{
      const jobScheduleSelected: Partial<JobScheduleSelected> = {
        scheduleId:"schedule-id",
      };
      const application:Partial<Application> = {
        jobScheduleSelected: jobScheduleSelected as any,
      };
      reloadAppPageWithSchedule(application as any,{
        applicationId:"app-id",
        jobId:"job-id",
      });
      expect(history).toEqual([{
        "pathname": "/self-identification",
        "search": "applicationId=app-id&jobId=job-id&scheduleId=schedule-id"
      }]);
    });
  });
});
