// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

window.MetricsPublisher = {
  newChildActionPublisherForMethod: (
    method: string,
    additionalContext?: any
  ) => {
    return {
      publishCounter: (name: string, value: number) => {},
      publishTimer: (name: string, value: number) => {},
      publishCounterMonitor: (name: string, value: number) => {},
      publishTimerMonitor: (name: string, value: number) => {}
    };
  }
};

configure({ adapter: new Adapter() });
