import { TEST_APPLICATION_ID, TEST_PAGE_ID, TEST_REQUISITION_ID } from '../../../tests/test-data'
import URLParamsHelper from '../url-params-helper';
describe("Unit tests for url parameters helper", () => {

    beforeEach(() => {
        window.sessionStorage.clear();
        window.localStorage.clear();
    })
    test("Test url parameters helper with all ids in session storage", () => {
        window.sessionStorage.setItem("requisitionId", TEST_REQUISITION_ID);
        window.sessionStorage.setItem("applicationId", TEST_APPLICATION_ID);
        window.localStorage.setItem("page", TEST_PAGE_ID);

        const helper = new URLParamsHelper();
        const params = helper.get();

        expect(params.applicationId).toBe(TEST_APPLICATION_ID);
        expect(params.requisitionId).toBe(TEST_REQUISITION_ID);
        expect(params.page).toBe(TEST_PAGE_ID);
    })

    test("Test url parameters helper with nothing in session storage", () => {
        const helper = new URLParamsHelper();
        const params = helper.get();

        expect(params.applicationId).toBe("");
        expect(params.requisitionId).toBe("");
        expect(params.page).toBe("");
    })
})