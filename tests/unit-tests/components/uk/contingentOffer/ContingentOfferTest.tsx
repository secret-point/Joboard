import React from "react";
import { ReactWrapper, shallow } from "enzyme";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { useLocation } from "react-router-dom";
import { ContingentOffer } from "../../../../../src/components/uk/contingentOffer/ContingentOffer";
import { TestInitUiState, TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_ASSESSMENT_STATE, TEST_CANDIDATE_STATE, TEST_JOB, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

jest.useFakeTimers();

const shouldOpenModal = (wrapper: ReactWrapper) => {
  setTimeout(() => {
      const flyoutModal = wrapper.find('div[data-test-component="StencilFlyout"]');
      expect(flyoutModal.length).toBe(1);
  }, 1000);

  jest.runAllTimers();
};


describe("ContingentOffer", () => {
  const mockLocation = {
    pathname: "/contingent-offer",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {

    const shallowWrapper = shallow(
      <ContingentOffer
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        ui={TestInitUiState}
        assessment={TEST_ASSESSMENT_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should show jobDescription populated from job object", () => {
    const jobDescriptionNode = "<div>Test job description</div>";
    const testJob = {...TEST_JOB_STATE, results: {...TEST_JOB, jobDescription: jobDescriptionNode}};
    const wrapper = mountWithStencil(
      <ContingentOffer
        candidate={TEST_CANDIDATE_STATE}
        job={testJob}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        ui={TestInitUiState}
        assessment={TEST_ASSESSMENT_STATE}
      />);

      const button = wrapper.find('button[data-test-id="contingentOfferFlyoutBtn"]');
      button.simulate('click');
      const updatedWrapper = wrapper.update();
      shouldOpenModal(updatedWrapper);
      const flyoutContent = updatedWrapper.find('DangerouslySetHtmlContent.jobDescription').prop('html');

      expect(flyoutContent).toBe(jobDescriptionNode);
  });
});
