import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { CanNotOfferJob } from "../../../../../src/components/us/canNotOfferJob/CanNotOfferJob";
import { TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE } from "../../../../test-utils/test-data";

describe("CanNotOfferJob", () => {
  const mockLocation = {
    pathname: "/can-not-offer-job",
    search: `?jobId=${TEST_JOB_ID}}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <CanNotOfferJob
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
