/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import MockAdapter from "axios-mock-adapter/types";
import * as Helper from "../../src/utils/helper";
import { Application, Candidate, DayHoursFilter, Job, Schedule } from "../../src/utils/types/common";

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

export const mockGetCandidateApi = (apiMock: MockAdapter, candidate: Candidate) => {
  apiMock.onGet("/api/candidate-application/candidate").reply(200, { data: candidate });
};

export const mockGetApplicationApi = (apiMock: MockAdapter, application: Application) => {
  apiMock.onGet(new RegExp("/api/candidate-application/applications/\\w+")).reply(200, { data: application });
};

export const mockGetScheduleDetailsApi = (apiMock: MockAdapter, schedule: Schedule) => {
  apiMock.onGet(new RegExp("/api/job/get-schedule-details/\\w+")).reply(200, { data: schedule });
};

export const mockGetJobApi = (apiMock: MockAdapter, job: Job) => {
  apiMock.onGet(new RegExp("/api/job/\\w+")).reply(200, { data: job });
}
