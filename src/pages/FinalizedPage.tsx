import React from 'react';
import {useLocation} from "react-router-dom";

type TFinalizedPageProps = {}

export const FinalizedPage: React.FC<TFinalizedPageProps> = ({}) => {
    const location = useLocation();
    return (
        <div>
            {location.state.testName}
        </div>
    );
}

