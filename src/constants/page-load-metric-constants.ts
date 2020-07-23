import { EVENT, PAGE_TYPE } from "./adobe-analytics";
export const ADOBE_PAGE_LOAD_METRICS: any = {
  consent: {
    eventPayload: {
      event: EVENT.PAGE_LOAD,
      page: {
        type: PAGE_TYPE.APPLICATION
      }
    },
    dataPayload: [
      {
        key: "job",
        values: [
          {
            key: "ID",
            value: "requisitionId"
          },
          {
            key: "title",
            value: "requisition.consentInfo.jobTitle"
          }
        ]
      }
    ]
  }
};
