import React from 'react';
import {Header} from "./header/Header.tsx";
import {Outlet} from "react-router-dom";

import './layout.scss'
import {Footer} from "./footer/Footer.tsx";

type TLayoutProps = {}

export const Layout: React.FC<TLayoutProps> = ({}) => {
    const mainLayoutContainerCN = [
        "main-layout-container",
    ].join(" ")
    return (
        <div className={mainLayoutContainerCN}>
            <div className={"main-layout-container__header"}>
                <Header/>
            </div>
            <main className={"main-layout-container__content"}>
                <Outlet/>
            </main>
            <div className={"main-layout-container__footer"}>
                <Footer/>
            </div>
        </div>
    );
}

