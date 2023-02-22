import React from "react";
import { shallow } from "enzyme";
import { AdditionalBGCInfo } from "../../../../../src/components/uk/bgc/AdditionalBGCInfo";
import { TEST_APPLICATION_STATE, TEST_BGC_STATE, TEST_CANDIDATE_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AdditionalBGCInfo", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <AdditionalBGCInfo
        appConfig={{}}
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot when job activateReferralIncentive is true", () => {
    const shallowWrapper = shallow(
      <AdditionalBGCInfo
        appConfig={{}}
        candidate={TEST_CANDIDATE_STATE}
        job={{
          ...TEST_JOB_STATE,
          results: {
            activateReferralIncentive: true
          }
        }}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
