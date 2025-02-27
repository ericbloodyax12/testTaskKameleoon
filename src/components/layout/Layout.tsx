import React from 'react';
import {Header} from "./header/Header.tsx";
import {Outlet} from "react-router-dom";

type TLayoutProps = {}

export const Layout: React.FC<TLayoutProps> = (props) => {
    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

