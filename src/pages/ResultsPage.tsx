import React from 'react';
import {useLocation} from "react-router-dom";

type TResultsPageProps = {}

export const ResultsPage: React.FC<TResultsPageProps> = ({}) => {
    const location = useLocation();
    return (
        <div>
            {location.state.testName}
        </div>
    );
}

