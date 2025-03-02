import {JSX} from "react";

import {DashboardPage} from "../pages/DashboardPage/DashboardPage.tsx";
import {ResultsPage} from "../pages/resultPage/ResultsPage.tsx";
import {FinalizedPage} from "../pages/DashboardPage/finalizedPage/FinalizedPage.tsx";
import {EPathCaption} from "../utils/getNavigateButtonCaption.ts";

export const paths = {
    DASHBOARD: '/',
    RESULTS: (testId: number) => `/${EPathCaption.RESULTS.toLowerCase()}/${testId}`,
    FINALIZE:  (testId: number) => `/${EPathCaption.FINALIZE.toLowerCase()}/${testId}`,
};

type RouteConfigType = {
    routeName: string,
    path: string,
    element: JSX.Element,
    private?: boolean
}

export const routesConfig: RouteConfigType[] = [
    {
        routeName: "dashboard",
        path: paths.DASHBOARD,
        element: <DashboardPage/>,
    },
    {
        routeName: "results",
        path: `/${EPathCaption.RESULTS.toLowerCase()}/:testId`,
        element: <ResultsPage/>,
        private: false // можно будет потом задавать true типо для "авторизованных пользователей"  (добавил для примера)
    },
    {
        routeName: "finalize",
        path: `/${EPathCaption.FINALIZE.toLowerCase()}/:testId`,
        element: <FinalizedPage/>,
    },
]