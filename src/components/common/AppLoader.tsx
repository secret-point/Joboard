import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Spinner, SpinnerSize } from "@amzn/stencil-react-components/spinner";
import { connect } from "react-redux";
import { uiState } from "../../reducers/ui.reducer";
import { translate as t } from "../../utils/translator";

interface MapStateToProps {
    ui: uiState
}

interface AppLoaderProps {
    loaderText?: string
}

type AppLoaderMergedProps = MapStateToProps & AppLoaderProps;

export const AppLoader = ( props: AppLoaderMergedProps) => {

    const { ui, loaderText } = props;

    return (
        ui.isLoading || ui.wotcLoading || ui.referralLoading ?
        <Col
            className="AppLoader"
        >
            <Spinner size={SpinnerSize.Large} loadingText={loaderText || t("BB-spinner-loading-text", 'Loading...') }/>
        </Col> :
            <></>
    )
}

const mapStateToProps = (state: MapStateToProps) => {
    return state
};

export default connect(mapStateToProps)(AppLoader);
