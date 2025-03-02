import React from 'react';
import {Test} from "../../../services/api.ts";

import "./dashboardTd.scss"
type AdditionalType = {
    [x: number]: any;
    SITE_URLS: {
        1: string;
        2: string;
        3: string;
    };
}

type TestPropertyTypes = Test[keyof Test]

type TDashboardTdProps = {
    content: TestPropertyTypes | AdditionalType;
    className?: string;
    style?: React.CSSProperties; // Дополнительные стили
    statusClass?: string;
}

export const DashboardTd: React.FC<TDashboardTdProps> = ({className,content, statusClass}) => {
    return (
        <td>
            <div className={`cell-template ${className} ${statusClass}`}>
                <div style={{width: "100%", display: "flex", alignItems: "center"}}>{typeof content === 'object' ? JSON.stringify(content) : content}</div>
            </div>
        </td>
    );
}

