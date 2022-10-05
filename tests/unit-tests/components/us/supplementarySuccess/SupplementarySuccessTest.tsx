import React from "react";
import { shallow } from "enzyme";
import { useLocation } from 'react-router-dom';
import { SupplementarySuccess } from "../../../../../src/components/us/supplementarySuccess/SupplementarySuccess";

describe("SupplementarySuccess", () => {
  const mockLocation = {
    pathname: "/supplementary-success",
    search: ``,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <SupplementarySuccess />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
