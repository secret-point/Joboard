import React from "react";
import { shallow } from "enzyme";
import { AdditionalBGCInfo } from "../../../../../src/components/common/bgc/AdditionalBGCInfo";
import { TEST_APPLICATION_STATE, TEST_APP_CONFIG, TEST_BGC_STATE, TEST_CANDIDATE_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AdditionalBGCInfo", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <AdditionalBGCInfo
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        appConfig={TEST_APP_CONFIG}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
