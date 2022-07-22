// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import * as React from 'react';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

// @ts-ignore
window.MetricsPublisher = {
  newChildActionPublisherForMethod: (methodName: string, additionalContext?: any): any => {
    return {
      publishCounter: (name: string, value: number) => {},
      publishTimer: (name: string, value: number) => {},
      publishCounterMonitor: (name: string, value: number) => {},
      publishTimerMonitor: (name: string, value: number) => {}
    };
  }
};

global.React = React;
// @ts-ignore
global.shallow = shallow;
// @ts-ignore
global.mount = mount;
// @ts-ignore
global.render = render;

configure({ adapter: new Adapter() });
