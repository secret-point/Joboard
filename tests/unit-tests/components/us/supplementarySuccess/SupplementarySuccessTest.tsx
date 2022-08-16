import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { SupplementarySuccess } from "../../../../../src/components/us/supplementarySuccess/SupplementarySuccess";

describe("SupplementarySuccess", () => {
  const mockLocation = {
    pathname: "/supplementary-success",
    search: ``,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <SupplementarySuccess />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
