import React from "react";
import { shallow } from "enzyme";
import { ProofOfId2 } from "../../../../../../src/components/fullBgc/common/documentation/ProofOfId2";
import { TEST_APPLICATION_STATE, TEST_FULL_BGC_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../../test-utils/test-data";

describe("ProofOfId2", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ProofOfId2
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        fullBgc={TEST_FULL_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
