import React from "react";
import ThirdPartyTracking from "../../../../src/components/customerTracking/ThirdPartyTracking";
import { mount } from "enzyme";

const getItemSpy = jest.spyOn(window.localStorage, "getItem");

describe("ThirdPartyTracking", () => {

  beforeEach(() => {
    getItemSpy.mockReset();
  });

  it("should match snapshot on bb", () => {
    const url = "https://beta-us.devo.jobsatamazon.hvh.a2z.com/application/";
    Object.defineProperty(window, "location", {
      value: new URL(url)
    } );
    getItemSpy.mockReturnValue("nhe");
    const wrapper = mount(<ThirdPartyTracking />);
    expect(wrapper).toMatchSnapshot();
  });
});
