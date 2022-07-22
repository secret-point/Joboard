/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import * as Helper from "../../src/utils/helper";
import { DayHoursFilter } from "../../src/utils/types/common";
import { DAYS_OF_WEEK } from "../../src/utils/enums/common";

export const mockUseBreakPoint = (targetQuery: string, isMatch: boolean) => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query === targetQuery ? isMatch : false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
};
