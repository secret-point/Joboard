import React from "react";
import { shallow } from "enzyme";
import { CriminalRecordForm } from "../../../../../src/components/common/bgc/CriminalRecordForm";
import { TEST_APPLICATION_STATE, TEST_BGC_STATE, TEST_CANDIDATE_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("CriminalRecordForm", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <CriminalRecordForm
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
