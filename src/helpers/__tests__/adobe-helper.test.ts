import { filter } from 'lodash';
import { getDataForMetrics, getDataForEventMetrics } from './../adobe-helper';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { TEST_HCR_ID, TEST_PAGE, TEST_REQUISITION_ID } from '../../../tests/test-data';


describe("Unit tests for adobe helper", () => {
    let store: any;
    const mockStore = configureStore([
        thunk,
        routerMiddleware(createHashHistory())
    ]);
    const getStore = () => {
        const initState = {};
        return mockStore(initState);
    };

    beforeEach(() => {
        store = getStore();
        window.reduxStore = store;
        window.urlParams = {
            requisitionId: TEST_REQUISITION_ID
        }
    });

    test("test getDataForMetrics for job opportunities", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                currentPage: {
                    id: "job-opportunities"
                },
                data: {}
            }
        });
        const data = getDataForMetrics();
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("view jobs");
    })

    test("test getDataForMetrics for contingent offer", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                currentPage: {
                    id: "contingent-offer"
                },
                data: {}
            }
        });
        const data = getDataForMetrics();
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("BB-contingent offer");
    })

    test("test getDataForMetrics for nhe", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                currentPage: {
                    id: "nhe"
                },
                data: {
                    requisition: {
                        nheTimeSlots: []
                    }
                }
            }
        });
        const data = getDataForMetrics();
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("pre-hire appointment");
    })

    test("test getDataForMetrics for job opportunities with shifts", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                currentPage: {
                    id: "job-opportunities"
                },
                data: {
                    requisition: {
                        availableShifts: {
                            shifts:[
                                {
                                    headCountRequestId: TEST_HCR_ID
                                }
                            ]
                        }
                    }
                }
            }
        });
        const data = getDataForMetrics();
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("view jobs");
    })

    test("test getDataForMetrics for a page that does not have metrics", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                currentPage: {
                    id: "fake"
                },
                data: {}
            }
        });
        const data = getDataForMetrics();
        console.log(data);

        expect(data).toBeUndefined();
    })

    test("test getDataForEventMetrics for job opportunities", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                data: {}
            }
        });
        const data = getDataForEventMetrics("job-opportunities");
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("view jobs");
    })

    test("test getDataForEventMetrics for contingent offer", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                data: {}
            }
        });
        const data = getDataForEventMetrics("contingent-offer");
        console.log(data);

        expect(data.event).toBe("page load");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.page.name).toBe("BB-contingent offer");
    })

    test("test getDataForEventMetrics for other pages", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                data: {}
            }
        });
        const data = getDataForEventMetrics("fake");
        console.log(data);

        expect(data).toBeUndefined();
    })

    test("test getDataForEventMetrics for event apply-filter", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                data: {}
            }
        });
        const data = getDataForEventMetrics("apply-filter");
        console.log(data);

        expect(data.event).toBe("jobs filter");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
        expect(data.filter.hoursPerWeek).toBeUndefined();
    })

    test("test getDataForEventMetrics for event apply-sorting", () => {
        store.getState = jest.fn().mockReturnValue({
            app: {
                data: {}
            }
        });
        const data = getDataForEventMetrics("apply-sorting");
        console.log(data);

        expect(data.event).toBe("jobs sort");
        expect(data.job.ID).toBe(TEST_REQUISITION_ID);
    })
});