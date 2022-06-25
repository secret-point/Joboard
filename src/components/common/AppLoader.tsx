import React from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import { Spinner, SpinnerSize } from "@amzn/stencil-react-components/spinner";
import { connect } from "react-redux";
import { uiState } from "../../reducers/ui.reducer";

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
        ui.isLoading ?
        <Col
            className="AppLoader"
        >
            <Spinner size={SpinnerSize.Large} loadingText={loaderText}/>
        </Col> :
            <></>
    )
}

const mapStateToProps = (state: MapStateToProps) => {
    return state
};

export default connect(mapStateToProps)(AppLoader);