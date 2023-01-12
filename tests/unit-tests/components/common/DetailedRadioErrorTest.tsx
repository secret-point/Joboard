import React from "react";
import { shallow } from "enzyme";
import DetailedRadioError from "../../../../src/components/common/DetailedRadioError";

describe("DetailedRadioError", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(<DetailedRadioError />);
    
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot with errorMessage", () => {
    const shallowWrapper = shallow(<DetailedRadioError errorMessageTranslationKey="error-message-key" errorMessage="error message" />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});