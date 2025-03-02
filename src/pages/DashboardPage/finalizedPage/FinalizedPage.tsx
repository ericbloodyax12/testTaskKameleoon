import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {NavigateButton} from "../../../components/common/navigateButton/NavigateButton.tsx";

import "./finalaizedPage.scss"

type TFinalizedPageProps = {}

export const FinalizedPage: React.FC<TFinalizedPageProps> = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (

        <div className="finalized-page">
            <div className={"finalized-page__name"}>
                {location.state.testName}
            </div>
            <NavigateButton onNavigate={() => navigate("/")}/>
        </div>
)
}

