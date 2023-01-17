import StepFunctionService from "../../../src/services/step-function-service";
import {boundSetWorkflowErrorCode} from "../../../src/actions/WorkflowActions/boundWorkflowActions";

jest.mock("../../../src/actions/WorkflowActions/boundWorkflowActions");
jest.mock("../../../src/actions/WorkflowActions/workflowActions");

describe("StepFunctionService",()=>{
    let actualWebSocket: any;
    let stepFunctionService: StepFunctionService
    beforeEach(()=>{
        actualWebSocket = global.WebSocket;
        global.WebSocket = function(){
            return {};
        } as any;
        stepFunctionService = new StepFunctionService("application-id","candidate-id",{
            stepFunctionEndpoint:"wss://20h9ohvgm6.execute-api.us-west-2.amazonaws.com/beta?applicationId={applicationId}&candidateId={candidateId}"
        } as any);
    });
    afterEach(()=>{
        global.WebSocket = actualWebSocket;
    });
    describe("message()",()=>{
        it("sets the duplicate-window error, and closes the websocket",async()=>{
            stepFunctionService.websocket.close = jest.fn();
            stepFunctionService.websocket.removeEventListener = jest.fn();
            stepFunctionService.websocket.onmessage({
                data:{
                    stepName:"duplicate-window"
                }
            } as any);

            expect(boundSetWorkflowErrorCode).toHaveBeenCalledWith("duplicate-window");
            expect(stepFunctionService.disableTimeout).toEqual(true);
            expect(stepFunctionService.websocket.close).toHaveBeenCalled();
        });
    });
});
