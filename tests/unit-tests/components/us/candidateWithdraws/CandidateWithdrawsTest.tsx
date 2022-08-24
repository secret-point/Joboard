import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { CandidateWithdraws } from "../../../../../src/components/us/candidateWithdraws/CandidateWithdraws";
import { TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE } from "../../../../test-utils/test-data";

describe("CandidateWithdraws", () => {
  const mockLocation = {
    pathname: "/candidate-withdraws",
    search: `?jobId=${TEST_JOB_ID}}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <CandidateWithdraws
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
