import React from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { ReactWrapper, shallow } from "enzyme";
import { DebouncedButton } from "../../../../src/components/common/DebouncedButton";

jest.useFakeTimers();

describe("DebouncedButton", () => {
  describe("snapshot", () => {
    it("should match snapshot for primary type", () => {
      const shallowWrapper = shallow(
        <DebouncedButton
          variant = {ButtonVariant.Primary}
          debounceTime = {1000}
          onClick = {jest.fn()}
        >
          Test Button Primary
        </DebouncedButton>
      );

      expect(shallowWrapper).toMatchSnapshot();
    });

    it("should match snapshot for secondary type", () => {
      const shallowWrapper = shallow(
        <DebouncedButton
          variant = {ButtonVariant.Secondary}
        >
          Test Button Secondary
        </DebouncedButton>
      );

      expect(shallowWrapper).toMatchSnapshot();
    });

    it("should match snapshot for Tertiary type", () => {
      const shallowWrapper = shallow(
        <DebouncedButton
          variant = {ButtonVariant.Tertiary}
          debounceTime={300}
          onClick = {jest.fn()}
        >
          Test Button Tertiary
        </DebouncedButton>
      );

      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe("when button is clicked", () => {
    let wrapper: ReactWrapper;
    let mockOnClick: React.MouseEventHandler<HTMLButtonElement> | undefined;

    beforeEach(() => {
      mockOnClick = jest.fn();

      wrapper = mountWithStencil(
        <DebouncedButton
          onClick = {mockOnClick}
          debounceTime = {1000}
        />
      );
    });

    it("should call onClick after debounceTime", () => {
      wrapper.find("button").simulate("click");
      expect(mockOnClick).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnClick).toHaveBeenCalled();
    });

    it("should not call onClick if button is clicked again before debounceTime", () => {
      wrapper.find("button").simulate("click");
      wrapper.find("button").simulate("click");
      jest.advanceTimersByTime(1000);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick again after debounceTime if button is clicked again after debounceTime", () => {
      wrapper.find("button").simulate("click");
      jest.advanceTimersByTime(1000);
      wrapper.find("button").simulate("click");
      jest.advanceTimersByTime(1000);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });
});
