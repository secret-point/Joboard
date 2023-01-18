import React from "react";
import Pandoic from "../../../../src/components/customerTracking/Pandoic";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { mount } from "enzyme";

const getItemSpy = jest.spyOn(window.localStorage, "getItem");

describe("Pandoic", () => {

  beforeEach(() => {
    getItemSpy.mockReset();
  });

  it("should match snapshot on bb", () => {
    const url = "https://beta-us.devo.jobsatamazon.hvh.a2z.com/application/";
    Object.defineProperty(window, "location", {
      value: new URL(url)
    } );
    getItemSpy.mockReturnValue("nhe");
    const wrapper = mount(<Pandoic />);
    expect(wrapper).toMatchSnapshot();
  });
});
