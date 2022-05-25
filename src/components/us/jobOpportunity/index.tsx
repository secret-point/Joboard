import React, { useEffect } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import JobOpportunity from "./JobOpportunity";
import JobConfirmation from "./JobConfirmation";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { Text } from "@amzn/stencil-react-components/text";
import { JOB_OPPORTUNITY_PAGE } from "../../../utils/enums/common";
import { CommonColors } from "../../../utils/colors";
import JobDescription from "./JobDescription";
import { translate as t } from "../../../utils/translator";
import { connect } from "react-redux";
import { uiState } from "../../../reducers/ui.reducer";
import { boundSetJobOpportunityPage } from "../../../actions/UiActions/boundUi";

interface MapStateToProps {
    ui: uiState
}

const JobOpportunityContainer = (props: MapStateToProps) => {
    const { ui } = props;
    const { jobOpportunity } = ui;
    const { currentPage } = jobOpportunity;
    const { INDEX, JOB_CONFIRMATION, JOB_DESCRIPTION } = JOB_OPPORTUNITY_PAGE;

    useEffect(() => {
        window.scroll(0, 0);
    })

    const renderPage = ( pageType: JOB_OPPORTUNITY_PAGE ) => {
        switch(pageType) {
            case INDEX:
                return <JobOpportunity/>;

            case JOB_CONFIRMATION:
                return <JobConfirmation />;

            case JOB_DESCRIPTION:
                return <JobDescription/>;

            default:
                return <JobOpportunity />
        }
    }


    const handleBack = () => {
        if(currentPage === JOB_CONFIRMATION) {
            boundSetJobOpportunityPage(INDEX);
        }
        else {
            boundSetJobOpportunityPage(JOB_CONFIRMATION);
        }
    }

    return (
        <Col>
            {
                currentPage !== INDEX &&
                <Row
                    gridGap={5}
                    alignItems="center"
                    width="fit-content"
                    color={CommonColors.Blue70}
                    padding='S200'
                    onClick={handleBack}
                    style={{ cursor: 'pointer' }}
                >
                    <IconArrowLeft size={IconSize.ExtraSmall}/>
                    <Text fontSize="T100" fontWeight="medium">
                        {currentPage === JOB_CONFIRMATION ?
                            t('BB-JobOpportunity-back-to-indexPage-link', 'View Jobs') :
                            t('BB-JobOpportunity-back-to-jobConfirmation-link','Back')
                        }
                    </Text>
                </Row>
            }
            {
                renderPage(currentPage)
            }
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobOpportunityContainer)
