import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {NavigateButton} from "../../components/common/navigateButton/NavigateButton.tsx";

import "./resultPage.scss"

type TResultsPageProps = {}

export const ResultsPage: React.FC<TResultsPageProps> = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="results-page">
            <div className={"results-page__name"}>
                {location.state.testName}
            </div>
            <NavigateButton  onNavigate={() => navigate("/")}/>
        </div>

    );
}

