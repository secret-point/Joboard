import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { CounterMessageBanner } from "../../../../src/components/common/CounterMessageBanner";
import { PAGE_ROUTES } from "../../../../src/components/pageRoutes";
import { TEST_APPLICATION_STATE } from "../../../test-utils/test-data";

describe("CounterMessageBanner", () => {
  const mockLocation = {
    pathname: "",
    search: "",
    hash: PAGE_ROUTES.CONTINGENT_OFFER,
    state: null
  };
    
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(<CounterMessageBanner application={TEST_APPLICATION_STATE} />);
    
    expect(shallowWrapper).toMatchSnapshot();
  });
});