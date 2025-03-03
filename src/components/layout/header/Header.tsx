import React from 'react';

import './header.scss'
import {useLocation} from "react-router-dom";

type THeaderProps = {}

export const Header: React.FC<THeaderProps> = ({}) => {
    const location = useLocation()
    const headerCaption = location.state?.headerCaption ?? "Dashboard"
    console.log(location.state)
    return (
        <header className="header">
            <h1 className="header__title">{headerCaption}</h1>
        </header>
    );
}

