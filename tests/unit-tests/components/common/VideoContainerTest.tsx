import React from "react";
import { mount } from "enzyme";
import VideoContainer from "../../../../src/components/common/VideoContainer";
import { act } from "react-dom/test-utils";

describe("VideoContainer", () => {

    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(async() => {});

    it("should match snapshot", () => {

        const shallowWrapper = mount(
          <VideoContainer
            src="https://v.amazon.com"
            poster="Test User"
            id="TEST-ID"
            onClick={jest.fn()}
          />);
        
        const controlButton = shallowWrapper.find('button[data-testid="play-button"]');

        act(()=>{
            controlButton.simulate('click', {
                stopPropagation: ()=>{},
                nativeEvent: {
                    stopImmediatePropagation: ()=>{}
                }
            });
        });
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});