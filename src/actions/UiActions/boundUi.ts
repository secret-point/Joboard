import store from "../../store/store";
import { actionGetCountryStateConfig, actionSetJobOpportunityPage } from "./uiActions";
import { JOB_OPPORTUNITY_PAGE } from "../../utils/enums/common";

export const boundGetCountryStateConfig = () => store.dispatch(actionGetCountryStateConfig());
export const boundSetJobOpportunityPage = (payload: JOB_OPPORTUNITY_PAGE) =>
    store.dispatch(actionSetJobOpportunityPage(payload));
