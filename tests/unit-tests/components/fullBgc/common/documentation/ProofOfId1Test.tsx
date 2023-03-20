import React from "react";
import { shallow } from "enzyme";
import { ProofOfId1 } from "../../../../../../src/components/fullBgc/common/documentation/ProofOfId1";
import { TEST_APPLICATION_STATE, TEST_FULL_BGC_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../../test-utils/test-data";

describe("ProofOfId1", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ProofOfId1
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        fullBgc={TEST_FULL_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
